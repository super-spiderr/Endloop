import { storage } from './storage';

const STREAKS_KEY = 'CLEAN_DAYS'; // Array of "YYYY-MM-DD"
const LONGEST_STREAK_KEY = 'LONGEST_STREAK';

export interface StreakStats {
  current: number;
  longest: number;
  lastClean: string; // ISO Date "YYYY-MM-DD"
}

export const getCleanDays = (): string[] => {
  const data = storage.getString(STREAKS_KEY);
  if (!data) {
    return [];
  }
  try {
    return JSON.parse(data) as string[];
  } catch {
    return [];
  }
};

export const markDayAsClean = (date: Date): void => {
  const dateStr = date.toISOString().split('T')[0];
  const cleanDays = getCleanDays();
  if (!cleanDays.includes(dateStr)) {
    cleanDays.push(dateStr);
    storage.set(STREAKS_KEY, JSON.stringify(cleanDays));
    
    // Update longest streak
    const stats = getStreakStats();
    if (stats.current > stats.longest) {
      storage.set(LONGEST_STREAK_KEY, stats.current);
    }
  }
};

export const getStreakStats = (): StreakStats => {
  const cleanDays = getCleanDays().sort((a, b) => b.localeCompare(a));
  const longest = storage.getNumber(LONGEST_STREAK_KEY) ?? 0;
  
  if (cleanDays.length === 0) {
    return { current: 0, longest, lastClean: 'Never' };
  }

  // Simple streak calculation (today, yesterday, etc.)
  let current = 0;
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

  let checkDate = today;
  if (!cleanDays.includes(today)) {
    checkDate = yesterday;
    if (!cleanDays.includes(yesterday)) {
      return { current: 0, longest, lastClean: cleanDays[0] };
    }
  }

  // Go backwards
  const tempDate = new Date(checkDate);
  while (cleanDays.includes(tempDate.toISOString().split('T')[0])) {
    current++;
    tempDate.setDate(tempDate.getDate() - 1);
  }

  return { current, longest: Math.max(longest, current), lastClean: cleanDays[0] };
};
