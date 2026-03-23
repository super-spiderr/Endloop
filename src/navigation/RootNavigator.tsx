import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OnboardingStackNavigator } from './OnboardingStackNavigator';
import { TabNavigator } from './TabNavigator';
import { SplashScreen } from '../screens/Onboarding';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingStackNavigator} />
      <Stack.Screen name="App" component={TabNavigator} />
    </Stack.Navigator>
  );
};

