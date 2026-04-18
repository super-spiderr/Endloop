import { StyleSheet } from 'react-native';
import { ThemeType } from '../../../theme';

export const createStyles = (theme: ThemeType) => StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  footer: {
    marginTop: 48,
    width: '100%',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  mascotImage: {
    height: 200,
    width: 200,
  },
  subtitle: {
    color: theme.colors.textSecondary,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  title: {
    color: theme.colors.textPrimary,
    fontSize: 40,
    fontWeight: '900',
    marginBottom: 16,
    textAlign: 'center',
  },
});
