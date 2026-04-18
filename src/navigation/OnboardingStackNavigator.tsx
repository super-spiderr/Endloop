import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  WelcomeScreen,
  PermissionScreen,
  ProfileSurveyScreen,
  InitialRoastScreen,
  SetLimitsScreen,
  RoastStyleScreen,
  AllDoneScreen,
} from '../screens/Onboarding';
import { OnboardingStackParamList } from './types';

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

export const OnboardingStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Permission" component={PermissionScreen} />
      <Stack.Screen name="ProfileSurvey" component={ProfileSurveyScreen} />
      <Stack.Screen name="InitialRoast" component={InitialRoastScreen} />
      <Stack.Screen name="SetLimits" component={SetLimitsScreen} />
      <Stack.Screen name="RoastStyle" component={RoastStyleScreen} />
      <Stack.Screen name="AllDone" component={AllDoneScreen} />
    </Stack.Navigator>
  );
};
