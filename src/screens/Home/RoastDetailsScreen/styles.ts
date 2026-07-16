import { StyleSheet } from 'react-native';
import { ThemeType } from '../../../theme';
import { widthScale, heightScale, SCREEN_HEIGHT } from '../../../utils/responsive';

export const createStyles = (theme: ThemeType) =>
  StyleSheet.create({
    closeButton: {
      left: widthScale(20),
      padding: widthScale(10),
      position: 'absolute',
      top: heightScale(20),
      zIndex: 10,
    },
    container: {
      backgroundColor: theme.colors.background,
      flex: 1,
      paddingHorizontal: widthScale(24),
      paddingTop: heightScale(60),
    },
    content: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
    },
    dismissButton: {
      marginTop: heightScale(24),
      paddingVertical: heightScale(12),
    },
    dismissText: {
      color: theme.colors.withOpacity(theme.colors.white, 0.4),
      fontSize: widthScale(14),
      fontWeight: '600',
      textAlign: 'center',
      textTransform: 'uppercase',
    },
    footer: {
      marginBottom: heightScale(40),
      width: '100%',
    },
    headerLabel: {
      color: theme.colors.textSecondary,
      fontFamily: theme.typography.mono.medium,
      fontSize: widthScale(10),
      letterSpacing: 3,
    },
    mascot: {
      height: heightScale(100),
      marginBottom: heightScale(20),
      resizeMode: 'contain',
      width: widthScale(100),
    },
    metaContainer: {
      alignSelf: 'stretch',
      marginTop: heightScale(40),
    },
    metaLabel: {
      color: theme.colors.textSecondary,
      fontFamily: theme.typography.mono.medium,
      fontSize: widthScale(10),
      letterSpacing: 2,
    },
    metaRow: {
      alignItems: 'center',
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: theme.colors.withOpacity(theme.colors.white, 0.1),
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: heightScale(16),
    },
    metaValue: {
      color: theme.colors.white,
      fontFamily: theme.typography.mono.medium,
      fontSize: widthScale(14),
    },
    roastHeader: {
      alignItems: 'center',
      marginBottom: heightScale(60),
    },
    roastText: {
      color: theme.colors.white,
      fontFamily: theme.typography.body.italic,
      fontSize: SCREEN_HEIGHT < 700 ? widthScale(32) : widthScale(40),
      lineHeight: SCREEN_HEIGHT < 700 ? heightScale(38) : heightScale(48),
      textAlign: 'center',
    },
  });
