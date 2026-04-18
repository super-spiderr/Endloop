import React, { useCallback, useMemo, useState } from 'react';
import { 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { HistoryNavigationProp } from '../../../navigation/types';
import { useTheme } from '../../../theme';
import { createStyles } from './styles';
import { Screen } from '../../../components';
import { Flame, Trophy, Calendar, ChevronRight } from 'lucide-react-native';
import { FadeInView } from '../../../components/animations';
import { getRoastHistory, RoastHistoryItem } from '../../../utils/roasts';
import { getStreakStats, StreakStats } from '../../../utils/streaks';

export const HistoryScreen = () => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const navigation = useNavigation<HistoryNavigationProp>();
  
  const [activeFilter, setActiveFilter] = useState('All');
  const [history, setHistory] = useState<RoastHistoryItem[]>([]);
  const [streak, setStreak] = useState<StreakStats>({ current: 0, longest: 0, lastClean: 'Never' });
  const filters = ['All', 'Social', 'Entertainment', 'Productivity'];

  useFocusEffect(
    useCallback(() => {
      setHistory(getRoastHistory());
      setStreak(getStreakStats());
    }, []),
  );

  const filteredRoasts = useMemo(() => {
    if (activeFilter === 'All') {
      return history;
    }
    return history.filter(r => r.category === activeFilter);
  }, [activeFilter, history]);

  const renderRoastItem = (item: RoastHistoryItem) => (
    <FadeInView key={item.id} translateY={10} style={styles.roastItem}>
      <TouchableOpacity 
        onPress={() => {
          // Navigating to HomeStack's RoastDetails from HistoryStack
          navigation.navigate('App', {
            screen: 'HomeStack',
            params: {
              screen: 'RoastDetails',
              params: {
                roastId: item.id,
                roastText: item.text,
                appName: item.appName,
                minutesOver: item.minutesOver,
                time: item.dateString
              }
            }
          });
        }}
      >
        <View style={styles.roastHeader}>
          <View style={styles.roastTag}>
            <Text style={styles.roastTagText}>{item.category.toUpperCase()}</Text>
          </View>
          <Text style={styles.roastDate}>{item.dateString}</Text>
        </View>
        <Text style={styles.roastText} numberOfLines={3}>&quot;{item.text}&quot;</Text>
        <Text style={styles.roastApp}>{item.appName} · Breached</Text>
      </TouchableOpacity>
    </FadeInView>
  );

  return (
    <Screen showBackButton={false}>
      <ScrollView 
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      >
        <View style={styles.header}>
          <Text style={styles.title}>History</Text>
        </View>

        <TouchableOpacity 
          onPress={() => navigation.navigate('Streak')}
          activeOpacity={0.9}
        >
          <FadeInView translateY={20} style={styles.streakCard}>
            <View style={styles.streakHeader}>
              <Text style={styles.streakLabel}>Current Streak</Text>
              <ChevronRight size={20} color={theme.colors.textSecondary} />
            </View>
            <View style={styles.streakMain}>
              <Flame size={48} color={theme.colors.primary} fill={theme.colors.primary} />
              <Text style={styles.streakNumber}>{streak.current}</Text>
              <Text style={styles.streakDays}>DAYS</Text>
            </View>
            <View style={styles.streakStats}>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>LONGEST</Text>
                <View style={styles.statIconRow}>
                  <Trophy size={14} color={theme.colors.primary} style={styles.statMiniIcon} />
                  <Text style={styles.statValue}>{streak.longest} Days</Text>
                </View>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>LAST CLEAN</Text>
                <View style={styles.statIconRow}>
                  <Calendar size={14} color={theme.colors.secondary} style={styles.statMiniIcon} />
                  <Text style={styles.statValue}>{streak.lastClean === 'Today' ? 'Today' : streak.lastClean}</Text>
                </View>
              </View>
            </View>
          </FadeInView>
        </TouchableOpacity>

        <View style={styles.filterContainer}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterScroll}
          >
            {filters.map(filter => (
              <TouchableOpacity 
                key={filter} 
                style={[
                  styles.filterChip, 
                  activeFilter === filter && styles.filterChipActive
                ]}
                onPress={() => setActiveFilter(filter)}
              >
                <Text style={[
                  styles.filterText, 
                  activeFilter === filter && styles.filterTextActive
                ]}>
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.feedContainer}>
          <Text style={styles.sectionTitle}>SHAME WALL</Text>
          {filteredRoasts.length > 0 ? (
            filteredRoasts.map(renderRoastItem)
          ) : (
            <View style={styles.emptyFeedContainer}>
              <Text style={styles.emptyFeedText}>
                The wall is empty. You haven&apos;t failed yet.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </Screen>
  );
};
