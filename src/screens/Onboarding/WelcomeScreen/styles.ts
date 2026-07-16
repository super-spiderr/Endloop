import { ThemeType } from '../../../theme';
import { widthScale, heightScale } from '../../../utils/responsive';
import { StyleSheet } from 'react-native';

export const createStyles = (theme: ThemeType) =>
  StyleSheet.create({
    bottomSection: {
      alignItems: 'center',
      marginVertical: heightScale(100),
      width: '100%',
    },
    bottomSpacer: {
      height: heightScale(200),
    },
    confirmedText: {
      color: theme.colors.primary,
      fontSize: widthScale(14),
      fontWeight: '600',
      marginBottom: heightScale(24),
      textTransform: 'uppercase',
    },
    container: {
      alignItems: 'center',
      backgroundColor: theme.colors.background,
      paddingHorizontal: widthScale(20),
    },
    header: {
      backgroundColor: theme.colors.background,
      paddingTop: heightScale(40),
      width: '100%',
      zIndex: 50,
    },
    narrativeContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
    },
    narrativeGap: {
      height: heightScale(350),
    },
    narrativeSpacer: {
      height: heightScale(1600),
    },
    narrativeText: {
      color: theme.colors.textPrimary,
      fontSize: widthScale(24),
      fontWeight: '600',
      textAlign: 'center',
    },
    narrativeTextSub: {
      color: theme.colors.textSecondary,
      fontSize: widthScale(16),
      fontStyle: 'italic',
      marginTop: heightScale(8),
      textAlign: 'center',
    },
    percentIndicator: {
      alignItems: 'center',
      backgroundColor: theme.colors.transparent,
      justifyContent: 'center',
      position: 'absolute',
      right: widthScale(20),
      top: heightScale(10),
      zIndex: 100,
    },
    percentText: {
      color: theme.colors.primary,
      fontSize: widthScale(14),
      fontWeight: 'bold',
      textShadowColor: theme.colors.withOpacity(theme.colors.black, 0.75),
      textShadowOffset: { height: 1, width: 0 },
      textShadowRadius: 2,
    },
    progressBarBackground: {
      backgroundColor: theme.colors.withOpacity(theme.colors.white, 0.1),
      height: heightScale(4),
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
      height: heightScale(2500),
    },
    scrollTease: {
      color: theme.colors.textSecondary,
      fontSize: widthScale(16),
      fontStyle: 'italic',
      marginVertical: heightScale(40),
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
      paddingVertical: heightScale(20),
      width: '100%',
    },
    subtitle: {
      color: theme.colors.textSecondary,
      fontSize: widthScale(18),
      lineHeight: heightScale(26),
      marginBottom: heightScale(48),
      textAlign: 'center',
    },
    title: {
      color: theme.colors.textPrimary,
      fontSize: widthScale(32),
      fontWeight: 'bold',
      marginBottom: heightScale(12),
      textAlign: 'center',
    },
    wrapper: {
      flex: 1,
    },
  });
