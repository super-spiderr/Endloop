import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { darkColors, lightColors } from './colors';
import { spacing } from './spacing';
import { typography } from './typography';

export type ThemeType = {
  colors: typeof darkColors;
  spacing: typeof spacing;
  typography: typeof typography;
  isDark: boolean;
};

export type ThemeContextType = {
  theme: ThemeType;
  toggleTheme: () => void;
  setTheme: (mode: 'light' | 'dark') => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const deviceColorScheme = useColorScheme();
  const [isDarkState, setIsDarkState] = useState(true);

  useEffect(() => {
    // Keep this for when we want to restore system theme sensing
    // setIsDarkState(deviceColorScheme === 'dark');
  }, [deviceColorScheme]);

  const theme = useMemo(
    () => ({
      // Force dark mode regardless of state or system settings for now
      // eslint-disable-next-line no-constant-condition
      colors: true || isDarkState ? darkColors : lightColors,
      spacing,
      typography,
      isDark: true,
    }),
    [isDarkState]
  );

  const toggleTheme = () => setIsDarkState((prev) => !prev);
  const setTheme = (mode: 'light' | 'dark') => setIsDarkState(mode === 'dark');

  const contextValue = useMemo(() => ({ theme, toggleTheme, setTheme }), [theme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
