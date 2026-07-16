import { StyleSheet } from 'react-native';
import { ThemeType } from '../../../theme';
import { widthScale, heightScale } from '../../../utils/responsive';

export const createStyles = (theme: ThemeType) => StyleSheet.create({
  actionContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: widthScale(12),
  },
  addButtonText: {
    color: theme.colors.black,
    fontSize: widthScale(16),
    fontWeight: 'bold',
  },
  appIcon: {
    borderRadius: widthScale(12),
    height: widthScale(40),
    width: widthScale(40),
  },
  appIconContainer: {
    alignItems: 'center',
    backgroundColor: theme.colors.withOpacity(theme.colors.white, 0.05),
    borderRadius: widthScale(16),
    height: widthScale(56),
    justifyContent: 'center',
    width: widthScale(56),
  },
  appIconPlaceholder: {
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    borderRadius: widthScale(12),
    height: widthScale(40),
    justifyContent: 'center',
    width: widthScale(40),
  },
  appIconText: {
    color: theme.colors.black,
    fontSize: widthScale(18),
    fontWeight: 'bold',
  },
  appName: {
    color: theme.colors.textPrimary,
    fontSize: widthScale(18),
    fontWeight: '700',
    marginBottom: heightScale(4),
  },
  container: {
    backgroundColor: theme.colors.background,
    flex: 1,
  },
  emptyContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: widthScale(40),
  },
  emptyText: {
    color: theme.colors.textSecondary,
    fontSize: widthScale(16),
    lineHeight: heightScale(24),
    marginBottom: heightScale(32),
    textAlign: 'center',
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: heightScale(24),
    paddingHorizontal: widthScale(24),
    paddingTop: heightScale(20),
  },
  infoContainer: {
    flex: 1,
    marginLeft: widthScale(16),
  },
  limitItem: {
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.withOpacity(theme.colors.white, 0.05),
    borderRadius: widthScale(24),
    borderWidth: 1,
    flexDirection: 'row',
    marginBottom: heightScale(16),
    padding: widthScale(16),
  },
  limitItemPaused: {
    opacity: 0.6,
  },
  limitText: {
    color: theme.colors.primary,
    fontSize: widthScale(14),
    fontWeight: '600',
  },
  listContent: {
    paddingBottom: heightScale(40),
    paddingHorizontal: widthScale(24),
  },
  plusButton: {
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    borderRadius: widthScale(16),
    height: widthScale(48),
    justifyContent: 'center',
    width: widthScale(48),
  },
  statusText: {
    color: theme.colors.textSecondary,
    fontSize: widthScale(12),
    marginTop: heightScale(2),
  },
  title: {
    color: theme.colors.textPrimary,
    fontSize: widthScale(28),
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  toggleActive: {
    backgroundColor: theme.colors.primary,
  },
  toggleContainer: {
    backgroundColor: theme.colors.withOpacity(theme.colors.white, 0.1),
    borderRadius: widthScale(20),
    padding: widthScale(2),
    width: widthScale(44),
  },
  toggleKnob: {
    backgroundColor: theme.colors.white,
    borderRadius: widthScale(9),
    height: widthScale(18),
    width: widthScale(18),
  },
  toggleKnobActive: {
    alignSelf: 'flex-end',
  },
});
