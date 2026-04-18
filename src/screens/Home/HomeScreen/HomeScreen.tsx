import { useNavigation, useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { Text, View, Image, TouchableOpacity, TextInput, TextInputProps } from 'react-native';
import Animated, { useSharedValue, withTiming, useAnimatedProps } from 'react-native-reanimated';
import { HomeNavigationProp } from '../../../navigation/types';
import { Screen } from '../../../components';
import { colors, useTheme } from '../../../theme';
import { createStyles } from './styles';
import { Flame } from 'lucide-react-native';
import AppUsageMethods, { AppUsage } from '../../../native/AppUsageModule';
import { FadeInView } from '../../../components/animations';
import { getAppLimits, AppLimit } from '../../../utils/limits';
import { getUserName } from '../../../utils/storage';
import { getLatestRoast, RoastHistoryItem } from '../../../utils/roasts';
import { getStreakStats, StreakStats } from '../../../utils/streaks';

import { getMascotForRatio } from '../../../utils/mascot';
import MainLogo from '../../../assets/svgs/MainLogo';
import { DAILY_GOAL_MS, AGENT_ONE_LINERS } from '../../../constants';

const AnimatedFadeInView = Animated.createAnimatedComponent(FadeInView);

export const HomeScreen = () => {
  const navigation = useNavigation<HomeNavigationProp>();
  const { theme } = useTheme();
  const [usage, setUsage] = useState<AppUsage[]>([]);
  const [limits, setLimits] = useState<AppLimit[]>([]);
  const [latestRoast, setLatestRoast] = useState<RoastHistoryItem | null>(null);
  const [streak, setStreak] = useState<StreakStats>({ current: 0, longest: 0, lastClean: 'Never' });
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const pulseValue = useSharedValue(1);
  const animatedTimeMs = useSharedValue(0);
  const animTimeRef = React.useRef(animatedTimeMs);

  const tips = useMemo(
    () => [
      'Put your phone in another room while working. Out of sight, out of mind.',
      'Charge your phone outside the bedroom to reclaim your mornings.',
      "Turn off non-human notifications. If it's not a person, it's not important.",
      'Use Grayscale mode to make your phone less addictive.',
      "Delete apps that don't add value. You can always use the web version.",
      'Set a "Digital Sunset" 1 hour before bed.',
      'Practice 5 minutes of mindful breathing before unlocking your phone.',
    ],
    [],
  );

  const [dailyTip] = useState(() => tips[Math.floor(Math.random() * tips.length)]);
  const [activeOneLiner, setActiveOneLiner] = useState<string | null>(null);

  const handleMascotTap = () => {
    const randomOneLiner = AGENT_ONE_LINERS[Math.floor(Math.random() * AGENT_ONE_LINERS.length)];
    setActiveOneLiner(randomOneLiner);
    // Auto clear after 4 seconds
    setTimeout(() => setActiveOneLiner(null), 4000);
  };

  useEffect(() => {
    pulseValue.value = withTiming(1.05, { duration: 1000 });
  }, [pulseValue]);

  const styles = useMemo(() => createStyles(theme), [theme]);

  const name = getUserName();

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    let baseGreeting: string;
    if (hour < 12) {
      baseGreeting = 'Good morning';
    } else if (hour < 17) {
      baseGreeting = 'Good afternoon';
    } else if (hour < 21) {
      baseGreeting = 'Good evening';
    } else {
      baseGreeting = 'Good night';
    }
    return `${baseGreeting}, ${name}`;
  }, [name]);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          const [stats, appLimits] = await Promise.all([
            AppUsageMethods.getTodayUsageStats(),
            Promise.resolve(getAppLimits()),
          ]);

          const sortedStats = stats
            .filter(s => s.totalTimeInForeground > 0)
            .sort((a, b) => b.totalTimeInForeground - a.totalTimeInForeground);

          setUsage(sortedStats);
          setLimits(appLimits);
          setLatestRoast(getLatestRoast());
          setStreak(getStreakStats());
          setIsDataLoaded(true);

          // Start count-up animation
          const totalMs = sortedStats.reduce((acc, curr) => acc + curr.totalTimeInForeground, 0);
          animTimeRef.current.value = 0;
          animTimeRef.current.value = withTiming(totalMs, { duration: 1200 });
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error('Failed to fetch data:', error);
        }
      };
      void fetchData();
    }, []),
  );

  // Poll for new roasts periodically to keep UI "lively"
  useEffect(() => {
    const timer = setInterval(() => {
      const latest = getLatestRoast();
      if (latest?.id !== latestRoast?.id) {
        setLatestRoast(latest);
      }
    }, 5000);
    return () => clearInterval(timer);
  }, [latestRoast]);

  const totalScreenTime = usage.reduce((acc, curr) => acc + curr.totalTimeInForeground, 0);

  const formatTimeParts = useCallback((ms: number) => {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    return { hours, minutes };
  }, []);

  const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

  const verdict = useMemo(() => {
    const hours = totalScreenTime / (1000 * 60 * 60);
    if (hours < 1) {
      return 'Clean record. Agent LOOP is cautiously optimistic.';
    }
    if (hours < 2) {
      return 'Manageable. For now. Agent LOOP is watching.';
    }
    if (hours < 3) {
      return 'Case file thickening. HQ has been notified.';
    }
    if (hours < 4) {
      return 'Threat level: Elevated. Agent LOOP is not pleased.';
    }
    return 'Subject has exceeded acceptable parameters. Intervention imminent.';
  }, [totalScreenTime]);

  const animatedProps = useAnimatedProps(() => {
    const ms = animatedTimeMs.value;
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    return {
      text: `${hours}h ${minutes}m`,
    } as unknown as TextInputProps;
  });

  const renderHeroSection = () => {
    return (
      <FadeInView translateY={20} delay={200} style={styles.heroContainer}>
        <View style={styles.heroHeader}>
          <AnimatedTextInput
            underlineColorAndroid="transparent"
            editable={false}
            value={`${Math.floor(totalScreenTime / (1000 * 60 * 60))}h ${Math.floor(
              (totalScreenTime / (1000 * 60)) % 60,
            )}m`}
            style={styles.heroTimeLarge}
            animatedProps={animatedProps}
          />
          <Text style={styles.heroLabel}>{verdict.toUpperCase()}</Text>
        </View>
      </FadeInView>
    );
  };

  const renderAppCard = (item: AppUsage, index: number) => {
    const limit = limits.find(l => l.packageName === item.packageName);
    const usagePart = formatTimeParts(item.totalTimeInForeground);
    const limitMs = limit ? limit.limitMinutes * 60 * 1000 : 0;
    const progress = limitMs > 0 ? item.totalTimeInForeground / limitMs : 0;
    const progressPercent = Math.min(100, Math.floor(progress * 100));

    let statusColor = '#22c55e';
    if (limit) {
      if (progress >= 1) {
        statusColor = '#ef4444';
      } else if (progress > 0.8) {
        statusColor = '#f59e0b';
      }
    }

    return (
      <FadeInView
        key={item.packageName}
        translateY={10}
        delay={index * 100 + 400}
        style={styles.appCardContainer}
      >
        <TouchableOpacity
          style={styles.appCard}
          onPress={() =>
            navigation.navigate('HomeStack', {
              screen: 'AppDetails',
              params: { appId: item.packageName },
            })
          }
        >
          <View style={styles.appCardHeader}>
            {item.appIcon ? (
              <Image
                source={{ uri: `data:image/png;base64,${item.appIcon}` }}
                style={styles.appCardIcon}
              />
            ) : (
              <View style={styles.appIconPlaceholder}>
                <Text style={styles.appCardIconText}>{item.appName?.charAt(0)}</Text>
              </View>
            )}
            <View style={styles.appCardInfo}>
              <Text style={styles.appCardName} numberOfLines={1}>
                {item.appName}
              </Text>
              <Text style={styles.appCardUsage}>
                {usagePart.hours > 0 ? `${usagePart.hours}h ` : ''}
                {usagePart.minutes}m
              </Text>
            </View>
            <View style={styles.appCardProgressContainer}>
              <View style={styles.appCardProgressBar}>
                <View
                  style={[
                    styles.appCardProgressFill,
                    { width: `${progressPercent || 5}%`, backgroundColor: statusColor },
                  ]}
                />
              </View>
              <Text style={styles.appCardLimit}>
                {limit ? `${limit.limitMinutes}m limit` : 'no limit'}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </FadeInView>
    );
  };

  const renderRoastPreview = () => {
    if (!latestRoast) {
      return null;
    }

    return (
      <FadeInView translateY={10} delay={600} style={styles.roastPreviewContainer}>
        <Text style={styles.sectionTitle}>LATEST BREACH</Text>
        <TouchableOpacity
          style={styles.roastPreviewCard}
          onPress={() =>
            navigation.navigate('HomeStack', {
              screen: 'RoastDetails',
              params: {
                roastId: latestRoast.id,
                roastText: latestRoast.text,
                appName: latestRoast.appName,
                minutesOver: latestRoast.minutesOver,
                time: latestRoast.dateString,
              },
            })
          }
        >
          <View style={styles.roastPreviewHeader}>
            <View style={styles.roastPreviewHeaderContent}>
              <View style={styles.roastPreviewMeta}>
                <Text style={styles.roastPreviewLabel}>{latestRoast.appName.toUpperCase()}</Text>
                <Text style={styles.roastPreviewTime}>Just now</Text>
              </View>
              <Text style={styles.roastPreviewTitle} numberOfLines={2}>
                &quot;{latestRoast.text}&quot;
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </FadeInView>
    );
  };

  return (
    <Screen showBackButton={false}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerLabels}>
            <FadeInView
              translateX={-20}
              style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}
            >
              <MainLogo color={colors.primary} size={24} />
              <Text style={styles.greetingText}>{greeting}</Text>
            </FadeInView>
          </View>

          <FadeInView translateX={20} delay={600}>
            <TouchableOpacity
              style={styles.streakBadge}
              onPress={() => {
                navigation.navigate('App', {
                  screen: 'HistoryStack',
                  params: { screen: 'HistoryScreen' },
                });
              }}
            >
              <Flame size={16} color={theme.colors.primary} fill={theme.colors.primary} />
              <Text style={styles.streakCount}>{streak.current}</Text>
            </TouchableOpacity>
          </FadeInView>
        </View>

        <View style={styles.contentBody}>
          {isDataLoaded && renderHeroSection()}

          {isDataLoaded && (
            <>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={handleMascotTap}
                style={styles.mascotCardWrapper}
              >
                <AnimatedFadeInView
                  translateY={10}
                  delay={600}
                  style={styles.emptyRoastPlaceholder}
                >
                  <View style={styles.emptyRoastHeader}>
                    {(() => {
                      const ratio = totalScreenTime / DAILY_GOAL_MS;
                      const img = getMascotForRatio(ratio);
                      const label = 'AGENT LOOP IS MONITORING';

                      return (
                        <>
                          <Image source={img} style={styles.emptyRoastMascot} />
                          <Text style={styles.emptyRoastLabel}>{label}</Text>
                        </>
                      );
                    })()}
                  </View>
                  <View style={styles.tipContainer}>
                    <Text style={styles.tipTitle}>AGENT&apos;S ADVICE:</Text>
                    <Text style={styles.emptyRoastText}>{activeOneLiner ?? dailyTip}</Text>
                  </View>
                </AnimatedFadeInView>
              </TouchableOpacity>

              {latestRoast && renderRoastPreview()}
            </>
          )}

          <View style={styles.usageContainer}>
            <Text style={styles.sectionTitle}>TOP OFFENDERS</Text>
            <View style={styles.appCardsVertical}>
              {isDataLoaded && usage.slice(0, 3).map((item, index) => renderAppCard(item, index))}
            </View>
          </View>
        </View>
      </View>
    </Screen>
  );
};
