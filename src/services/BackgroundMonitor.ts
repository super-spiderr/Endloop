import notifee, { AndroidImportance, AndroidStyle } from '@notifee/react-native';
import BackgroundService from 'react-native-background-actions';
import AppUsageMethods from '../native/AppUsageModule';
import { getAppLimits } from '../utils/limits';
import { RoastEngine } from './RoastEngine';
import { storage } from '../utils/storage';
import { saveRoast } from '../utils/roasts';

const NOTIFIED_KEY = 'LAST_NOTIFIED_DATE_'; // Add packageName at end

import { RoastStyle } from '../types/roast';

interface TaskData {
  delay: number;
}

const sleep = (time: number) =>
  new Promise<void>(resolve => {
    setTimeout(() => resolve(), time);
  });

class BackgroundMonitor {
  private isRunning = false;

  async start() {
    if (this.isRunning) {
      return;
    }
    this.isRunning = true;

    try {
      await notifee.requestPermission();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('Permission request error:', e);
    }

    const options = {
      taskName: 'EndloopMonitor',
      taskTitle: 'Endloop is active',
      taskDesc: 'Monitoring your focus...',
      taskIcon: {
        name: 'ic_launcher',
        type: 'mipmap',
      },
      color: '#CBE91B',
      linkingURI: 'endloop://home',
      parameters: {
        delay: 30000, // 30 seconds
      },
      stopOnTerminate: false, // Keep running even if app is closed
    };

    try {
      await BackgroundService.start(this.task.bind(this), options);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('Error starting background service:', e);
      this.isRunning = false;
    }
  }

  async stop() {
    await BackgroundService.stop();
    this.isRunning = false;
  }

  private async task(taskData?: TaskData) {
    if (!taskData) {
      return;
    }
    while (BackgroundService.isRunning()) {
      await this.checkLimits();
      await sleep(taskData.delay);
    }
  }

  private async checkLimits() {
    try {
      const hasPerm = await AppUsageMethods.hasUsagePermission();
      if (!hasPerm) {
        return;
      }

      const limits = getAppLimits();
      if (limits.length === 0) {
        return;
      }

      const todayStats = await AppUsageMethods.getTodayUsageStats(false);
      const now = new Date();
      const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
      const todayString = now.toISOString().split('T')[0];
      const hour = now.getHours();
      const tenMinBlock = Math.floor(now.getMinutes() / 10);

      for (const limit of limits) {
        const stat = todayStats.find(s => s.packageName === limit.packageName);
        if (!stat) {
          continue;
        }

        // Calculate usage since the limit was set/reset
        // If reset was today, we subtract the usage that was already there at reset time
        // If reset was on a previous day, we just use today's total usage
        const isResetToday = limit.resetAt >= startOfToday;
        const baseUsage = isResetToday ? limit.usageAtReset || 0 : 0;

        const effectiveUsageMs = Math.max(0, stat.totalTimeInForeground - baseUsage);
        const minutesUsed = Math.floor(effectiveUsageMs / 1000 / 60);

        // eslint-disable-next-line no-console
        console.log(
          `[Monitor] ${limit.appName}: ${minutesUsed}/${
            limit.limitMinutes
          } min (Total today: ${Math.floor(
            stat.totalTimeInForeground / 1000 / 60,
          )}m, Base: ${Math.floor(baseUsage / 1000 / 60)}m)`,
        );

        if (minutesUsed >= limit.limitMinutes) {
          // Check if we already sent a notification THIS 10-MINUTE BLOCK for this app
          const lastNotified = storage.getString(`${NOTIFIED_KEY}${limit.packageName}`);
          const currentKey = `${todayString}_H${hour}_M${tenMinBlock}`;

          if (lastNotified !== currentKey) {
            await this.triggerNotification(limit.appName, minutesUsed, minutesUsed - limit.limitMinutes);
            storage.set(`${NOTIFIED_KEY}${limit.packageName}`, currentKey);
          }
        }
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Background check error:', e);
    }
  }

  private async triggerNotification(appName: string, minutesUsed: number, minutesOver: number) {
    const style = (storage.getString('ROAST_STYLE') as RoastStyle) ?? 'savage';

    // Generate roast
    const roast = RoastEngine.generateRoast(
      {
        appName,
        currentStreak: 0, // Need to implement streak logic later
        isRepeatOffender: false,
        minutesOver,
        timeOfDay: RoastEngine.getTimeOfDay(),
        totalMinutesToday: minutesUsed,
      },
      style,
    );

    // Save to history so it shows up on Home Screen
    saveRoast(appName, roast, minutesOver);

    // Create channel for Android
    const channelId = await notifee.createChannel({
      id: 'endloop_roasts',
      importance: AndroidImportance.HIGH,
      name: 'Endloop Roasts',
    });

    await notifee.displayNotification({
      android: {
        channelId,
        importance: AndroidImportance.HIGH,
        style: {
          type: AndroidStyle.BIGTEXT,
          text: roast,
        },
        pressAction: {
          id: 'default',
        },
        actions: [
          {
            title: 'ACKNOWLEDGE',
            pressAction: { id: 'acknowledge' },
          },
        ],
        // Swiggy-style: prominent large icon and clean small icon
        smallIcon: 'notification_small_icon',
        largeIcon: 'notification_icon',
        color: '#CBE91B',
        showTimestamp: true,
      },
      body: roast,
      title: '🚨 INCIDENT REPORT FILED',
    });
  }
}

export const monitor = new BackgroundMonitor();
