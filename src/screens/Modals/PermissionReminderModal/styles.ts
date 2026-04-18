import { StyleSheet } from 'react-native';
import { ThemeType } from '../../../theme';

export const createStyles = (theme: ThemeType) => StyleSheet.create({
  actionContainer: {
    marginTop: 32,
    width: '100%',
  },
  backdrop: {
    alignItems: 'center',
    backgroundColor: theme.colors.overlay,
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.withOpacity(theme.colors.white, 0.1),
    borderRadius: 32,
    borderWidth: 1,
    padding: 32,
    width: '100%',
  },
  description: {
    color: theme.colors.textSecondary,
    fontSize: 16,
    lineHeight: 24,
    marginTop: 16,
    textAlign: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 8,
  },
  iconContainer: {
    alignItems: 'center',
    backgroundColor: theme.colors.withOpacity(theme.colors.error, 0.1),
    borderRadius: 24,
    height: 80,
    justifyContent: 'center',
    marginBottom: 24,
    width: 80,
  },
  secondaryButton: {
    marginTop: 12,
  },
  title: {
    color: theme.colors.textPrimary,
    fontSize: 24,
    fontWeight: '900',
    textAlign: 'center',
  },
});
