import { StyleSheet, Dimensions } from 'react-native';
import { ThemeType } from '../../../theme';

const { height } = Dimensions.get('window');

export const createStyles = (theme: ThemeType) =>
  StyleSheet.create({
    closeButton: {
      left: 20,
      padding: 10,
      position: 'absolute',
      top: 20,
      zIndex: 10,
    },
    container: {
      backgroundColor: theme.colors.background,
      flex: 1,
      paddingHorizontal: 24,
      paddingTop: 60,
    },
    content: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
    },
    dismissButton: {
      marginTop: 24,
      paddingVertical: 12,
    },
    dismissText: {
      color: theme.colors.withOpacity(theme.colors.white, 0.4),
      fontSize: 14,
      fontWeight: '600',
      textAlign: 'center',
      textTransform: 'uppercase',
    },
    footer: {
      marginBottom: 40,
      width: '100%',
    },
    headerLabel: {
      color: theme.colors.textSecondary,
      fontFamily: theme.typography.mono.medium,
      fontSize: 10,
      letterSpacing: 3,
    },
    mascot: {
      height: 100,
      marginBottom: 20,
      resizeMode: 'contain',
      width: 100,
    },
    metaContainer: {
      alignSelf: 'stretch',
      marginTop: 40,
    },
    metaLabel: {
      color: theme.colors.textSecondary,
      fontFamily: theme.typography.mono.medium,
      fontSize: 10,
      letterSpacing: 2,
    },
    metaRow: {
      alignItems: 'center',
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: theme.colors.withOpacity(theme.colors.white, 0.1),
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 16,
    },
    metaValue: {
      color: theme.colors.white,
      fontFamily: theme.typography.mono.medium,
      fontSize: 14,
    },
    roastHeader: {
      alignItems: 'center',
      marginBottom: 60,
    },
    roastText: {
      color: theme.colors.white,
      fontFamily: theme.typography.body.italic,
      fontSize: height < 700 ? 32 : 40,
      lineHeight: height < 700 ? 38 : 48,
      textAlign: 'center',
    },
  });
