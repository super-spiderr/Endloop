import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: NavigatorScreenParams<OnboardingStackParamList>;
  App: NavigatorScreenParams<TabParamList>;
};

export type OnboardingStackParamList = {
  Welcome: undefined;
  Permission: undefined;
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
  RoastDetails: { roastId: string };
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

// Required by React Navigation for global type augmentation — see:
// https://reactnavigation.org/docs/typescript#specifying-default-types
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-empty-object-type */
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
/* eslint-enable @typescript-eslint/no-namespace */
/* eslint-enable @typescript-eslint/no-empty-object-type */

