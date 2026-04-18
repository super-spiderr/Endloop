import { StyleSheet } from 'react-native';
import { ThemeType } from '../../../theme';

export const createStyles = (theme: ThemeType) =>
  StyleSheet.create({
    cardDesc: {
      color: theme.colors.textSecondary,
      fontSize: 14,
      lineHeight: 20,
    },
    cardHeader: {
      alignItems: 'flex-start',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    cardSpacer: {
      height: 16,
    },
    cardTitle: {
      color: theme.colors.textPrimary,
      fontSize: 18,
      fontWeight: '700',
      marginBottom: 4,
    },
    container: {
      backgroundColor: theme.colors.background,
      flex: 1,
      padding: 24,
    },
    flexOne: {
      flex: 1,
    },
    grantButton: {
      height: 48,
    },
    percentText: {
      color: theme.colors.primary,
      fontSize: 14,
      fontWeight: 'bold',
      textShadowColor: theme.colors.withOpacity(theme.colors.black, 0.75),
      textShadowOffset: { height: 1, width: 0 },
      textShadowRadius: 2,
    },
    permissionCard: {
      backgroundColor: theme.colors.surface,
      borderRadius: 16,
      padding: 20,
      width: '100%',
    },
    punchCircle: {
      backgroundColor: theme.colors.primary,
      borderRadius: 50,
      height: 100,
      left: '50%',
      marginLeft: -50,
      marginTop: -50,
      position: 'absolute',
      top: '50%',
      width: 100,
      zIndex: 1000,
    },
    spacer: {
      height: 40,
    },
    statusBadge: {
      borderRadius: 12,
      paddingHorizontal: 8,
      paddingVertical: 4,
    },
    statusBadgeActive: {
      backgroundColor: theme.colors.withOpacity(theme.colors.success, 0.1),
    },
    statusBadgeInactive: {
      backgroundColor: theme.colors.withOpacity(theme.colors.error, 0.1),
    },
    statusText: {
      fontSize: 10,
      fontWeight: '800',
      letterSpacing: 0.5,
    },
    subtitle: {
      color: theme.colors.textSecondary,
      fontSize: 16,
      lineHeight: 24,
      marginTop: 8,
    },
    textContainer: {
      flex: 1,
      paddingRight: 16,
    },
    title: {
      color: theme.colors.textPrimary,
      fontSize: 32,
      fontWeight: '800',
      marginTop: 40,
    },
  });
