export type RootStackParamList = {
  App: undefined;
  Auth: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type AppStackParamList = {
  Home: undefined;
  Profile: undefined;
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
