import { StyleSheet } from 'react-native';
import { ThemeType } from '../../../theme';

export const createStyles = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
      flex: 1,
    },
    emptyFeedContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyFeedText: {
    color: theme.colors.textSecondary,
    fontSize: 16,
  },
  feedContainer: {
      flex: 1,
      paddingHorizontal: 24,
    },
    filterChip: {
      backgroundColor: theme.colors.withOpacity(theme.colors.white, 0.05),
      borderRadius: 12,
      marginRight: 8,
      paddingHorizontal: 16,
      paddingVertical: 10,
    },
    filterChipActive: {
      backgroundColor: theme.colors.primary,
    },
    filterContainer: {
      paddingVertical: 24,
    },
    filterScroll: {
      paddingHorizontal: 24,
    },
    filterText: {
      color: theme.colors.textSecondary,
      fontSize: 14,
      fontWeight: '700',
    },
    filterTextActive: {
      color: theme.colors.black,
    },
    header: {
      paddingBottom: 24,
      paddingHorizontal: 24,
      paddingTop: 20,
    },
    listContent: {
      paddingBottom: 40,
    },
    roastApp: {
      color: theme.colors.primary,
      fontSize: 12,
      fontWeight: '700',
      marginTop: 8,
    },
    roastDate: {
      color: theme.colors.textSecondary,
      fontSize: 11,
      fontWeight: '600',
    },
    roastHeader: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 12,
    },
    roastItem: {
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.withOpacity(theme.colors.white, 0.05),
      borderRadius: 24,
      borderWidth: 1,
      marginBottom: 12,
      padding: 20,
    },
    roastTag: {
      backgroundColor: theme.colors.withOpacity(theme.colors.error, 0.1),
      borderRadius: 6,
      paddingHorizontal: 8,
      paddingVertical: 4,
    },
    roastTagText: {
      color: theme.colors.error,
      fontSize: 10,
      fontWeight: '800',
    },
    roastText: {
      color: theme.colors.textPrimary,
      fontSize: 15,
      fontStyle: 'italic',
      lineHeight: 20,
    },
    sectionTitle: {
      color: theme.colors.textSecondary,
      fontSize: 12,
      fontWeight: '700',
      letterSpacing: 1.5,
      marginBottom: 16,
      textTransform: 'uppercase',
    },
    statIconRow: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    statItem: {
      flex: 1,
    },
    statLabel: {
      color: theme.colors.textSecondary,
      fontSize: 10,
      fontWeight: '600',
      marginBottom: 4,
    },
    statMiniIcon: {
      marginRight: 4,
    },
    statValue: {
      color: theme.colors.textPrimary,
      fontSize: 16,
      fontWeight: '800',
    },
    streakCard: {
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.withOpacity(theme.colors.white, 0.05),
      borderRadius: 32,
      borderWidth: 1,
      marginHorizontal: 24,
      overflow: 'hidden',
      padding: 24,
    },
    streakDays: {
      color: theme.colors.primary,
      fontFamily: theme.typography.hero.regular,
      fontSize: 24,
      marginLeft: 8,
      marginTop: 20,
    },
    streakHeader: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    streakLabel: {
      color: theme.colors.textSecondary,
      fontSize: 12,
      fontWeight: '700',
      letterSpacing: 1,
      textTransform: 'uppercase',
    },
    streakMain: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    streakNumber: {
      color: theme.colors.primary,
      fontFamily: theme.typography.hero.regular,
      fontSize: 64,
    },
    streakStats: {
      borderTopColor: theme.colors.withOpacity(theme.colors.white, 0.05),
      borderTopWidth: 1,
      flexDirection: 'row',
      gap: 24,
      marginTop: 20,
      paddingTop: 20,
    },
    title: {
      color: theme.colors.textPrimary,
      fontFamily: theme.typography.display.bold,
      fontSize: 28,
    },
  });
