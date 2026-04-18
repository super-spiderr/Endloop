import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { Alert, Text, View, AppState, AppStateStatus, Animated } from 'react-native';
import { useNavigation, CommonActions, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/types';
import { useTheme } from '../../../theme';
import { createStyles } from './styles';
import AppUsageModule from '../../../native/AppUsageModule';
import { getHasLaunched } from '../../../utils/storage';
import { Screen, AppButton } from '../../../components';
import notifee, { AuthorizationStatus } from '@notifee/react-native';

export const PermissionScreen = () => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [notifPermission, setNotifPermission] = useState<AuthorizationStatus>(
    AuthorizationStatus.NOT_DETERMINED,
  );
  const [usagePermission, setUsagePermission] = useState(false);

  const [screenPunch] = useState(new Animated.Value(0.9));
  const [screenOpacity] = useState(new Animated.Value(0));
  const [punchScale] = useState(new Animated.Value(0.5));
  const [punchOpacity] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.parallel([
      Animated.spring(screenPunch, {
        toValue: 1,
        tension: 50,
        friction: 6,
        useNativeDriver: true,
      }),
      Animated.timing(screenOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, [screenPunch, screenOpacity]);

  const isAllGranted = useMemo(
    () => usagePermission && notifPermission === AuthorizationStatus.AUTHORIZED,
    [usagePermission, notifPermission],
  );

  const checkPermissions = useCallback(async () => {
    try {
      const settings = await notifee.getNotificationSettings();
      // eslint-disable-next-line no-console
      console.log('Notification Status:', settings.authorizationStatus);
      setNotifPermission(settings.authorizationStatus);

      const usageAuth = await AppUsageModule.hasUsagePermission();
      // eslint-disable-next-line no-console
      console.log('Usage Permission result:', usageAuth);
      setUsagePermission(usageAuth);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Permission check failed:', err);
    }
  }, []);

  useEffect(() => {
    // Break the synchronous render chain to satisfy linter and avoid cascading renders
    const timer = setTimeout(() => {
      void checkPermissions();
    }, 0);

    // Re-check when app comes back to foreground
    const subscription = AppState.addEventListener('change', (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active') {
        void checkPermissions();
      }
    });

    return () => {
      subscription.remove();
      clearTimeout(timer);
    };
  }, [checkPermissions]);


  const [showPunch, setShowPunch] = useState(false);

  useFocusEffect(
    useCallback(() => {
      // Reset animation states when returning to this screen
      setShowPunch(false);
      punchScale.setValue(0.5);
      punchOpacity.setValue(0);
    }, [punchScale, punchOpacity])
  );

  const requestNotifPermission = async () => {
    try {
      const settings = await notifee.requestPermission();
      if (settings.authorizationStatus === AuthorizationStatus.DENIED) {
        Alert.alert(
          'Notifications Denied',
          'We cannot show the permission prompt again. Please enable notifications in your phone settings to continue.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Open Settings', onPress: () => { void notifee.openNotificationSettings(); } },
          ],
        );
      }
      void checkPermissions();
    } catch (err) {
      Alert.alert('Error', 'Failed to request notification permission');
      // eslint-disable-next-line no-console
      console.error(err);
    }
  };

  const requestUsagePermission = async () => {
    try {
      const hasPermission = await AppUsageModule.hasUsagePermission();
      // eslint-disable-next-line no-console
      console.log('Manual usage check:', hasPermission);
      if (hasPermission) {
        setUsagePermission(true);
      } else {
        AppUsageModule.openUsageSettings();
      }
      // Re-run the full check regardless
      void checkPermissions();
    } catch (err) {
      Alert.alert('Error', 'Failed to open settings');
      // eslint-disable-next-line no-console
      console.error(err);
    }
  };

  const handleContinue = () => {
    if (isAllGranted) {
      setShowPunch(true);
      // Instant, smooth color wash without the "hesitation"
      Animated.parallel([
        Animated.timing(punchScale, {
          toValue: 70,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(punchOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start(() => {
        const launched = getHasLaunched();
        if (launched) {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'App' }],
            })
          );
        } else {
          navigation.navigate('Onboarding', { screen: 'ProfileSurvey' });
        }
      });
    }
  };

  const renderPermissionItem = (
    title: string,
    desc: string,
    isGranted: boolean,
    onPress: () => void,
  ) => (
    <View style={styles.permissionCard}>
      <View style={styles.cardHeader}>
        <View style={styles.textContainer}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardDesc}>{desc}</Text>
        </View>
        <View style={[styles.statusBadge, isGranted ? styles.statusBadgeActive : styles.statusBadgeInactive]}>
          <Text style={styles.statusText}>{isGranted ? 'ACTIVE' : 'PENDING'}</Text>
        </View>
      </View>
      {!isGranted && (
        <AppButton 
          title="Grant Access" 
          onPress={onPress}
          variant="secondary"
          style={styles.grantButton}
        />
      )}
    </View>
  );

  return (
    <Screen showBackButton={false}>
      <Animated.View 
        style={[
          styles.container,
          {
            opacity: screenOpacity,
            transform: [{ scale: screenPunch }],
          }
        ]}
      >
        <Text style={styles.title}>System Access</Text>
        <Text style={styles.subtitle}>
          Endloop requires these permissions to monitor your usage and send intervention reports.
        </Text>

        <View style={styles.spacer} />

        {renderPermissionItem(
          'Notifications',
          'Needed for instant roasts and intervention alerts when you exceed your limits.',
          notifPermission === AuthorizationStatus.AUTHORIZED,
          () => {
            void requestNotifPermission();
          },
        )}

        <View style={styles.cardSpacer} />

        {renderPermissionItem(
          'Usage Monitoring',
          'Required to track app time and detect when you are stuck in a scroll loop.',
          usagePermission,
          () => {
            void requestUsagePermission();
          },
        )}

        <View style={styles.flexOne} />

        {showPunch ? (
          <Animated.View
            pointerEvents="none"
            style={[
              styles.punchCircle,
              {
                opacity: punchOpacity,
                transform: [{ scale: punchScale }],
              },
            ]}
          />
        ) : null}

        <AppButton
          title={isAllGranted ? "Proceed to Dashboard" : "Waiting for Access..."}
          onPress={handleContinue}
          disabled={!isAllGranted}
        />
      </Animated.View>
    </Screen>
  );
};
