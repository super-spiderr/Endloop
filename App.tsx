import { NavigationContainer } from '@react-navigation/native';
import { RootNavigator } from './src/navigation';
import { ThemeProvider } from './src/theme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useEffect } from 'react';
import { monitor } from './src/services/BackgroundMonitor';

export default function App() {
  useEffect(() => {
    // Small delay to ensure native modules and storage are fully ready
    setTimeout(() => {
      void monitor.start();
    }, 1000);
  }, []);

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
