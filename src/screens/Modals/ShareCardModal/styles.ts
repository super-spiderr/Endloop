import { StyleSheet } from 'react-native';
import { ThemeType } from '../../../theme';

export const createStyles = (theme: ThemeType) =>
  StyleSheet.create({
    actionContainer: {
      gap: 12,
      marginTop: 24,
      width: '100%',
    },
    backdrop: {
      alignItems: 'center',
      backgroundColor: theme.colors.overlay,
      flex: 1,
      justifyContent: 'center',
      padding: 24,
    },
    badge: {
      backgroundColor: theme.colors.withOpacity(theme.colors.error, 0.2),
      borderColor: theme.colors.error,
      borderRadius: 4,
      borderWidth: 1,
      paddingHorizontal: 8,
      paddingVertical: 4,
    },
    badgeText: {
      color: theme.colors.error,
      fontFamily: theme.typography.mono.medium,
      fontSize: 8,
      letterSpacing: 1,
    },
    branding: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: 10,
    },
    brandingName: {
      color: theme.colors.white,
      fontFamily: theme.typography.display.bold,
      fontSize: 14,
      letterSpacing: 2,
    },
    brandingTagline: {
      color: theme.colors.textSecondary,
      fontFamily: theme.typography.mono.regular,
      fontSize: 8,
      letterSpacing: 1,
    },
    card: {
      borderRadius: 32,
      padding: 24,
      width: '100%',
    },
    cardContainer: {
      alignItems: 'center',
      shadowColor: theme.colors.black,
      shadowOffset: { height: 20, width: 0 },
      shadowOpacity: 0.8,
      shadowRadius: 30,
      width: '100%',
    },
    cardFooter: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 32,
    },
    cardHeader: {
      alignItems: 'center',
      borderBottomColor: theme.colors.withOpacity(theme.colors.white, 0.1),
      borderBottomWidth: 1,
      flexDirection: 'row',
      gap: 12,
      marginBottom: 32,
      paddingBottom: 16,
    },
    cardHeaderLabel: {
      color: theme.colors.textSecondary,
      fontFamily: theme.typography.mono.medium,
      fontSize: 10,
      letterSpacing: 2,
    },
    closeButton: {
      alignSelf: 'center',
      marginTop: 24,
      padding: 12,
    },
    closeText: {
      color: theme.colors.textSecondary,
      fontFamily: theme.typography.mono.medium,
      fontSize: 12,
      textTransform: 'uppercase',
    },
    flex1: {
      flex: 1,
    },
    logoIcon: {
      height: 32,
      resizeMode: 'contain',
      width: 32,
    },
    memeContent: {
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 180,
    },
    memeText: {
      color: theme.colors.white,
      fontFamily: theme.typography.body.medium,
      fontSize: 24,
      lineHeight: 34,
      textAlign: 'center',
    },
    quoteMark: {
      color: theme.colors.primary,
      fontFamily: theme.typography.display.extraBold,
      fontSize: 64,
      height: 40,
      opacity: 0.3,
    },
    quoteMarkClose: {
      alignSelf: 'flex-end',
      color: theme.colors.primary,
      fontFamily: theme.typography.display.extraBold,
      fontSize: 64,
      height: 40,
      opacity: 0.3,
    },
    secondaryActionRow: {
      flexDirection: 'row',
      gap: 12,
    },
  });
