import React, { useEffect, useMemo, useState, useCallback } from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  withSpring,
  withTiming,
  useSharedValue,
  withDelay,
} from 'react-native-reanimated';
import { Check, X } from 'lucide-react-native';
import { Screen } from '../../../components';
import { useTheme } from '../../../theme';
import { createStyles } from './styles';
import { getStreakStats, getCleanDays } from '../../../utils/streaks';
import { getRoastHistory, RoastHistoryItem } from '../../../utils/roasts';
import AppUsageMethods from '../../../native/AppUsageModule';

import mascotImg from '../../../assets/images/mascot.png';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type CellStatus = 'success' | 'fail' | 'empty' | 'future' | 'today';

interface CalendarDataPoint {
  dateStr: string;
  status: CellStatus;
  incidents: RoastHistoryItem[];
}

const CalendarCell = ({
  status,
  index,
  onPress,
}: {
  status: CellStatus;
  index: number;
  onPress: () => void;
}) => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const opacity = useSharedValue(0);
  const scale = useSharedValue(0);

  useEffect(() => {
    opacity.value = withDelay(index * 20, withTiming(1, { duration: 300 }));
    scale.value = withDelay(index * 20, withSpring(1));
  }, [index, opacity, scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  const getColors = () => {
    switch (status) {
      case 'success':
        return {
          bg: theme.colors.withOpacity(theme.colors.success, 0.2),
          iconColor: theme.colors.success,
        };
      case 'fail':
        return {
          bg: theme.colors.withOpacity(theme.colors.error, 0.2),
          iconColor: theme.colors.error,
        };
      case 'today':
        return {
          bg: theme.colors.withOpacity(theme.colors.cyan, 0.05),
          iconColor: theme.colors.cyan,
        };
      default:
        return { bg: theme.colors.grey800, iconColor: theme.colors.grey600 };
    }
  };

  const { bg, iconColor } = getColors();

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Animated.View
        style={[
          styles.cell,
          animatedStyle,
          { backgroundColor: bg },
          status === 'today' && styles.todayCell,
        ]}
      >
        {status === 'success' && <Check size={14} color={iconColor} strokeWidth={3} />}
        {status === 'fail' && <X size={14} color={iconColor} strokeWidth={3} />}
        {status === 'today' && <View style={styles.todayIndicator} />}
      </Animated.View>
    </TouchableOpacity>
  );
};

const StatCard = ({
  label,
  value,
  index,
  badge,
}: {
  label: string;
  value: string;
  index: number;
  badge?: string;
}) => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const bounce = useSharedValue(0);

  useEffect(() => {
    bounce.value = withDelay(500 + index * 100, withSpring(1));
  }, [index, bounce]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: withSpring((1 - bounce.value) * 50) }],
    opacity: bounce.value,
  }));

  return (
    <Animated.View style={[styles.statCard, animatedStyle]}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
      {badge && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badge.toUpperCase()}</Text>
        </View>
      )}
    </Animated.View>
  );
};

interface WeeklyDataPoint {
  val: number;
  height: number;
  color: string;
}

const EfficiencyBar = ({ data, index }: { data: WeeklyDataPoint; index: number }) => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const barHeight = useSharedValue(0);

  useEffect(() => {
    barHeight.value = withDelay(1000 + index * 100, withTiming(data.height, { duration: 800 }));
  }, [data.height, index, barHeight]);

  const animatedStyle = useAnimatedStyle(() => ({
    height: `${barHeight.value}%`,
  }));

  return (
    <View style={styles.barWrapper}>
      <Animated.View style={[styles.bar, { backgroundColor: data.color }, animatedStyle]} />
      <Text style={styles.barLabel}>W{8 - index}</Text>
    </View>
  );
};

export const StreakScreen = () => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [cleanDays] = useState<string[]>(() => getCleanDays());
  const [roasts] = useState<RoastHistoryItem[]>(() => getRoastHistory());
  const [stats] = useState(() => getStreakStats());
  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(null);

  const [loading, setLoading] = useState(true);
  const [weeklyUsage, setWeeklyUsage] = useState<WeeklyDataPoint[]>([]);
  const [bestWeekHours, setBestWeekHours] = useState('0.0h');
  const [mostImproved, setMostImproved] = useState('N/A');

  const fetchRealData = useCallback(async () => {
    try {
      const weekStarts = [];
      const now = new Date();
      // Calculate start of current week (Monday)
      const monday = new Date(now);
      monday.setHours(0, 0, 0, 0);
      monday.setDate(now.getDate() - ((now.getDay() + 6) % 7));

      for (let i = 0; i < 8; i++) {
        const start = new Date(monday);
        start.setDate(monday.getDate() - i * 7);
        const end = new Date(start);
        end.setDate(start.getDate() + 7);
        weekStarts.push({ start: start.getTime(), end: end.getTime() });
      }

      // Fetch all weeks in parallel
      const weeklyResults = await Promise.all(
        weekStarts.map(({ start, end }) => AppUsageMethods.getUsageStats(start, end)),
      );

      const totals = weeklyResults
        .map(week => week.reduce((acc, app) => acc + app.totalTimeInForeground, 0))
        .reverse(); // Oldest first

      const maxVal = Math.max(...totals, 1); // Avoid div by zero
      const points = totals.map(val => {
        let color = theme.colors.success;
        const hours = val / (1000 * 60 * 60);
        if (hours > 6) {
          color = theme.colors.error;
        } else if (hours > 4) {
          color = theme.colors.warning;
        }

        return {
          val,
          height: (val / maxVal) * 100,
          color,
        };
      });

      setWeeklyUsage(points);

      // Best week
      const minUsageMs = Math.min(...totals.filter(t => t > 0));
      if (minUsageMs !== Infinity) {
        setBestWeekHours(`${(minUsageMs / (1000 * 60 * 60)).toFixed(1)}h`);
      }

      // Most improved app (compare this week vs last week)
      if (weeklyResults.length >= 2) {
        const thisWeek = weeklyResults[0];
        const lastWeek = weeklyResults[1];

        let biggestReduction = 0;
        let improvedApp = 'N/A';

        thisWeek.forEach(app => {
          const prevUsage =
            lastWeek.find(p => p.packageName === app.packageName)?.totalTimeInForeground ?? 0;
          const reduction = prevUsage - app.totalTimeInForeground;
          if (reduction > biggestReduction) {
            biggestReduction = reduction;
            improvedApp = app.appName;
          }
        });
        setMostImproved(improvedApp);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to fetch real history data:', error);
    } finally {
      setLoading(false);
    }
  }, [theme.colors]);

  useEffect(() => {
    void fetchRealData();
  }, [fetchRealData]);

  const calendarData = useMemo(() => {
    const data: CalendarDataPoint[] = [];
    const today = new Date();
    const endOfWeek = new Date(today);
    endOfWeek.setDate(today.getDate() + (6 - today.getDay()));

    for (let i = 27; i >= 0; i--) {
      const date = new Date(endOfWeek);
      date.setDate(endOfWeek.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const isToday = dateStr === today.toISOString().split('T')[0];
      const isFuture = date > today;

      let status: CellStatus = 'empty';
      if (isFuture) {
        status = 'future';
      } else if (isToday) {
        status = 'today';
      } else if (cleanDays.includes(dateStr)) {
        status = 'success';
      } else if (roasts.some(r => new Date(r.timestamp).toISOString().split('T')[0] === dateStr)) {
        status = 'fail';
      }

      const dailyRoasts = roasts.filter(
        r => new Date(r.timestamp).toISOString().split('T')[0] === dateStr,
      );

      data.push({
        dateStr,
        status,
        incidents: dailyRoasts,
      });
    }
    return data;
  }, [cleanDays, roasts]);

  const handleCellPress = (item: CalendarDataPoint, index: number) => {
    const x = (index % 7) * (SCREEN_WIDTH / 7);
    const y = Math.floor(index / 7) * 40 + 250;

    let text = 'Clean day. No incidents recorded.';
    if (item.status === 'fail') {
      const apps = item.incidents.map(i => i.appName);
      const count = item.incidents.length;
      text = `${count} incident${count > 1 ? 's' : ''}. ${apps.join(', ')}.`;
    } else if (item.status === 'future') {
      text = 'Future record. Pending file.';
    }

    setTooltip({ text, x: Math.min(x, SCREEN_WIDTH - 150), y });
    setTimeout(() => setTooltip(null), 3000);
  };

  const isStreakBroken = stats.current === 0 && stats.lastClean !== 'Never';

  if (loading) {
    return (
      <Screen showBackButton title="Case File Deep Dive">
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={styles.loadingText}>Synthesizing history data...</Text>
        </View>
      </Screen>
    );
  }

  return (
    <Screen showBackButton title="Case File Deep Dive">
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        style={styles.container}
      >
        <View style={styles.mascotSection}>
          <Image source={mascotImg} style={styles.mascotImage} />
          <View style={styles.dialogueContainer}>
            <Text style={styles.dialogueText}>
              {isStreakBroken
                ? `Case review — streak terminated at ${stats.longest} days. Agent LOOP requests a debrief. What happened.`
                : `Case review — ${stats.current} days of compliance. Agent LOOP is filing a commendation. Don't make it weird.`}
            </Text>
          </View>
        </View>

        <View style={styles.calendarContainer}>
          <Text style={styles.sectionTitle}>Compliance Tracking</Text>
          <View style={styles.grid}>
            {calendarData.map((item, index) => (
              <CalendarCell
                key={item.dateStr}
                status={item.status}
                index={index}
                onPress={() => handleCellPress(item, index)}
              />
            ))}
          </View>
        </View>

        {tooltip && (
          <Animated.View
            entering={FadeInDown}
            style={[styles.tooltipOverlay, { top: tooltip.y, left: tooltip.x }]}
          >
            <Text style={styles.tooltipText}>{tooltip.text}</Text>
          </Animated.View>
        )}

        <View style={styles.statsRow}>
          <StatCard
            label="Longest Streak"
            value={`${stats.longest}d`}
            index={0}
            badge="Personal record"
          />
          <StatCard label="Best Week" value={bestWeekHours} index={1} badge="Current best" />
          <StatCard label="Most Improved" value={mostImproved} index={2} />
        </View>

        <View style={styles.chartContainer}>
          <View style={styles.chartLabelRow}>
            <Text style={styles.sectionTitle}>Macro Efficiency</Text>
            <Text style={styles.statLabel}>LAST 8 WEEKS</Text>
          </View>
          <View style={styles.barContainer}>
            {weeklyUsage.map((data, i) => (
              <EfficiencyBar key={`week-${8 - i}`} data={data} index={i} />
            ))}
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
};

export default StreakScreen;
