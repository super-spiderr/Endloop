import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OnboardingStackNavigator } from './OnboardingStackNavigator';
import { TabNavigator } from './TabNavigator';
import { SplashScreen } from '../screens/Onboarding';
import { RootStackParamList } from './types';
import { RoastNotificationModal, ShareCardModal, PermissionReminderModal } from '../screens/Modals';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Group>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingStackNavigator} />
        <Stack.Screen name="App" component={TabNavigator} />
      </Stack.Group>
      
      <Stack.Group screenOptions={{ 
        presentation: 'containedTransparentModal',
        animation: 'slide_from_bottom',
      }}>
        <Stack.Screen name="RoastNotificationModal" component={RoastNotificationModal} />
        <Stack.Screen name="ShareCardModal" component={ShareCardModal} />
        <Stack.Screen name="PermissionReminderModal" component={PermissionReminderModal} />
      </Stack.Group>
    </Stack.Navigator>
  );
};
