import React, { useMemo, useState, useEffect } from 'react';
import { Text, View, ActivityIndicator, Image, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { Lock, Pencil } from 'lucide-react-native';
import { OnboardingStackParamList } from '../../../navigation/types';
import { useTheme } from '../../../theme';
import { Screen, AppButton, AppTextInput } from '../../../components';
import { createStyles } from './styles';
import AppUsageMethods, { AppUsage } from '../../../native/AppUsageModule';
import { setAppLimit } from '../../../utils/limits';

const FALLBACK_APPS: AppUsage[] = [
  {
    packageName: 'instagram',
    appName: 'Instagram',
    totalTimeInForeground: 8100000,
    lastTimeUsed: Date.now(),
  },
  {
    packageName: 'youtube',
    appName: 'YouTube',
    totalTimeInForeground: 6300000,
    lastTimeUsed: Date.now(),
  },
  {
    packageName: 'tiktok',
    appName: 'TikTok',
    totalTimeInForeground: 5400000,
    lastTimeUsed: Date.now(),
  },
];

export const SetLimitsScreen = () => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const navigation = useNavigation<NativeStackNavigationProp<OnboardingStackParamList>>();

  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [topApps, setTopApps] = useState<AppUsage[]>([]);
  const [limitsMap, setLimitsMap] = useState<Record<string, number>>({});
  
  const [modalVisible, setModalVisible] = useState(false);
  const [activePackage, setActivePackage] = useState<string | null>(null);
  const [activeAppName, setActiveAppName] = useState('');
  const [inputHours, setInputHours] = useState('0');
  const [inputMins, setInputMins] = useState('15');

  useEffect(() => {
    const analyze = async () => {
      try {
        const stats = await AppUsageMethods.getTodayUsageStats();
        
        const filtered = stats
          .filter(app => (app.totalTimeInForeground ?? 0) > 60000 && app.appName)
          .sort((a, b) => (b.totalTimeInForeground ?? 0) - (a.totalTimeInForeground ?? 0))
          .slice(0, 3);

        if (filtered.length > 0) {
          setTopApps(filtered);
        } else {
          setTopApps(FALLBACK_APPS);
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to fetch usage stats:', error);
        setTopApps(FALLBACK_APPS);
      }

      setTimeout(() => {
        setIsAnalyzing(false);
      }, 4000);
    };

    void analyze();
  }, []);

  const formatUsage = (ms: number) => {
    const totalMinutes = Math.floor(ms / 1000 / 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  const openLimitModal = (packageName: string, appName: string) => {
    setActivePackage(packageName);
    setActiveAppName(appName);
    setModalVisible(true);
  };

  const handleSaveLimit = () => {
    if (activePackage) {
      const h = Number.parseInt(inputHours, 10) || 0;
      const m = Number.parseInt(inputMins, 10) || 0;
      const totalMins = h * 60 + m;
      
      if (totalMins > 0) {
        setLimitsMap(prev => ({ ...prev, [activePackage]: totalMins }));
      }
    }
    setModalVisible(false);
    setInputHours('0');
    setInputMins('15');
  };

  const handleFinish = async () => {
    const promises = Object.entries(limitsMap).map(([pkg, limit]) => {
      const app = topApps.find(a => a.packageName === pkg);
      return setAppLimit(pkg, app?.appName ?? 'App', limit);
    });
    
    await Promise.all(promises);
    navigation.navigate('RoastStyle');
  };

  const getAppColor = (packageName: string) => {
    const colors = ['#E4405F', '#FF0000', '#000000', '#25D366', '#0077B5', '#1DA1F2'];
    let hash = 0;
    for (let i = 0; i < packageName.length; i++) {
      hash = (packageName.codePointAt(i) ?? 0) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  if (isAnalyzing) {
    return (
      <Screen showBackButton={false}>
        <Animated.View
          entering={FadeIn.duration(800)}
          exiting={FadeOut.duration(400)}
          style={styles.analyzingContainer}
        >
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={styles.analyzingText}>
            Analyzing your usage patterns...
          </Text>
          <Text style={[styles.subtitle, styles.analyzingSubtitle]}>
            Identifying time sinks and habits.
          </Text>
        </Animated.View>
      </Screen>
    );
  }

  return (
    <Screen showBackButton={true}>
      <View style={styles.container}>
        <Animated.View entering={FadeIn.duration(800)}>
          <Text style={styles.title}>Choose Your Battles</Text>
          <Text style={styles.subtitle}>
            We found the apps stealing your life. Which ones should we guard first?
          </Text>

          <View style={styles.appList}>
            {topApps.map(app => (
              <View
                key={app.packageName}
                style={styles.appCard}
              >
                {app.appIcon ? (
                  <Image source={{ uri: `data:image/png;base64,${app.appIcon}` }} style={styles.appIcon} />
                ) : (
                  <View style={[styles.appIcon, { backgroundColor: getAppColor(app.packageName) }]} />
                )}
                <View style={styles.appInfo}>
                  <Text style={styles.appName}>{app.appName}</Text>
                  {limitsMap[app.packageName] ? (
                    <Text style={styles.limitText}>
                      LIMIT: {Math.floor(limitsMap[app.packageName] / 60)}H {limitsMap[app.packageName] % 60}M
                    </Text>
                  ) : (
                    <Text style={[styles.appUsage, { color: theme.colors.textSecondary }]}>
                      {formatUsage(app.totalTimeInForeground ?? 0)} today
                    </Text>
                  )}
                </View>
                <AppButton
                  variant={limitsMap[app.packageName] ? 'outline' : 'secondary'}
                  onPress={() => openLimitModal(app.packageName, app.appName)}
                  style={styles.restrictButton}
                  leftIcon={
                    limitsMap[app.packageName] ? (
                      <Pencil size={20} color={theme.colors.primary} />
                    ) : (
                      <Lock size={20} color={theme.colors.textPrimary} />
                    )
                  }
                />
              </View>
            ))}
          </View>
        </Animated.View>

        <View style={styles.footerContainer}>
          <AppButton
            title={Object.keys(limitsMap).length > 0 ? 'Set Limits' : 'Select Apps'}
            onPress={() => {
              void handleFinish();
            }}
            disabled={Object.keys(limitsMap).length === 0}
          />
          <AppButton
            title="Skip for now"
            variant="ghost"
            onPress={() => navigation.navigate('RoastStyle')}
            style={styles.skipButton}
          />
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>
              Limit for {activeAppName}
            </Text>
            <View style={styles.modalInputRow}>
              <View style={styles.modalCol}>
                <Text style={styles.modalInputLabel}>Hours</Text>
                <AppTextInput
                  value={inputHours}
                  onChangeText={setInputHours}
                  keyboardType="numeric"
                  placeholder="0"
                />
              </View>
              <View style={styles.modalCol}>
                <Text style={styles.modalInputLabel}>Mins</Text>
                <AppTextInput
                  value={inputMins}
                  onChangeText={setInputMins}
                  keyboardType="numeric"
                  placeholder="30"
                />
              </View>
            </View>
            <View style={styles.modalButtons}>
              <AppButton
                title="Cancel"
                variant="secondary"
                onPress={() => setModalVisible(false)}
                style={styles.modalCancelButton}
              />
              <AppButton
                title="OK"
                onPress={handleSaveLimit}
                style={styles.modalCol}
              />
            </View>
          </View>
        </View>
      </Modal>
    </Screen>
  );
};
