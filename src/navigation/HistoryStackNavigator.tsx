import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HistoryScreen, StreakScreen } from '../screens/History';
import { HistoryStackParamList } from './types';

const Stack = createNativeStackNavigator<HistoryStackParamList>();

export const HistoryStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HistoryScreen" component={HistoryScreen} />
      <Stack.Screen name="Streak" component={StreakScreen} />
    </Stack.Navigator>
  );
};
