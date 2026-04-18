import { StyleSheet } from 'react-native';
import { ThemeType } from '../../../theme';

export const createStyles = (theme: ThemeType) =>
  StyleSheet.create({
    analyzingContainer: {
      alignItems: 'center',
      backgroundColor: theme.colors.background,
      flex: 1,
      justifyContent: 'center',
      padding: 24,
    },
    analyzingSubtitle: {
      color: theme.colors.textPrimary,
      marginTop: 12,
    },
    analyzingText: {
      color: theme.colors.textPrimary,
      fontSize: 20,
      fontWeight: '700',
      letterSpacing: 1,
      marginTop: 20,
      textAlign: 'center',
      textTransform: 'uppercase',
    },
    appCard: {
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      borderRadius: 24,
      flexDirection: 'row',
      marginBottom: 16,
      padding: 16,
    },
    appCardSelected: {
      borderColor: theme.colors.primary,
      borderWidth: 2,
    },
    appCardUnselected: {
      borderColor: theme.colors.transparent,
      borderWidth: 2,
    },
    appIcon: {
      borderRadius: 12,
      height: 48,
      width: 48,
    },
    appInfo: {
      flex: 1,
      marginLeft: 16,
    },
    appList: {
      marginTop: 20,
    },
    appName: {
      color: theme.colors.textPrimary,
      fontSize: 18,
      fontWeight: '700',
    },
    appUsage: {
      fontSize: 14,
      marginTop: 2,
    },
    container: {
      backgroundColor: theme.colors.background,
      flex: 1,
      padding: 24,
    },
    footerContainer: {
      paddingBottom: 40,
      paddingTop: 20,
    },
    limitText: {
      color: theme.colors.primary,
      fontSize: 13,
      fontWeight: '700',
    },
    modalButtons: {
      flexDirection: 'row',
      marginTop: 8,
    },
    modalCancelButton: {
      flex: 1,
      marginRight: 8,
    },
    modalCol: {
      flex: 1,
    },
    modalInputLabel: {
      color: theme.colors.textSecondary,
      fontSize: 14,
      marginBottom: 8,
    },
    modalInputRow: {
      flexDirection: 'row',
      gap: 16,
      marginBottom: 32,
    },
    modalTitle: {
      color: theme.colors.textPrimary,
      fontSize: 24,
      fontWeight: '900',
      marginBottom: 24,
      textAlign: 'center',
    },
    modalView: {
      backgroundColor: theme.colors.surface,
      borderRadius: 32,
      elevation: 10,
      padding: 32,
      shadowOffset: { height: 10, width: 0 },
      shadowOpacity: 0.25,
      shadowRadius: 20,
    },
    overlay: {
      backgroundColor: theme.colors.overlay,
      flex: 1,
      justifyContent: 'center',
      padding: 24,
    },
    restrictButton: {
      height: 40,
      width: 100,
    },
    skipButton: {
      marginTop: 12,
    },
    subtitle: {
      color: theme.colors.textSecondary,
      fontSize: 16,
      lineHeight: 24,
      marginBottom: 32,
    },
    title: {
      color: theme.colors.textPrimary,
      fontSize: 32,
      fontWeight: '900',
      marginBottom: 12,
    },
  });
