import { StyleSheet } from 'react-native';
import { ThemeType } from '../../../theme';

export const createStyles = (_theme: ThemeType) => StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
