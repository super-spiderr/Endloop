import { StyleSheet } from 'react-native';
import { ThemeType } from '../../../theme';

export const createStyles = (theme: ThemeType) =>
  StyleSheet.create({
    appCard: {
      backgroundColor: theme.colors.withOpacity(theme.colors.white, 0.05),
      borderRadius: 16,
      padding: 12,
      width: '100%',
    },
    appCardContainer: {
      marginBottom: 8,
      width: '100%',
    },
    appCardHeader: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    appCardIcon: {
      borderRadius: 8,
      height: 24,
      width: 24,
    },
    appCardIconText: {
      color: theme.colors.white,
      fontSize: 10,
      fontWeight: 'bold',
    },
    appCardInfo: {
      flex: 1,
      marginLeft: 10,
    },
    appCardLimit: {
      color: theme.colors.textSecondary,
      fontSize: 9,
      marginTop: 2,
      textAlign: 'right',
    },
    appCardName: {
      color: theme.colors.textPrimary,
      fontSize: 13,
      fontWeight: '600',
    },
    appCardProgressBar: {
      backgroundColor: theme.colors.withOpacity(theme.colors.white, 0.05),
      borderRadius: 2,
      height: 3,
      overflow: 'hidden',
      width: 60,
    },
    appCardProgressContainer: {
      alignItems: 'flex-end',
      marginLeft: 'auto',
    },
    appCardProgressFill: {
      borderRadius: 2,
      height: '100%',
    },
    appCardUsage: {
      color: theme.colors.textSecondary,
      fontSize: 11,
    },
    appCardsVertical: {
      width: '100%',
    },
    appIconPlaceholder: {
      alignItems: 'center',
      backgroundColor: theme.colors.primary,
      borderRadius: 8,
      height: 24,
      justifyContent: 'center',
      width: 24,
    },
    container: {
      backgroundColor: theme.colors.background,
      flex: 1,
    },
    contentBody: {
      flex: 1,
      justifyContent: 'space-between',
      paddingBottom: 20,
    },
    emptyRoastHeader: {
      alignItems: 'center',
      flexDirection: 'row',
      minHeight: 60,
      paddingLeft: 85, // Space for the mascot
    },
    emptyRoastLabel: {
      color: theme.colors.primary,
      fontFamily: theme.typography.mono.medium,
      fontSize: 10,
      letterSpacing: 1.5,
      textTransform: 'uppercase',
    },
    emptyRoastMascot: {
      height: 120,
      left: -25,
      marginRight: 0,
      position: 'absolute',
      resizeMode: 'contain',
      top: 0,
      width: 120,
    },
    emptyRoastPlaceholder: {
      backgroundColor: theme.colors.withOpacity(theme.colors.white, 0.03),
      borderColor: theme.colors.withOpacity(theme.colors.white, 0.08),
      borderRadius: 28,
      marginHorizontal: 16,
      minHeight: 140,
      padding: 2,
    },
    emptyRoastText: {
      color: theme.colors.white,
      fontFamily: theme.typography.body.italic,
      fontSize: 14,
      lineHeight: 20,
    },
    greetingText: {
      color: theme.colors.textPrimary,
      fontFamily: theme.typography.display.bold,
      fontSize: 20,
    },
    header: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingBottom: 10,
      paddingHorizontal: 20,
      paddingTop: 40,
      width: '100%',
    },
    headerLabels: {
      flex: 1,
    },
    heroContainer: {
      alignItems: 'center',
      marginVertical: 10,
      paddingHorizontal: 24,
    },
    heroHeader: {
      alignItems: 'center',
    },
    heroLabel: {
      color: theme.colors.primary,
      fontFamily: theme.typography.mono.medium,
      fontSize: 10,
      letterSpacing: 1.2,
      marginTop: 2,
      opacity: 0.9,
      textAlign: 'center',
    },
    heroTimeLarge: {
      color: theme.colors.white,
      fontFamily: theme.typography.hero.regular,
      fontSize: 84, // Squada One is condensed, so it can be even larger
      letterSpacing: -1,
      margin: 0,
      padding: 0,
      textAlign: 'center',
    },
    mascotCardWrapper: {
      width: '100%',
    },
    roastPreviewCard: {
      backgroundColor: theme.colors.withOpacity(theme.colors.error, 0.08),
      borderColor: theme.colors.withOpacity(theme.colors.error, 0.15),
      borderRadius: 20,
      borderWidth: 1,
      padding: 16,
    },
    roastPreviewContainer: {
      marginVertical: 10,
      paddingHorizontal: 16,
    },
    roastPreviewHeader: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    roastPreviewHeaderContent: {
      flex: 1,
    },
    roastPreviewLabel: {
      color: theme.colors.error,
      fontFamily: theme.typography.mono.medium,
      fontSize: 9,
      letterSpacing: 1,
      textTransform: 'uppercase',
    },
    roastPreviewMascot: {
      height: 60,
      marginRight: 12,
      resizeMode: 'contain',
      width: 60,
    },
    roastPreviewMeta: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 2,
    },
    roastPreviewTime: {
      color: theme.colors.textSecondary,
      fontFamily: theme.typography.mono.regular,
      fontSize: 9,
    },
    roastPreviewTitle: {
      color: theme.colors.white,
      fontFamily: theme.typography.body.italic,
      fontSize: 14,
      lineHeight: 18,
    },
    sectionTitle: {
      color: theme.colors.textSecondary,
      fontFamily: theme.typography.mono.medium,
      fontSize: 10,
      letterSpacing: 1.5,
      marginBottom: 10,
      textTransform: 'uppercase',
    },

    streakBadge: {
      alignItems: 'center',
      backgroundColor: theme.colors.withOpacity(theme.colors.white, 0.04),
      borderColor: theme.colors.withOpacity(theme.colors.white, 0.08),
      borderRadius: 20,
      borderWidth: 1,
      flexDirection: 'row',
      paddingHorizontal: 12,
      paddingVertical: 6,
    },
    streakCount: {
      color: theme.colors.primary,
      fontFamily: theme.typography.mono.medium,
      fontSize: 16,
      marginLeft: 6,
    },
    tipContainer: {
      marginTop: 0,
      paddingLeft: 85, // Align text with the label above
    },
    tipTitle: {
      color: theme.colors.textSecondary,
      fontFamily: theme.typography.mono.medium,
      fontSize: 10,
      letterSpacing: 2,
      marginBottom: 8,
    },
    usageContainer: {
      paddingHorizontal: 16,
    },
  });
