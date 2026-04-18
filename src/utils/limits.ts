import { storage } from './storage';
import AppUsageMethods from '../native/AppUsageModule';

export interface AppLimit {
  packageName: string;
  limitMinutes: number; // 0 means no limit
  appName: string;
  resetAt: number; // Timestamp (Date.now())
  usageAtReset: number; // Usage in ms today at the time of reset
  isPaused?: boolean;
}

const LIMITS_KEY = 'APP_LIMITS';

export const getAppLimits = (): AppLimit[] => {
  const data = storage.getString(LIMITS_KEY);
  if (!data) {
    return [];
  }
  try {
    return JSON.parse(data) as AppLimit[];
  } catch {
    return [];
  }
};

export const setAppLimit = async (
  packageName: string,
  appName: string,
  limitMinutes: number
): Promise<void> => {
  const limits = getAppLimits();
  const existingIndex = limits.findIndex(l => l.packageName === packageName);
  
  // Fetch current today usage to set as base
  const todayStats = await AppUsageMethods.getTodayUsageStats();
  const currentStat = todayStats.find(s => s.packageName === packageName);
  const currentTodayUsageMs = currentStat?.totalTimeInForeground ?? 0;

  const existingLimit = existingIndex > -1 ? limits[existingIndex] : null;

  const newLimit: AppLimit = {
    packageName,
    appName,
    limitMinutes,
    resetAt: Date.now(),
    usageAtReset: currentTodayUsageMs,
    isPaused: existingLimit?.isPaused ?? false,
  };

  if (existingIndex > -1) {
    if (limitMinutes === 0) {
      limits.splice(existingIndex, 1);
    } else {
      limits[existingIndex] = newLimit;
    }
  } else if (limitMinutes > 0) {
    limits.push(newLimit);
  }
  
  storage.set(LIMITS_KEY, JSON.stringify(limits));
};

export const toggleAppLimitPause = (packageName: string): void => {
  const limits = getAppLimits();
  const limitIndex = limits.findIndex(l => l.packageName === packageName);
  if (limitIndex > -1) {
    limits[limitIndex].isPaused = !limits[limitIndex].isPaused;
    storage.set(LIMITS_KEY, JSON.stringify(limits));
  }
};

export const removeAppLimit = (packageName: string): void => {
  const limits = getAppLimits().filter(l => l.packageName !== packageName);
  storage.set(LIMITS_KEY, JSON.stringify(limits));
};
