import React, { useMemo, useState, useCallback } from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import { useTheme } from '../../../theme';
import { createStyles } from './styles';
import { Screen } from '../../../components';
import { FadeInView } from '../../../components/animations';
import { AlertTriangle, MessageSquare, Clock } from 'lucide-react-native';
import { useRoute, RouteProp, useFocusEffect } from '@react-navigation/native';
import { HomeStackParamList } from '../../../navigation/types';
import AppUsageMethods, { AppUsage } from '../../../native/AppUsageModule';
import { getAppLimits } from '../../../utils/limits';

type AppDetailsRouteProp = RouteProp<HomeStackParamList, 'AppDetails'>;

interface HistoryItem {
  day: string;
  usage: number;
  limit: number;
}

export const AppDetailsScreen = () => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const route = useRoute<AppDetailsRouteProp>();
  const { appId } = route.params;

  const [currentUsage, setCurrentUsage] = useState<AppUsage | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const fetchDayStats = useCallback(async (daysAgo: number, appIdKey: string, defaultLimit: number): Promise<HistoryItem> => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const d = new Date();
    d.setDate(d.getDate() - daysAgo);
    d.setHours(0, 0, 0, 0);
    const start = d.getTime();
    const end = start + 24 * 60 * 60 * 1000 - 1;
    
    const stats = await AppUsageMethods.getUsageStats(start, end);
    const stat = stats.find(s => s.packageName === appIdKey);
    
    return {
      day: days[d.getDay()],
      usage: Math.floor((stat?.totalTimeInForeground ?? 0) / 60000),
      limit: defaultLimit,
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          const todayStats = await AppUsageMethods.getTodayUsageStats();
          const appStat = todayStats.find(s => s.packageName === appId) ?? null;
          setCurrentUsage(appStat);

          const appLimits = getAppLimits();
          const limit = appLimits.find(l => l.packageName === appId);
          const currentLimit = limit?.limitMinutes ?? 0;

          const historyPromises = Array.from({ length: 7 }).map((_, i) => 
            fetchDayStats(6 - i, appId, currentLimit > 0 ? currentLimit : 30)
          );

          const historyResults = await Promise.all(historyPromises);
          setHistory(historyResults);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error('Error fetching app details:', error);
        }
      };
      void fetchData();
    }, [appId, fetchDayStats]),
  );

  const maxUsage = useMemo(() => {
    const usages = history.map(d => d.usage);
    return Math.max(60, ...usages);
  }, [history]);

  const avgUsage = useMemo(() => {
    if (history.length === 0) {
      return 0;
    }
    return Math.floor(history.reduce((acc, curr) => acc + curr.usage, 0) / history.length);
  }, [history]);

  const breaches = useMemo(() => {
    return history.filter(d => d.limit > 0 && d.usage > d.limit).length;
  }, [history]);

  const formatTimeMinutes = (mins: number) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  };

  const accountabilityScore = useMemo(() => {
    if (breaches > 5) {
      return 'F';
    }
    if (breaches > 3) {
      return 'D';
    }
    if (breaches > 1) {
      return 'C';
    }
    return 'B';
  }, [breaches]);

  return (
    <Screen title="Details" showBackButton>
      <ScrollView 
        style={styles.container} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <FadeInView translateY={20}>
          <View style={styles.header}>
            <View style={styles.appInfo}>
              <View style={styles.appHeaderRow}>
                {currentUsage?.appIcon && (
                  <Image 
                    source={{ uri: `data:image/png;base64,${currentUsage.appIcon}` }} 
                    style={styles.appIconTitle} 
                  />
                )}
                <Text style={styles.appName} numberOfLines={1}>
                  {currentUsage?.appName ?? appId.split('.').pop()}
                </Text>
              </View>
              <Text style={styles.appCategory}>{appId}</Text>
            </View>
            <View style={styles.currentUsageBadge}>
              <Text style={styles.currentUsageText}>
                {formatTimeMinutes(Math.floor((currentUsage?.totalTimeInForeground ?? 0) / 60000))} today
              </Text>
            </View>
          </View>
        </FadeInView>

        <FadeInView translateY={20} delay={200} style={styles.chartSection}>
          <Text style={styles.sectionTitle}>7-DAY HISTORY</Text>
          <View style={styles.chartContainer}>
            {history.map((data) => {
              const heightPercent = (data.usage / maxUsage) * 100;
              const isOver = data.limit > 0 && data.usage > data.limit;
              return (
                <View key={data.day} style={styles.barWrapper}>
                  <View style={styles.barContainer}>
                    <View 
                      style={[
                        styles.barFill, 
                        { 
                          height: `${Math.max(5, heightPercent)}%`,
                          backgroundColor: isOver ? theme.colors.error : theme.colors.primary 
                        }
                      ]} 
                    />
                  </View>
                  <Text style={styles.barLabel}>{data.day}</Text>
                </View>
              );
            })}
          </View>
        </FadeInView>

        <FadeInView translateY={20} delay={400} style={styles.statsGrid}>
          <View style={styles.statCard}>
            <View style={styles.statIcon}><Clock size={20} color={theme.colors.primary} /></View>
            <Text style={styles.statValue}>{formatTimeMinutes(avgUsage)}</Text>
            <Text style={styles.statLabel}>AVG USAGE</Text>
          </View>
          <View style={styles.statCard}>
            <View style={styles.statIcon}><AlertTriangle size={20} color={theme.colors.error} /></View>
            <Text style={styles.statValue}>{breaches}</Text>
            <Text style={styles.statLabel}>BREACHES</Text>
          </View>
          <View style={styles.statCard}>
            <View style={styles.statIcon}><MessageSquare size={20} color={theme.colors.secondary} /></View>
            <Text style={styles.statValue}>{breaches * 2}</Text>
            <Text style={styles.statLabel}>ROASTS</Text>
          </View>
        </FadeInView>

        <FadeInView translateY={20} delay={600} style={styles.summaryCard}>
          <View style={styles.summaryContent}>
            <Text style={[styles.summaryTitle, { color: breaches > 3 ? theme.colors.error : theme.colors.primary }]}>
              Accountability Score: {accountabilityScore}
            </Text>
            <Text style={styles.summaryText}>
              {breaches > 3 
                ? `You've failed your limit ${breaches} out of the last 7 days. This is unacceptable behavior for a high-performer like you.`
                : `Only ${breaches} breaches this week. You're getting better, but Agent Loop is still watching.`}
            </Text>
          </View>
        </FadeInView>
      </ScrollView>
    </Screen>
  );
};
