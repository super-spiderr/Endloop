import { NavigatorScreenParams, CompositeNavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: NavigatorScreenParams<OnboardingStackParamList>;
  App: NavigatorScreenParams<TabParamList>;
  RoastNotificationModal: {
    roastText: string;
    appName: string;
    minutesOver: number;
  };
  ShareCardModal: {
    roastText: string;
    appName: string;
  };
  PermissionReminderModal: undefined;
};

export type OnboardingStackParamList = {
  Welcome: undefined;
  Permission: undefined;
  ProfileSurvey: undefined;
  InitialRoast: {
    name: string;
    age: string;
    gender: string;
    usage: string;
  };
  SetLimits: undefined;
  RoastStyle: undefined;
  AllDone: undefined;
};

export type TabParamList = {
  HomeStack: NavigatorScreenParams<HomeStackParamList>;
  HistoryStack: NavigatorScreenParams<HistoryStackParamList>;
  LimitsStack: NavigatorScreenParams<LimitsStackParamList>;
};

export type HomeStackParamList = {
  HomeScreen: undefined;
  AppDetails: { appId: string };
  RoastDetails: { 
    roastId: string;
    roastText: string;
    appName: string;
    minutesOver: number;
    time: string;
  };
};

export type HistoryStackParamList = {
  HistoryScreen: undefined;
  Streak: undefined;
};

export type LimitsStackParamList = {
  LimitsScreen: undefined;
  AddLimit: undefined;
  EditLimit: { limitId: string };
};

// --- COMPOSITE NAVIGATION PROPS ---

export type RootNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export type AppTabNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList>,
  NativeStackNavigationProp<RootStackParamList>
>;

export type HomeNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<HomeStackParamList>,
  AppTabNavigationProp
>;

export type HistoryNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<HistoryStackParamList>,
  AppTabNavigationProp
>;

export type LimitsNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<LimitsStackParamList>,
  AppTabNavigationProp
>;

export type OnboardingNavigationProp = NativeStackNavigationProp<OnboardingStackParamList, 'Welcome'>; // Simplified

// Required by React Navigation for global type augmentation
/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface RootParamList extends RootStackParamList {}
  }
}
/* eslint-enable @typescript-eslint/no-namespace */
