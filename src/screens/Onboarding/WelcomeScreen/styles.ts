import { StyleSheet } from 'react-native';
import { ThemeType } from '../../../theme';

export const createStyles = (theme: ThemeType) =>
  StyleSheet.create({
    bottomSection: {
      alignItems: 'center',
      marginVertical: 100,
      width: '100%',
    },
    bottomSpacer: {
      height: 200,
    },
    confirmedText: {
      color: theme.colors.primary,
      fontSize: 14,
      fontWeight: '600',
      marginBottom: 24,
      textTransform: 'uppercase',
    },
    container: {
      alignItems: 'center',
      backgroundColor: theme.colors.background,
      paddingHorizontal: 20,
    },
    header: {
      backgroundColor: theme.colors.background,
      paddingTop: 40,
      width: '100%',
      zIndex: 50,
    },
    narrativeContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
    },
    narrativeGap: {
      height: 350,
    },
    narrativeSpacer: {
      height: 1600,
    },
    narrativeText: {
      color: theme.colors.textPrimary,
      fontSize: 24,
      fontWeight: '600',
      textAlign: 'center',
    },
    narrativeTextSub: {
      color: theme.colors.textSecondary,
      fontSize: 16,
      fontStyle: 'italic',
      marginTop: 8,
      textAlign: 'center',
    },
    percentIndicator: {
      alignItems: 'center',
      backgroundColor: theme.colors.transparent,
      justifyContent: 'center',
      position: 'absolute',
      right: 20,
      top: 10,
      zIndex: 100,
    },
    percentText: {
      color: theme.colors.primary,
      fontSize: 14,
      fontWeight: 'bold',
      textShadowColor: theme.colors.withOpacity(theme.colors.black, 0.75),
      textShadowOffset: { height: 1, width: 0 },
      textShadowRadius: 2,
    },
    progressBarBackground: {
      backgroundColor: theme.colors.withOpacity(theme.colors.white, 0.1),
      height: 4,
      left: 0,
      position: 'absolute',
      right: 0,
      top: 0,
      zIndex: 101,
    },
    progressBarFill: {
      backgroundColor: theme.colors.primary,
      height: '100%',
    },
    scrollContent: {
      flexGrow: 1,
    },
    scrollSpacer: {
      height: 2500,
    },
    scrollTease: {
      color: theme.colors.textSecondary,
      fontSize: 16,
      fontStyle: 'italic',
      marginVertical: 40,
      opacity: 0.5,
    },
    stackedItem: {
      alignItems: 'center',
      backgroundColor: theme.colors.background,
      justifyContent: 'center',
      left: 0,
      position: 'absolute',
      right: 0,
      top: 0,
      zIndex: 5,
    },
    stickyWrapper: {
      backgroundColor: theme.colors.background,
      paddingVertical: 20,
      width: '100%',
    },
    subtitle: {
      color: theme.colors.textSecondary,
      fontSize: 18,
      lineHeight: 26,
      marginBottom: 48,
      textAlign: 'center',
    },
    title: {
      color: theme.colors.textPrimary,
      fontSize: 32,
      fontWeight: 'bold',
      marginBottom: 12,
      textAlign: 'center',
    },
    wrapper: {
      flex: 1,
    },
  });
