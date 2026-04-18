import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AddLimitScreen, EditLimitScreen } from '../screens/Limits';
import ActiveFilesScreen from '../screens/ActiveFiles';
import { LimitsStackParamList } from './types';

const Stack = createNativeStackNavigator<LimitsStackParamList>();

export const LimitsStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LimitsScreen" component={ActiveFilesScreen} />
      <Stack.Screen name="AddLimit" component={AddLimitScreen} />
      <Stack.Screen name="EditLimit" component={EditLimitScreen} />
    </Stack.Navigator>
  );
};
