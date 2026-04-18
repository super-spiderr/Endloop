import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { ThemeType } from '../../../theme';

export const createStyles = (theme: ThemeType) =>
  StyleSheet.create({
    actionContainer: {
      gap: 12,
      marginTop: 'auto',
      width: '100%',
    } as ViewStyle,
    appName: {
      color: theme.colors.textPrimary,
      fontFamily: theme.typography.display.bold,
      fontSize: 24,
      letterSpacing: 1,
    } as TextStyle,
    backdrop: {
      backgroundColor: theme.colors.overlay,
      flex: 1,
      justifyContent: 'center',
      padding: 24,
    } as ViewStyle,
    body: {
      alignItems: 'center',
      flex: 1,
      padding: 24,
      paddingTop: 12,
    } as ViewStyle,
    card: {
      backgroundColor: theme.colors.background,
      borderRadius: 32,
      height: 600,
      overflow: 'hidden',
      width: '100%',
    } as ViewStyle,
    detailsContainer: {
      alignItems: 'center',
      marginBottom: 20,
    } as ViewStyle,
    hazardStrip: {
      backgroundColor: theme.colors.withOpacity(theme.colors.white, 0.2),
      height: 2,
      width: 40,
    },
    headerContent: {
      alignItems: 'center',
      flex: 1,
      flexDirection: 'row',
      gap: 16,
      justifyContent: 'center',
    } as ViewStyle,
    headerGradient: {
      height: 70,
      width: '100%',
    } as ViewStyle,
    label: {
      color: theme.colors.white,
      fontFamily: theme.typography.mono.medium,
      fontSize: 12,
      letterSpacing: 3,
    } as TextStyle,
    mascot: {
      height: 180,
      resizeMode: 'contain',
      width: 180,
    } as ImageStyle,
    mascotContainer: {
      marginVertical: 10,
    } as ViewStyle,
    metaText: {
      color: theme.colors.error,
      fontFamily: theme.typography.mono.medium,
      fontSize: 12,
      letterSpacing: 2,
    } as TextStyle,
    roastBubble: {
      backgroundColor: theme.colors.surface,
      borderRadius: 20,
      marginTop: 20,
      padding: 20,
      width: '100%',
    } as ViewStyle,
    roastText: {
      color: theme.colors.textPrimary,
      fontFamily: theme.typography.body.medium,
      fontSize: 18,
      fontStyle: 'italic',
      lineHeight: 26,
      textAlign: 'center',
    } as TextStyle,
    timeBadge: {
      backgroundColor: theme.colors.withOpacity(theme.colors.error, 0.1),
      borderColor: theme.colors.error,
      borderRadius: 20,
      borderWidth: 1,
      marginTop: 8,
      paddingHorizontal: 12,
      paddingVertical: 4,
    } as ViewStyle,
  });
