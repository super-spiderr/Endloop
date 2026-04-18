import React, { useMemo, useState, useCallback } from 'react';
import { Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import { useTheme } from '../../../theme';
import { createStyles } from './styles';
import { Screen, AppButton } from '../../../components';
import { Plus, Pause, Play, ChevronRight } from 'lucide-react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LimitsStackParamList } from '../../../navigation/types';
import { getAppLimits, toggleAppLimitPause, AppLimit } from '../../../utils/limits';
import AppUsageMethods, { AppUsage } from '../../../native/AppUsageModule';

export const LimitsScreen = () => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const navigation = useNavigation<NativeStackNavigationProp<LimitsStackParamList>>();
  
  const [limits, setLimits] = useState<AppLimit[]>([]);
  const [appStats, setAppStats] = useState<Record<string, AppUsage>>({});

  const refreshData = useCallback(async () => {
    const currentLimits = getAppLimits();
    setLimits(currentLimits);

    try {
      const stats = await AppUsageMethods.getTodayUsageStats();
      const statsMap: Record<string, AppUsage> = {};
      stats.forEach(s => {
        statsMap[s.packageName] = s;
      });
      setAppStats(statsMap);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to fetch app stats for limits:', error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      void refreshData();
    }, [refreshData])
  );

  const handleTogglePause = (packageName: string) => {
    toggleAppLimitPause(packageName);
    void refreshData();
  };

  const renderLimitItem = ({ item }: { item: AppLimit }) => {
    const isPaused = item.isPaused ?? false;
    const stat = appStats[item.packageName];
    
    return (
      <TouchableOpacity 
        style={[styles.limitItem, isPaused && styles.limitItemPaused]}
        onPress={() => navigation.navigate('EditLimit', { limitId: item.packageName })}
      >
        <View style={styles.appIconContainer}>
          {stat?.appIcon ? (
            <Image 
              source={{ uri: `data:image/png;base64,${stat.appIcon}` }} 
              style={styles.appIcon} 
            />
          ) : (
            <View style={styles.appIconPlaceholder}>
              <Text style={styles.appIconText}>{item.appName.charAt(0)}</Text>
            </View>
          )}
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.appName} numberOfLines={1}>{item.appName}</Text>
          <Text style={styles.limitText}>
            {item.limitMinutes}m limit
          </Text>
          <Text style={styles.statusText}>
            {isPaused ? 'Limit paused' : 'Active'}
          </Text>
        </View>

        <View style={styles.actionContainer}>
          <TouchableOpacity 
            style={[styles.toggleContainer, isPaused && styles.toggleActive]}
            onPress={() => handleTogglePause(item.packageName)}
          >
            <View style={[styles.toggleKnob, !isPaused && styles.toggleKnobActive]}>
              {isPaused ? (
                <Play size={12} color={theme.colors.black} fill={theme.colors.black} />
              ) : (
                <Pause size={12} color={theme.colors.primary} fill={theme.colors.primary} />
              )}
            </View>
          </TouchableOpacity>
          <ChevronRight size={20} color={theme.colors.textSecondary} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Screen showBackButton={false}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Control Panel</Text>
          <TouchableOpacity 
            style={styles.plusButton}
            onPress={() => navigation.navigate('AddLimit')}
          >
            <Plus color={theme.colors.black} size={24} />
          </TouchableOpacity>
        </View>

        {limits.length > 0 ? (
          <FlatList
            data={limits}
            keyExtractor={(item) => item.packageName}
            renderItem={renderLimitItem}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              You haven&apos;t set any physical barriers between you and your phone yet.
            </Text>
            <AppButton 
              title="Add Your First Limit"
              onPress={() => navigation.navigate('AddLimit')}
            />
          </View>
        )}
      </View>
    </Screen>
  );
};
