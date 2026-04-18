import React, { useEffect, useMemo, useState } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Image,
  TextInput,
  Platform,
  UIManager,
  GestureResponderEvent,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  FadeInDown,
} from 'react-native-reanimated';
import { Octagon } from 'lucide-react-native';
import { LimitsNavigationProp, LimitsStackParamList } from '../../../navigation/types';
import AppUsageMethods, { AppInfo, AppUsage } from '../../../native/AppUsageModule';
import { Screen } from '../../../components';
import { setAppLimit, getAppLimits, removeAppLimit, AppLimit } from '../../../utils/limits';
import { useTheme } from '../../../theme';
import { createStyles } from './styles';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface AppInfoWithUsage extends AppInfo {
  usageMinutes: number;
}

const mergeUsageData = (installedApps: AppInfo[], todayStats: AppUsage[]): AppInfoWithUsage[] => {
  return installedApps.map(app => {
    const stat = todayStats.find(s => s.packageName === app.packageName);
    const usageMinutes = stat ? Math.floor(stat.totalTimeInForeground / 1000 / 60) : 0;
    return { ...app, usageMinutes };
  });
};

import mascotImg from '../../../assets/images/mascot.png';

const MIN_LIMIT = 5;
const MAX_LIMIT = 480;

const LimitSetterPanel = ({ 
  initialMinutes,
  onSave 
}: { 
  initialMinutes: number;
  onSave: (minutes: number) => void 
}) => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [minutes, setMinutes] = useState(initialMinutes);

  // Shared values
  const stampScale = useSharedValue(1);
  const stampOpacity = useSharedValue(0);
  const thumbPosition = useSharedValue((initialMinutes - MIN_LIMIT) / (MAX_LIMIT - MIN_LIMIT));

  const thumbAnimatedStyle = useAnimatedStyle(() => {
    return {
      left: `${thumbPosition.value * 100}%`,
      marginLeft: thumbPosition.value * -24,
    };
  });

  const activeTrackStyle = useAnimatedStyle(() => {
    return {
      width: `${thumbPosition.value * 100}%`,
    };
  });

  const handleSliderPress = (e: GestureResponderEvent) => {
    const { locationX } = e.nativeEvent;
    const scrollWidth = 300;
    const percentage = Math.max(0, Math.min(1, locationX / scrollWidth));
    const newMinutes = Math.round(percentage * (MAX_LIMIT - MIN_LIMIT) + MIN_LIMIT);
    setMinutes(newMinutes);
    thumbPosition.value = percentage;
  };

  const handleStamp = () => {
    stampScale.value = withSpring(0.9, { damping: 15 }, () => {
      stampScale.value = withSpring(1);
    });
    stampOpacity.value = withTiming(1, { duration: 100 });

    setTimeout(() => {
      onSave(minutes);
    }, 400);
  };

  const stampMarkStyle = useAnimatedStyle(() => {
    return {
      opacity: stampOpacity.value,
      transform: [{ scale: stampScale.value }],
    };
  });

  const buttonStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: stampScale.value }],
    };
  });

  const setFixedLimit = (m: number) => {
    const validM = Math.max(MIN_LIMIT, Math.min(MAX_LIMIT, m));
    setMinutes(validM);
    thumbPosition.value = (validM - MIN_LIMIT) / (MAX_LIMIT - MIN_LIMIT);
  };

  const handleManualInput = (text: string) => {
    const num = Number.parseInt(text.replaceAll(/\D/g, ''), 10);
    if (!Number.isNaN(num)) {
      setMinutes(num);
      if (num >= MIN_LIMIT && num <= MAX_LIMIT) {
        thumbPosition.value = (num - MIN_LIMIT) / (MAX_LIMIT - MIN_LIMIT);
      }
    } else if (text === '') {
      setMinutes(0);
    }
  };

  return (
    <Animated.View style={styles.limitSetter} entering={FadeInDown.duration(300)}>
      <View style={styles.manualInputRow}>
        <TextInput
          style={styles.limitValueTextManual}
          value={minutes.toString()}
          onChangeText={handleManualInput}
          keyboardType="number-pad"
          maxLength={3}
        />
        <Text style={styles.minLabel}>min</Text>
      </View>

      <TouchableOpacity
        style={styles.sliderContainer}
        activeOpacity={1}
        onPress={handleSliderPress}
      >
        <View style={styles.sliderTrack} />
        <Animated.View style={[styles.sliderActiveTrack, activeTrackStyle]} />
        <Animated.View style={[styles.sliderThumb, thumbAnimatedStyle]} />
      </TouchableOpacity>

      <View style={styles.quickSelectRow}>
        <TouchableOpacity style={styles.quickChip} onPress={() => setFixedLimit(30)}>
          <Text style={styles.quickChipText}>30 min</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickChip} onPress={() => setFixedLimit(60)}>
          <Text style={styles.quickChipText}>1 hour</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.fileItBtnContainer}>
        <Animated.View style={buttonStyle}>
          <TouchableOpacity style={styles.fileItBtn} activeOpacity={0.8} onPress={handleStamp}>
            <Text style={styles.fileItText}>Update Limit</Text>
            <Animated.View style={[styles.stampMark, stampMarkStyle]}>
              <Text style={styles.stampMarkText}>UPDATED</Text>
            </Animated.View>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Animated.View>
  );
};

export const EditLimitScreen = () => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const navigation = useNavigation<LimitsNavigationProp>();
  const route = useRoute<RouteProp<LimitsStackParamList, 'EditLimit'>>();
  const { limitId } = route.params;

  const [targetApp, setTargetApp] = useState<AppInfoWithUsage | null>(null);
  const [currentLimit, setCurrentLimit] = useState<AppLimit | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allLimits = getAppLimits();
        const foundLimit = allLimits.find(l => l.packageName === limitId);
        
        if (!foundLimit) {
          navigation.goBack();
          return;
        }
        
        setCurrentLimit(foundLimit);
        
        // Set a fallback target app immediately so we don't stay in loading state
        // if the native usage data is slow or missing some fields
        setTargetApp({
          packageName: foundLimit.packageName,
          appName: foundLimit.appName,
          usageMinutes: 0,
        });

        const [installedApps, todayStats] = await Promise.all([
          AppUsageMethods.getInstalledApps(),
          AppUsageMethods.getTodayUsageStats(),
        ]);

        const merged = mergeUsageData(installedApps, todayStats);
        
        // Try to find the app in our merged data first
        let app = merged.find(a => a.packageName === limitId);
        
        // If not in merged data (e.g. not user-launched), try raw usage stats
        if (!app) {
          const stat = todayStats.find(s => s.packageName === limitId);
          if (stat) {
            app = {
              packageName: stat.packageName,
              appName: stat.appName || foundLimit.appName,
              usageMinutes: Math.floor(stat.totalTimeInForeground / 1000 / 60),
              appIcon: stat.appIcon,
            };
          }
        }

        // Final fallback: use the limit name but try to get any icon from either list
        if (!app) {
          const anyIcon = installedApps.find(a => a.packageName === limitId)?.appIcon 
                         || todayStats.find(s => s.packageName === limitId)?.appIcon;
          app = {
            packageName: foundLimit.packageName,
            appName: foundLimit.appName,
            usageMinutes: 0,
            appIcon: anyIcon,
          };
        }
        
        setTargetApp(app);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to fetch screen data:', error);
      } finally {
        // Data loading finished
      }
    };
    void fetchData();
  }, [limitId, navigation]);

  const handleUpdate = async (minutes: number): Promise<void> => {
    if (!targetApp) {
      return;
    }
    await setAppLimit(targetApp.packageName, targetApp.appName, minutes);
    navigation.goBack();
  };

  const handleDelete = () => {
    removeAppLimit(limitId);
    // Simple mock toast logic. In reality, we contextually transition back.
    // Navigation back to control list.
    navigation.goBack();
  };

  if (!currentLimit || !targetApp) {
    return (
      <Screen title="Amending record" showBackButton>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      </Screen>
    );
  }

  return (
    <Screen title="Amending record" showBackButton>
      <View style={styles.container}>
        <View style={styles.mascotStrip}>
          <Image source={mascotImg} style={styles.mascotThumb} />
          <View style={{ marginLeft: -15, borderWidth: 2, borderColor: theme.colors.background, borderRadius: 10, backgroundColor: theme.colors.surface, padding: 2 }}>
            {targetApp.appIcon ? (
              <Image
                source={{ uri: `data:image/png;base64,${targetApp.appIcon}` }}
                style={{ width: 32, height: 32, borderRadius: 6 }}
              />
            ) : (
              <Octagon size={32} color={theme.colors.grey800} />
            )}
          </View>
          <Text style={styles.mascotText}>
            Amending the record for {targetApp.appName}. HQ will note this change.
          </Text>
        </View>

        <View style={styles.listContent}>
          <View style={styles.appItemContainer}>
            <View style={[styles.appItem, styles.selectedAppItem]}>
              {targetApp.appIcon ? (
                <Image
                  source={{ uri: `data:image/png;base64,${targetApp.appIcon}` }}
                  style={styles.appIcon}
                />
              ) : (
                <Octagon size={48} color={theme.colors.grey800} />
              )}

              <View style={styles.appInfo}>
                <Text style={styles.appName} numberOfLines={1}>
                  {targetApp.appName}
                </Text>
                <Text style={styles.usageText}>Used {targetApp.usageMinutes} min today</Text>
              </View>
            </View>

            <LimitSetterPanel 
              initialMinutes={currentLimit.limitMinutes}
              onSave={(m) => void handleUpdate(m)} 
            />
          </View>
        </View>

        <View style={styles.deleteContainer}>
          <TouchableOpacity onPress={handleDelete} activeOpacity={0.7}>
            <Text style={styles.deleteText}>Close surveillance file</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  );
};

export default EditLimitScreen;
