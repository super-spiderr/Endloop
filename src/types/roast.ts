export type RoastTier = 'nudge' | 'roast' | 'savage' | 'intervention';
export type RoastStyle = 'savage' | 'passive_aggressive' | 'supportive' | 'stoic';

export interface RoastContext {
  appName: string;
  minutesOver: number;
  totalMinutesToday: number;
  currentStreak: number;
  timeOfDay: 'morning' | 'afternoon' | 'night';
  isRepeatOffender: boolean;
}
