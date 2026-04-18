export const palette = {
  black: '#000000',
  white: '#FFFFFF',
  grey100: '#F5F5F5',
  grey200: '#EEEEEE',
  grey300: '#E0E0E0',
  grey400: '#BDBDBD',
  grey500: '#9E9E9E',
  grey600: '#757575',
  grey700: '#616161',
  grey800: '#424242',
  grey900: '#212121',
  blue500: '#2196F3',
  blue700: '#1976D2',
  green500: '#4CAF50',
  red500: '#F44336',
  orange500: '#FF9800',
  emerald400: '#4ADE80',
  lime500: '#CBE91B',
  darkBlue: '#0D0D1A',
  cyan: '#00F0FF',
  amber: '#FFBF00',
};

export const withOpacity = (hex: string, alpha: number): string => {
  const r = Number.parseInt(hex.slice(1, 3), 16);
  const g = Number.parseInt(hex.slice(3, 5), 16);
  const b = Number.parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const darkColors = {
  ...palette,
  primary: palette.lime500,
  secondary: palette.grey700,
  success: palette.emerald400,
  background: palette.black,
  surface: palette.darkBlue,
  error: palette.red500,
  warning: palette.amber,
  cyan: palette.cyan,
  textPrimary: palette.white,
  textSecondary: palette.grey400,
  border: palette.grey800,
  overlay: 'rgba(0,0,0,0.5)',
  transparent: 'transparent',
  withOpacity,
};

export const lightColors = {
  ...palette,
  primary: palette.lime500,
  secondary: palette.grey300,
  success: palette.green500,
  background: palette.white,
  surface: palette.grey100,
  error: palette.red500,
  textPrimary: palette.black,
  textSecondary: palette.grey600,
  border: palette.grey300,
  overlay: 'rgba(0,0,0,0.5)',
  transparent: 'transparent',
  withOpacity,
};

export const colors = darkColors;
export type ColorTheme = typeof darkColors;
