import { NativeModules, Platform } from 'react-native';

interface AppUsageNativeInterface {
  hasPermission(): Promise<boolean>;
  openUsageSettings(): void;
  getUsageStats(startTime: number, endTime: number, includeIcons: boolean): Promise<AppUsage[]>;
  getInstalledApps(): Promise<AppInfo[]>;
}

const AppUsageModule = NativeModules.AppUsageModule as AppUsageNativeInterface;

if (!NativeModules.AppUsageModule) {
  // eslint-disable-next-line no-console
  console.warn('Native module AppUsageModule is missing! Please rebuild the app.');
}

export interface AppUsage {
  packageName: string;
  appName: string;
  appIcon?: string;
  totalTimeInForeground: number;
  lastTimeUsed: number;
}

export interface AppInfo {
  packageName: string;
  appName: string;
  appIcon?: string;
}

export const hasUsagePermission = async (): Promise<boolean> => {
  if (Platform.OS !== 'android') {
    return false;
  }
  try {
    return (await AppUsageModule?.hasPermission()) ?? false;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error checking usage permission:', error);
    return false;
  }
};

export const openUsageSettings = (): void => {
  if (Platform.OS === 'android') {
    AppUsageModule?.openUsageSettings();
  }
};

export const getUsageStats = async (
  startTime: number,
  endTime: number,
  includeIcons = true,
): Promise<AppUsage[]> => {
  if (Platform.OS !== 'android') {
    return [];
  }
  try {
    // Try the new 3-argument version first
    return (await AppUsageModule?.getUsageStats(startTime, endTime, includeIcons)) ?? [];
  } catch {
    // Fallback to the old 2-argument version if the native side hasn't been rebuilt yet
    try {
      interface LegacyAppUsageModule {
        getUsageStats(start: number, end: number): Promise<AppUsage[]>;
      }
      const fallbackResult = await (
        AppUsageModule as unknown as LegacyAppUsageModule
      )?.getUsageStats(startTime, endTime);
      return fallbackResult ?? [];
    } catch (fallbackError) {
      // eslint-disable-next-line no-console
      console.error('Error fetching usage stats (fallback failed):', fallbackError);
      return [];
    }
  }
};

export const getTodayUsageStats = async (includeIcons = true): Promise<AppUsage[]> => {
  if (Platform.OS !== 'android') {
    return [];
  }
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date();
  return await getUsageStats(startOfDay.getTime(), endOfDay.getTime(), includeIcons);
};

export const getInstalledApps = async (): Promise<AppInfo[]> => {
  if (Platform.OS !== 'android') {
    return [];
  }

  if (!AppUsageModule?.getInstalledApps) {
    // eslint-disable-next-line no-console
    console.warn(
      'Native method getInstalledApps is not available on this platform. Please rebuild the app.',
    );
    return [];
  }

  try {
    return await AppUsageModule.getInstalledApps();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching installed apps:', error);
    return [];
  }
};

const AppUsageMethods = {
  hasUsagePermission,
  openUsageSettings,
  getUsageStats,
  getTodayUsageStats,
  getInstalledApps,
};

export default AppUsageMethods;
