import { storage } from './storage';

export interface RoastHistoryItem {
  id: string;
  timestamp: number;
  dateString: string; // "Today, 2:45 PM"
  appName: string;
  text: string;
  minutesOver: number;
  category: string;
}

const ROASTS_KEY = 'ROAST_HISTORY';

export const getRoastHistory = (): RoastHistoryItem[] => {
  const data = storage.getString(ROASTS_KEY);
  if (!data) {
    return [];
  }
  try {
    return JSON.parse(data) as RoastHistoryItem[];
  } catch {
    return [];
  }
};

export const saveRoast = (
  appName: string,
  text: string,
  minutesOver: number,
  category = 'Social'
): RoastHistoryItem => {
  const history = getRoastHistory();
  const now = Date.now();
  
  const newItem: RoastHistoryItem = {
    id: now.toString(),
    timestamp: now,
    dateString: new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric',
    }).format(now),
    appName,
    text,
    minutesOver,
    category,
  };

  history.unshift(newItem); // Newest first
  
  // Keep only last 100 roasts to save memory
  const trimmedHistory = history.slice(0, 100);
  storage.set(ROASTS_KEY, JSON.stringify(trimmedHistory));
  
  return newItem;
};

export const getLatestRoast = (): RoastHistoryItem | null => {
  const history = getRoastHistory();
  return history.length > 0 ? history[0] : null;
};
