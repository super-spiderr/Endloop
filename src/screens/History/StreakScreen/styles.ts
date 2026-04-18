import { StyleSheet, Dimensions, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { ThemeType } from '../../../theme';

const { width } = Dimensions.get('window');
const COLUMN_COUNT = 7;
const CELL_SIZE = (width - 64) / COLUMN_COUNT;

export const createStyles = (theme: ThemeType) =>
  StyleSheet.create({
    badge: {
      backgroundColor: theme.colors.withOpacity(theme.colors.primary, 0.1),
      borderRadius: 4,
      paddingHorizontal: 6,
      paddingVertical: 2,
    } as ViewStyle,
    badgeText: {
      ...theme.typography.caption,
      color: theme.colors.primary,
      fontSize: 8,
      fontWeight: '900' as const,
    } as TextStyle,
    bar: {
      borderRadius: 4,
      width: 12,
    } as ViewStyle,
    barContainer: {
      alignItems: 'flex-end',
      flexDirection: 'row',
      height: 120,
      justifyContent: 'space-between',
    } as ViewStyle,
    barLabel: {
      ...theme.typography.caption,
      color: theme.colors.textSecondary,
      fontSize: 9,
      marginTop: 8,
    } as TextStyle,
    barWrapper: {
      alignItems: 'center',
      flex: 1,
    } as ViewStyle,

    calendarContainer: {
      padding: 16,
    } as ViewStyle,

    cell: {
      alignItems: 'center',
      borderRadius: 8,
      height: CELL_SIZE,
      justifyContent: 'center',
      margin: 2,
      width: CELL_SIZE,
    } as ViewStyle,
    centered: {},
    chartContainer: {
      marginTop: 32,
      paddingBottom: 40,
      paddingHorizontal: 16,
    } as ViewStyle,
    chartLabelRow: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 16,
    } as ViewStyle,
    container: {
      backgroundColor: theme.colors.background,
      flex: 1,
    } as ViewStyle,
    dialogueContainer: {
      marginTop: 12,
    } as ViewStyle,
    dialogueText: {
      ...theme.typography.body,
      color: theme.colors.textPrimary,
      fontSize: 15,
      fontWeight: '600' as const,
      textAlign: 'center',
    } as TextStyle,
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
    } as ViewStyle,
    loadingText: {},
    mascotImage: {
      height: '60%',
      resizeMode: 'contain',
      width: '60%',
    } as ImageStyle,
    mascotSection: {
      alignItems: 'center',
      backgroundColor: theme.colors.withOpacity(theme.colors.surface, 0.5),
      height: '25%',
      justifyContent: 'center',
      paddingHorizontal: 24,
      width: '100%',
    } as ViewStyle,
    scrollContent: {
      paddingBottom: 120,
    } as ViewStyle,
    sectionTitle: {
      ...theme.typography.h2,
      color: theme.colors.textPrimary,
      fontSize: 18,
      fontWeight: '800' as const,
      marginBottom: 16,
      textTransform: 'uppercase',
    } as TextStyle,
    statCard: {
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      borderRadius: 16,
      flex: 1,
      marginHorizontal: 4,
      paddingVertical: 16,
    } as ViewStyle,
    statLabel: {
      ...theme.typography.caption,
      color: theme.colors.textSecondary,
      fontSize: 10,
      fontWeight: '700' as const,
      textAlign: 'center',
      textTransform: 'uppercase',
    } as TextStyle,
    statValue: {
      ...theme.typography.h2,
      color: theme.colors.primary,
      fontSize: 22,
      fontWeight: '900' as const,
      marginVertical: 4,
    } as TextStyle,
    statsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 24,
      paddingHorizontal: 16,
    } as ViewStyle,
    todayCell: {
      borderColor: theme.colors.cyan,
      borderWidth: 2,
    } as ViewStyle,
    todayIndicator: {
      backgroundColor: theme.colors.cyan,
      borderRadius: 2,
      height: 4,
      width: 4,
    } as ViewStyle,
    tooltipOverlay: {
      backgroundColor: theme.colors.withOpacity(theme.colors.black, 0.8),
      borderRadius: 12,
      padding: 12,
      position: 'absolute',
      zIndex: 1000,
    } as ViewStyle,
    tooltipText: {
      ...theme.typography.caption,
      color: theme.colors.white,
      fontSize: 12,
      fontWeight: '600' as const,
    } as TextStyle,
  });
