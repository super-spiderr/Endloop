import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeStackNavigator } from './HomeStackNavigator';
import { HistoryStackNavigator } from './HistoryStackNavigator';
import { LimitsStackNavigator } from './LimitsStackNavigator';
import { TabParamList } from './types';

const Tab = createBottomTabNavigator<TabParamList>();

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="LimitsStack"
        component={LimitsStackNavigator}
        options={{
          tabBarLabel: 'Limits',
        }}
      />
      <Tab.Screen
        name="HistoryStack"
        component={HistoryStackNavigator}
        options={{
          tabBarLabel: 'History',
        }}
      />
    </Tab.Navigator>
  );
};
