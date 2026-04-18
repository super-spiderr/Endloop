import { createMMKV } from 'react-native-mmkv';

export const storage = createMMKV();

const KEYS = {
  HAS_LAUNCHED: 'HAS_LAUNCHED',
  ROAST_STYLE: 'ROAST_STYLE',
  USER_NAME: 'USER_NAME',
};

export const getHasLaunched = (): boolean => {
  return storage.getBoolean(KEYS.HAS_LAUNCHED) ?? false;
};

export const setHasLaunched = (value: boolean): void => {
  storage.set(KEYS.HAS_LAUNCHED, value);
};

export const getRoastStyle = (): string => {
  return storage.getString(KEYS.ROAST_STYLE) ?? 'savage';
};

export const setRoastStyle = (value: string): void => {
  storage.set(KEYS.ROAST_STYLE, value);
};

export const getUserName = (): string => {
  return storage.getString(KEYS.USER_NAME) ?? 'Stranger';
};

export const setUserName = (value: string): void => {
  storage.set(KEYS.USER_NAME, value);
};
