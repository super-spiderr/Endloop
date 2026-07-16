import { StyleSheet } from 'react-native';
import { ThemeType } from '../../../theme';
import { widthScale, heightScale, SCREEN_WIDTH } from '../../../utils/responsive';

export const createStyles = (theme: ThemeType) =>
  StyleSheet.create({
    actionContainer: {
      gap: widthScale(12),
      marginTop: heightScale(24),
      paddingHorizontal: widthScale(16),
      width: '100%',
    },
    attribution: {
      alignItems: 'center',
      marginTop: heightScale(16),
      opacity: 0.6,
    },
    attributionText: {
      color: theme.colors.textSecondary,
      fontFamily: theme.typography.mono.medium,
      fontSize: widthScale(10),
      letterSpacing: 2,
    },
    badge: {
      backgroundColor: theme.colors.withOpacity(theme.colors.error, 0.1),
      borderColor: theme.colors.withOpacity(theme.colors.error, 0.3),
      borderRadius: widthScale(4),
      borderWidth: 1,
      paddingHorizontal: widthScale(8),
      paddingVertical: heightScale(4),
    },
    badgeText: {
      color: theme.colors.error,
      fontFamily: theme.typography.mono.medium,
      fontSize: widthScale(9),
      letterSpacing: 1,
      textTransform: 'uppercase',
    },
    card: {
      backgroundColor: theme.colors.background,
      borderColor: theme.colors.withOpacity(theme.colors.white, 0.05),
      borderRadius: widthScale(32),
      borderWidth: 1,
      overflow: 'hidden',
      padding: widthScale(32),
    },
    cardContainer: {
      width: '100%',
    },
    cardFooter: {
      alignItems: 'flex-end',
      borderTopColor: theme.colors.withOpacity(theme.colors.white, 0.05),
      borderTopWidth: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: heightScale(40),
      paddingTop: heightScale(24),
    },
    cardHeader: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: heightScale(40),
    },
    cardHeaderLabel: {
      color: theme.colors.primary,
      fontFamily: theme.typography.mono.medium,
      fontSize: widthScale(10),
      letterSpacing: 3,
    },
    closeButton: {
      alignSelf: 'center',
      marginTop: heightScale(20),
      padding: widthScale(12),
    },
    closeText: {
      color: theme.colors.textSecondary,
      fontFamily: theme.typography.mono.medium,
      fontSize: widthScale(12),
      textTransform: 'uppercase',
    },
    container: {
      backgroundColor: theme.colors.background,
      flex: 1,
      justifyContent: 'center',
      paddingVertical: heightScale(20),
    },
    dataLabel: {
      color: theme.colors.textSecondary,
      fontFamily: theme.typography.mono.medium,
      fontSize: widthScale(9),
      letterSpacing: 1,
      marginBottom: heightScale(4),
    },
    dataPoint: {
      flex: 1,
    },
    dataRow: {
      flexDirection: 'row',
      gap: widthScale(24),
      marginTop: heightScale(32),
    },
    dataValue: {
      color: theme.colors.white,
      fontFamily: theme.typography.mono.medium,
      fontSize: widthScale(13),
    },
    flex1: {
      flex: 1,
    },
    glowEffect: {
      backgroundColor: theme.colors.primary,
      borderRadius: widthScale(100),
      height: widthScale(200),
      left: -widthScale(50),
      opacity: 0.1,
      position: 'absolute',
      top: -heightScale(50),
      width: widthScale(200),
    },
    logoContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: widthScale(12),
    },
    logoText: {
      color: theme.colors.white,
      fontFamily: theme.typography.display.bold,
      fontSize: widthScale(18),
      letterSpacing: 4,
    },
    mascotDim: {
      height: widthScale(48),
      opacity: 0.8,
      resizeMode: 'contain',
      width: widthScale(48),
    },
    quoteContainer: {
      minHeight: heightScale(140),
    },
    quoteText: {
      color: theme.colors.white,
      fontFamily: theme.typography.body.italic,
      fontSize: widthScale(28),
      lineHeight: heightScale(38),
    },
    secondaryActionRow: {
      flexDirection: 'row',
      gap: widthScale(12),
      marginTop: heightScale(12),
    },
    viewShot: {
      backgroundColor: theme.colors.background,
      paddingHorizontal: widthScale(20),
      paddingVertical: heightScale(40),
      width: SCREEN_WIDTH,
    },
  });
