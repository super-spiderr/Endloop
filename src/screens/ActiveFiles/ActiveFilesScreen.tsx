import { useState, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Pressable,
  ImageStyle,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Animated, {
  FadeInRight,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { FolderPlus, Plus, Octagon, Edit3 } from 'lucide-react-native';
import { colors } from '../../theme';
import { styles } from './styles';
import mascotImg from '../../assets/images/mascot.png';
import { Screen } from '@/components';
import { getAppLimits, toggleAppLimitPause } from '../../utils/limits';
import AppUsageMethods from '../../native/AppUsageModule';
import { LimitsNavigationProp } from '../../navigation/types';

interface ActiveFile {
  id: string;
  name: string;
  limitMinutes: number;
  usedMinutes: number;
  isPaused: boolean;
  icon?: string;
}

const Toggle = ({ active, onToggle }: { active: boolean; onToggle: () => void }) => {
  const animatedThumbStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withSpring(active ? 20 : 0) }],
    };
  });

  const animatedTrackStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(active ? colors.primary : colors.grey600),
    };
  });

  return (
    <Pressable onPress={onToggle}>
      <Animated.View style={[styles.toggleTrack, animatedTrackStyle]}>
        <Animated.View style={[styles.toggleThumb, animatedThumbStyle]} />
      </Animated.View>
    </Pressable>
  );
};

const FileCard = ({
  file,
  index,
  onToggle,
  onPress,
}: {
  file: ActiveFile;
  index: number;
  onToggle: (id: string) => void;
  onPress: (id: string) => void;
}) => {
  const usageRatio = file.usedMinutes / file.limitMinutes;
  let progressColor = colors.success;
  if (usageRatio >= 0.9) {
    progressColor = colors.error;
  } else if (usageRatio >= 0.5) {
    progressColor = colors.warning;
  }

  if (file.isPaused) {
    progressColor = colors.grey600;
  }

  const animatedCardStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(file.isPaused ? 0.6 : 1),
      transform: [{ scale: withSpring(file.isPaused ? 0.98 : 1) }],
    };
  });

  return (
    <Animated.View
      entering={FadeInRight.delay(index * 100).springify()}
      style={[styles.card, animatedCardStyle]}
    >
      <TouchableOpacity 
        style={styles.cardRow} 
        onPress={() => onPress(file.id)}
        activeOpacity={0.7}
      >
        <View style={styles.appIcon}>
          {file.icon ? (
            <Image 
              source={{ uri: `data:image/png;base64,${file.icon}` }} 
              style={styles.appIcon as ImageStyle} 
            />
          ) : (
            <Octagon size={24} color={colors.grey500} style={styles.octagonIcon} />
          )}
        </View>

        <View style={styles.cardMainInfo}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.appName}>{file.name}</Text>
            <Edit3 size={14} color={colors.textSecondary} style={styles.editIcon} />
          </View>
          <Text style={styles.limitText}>{file.limitMinutes} min</Text>
          
          <View style={styles.progressContainer}>
            <View
              style={[
                styles.progressBar,
                {
                  width: `${Math.min(usageRatio * 100, 100)}%`,
                  backgroundColor: progressColor,
                },
              ]}
            />
          </View>

          <Text style={styles.statusText}>
            {file.isPaused ? 'Surveillance paused' : 'Surveillance active'}
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.toggleContainer}>
          <Toggle active={!file.isPaused} onToggle={() => onToggle(file.id)} />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export const ActiveFilesScreen = () => {
  const navigation = useNavigation<LimitsNavigationProp>();
  const [files, setFiles] = useState<ActiveFile[]>([]);
  const [showTooltip, setShowTooltip] = useState(false);

  const fetchData = async () => {
    const limits = getAppLimits();
    const [todayStats, installedApps] = await Promise.all([
      AppUsageMethods.getTodayUsageStats(),
      AppUsageMethods.getInstalledApps(),
    ]);

    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

    const activeFiles: ActiveFile[] = limits.map(limit => {
      const stat = todayStats.find(s => s.packageName === limit.packageName);
      const appInfo = installedApps.find(a => a.packageName === limit.packageName);

      const isResetToday = limit.resetAt >= startOfToday;
      const baseUsage = isResetToday ? limit.usageAtReset || 0 : 0;

      const currentTotalUsage = stat?.totalTimeInForeground ?? 0;
      const effectiveUsageMs = Math.max(0, currentTotalUsage - baseUsage);
      const minutesUsed = Math.floor(effectiveUsageMs / 1000 / 60);

      return {
        id: limit.packageName,
        name: limit.appName,
        limitMinutes: limit.limitMinutes,
        usedMinutes: minutesUsed,
        isPaused: !!limit.isPaused,
        icon: appInfo?.appIcon ?? stat?.appIcon,
      };
    });

    setFiles(activeFiles);
  };

  useFocusEffect(
    useCallback(() => {
      void fetchData();
    }, []),
  );

  const toggleFile = async (id: string) => {
    toggleAppLimitPause(id);
    await fetchData();
  };

  return (
    <Screen showBackButton={false}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.leftHeader}>
            <TouchableOpacity onPress={() => setShowTooltip(!showTooltip)} activeOpacity={0.7}>
              <Image source={mascotImg} style={styles.mascotSmall} />
            </TouchableOpacity>
            <Text style={styles.screenTitle}>Active Files</Text>
          </View>

          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.navigate('AddLimit')}
          >
            <FolderPlus size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {showTooltip && (
          <Animated.View entering={FadeInRight.duration(300)} style={styles.bubble}>
            <Text style={styles.bubbleText}>
              {files.length > 0
                ? `${files.length} active surveillance files. HQ is monitoring.`
                : 'No active files. HQ has nothing to monitor.'}
            </Text>
          </Animated.View>
        )}

        {files.length > 0 ? (
          <ScrollView contentContainerStyle={styles.listContent}>
            {files.map((file: ActiveFile, index: number) => (
              <FileCard
                key={file.id}
                file={file}
                index={index}
                onToggle={(id: string) => {
                  void toggleFile(id);
                }}
                onPress={(id: string) => {
                  navigation.navigate('EditLimit', { limitId: id });
                }}
              />
            ))}
          </ScrollView>
        ) : (
          <View style={styles.emptyContainer}>
            <Image source={mascotImg} style={styles.mascotLarge} />
            <Text style={styles.emptyTitle}>No active files.</Text>
            <Text style={styles.emptySubtitle}>HQ has nothing to monitor. Add a target.</Text>
            <TouchableOpacity 
              style={styles.addBtn}
              onPress={() => navigation.navigate('AddLimit')}
            >
              <Plus size={24} color={colors.black} />
              <Text style={styles.addBtnText}>Open new file</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Screen>
  );
};

export default ActiveFilesScreen;
