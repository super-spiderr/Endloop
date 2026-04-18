import React, { useEffect, useMemo, useState, useCallback } from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Image,
  TextInput,
  LayoutAnimation,
  Platform,
  UIManager,
  GestureResponderEvent,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  FadeInDown,
} from 'react-native-reanimated';
import { Search, X, Octagon, Check } from 'lucide-react-native';
import { LimitsNavigationProp } from '../../../navigation/types';
import AppUsageMethods, { AppInfo, AppUsage } from '../../../native/AppUsageModule';
import { Screen } from '../../../components';
import { setAppLimit } from '../../../utils/limits';
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
  onSave 
}: { 
  onSave: (minutes: number) => void 
}) => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [minutes, setMinutes] = useState(45);

  // Shared values
  const stampScale = useSharedValue(1);
  const stampOpacity = useSharedValue(0);
  const thumbPosition = useSharedValue((45 - MIN_LIMIT) / (MAX_LIMIT - MIN_LIMIT));

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
            <Text style={styles.fileItText}>File it</Text>
            <Animated.View style={[styles.stampMark, stampMarkStyle]}>
              <Text style={styles.stampMarkText}>FILED</Text>
            </Animated.View>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Animated.View>
  );
};

export const AddLimitScreen = () => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const navigation = useNavigation<LimitsNavigationProp>();

  const [apps, setApps] = useState<AppInfoWithUsage[]>([]);
  const [filteredApps, setFilteredApps] = useState<AppInfoWithUsage[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const [installedApps, todayStats] = await Promise.all([
          AppUsageMethods.getInstalledApps(),
          AppUsageMethods.getTodayUsageStats(),
        ]);

        const merged = mergeUsageData(installedApps, todayStats);
        const sorted = [...merged].sort((a, b) => b.usageMinutes - a.usageMinutes);
        setApps(sorted);
        setFilteredApps(sorted);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to fetch apps:', error);
      } finally {
        setLoading(false);
      }
    };
    void fetchApps();
  }, []);

  const handleSearch = useCallback(
    (text: string) => {
      setSearchQuery(text);
      if (text.trim() === '') {
        setFilteredApps(apps);
      } else {
        const filtered = apps.filter(app => app.appName.toLowerCase().includes(text.toLowerCase()));
        setFilteredApps(filtered);
      }
    },
    [apps],
  );

  const toggleSelect = (packageName: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSelectedPackage(prev => (prev === packageName ? null : packageName));
  };

  const handleSave = async (minutes: number): Promise<void> => {
    const app = apps.find(a => a.packageName === selectedPackage);
    if (!app) {
      return;
    }

    await setAppLimit(app.packageName, app.appName, minutes);
    navigation.goBack();
  };

  const renderAppItem = ({ item }: { item: AppInfoWithUsage }) => {
    const isSelected = selectedPackage === item.packageName;

    return (
      <View style={styles.appItemContainer}>
        <TouchableOpacity
          style={[styles.appItem, isSelected && styles.selectedAppItem]}
          onPress={() => toggleSelect(item.packageName)}
          activeOpacity={0.7}
        >
          {item.appIcon ? (
            <Image
              source={{ uri: `data:image/png;base64,${item.appIcon}` }}
              style={styles.appIcon}
            />
          ) : (
            <Octagon size={48} color={theme.colors.grey800} />
          )}

          <View style={styles.appInfo}>
            <Text style={styles.appName} numberOfLines={1}>
              {item.appName}
            </Text>
            <Text style={styles.usageText}>Used {item.usageMinutes} min today</Text>
          </View>

          {isSelected ? (
            <Check size={20} color={theme.colors.cyan} />
          ) : (
            <Check size={20} color="transparent" />
          )}
        </TouchableOpacity>
        {isSelected && (
          <LimitSetterPanel 
            onSave={(m) => void handleSave(m)} 
          />
        )}
      </View>
    );
  };

  return (
    <Screen title="Open new file" showBackButton>
      <View style={styles.container}>
        <View style={styles.mascotStrip}>
          <Image source={mascotImg} style={styles.mascotThumb} />
          {selectedPackage && (
            <View style={{ marginLeft: -15, borderWidth: 2, borderColor: theme.colors.background, borderRadius: 10, backgroundColor: theme.colors.surface, padding: 2 }}>
              {apps.find(a => a.packageName === selectedPackage)?.appIcon ? (
                <Image
                  source={{ uri: `data:image/png;base64,${apps.find(a => a.packageName === selectedPackage)?.appIcon}` }}
                  style={{ width: 32, height: 32, borderRadius: 6 }}
                />
              ) : (
                <Octagon size={32} color={theme.colors.grey800} />
              )}
            </View>
          )}
          <Text style={styles.mascotText}>
            {selectedPackage 
               ? `Targeting ${apps.find(a => a.packageName === selectedPackage)?.appName}. Set the threshold.`
               : 'Select your target. Set the threshold. Agent LOOP will handle the rest.'}
          </Text>
        </View>

        <View style={styles.searchContainer}>
          <Search size={20} color={theme.colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search installed apps..."
            placeholderTextColor={theme.colors.textSecondary}
            value={searchQuery}
            onChangeText={handleSearch}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => handleSearch('')}>
              <X size={20} color={theme.colors.textSecondary} />
            </TouchableOpacity>
          )}
        </View>

        {loading ? (
          <View style={styles.centered}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
            <Text style={styles.loadingText}>Analyzing app history...</Text>
          </View>
        ) : (
          <FlatList
            data={filteredApps}
            keyExtractor={item => item.packageName}
            renderItem={renderAppItem}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No apps found. Is this phone brand new?</Text>
            }
            initialNumToRender={15}
            maxToRenderPerBatch={10}
            windowSize={5}
          />
        )}
      </View>
    </Screen>
  );
};

export default AddLimitScreen;
