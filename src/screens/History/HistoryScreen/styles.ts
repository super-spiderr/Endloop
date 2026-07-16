import { StyleSheet } from 'react-native';
import { ThemeType } from '../../../theme';
import { widthScale, heightScale } from '../../../utils/responsive';

export const createStyles = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
      flex: 1,
    },
    emptyFeedContainer: {
      alignItems: 'center',
      paddingVertical: heightScale(40),
    },
    emptyFeedText: {
      color: theme.colors.textSecondary,
      fontSize: widthScale(16),
    },
    feedContainer: {
      flex: 1,
      paddingHorizontal: widthScale(24),
    },
    filterChip: {
      backgroundColor: theme.colors.withOpacity(theme.colors.white, 0.05),
      borderRadius: widthScale(12),
      marginRight: widthScale(8),
      paddingHorizontal: widthScale(16),
      paddingVertical: heightScale(10),
    },
    filterChipActive: {
      backgroundColor: theme.colors.primary,
    },
    filterContainer: {
      paddingVertical: heightScale(24),
    },
    filterScroll: {
      paddingHorizontal: widthScale(24),
    },
    filterText: {
      color: theme.colors.textSecondary,
      fontSize: widthScale(14),
      fontWeight: '700',
    },
    filterTextActive: {
      color: theme.colors.black,
    },
    header: {
      paddingBottom: heightScale(24),
      paddingHorizontal: widthScale(24),
      paddingTop: heightScale(20),
    },
    listContent: {
      paddingBottom: heightScale(40),
    },
    roastApp: {
      color: theme.colors.primary,
      fontSize: widthScale(12),
      fontWeight: '700',
      marginTop: heightScale(8),
    },
    roastDate: {
      color: theme.colors.textSecondary,
      fontSize: widthScale(11),
      fontWeight: '600',
    },
    roastHeader: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: heightScale(12),
    },
    roastItem: {
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.withOpacity(theme.colors.white, 0.05),
      borderRadius: widthScale(24),
      borderWidth: 1,
      marginBottom: heightScale(12),
      padding: widthScale(20),
    },
    roastTag: {
      backgroundColor: theme.colors.withOpacity(theme.colors.error, 0.1),
      borderRadius: widthScale(6),
      paddingHorizontal: widthScale(8),
      paddingVertical: heightScale(4),
    },
    roastTagText: {
      color: theme.colors.error,
      fontSize: widthScale(10),
      fontWeight: '800',
    },
    roastText: {
      color: theme.colors.textPrimary,
      fontSize: widthScale(15),
      fontStyle: 'italic',
      lineHeight: heightScale(20),
    },
    sectionTitle: {
      color: theme.colors.textSecondary,
      fontSize: widthScale(12),
      fontWeight: '700',
      letterSpacing: 1.5,
      marginBottom: heightScale(16),
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
      fontSize: widthScale(10),
      fontWeight: '600',
      marginBottom: heightScale(4),
    },
    statMiniIcon: {
      marginRight: widthScale(4),
    },
    statValue: {
      color: theme.colors.textPrimary,
      fontSize: widthScale(16),
      fontWeight: '800',
    },
    streakCard: {
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.withOpacity(theme.colors.white, 0.05),
      borderRadius: widthScale(32),
      borderWidth: 1,
      marginHorizontal: widthScale(24),
      overflow: 'hidden',
      padding: widthScale(24),
    },
    streakDays: {
      color: theme.colors.primary,
      fontFamily: theme.typography.hero.regular,
      fontSize: widthScale(24),
      marginLeft: widthScale(8),
      marginTop: heightScale(20),
    },
    streakHeader: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: heightScale(20),
    },
    streakLabel: {
      color: theme.colors.textSecondary,
      fontSize: widthScale(12),
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
      fontSize: widthScale(64),
    },
    streakStats: {
      borderTopColor: theme.colors.withOpacity(theme.colors.white, 0.05),
      borderTopWidth: 1,
      flexDirection: 'row',
      gap: widthScale(24),
      marginTop: heightScale(20),
      paddingTop: heightScale(20),
    },
    title: {
      color: theme.colors.textPrimary,
      fontFamily: theme.typography.display.bold,
      fontSize: widthScale(28),
    },
  });
