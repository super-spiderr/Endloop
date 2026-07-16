import { ThemeType } from '../../../theme';
import { widthScale, heightScale } from '../../../utils/responsive';
import { StyleSheet } from 'react-native';

export const createStyles = (theme: ThemeType) =>
  StyleSheet.create({
    appCard: {
      backgroundColor: theme.colors.withOpacity(theme.colors.white, 0.05),
      borderRadius: widthScale(16),
      padding: widthScale(12),
      width: '100%',
    },
    appCardContainer: {
      marginBottom: heightScale(8),
      width: '100%',
    },
    appCardHeader: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    appCardIcon: {
      borderRadius: widthScale(8),
      height: widthScale(24),
      width: widthScale(24),
    },
    appCardIconText: {
      color: theme.colors.white,
      fontSize: widthScale(10),
      fontWeight: 'bold',
    },
    appCardInfo: {
      flex: 1,
      marginLeft: widthScale(10),
    },
    appCardLimit: {
      color: theme.colors.textSecondary,
      fontSize: widthScale(9),
      marginTop: heightScale(2),
      textAlign: 'right',
    },
    appCardName: {
      color: theme.colors.textPrimary,
      fontSize: widthScale(13),
      fontWeight: '600',
    },
    appCardProgressBar: {
      backgroundColor: theme.colors.withOpacity(theme.colors.white, 0.05),
      borderRadius: widthScale(2),
      height: heightScale(3),
      overflow: 'hidden',
      width: widthScale(60),
    },
    appCardProgressContainer: {
      alignItems: 'flex-end',
      marginLeft: 'auto',
    },
    appCardProgressFill: {
      borderRadius: widthScale(2),
      height: '100%',
    },
    appCardUsage: {
      color: theme.colors.textSecondary,
      fontSize: widthScale(11),
    },
    appCardsVertical: {
      width: '100%',
    },
    appIconPlaceholder: {
      alignItems: 'center',
      backgroundColor: theme.colors.primary,
      borderRadius: widthScale(8),
      height: widthScale(24),
      justifyContent: 'center',
      width: widthScale(24),
    },
    container: {
      backgroundColor: theme.colors.background,
      flex: 1,
    },
    contentBody: {
      flex: 1,
      justifyContent: 'space-between',
      paddingBottom: heightScale(20),
    },
    emptyRoastHeader: {
      alignItems: 'center',
      flexDirection: 'row',
      minHeight: heightScale(60),
      paddingLeft: widthScale(85), // Space for the mascot
    },
    emptyRoastLabel: {
      color: theme.colors.primary,
      fontFamily: theme.typography.mono.medium,
      fontSize: widthScale(10),
      letterSpacing: 1.5,
      textTransform: 'uppercase',
    },
    emptyRoastMascot: {
      height: heightScale(120),
      left: widthScale(-25),
      marginRight: 0,
      position: 'absolute',
      resizeMode: 'contain',
      top: 0,
      width: widthScale(120),
    },
    emptyRoastPlaceholder: {
      backgroundColor: theme.colors.withOpacity(theme.colors.white, 0.03),
      borderColor: theme.colors.withOpacity(theme.colors.white, 0.08),
      borderRadius: widthScale(28),
      marginHorizontal: widthScale(16),
      minHeight: heightScale(140),
      padding: widthScale(2),
    },
    emptyRoastText: {
      color: theme.colors.white,
      fontFamily: theme.typography.body.italic,
      fontSize: widthScale(14),
      lineHeight: heightScale(20),
    },
    fadeInView: { alignItems: 'center', flexDirection: 'row', gap: 10 },
    greetingText: {
      color: theme.colors.textPrimary,
      fontFamily: theme.typography.display.bold,
      fontSize: widthScale(20),
    },
    header: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingBottom: heightScale(10),
      paddingHorizontal: widthScale(20),
      paddingTop: heightScale(40),
      width: '100%',
    },
    headerLabels: {
      flex: 1,
    },
    heroContainer: {
      alignItems: 'center',
      marginVertical: heightScale(10),
      paddingHorizontal: widthScale(24),
    },
    heroHeader: {
      alignItems: 'center',
    },
    heroLabel: {
      color: theme.colors.primary,
      fontFamily: theme.typography.mono.medium,
      fontSize: widthScale(10),
      letterSpacing: 1.2,
      marginTop: heightScale(2),
      opacity: 0.9,
      textAlign: 'center',
    },
    heroTimeLarge: {
      color: theme.colors.white,
      fontFamily: theme.typography.hero.regular,
      fontSize: widthScale(84), // Squada One is condensed, so it can be even larger
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
      borderRadius: widthScale(20),
      borderWidth: 1,
      padding: widthScale(16),
    },
    roastPreviewContainer: {
      marginVertical: heightScale(10),
      paddingHorizontal: widthScale(16),
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
      fontSize: widthScale(9),
      letterSpacing: 1,
      textTransform: 'uppercase',
    },
    roastPreviewMascot: {
      height: heightScale(60),
      marginRight: widthScale(12),
      resizeMode: 'contain',
      width: widthScale(60),
    },
    roastPreviewMeta: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: heightScale(2),
    },
    roastPreviewTime: {
      color: theme.colors.textSecondary,
      fontFamily: theme.typography.mono.regular,
      fontSize: widthScale(9),
    },
    roastPreviewTitle: {
      color: theme.colors.white,
      fontFamily: theme.typography.body.italic,
      fontSize: widthScale(14),
      lineHeight: heightScale(18),
    },
    sectionTitle: {
      color: theme.colors.textSecondary,
      fontFamily: theme.typography.mono.medium,
      fontSize: widthScale(10),
      letterSpacing: 1.5,
      marginBottom: heightScale(10),
      textTransform: 'uppercase',
    },

    streakBadge: {
      alignItems: 'center',
      backgroundColor: theme.colors.withOpacity(theme.colors.white, 0.04),
      borderColor: theme.colors.withOpacity(theme.colors.white, 0.08),
      borderRadius: widthScale(20),
      borderWidth: 1,
      flexDirection: 'row',
      paddingHorizontal: widthScale(12),
      paddingVertical: heightScale(6),
    },
    streakCount: {
      color: theme.colors.primary,
      fontFamily: theme.typography.mono.medium,
      fontSize: widthScale(16),
      marginLeft: widthScale(6),
    },
    tipContainer: {
      marginTop: 0,
      paddingLeft: widthScale(85), // Align text with the label above
    },
    tipTitle: {
      color: theme.colors.textSecondary,
      fontFamily: theme.typography.mono.medium,
      fontSize: widthScale(10),
      letterSpacing: 2,
      marginBottom: heightScale(8),
    },
    usageContainer: {
      paddingHorizontal: widthScale(16),
    },
  });
