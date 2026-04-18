import { StyleSheet } from 'react-native';
import { ThemeType } from '../../../theme';

export const createStyles = (theme: ThemeType) =>
  StyleSheet.create({
    appCategory: {
      color: theme.colors.textSecondary,
      fontSize: 14,
    },
    appHeaderRow: {
      alignItems: 'center',
      flexDirection: 'row',
      marginBottom: 8,
    },
    appIconTitle: {
      borderRadius: 12,
      height: 48,
      marginRight: 16,
      width: 48,
    },
    appInfo: {
      flex: 1,
    },
    appName: {
      color: theme.colors.white,
      flex: 1,
      fontSize: 32,
      fontWeight: 'bold',
    },
    barContainer: {
      backgroundColor: theme.colors.withOpacity(theme.colors.white, 0.05),
      borderRadius: 4,
      flex: 1,
      height: 120,
      justifyContent: 'flex-end',
      overflow: 'hidden',
      width: 12,
    },
    barFill: {
      borderRadius: 4,
      width: '100%',
    },
    barLabel: {
      color: theme.colors.textSecondary,
      fontSize: 10,
      marginTop: 8,
      textAlign: 'center',
    },
    barWrapper: {
      alignItems: 'center',
      flex: 1,
    },
    chartContainer: {
      alignItems: 'flex-end',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
      paddingHorizontal: 12,
    },
    chartSection: {
      backgroundColor: theme.colors.withOpacity(theme.colors.white, 0.03),
      borderRadius: 24,
      marginTop: 32,
      padding: 24,
    },
    container: {
      backgroundColor: theme.colors.background,
      flex: 1,
    },
    currentUsageBadge: {
      backgroundColor: theme.colors.withOpacity(theme.colors.primary, 0.1),
      borderRadius: 12,
      paddingHorizontal: 12,
      paddingVertical: 6,
    },
    currentUsageText: {
      color: theme.colors.primary,
      fontSize: 14,
      fontWeight: 'bold',
    },
    header: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
      paddingHorizontal: 24,
    },
    scrollContent: {
      paddingBottom: 40,
    },
    sectionTitle: {
      color: theme.colors.textSecondary,
      fontSize: 12,
      fontWeight: 'bold',
      letterSpacing: 2,
    },
    statCard: {
      alignItems: 'center',
      backgroundColor: theme.colors.withOpacity(theme.colors.white, 0.03),
      borderRadius: 24,
      flex: 1,
      marginHorizontal: 4,
      padding: 20,
    },
    statIcon: {
      marginBottom: 12,
    },
    statLabel: {
      color: theme.colors.textSecondary,
      fontSize: 10,
      fontWeight: 'bold',
      letterSpacing: 1,
      marginTop: 4,
    },
    statValue: {
      color: theme.colors.white,
      fontSize: 20,
      fontWeight: '900',
    },
    statsGrid: {
      flexDirection: 'row',
      marginTop: 16,
      paddingHorizontal: 20,
    },
    summaryCard: {
      alignItems: 'flex-start',
      backgroundColor: theme.colors.withOpacity(theme.colors.error, 0.05),
      borderRadius: 24,
      flexDirection: 'row',
      marginHorizontal: 16,
      marginTop: 32,
      padding: 24,
    },
    summaryContent: {
      flex: 1,
      marginLeft: 16,
    },
    summaryText: {
      color: theme.colors.withOpacity(theme.colors.white, 0.6),
      fontSize: 14,
      lineHeight: 22,
    },
    summaryTitle: {
      color: theme.colors.error,
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 8,
    },
  });
