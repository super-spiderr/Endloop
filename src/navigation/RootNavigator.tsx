import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OnboardingStackNavigator } from './OnboardingStackNavigator';
import { TabNavigator } from './TabNavigator';
import { SplashScreen } from '../screens/Onboarding';
import { RootStackParamList } from './types';
import { RoastNotificationModal, PermissionReminderModal } from '../screens/Modals';
import { ShareRoastScreen } from '../screens/Home/ShareRoastScreen/ShareRoastScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Group>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingStackNavigator} />
        <Stack.Screen name="App" component={TabNavigator} />
        <Stack.Screen name="ShareRoastScreen" component={ShareRoastScreen} />
      </Stack.Group>
      
      <Stack.Group screenOptions={{ 
        presentation: 'containedTransparentModal',
        animation: 'slide_from_bottom',
      }}>
        <Stack.Screen name="RoastNotificationModal" component={RoastNotificationModal} />
        <Stack.Screen name="PermissionReminderModal" component={PermissionReminderModal} />
      </Stack.Group>
    </Stack.Navigator>
  );
};
