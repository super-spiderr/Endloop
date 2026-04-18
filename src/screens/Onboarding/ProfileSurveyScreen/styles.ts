import { Dimensions, StyleSheet } from 'react-native';
import { ThemeType } from '../../../theme/ThemeContext';

const { width } = Dimensions.get('window');

export const createStyles = (theme: ThemeType) =>
  StyleSheet.create({
    backButton: {
      flex: 1,
      marginRight: 12,
    },
    buttonGroup: {
      flexDirection: 'row',
      width: '100%',
    },
    container: {
      flex: 1,
      justifyContent: 'space-between',
    },
    contentMask: {
      flex: 1,
      flexDirection: 'row',
      overflow: 'hidden',
    },
    description: {
      color: theme.colors.textSecondary,
      fontSize: 16,
      lineHeight: 24,
      marginBottom: 32,
    },
    footer: {
      padding: 24,
      paddingBottom: 40,
    },
    fullButton: {
      width: '100%',
    },
    nextButton: {
      flex: 2,
    },
    optionButton: {
      borderRadius: 16,
      height: 56,
    },
    optionItem: {
      marginBottom: 12,
      width: '100%',
    },
    optionsGrid: {
      marginTop: 20,
      width: '100%',
    },
    progressContainer: {
      paddingHorizontal: 24,
      paddingTop: 20,
    },
    progressText: {
      color: theme.colors.primary,
      fontSize: 14,
      fontWeight: '700',
      letterSpacing: 1,
      textTransform: 'uppercase',
    },
    question: {
      color: theme.colors.textPrimary,
      fontSize: 32,
      fontWeight: '900',
      marginBottom: 12,
    },
    stepContainer: {
      flex: 1,
      padding: 24,
      width: width,
    },
    stepWrapper: {
      width: width,
    },
  });
