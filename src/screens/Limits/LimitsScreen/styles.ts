import { StyleSheet } from 'react-native';
import { ThemeType } from '../../../theme';

export const createStyles = (theme: ThemeType) => StyleSheet.create({
  actionContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 12,
  },
  addButtonText: {
    color: theme.colors.black,
    fontSize: 16,
    fontWeight: 'bold',
  },
  appIcon: {
    borderRadius: 12,
    height: 40,
    width: 40,
  },
  appIconContainer: {
    alignItems: 'center',
    backgroundColor: theme.colors.withOpacity(theme.colors.white, 0.05),
    borderRadius: 16,
    height: 56,
    justifyContent: 'center',
    width: 56,
  },
  appIconPlaceholder: {
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    borderRadius: 12,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  appIconText: {
    color: theme.colors.black,
    fontSize: 18,
    fontWeight: 'bold',
  },
  appName: {
    color: theme.colors.textPrimary,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  container: {
    backgroundColor: theme.colors.background,
    flex: 1,
  },
  emptyContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  emptyText: {
    color: theme.colors.textSecondary,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 32,
    textAlign: 'center',
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 24,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 16,
  },
  limitItem: {
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.withOpacity(theme.colors.white, 0.05),
    borderRadius: 24,
    borderWidth: 1,
    flexDirection: 'row',
    marginBottom: 16,
    padding: 16,
  },
  limitItemPaused: {
    opacity: 0.6,
  },
  limitText: {
    color: theme.colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  listContent: {
    paddingBottom: 40,
    paddingHorizontal: 24,
  },
  plusButton: {
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    borderRadius: 16,
    height: 48,
    justifyContent: 'center',
    width: 48,
  },
  statusText: {
    color: theme.colors.textSecondary,
    fontSize: 12,
    marginTop: 2,
  },
  title: {
    color: theme.colors.textPrimary,
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  toggleActive: {
    backgroundColor: theme.colors.primary,
  },
  toggleContainer: {
    backgroundColor: theme.colors.withOpacity(theme.colors.white, 0.1),
    borderRadius: 20,
    padding: 2,
    width: 44,
  },
  toggleKnob: {
    backgroundColor: theme.colors.white,
    borderRadius: 9,
    height: 18,
    width: 18,
  },
  toggleKnobActive: {
    alignSelf: 'flex-end',
  },
});
