import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeStackNavigator } from './HomeStackNavigator';
import { HistoryStackNavigator } from './HistoryStackNavigator';
import { LimitsStackNavigator } from './LimitsStackNavigator';
import { TabParamList } from './types';
import { Icon, IconName } from '../components';
import { useTheme } from '../theme';

const Tab = createBottomTabNavigator<TabParamList>();

const TabIcon = ({ name, color, size }: { name: IconName; color: string; size: number }) => (
  <Icon name={name} color={color} size={size} />
);

const HomeIcon = (props: { color: string; size: number }) => <TabIcon name="Home" {...props} />;
const LimitsIcon = (props: { color: string; size: number }) => <TabIcon name="Shield" {...props} />;
const HistoryIcon = (props: { color: string; size: number }) => <TabIcon name="History" {...props} />;

export const TabNavigator = () => {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          borderTopColor: theme.colors.border,
        },
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: HomeIcon,
        }}
      />
      <Tab.Screen
        name="LimitsStack"
        component={LimitsStackNavigator}
        options={{
          tabBarLabel: 'Active Files',
          tabBarIcon: LimitsIcon,
        }}
      />
      <Tab.Screen
        name="HistoryStack"
        component={HistoryStackNavigator}
        options={{
          tabBarLabel: 'History',
          tabBarIcon: HistoryIcon,
        }}
      />
    </Tab.Navigator>
  );
};
