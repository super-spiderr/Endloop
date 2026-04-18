package com.endloop.usage

import android.app.Activity
import android.app.AppOpsManager
import android.app.usage.UsageStats
import android.app.usage.UsageStatsManager
import android.content.Context
import android.content.Intent
import android.content.pm.ApplicationInfo
import android.graphics.Bitmap
import android.graphics.Canvas
import android.graphics.drawable.BitmapDrawable
import android.graphics.drawable.Drawable
import android.net.Uri
import android.os.Process
import android.provider.Settings
import android.util.Base64
import com.facebook.react.bridge.*
import java.io.ByteArrayOutputStream

class AppUsageModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String = "AppUsageModule"

    @ReactMethod
    fun hasPermission(promise: Promise) {
        val appOps = reactApplicationContext
            .getSystemService(Context.APP_OPS_SERVICE) as? AppOpsManager
            
        if (appOps == null) {
            promise.resolve(false)
            return
        }
        val mode = if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.Q) {
            appOps.unsafeCheckOpNoThrow(
                AppOpsManager.OPSTR_GET_USAGE_STATS,
                Process.myUid(),
                reactApplicationContext.packageName
            )
        } else {
            @Suppress("DEPRECATION")
            appOps.checkOpNoThrow(
                AppOpsManager.OPSTR_GET_USAGE_STATS,
                Process.myUid(),
                reactApplicationContext.packageName
            )
        }
        promise.resolve(mode == AppOpsManager.MODE_ALLOWED)
    }

    @ReactMethod  // ← was missing
    fun openUsageSettings() {
        try {
            val intent = Intent(Settings.ACTION_USAGE_ACCESS_SETTINGS)
            intent.data = Uri.fromParts(
                "package", reactApplicationContext.packageName, null
            )
            val activity = reactApplicationContext.currentActivity
            if (activity != null) {
                activity.startActivity(intent)
            } else {
                intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
                reactApplicationContext.startActivity(intent)
            }
        } catch (e: Exception) {
            try {
                val intent = Intent(Settings.ACTION_USAGE_ACCESS_SETTINGS)
                intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
                reactApplicationContext.startActivity(intent)
            } catch (e2: Exception) {
                val intent = Intent(Settings.ACTION_SETTINGS)
                intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
                reactApplicationContext.startActivity(intent)
            }
        }
    }

    @ReactMethod
    fun getUsageStats(startTime: Double, endTime: Double, includeIcons: Boolean, promise: Promise) {
        try {
            val usageStatsManager = reactApplicationContext
                .getSystemService(Context.USAGE_STATS_SERVICE) as? UsageStatsManager
                ?: throw Exception("UsageStatsManager not available")
                
            val stats = usageStatsManager.queryAndAggregateUsageStats(
                startTime.toLong(), endTime.toLong()
            )
            
            if (stats == null) {
                promise.resolve(Arguments.createArray())
                return
            }
            val packageManager = reactApplicationContext.packageManager
            val resultList = Arguments.createArray()

            for (entry in stats) {
                val usageStat = entry.value
                if (usageStat.totalTimeInForeground <= 0) continue

                // Check if the app has a launcher intent (to avoid reporting background/system services)
                val launchIntent = packageManager.getLaunchIntentForPackage(usageStat.packageName)
                if (launchIntent == null) continue

                val map = Arguments.createMap()
                map.putString("packageName", usageStat.packageName)
                map.putDouble("totalTimeInForeground",
                    usageStat.totalTimeInForeground.toDouble())
                map.putDouble("lastTimeUsed",
                    usageStat.lastTimeUsed.toDouble())

                // App name resolution
                try {
                    val appInfo = packageManager.getApplicationInfo(
                        usageStat.packageName, 0
                    )
                    map.putString("appName",
                        packageManager.getApplicationLabel(appInfo).toString())
                    
                    if (includeIcons) {
                        map.putString("appIcon", getAppIconAsBase64(appInfo.packageName))
                    }
                } catch (e: Exception) {
                    map.putString("appName", usageStat.packageName)
                }

                resultList.pushMap(map)
            }
            promise.resolve(resultList)
        } catch (e: Exception) {
            promise.reject("ERROR_USAGE_STATS", e.message)
        }
    }

    @ReactMethod
    fun getInstalledApps(promise: Promise) {
        try {
            val packageManager = reactApplicationContext.packageManager
            val apps = packageManager.getInstalledApplications(0)
            val resultList = Arguments.createArray()

            for (appInfo in apps) {
                // Check if the app has a launcher intent (it's user-facing)
                val launchIntent = packageManager.getLaunchIntentForPackage(appInfo.packageName)
                if (launchIntent == null) continue

                val map = Arguments.createMap()
                map.putString("packageName", appInfo.packageName)
                map.putString("appName", packageManager.getApplicationLabel(appInfo).toString())
                map.putString("appIcon", getAppIconAsBase64(appInfo.packageName))
                resultList.pushMap(map)
            }
            promise.resolve(resultList)
        } catch (e: Exception) {
            promise.reject("ERROR_GET_APPS", e.message)
        }
    }

    private fun isSystemApp(packageName: String): Boolean {
        return try {
            val appInfo = reactApplicationContext.packageManager
                .getApplicationInfo(packageName, 0)
            (appInfo.flags and ApplicationInfo.FLAG_SYSTEM) != 0
        } catch (e: Exception) {
            true
        }
    }

    private fun getAppIconAsBase64(packageName: String): String? {
        return try {
            val packageManager = reactApplicationContext.packageManager
            val icon: Drawable = packageManager.getApplicationIcon(packageName)
            val bitmap: Bitmap = if (icon is BitmapDrawable) {
                icon.bitmap
            } else {
                val b = Bitmap.createBitmap(
                    icon.intrinsicWidth.coerceAtLeast(1),
                    icon.intrinsicHeight.coerceAtLeast(1),
                    Bitmap.Config.ARGB_8888
                )
                val canvas = Canvas(b)
                icon.setBounds(0, 0, canvas.width, canvas.height)
                icon.draw(canvas)
                b
            }
            val outputStream = ByteArrayOutputStream()
            bitmap.compress(Bitmap.CompressFormat.PNG, 100, outputStream)
            val byteArray = outputStream.toByteArray()
            Base64.encodeToString(byteArray, Base64.NO_WRAP)
        } catch (e: Exception) {
            null
        }
    }
}