import { StyleSheet } from 'react-native';
import { ThemeType } from '../../../theme';

export const createStyles = (theme: ThemeType) => StyleSheet.create({
  cardContent: {
    flex: 1,
  },
  cardDescription: {
    color: theme.colors.textSecondary,
    fontSize: 13,
    lineHeight: 18,
    marginTop: 2,
  },
  cardTitle: {
    color: theme.colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
  container: {
    backgroundColor: theme.colors.background,
    flex: 1,
    padding: 24,
  },
  footer: {
    marginBottom: 40,
    marginTop: 'auto',
  },
  iconContainer: {
    alignItems: 'center',
    borderRadius: 12,
    height: 40,
    justifyContent: 'center',
    marginRight: 12,
    width: 40,
  },
  selectedCard: {
    borderColor: theme.colors.primary,
    borderWidth: 2,
  },
  styleCard: {
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: 20,
    flexDirection: 'row',
    marginBottom: 12,
    padding: 12,
  },
  styleSelectionContainer: {
    marginTop: 20,
  },
  subtitle: {
    color: theme.colors.textSecondary,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 32,
  },
  title: {
    color: theme.colors.textPrimary,
    fontSize: 32,
    fontWeight: '900',
    marginBottom: 12,
  },
});
