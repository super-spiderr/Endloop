import React, { useMemo, useEffect } from 'react';
import { useTheme } from '../../../theme';
import { createStyles } from './styles';

import { View, Dimensions, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/types';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  runOnJS,
  Easing,
} from 'react-native-reanimated';

import AppUsageMethods from '../../../native/AppUsageModule';
import { getHasLaunched } from '../../../utils/storage';

const { width, height } = Dimensions.get('window');

import MainLogo from '../../../assets/svgs/MainLogo';

export const SplashScreen = () => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // Animation values
  const screenOpacity = useSharedValue(1);
  const logoScale = useSharedValue(0.8);
  const logoOpacity = useSharedValue(0);
  const wordmarkOpacity = useSharedValue(0);
  const infoOpacity = useSharedValue(0);
  const scanLineY = useSharedValue(-100);

  const checkStateAndNavigate = async () => {
    try {
      const launched = getHasLaunched();
      if (!launched) {
        navigation.replace('Onboarding', { screen: 'Welcome' });
        return;
      }

      const hasPermission = await AppUsageMethods.hasUsagePermission();
      if (!hasPermission) {
        navigation.replace('Onboarding', { screen: 'Permission' });
        return;
      }

      navigation.replace('App', {
        screen: 'HomeStack',
        params: { screen: 'HomeScreen' },
      });
    } catch {
      // Fallback navigation in case of any error
      navigation.replace('Onboarding', { screen: 'Welcome' });
    }
  };

  useEffect(() => {
    // 0.0s — Scan line sweep starts — 0.8s duration
    scanLineY.value = withTiming(height + 100, {
      duration: 1000,
      easing: Easing.linear,
    });

    // 0.3s — Logo fades in + scales up to 100% (1.0) — 0.6s duration
    logoOpacity.value = withDelay(
      300,
      withTiming(1, {
        duration: 600,
        easing: Easing.out(Easing.quad),
      }),
    );
    logoScale.value = withDelay(
      300,
      withTiming(1, {
        duration: 600,
        easing: Easing.out(Easing.quad),
      }),
    );

    // 1.2s — "endloop" wordmark fades in — 0.4s duration
    wordmarkOpacity.value = withDelay(
      1200,
      withTiming(1, {
        duration: 400,
        easing: Easing.out(Easing.quad),
      }),
    );

    // 2.0s — Classification text appears — 0.3s fade
    infoOpacity.value = withDelay(
      2000,
      withTiming(
        1,
        {
          duration: 300,
          easing: Easing.out(Easing.quad),
        },
        () => {
          // 2.8s — Navigate
          runOnJS(checkStateAndNavigate)();
        },
      ),
    );
  }, []);

  const animatedScreenStyle = useAnimatedStyle(() => ({
    opacity: screenOpacity.value,
  }));

  const animatedLogoStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ scale: logoScale.value }],
  }));

  const animatedWordmarkStyle = useAnimatedStyle(() => ({
    opacity: wordmarkOpacity.value,
  }));

  const animatedInfoStyle = useAnimatedStyle(() => ({
    opacity: infoOpacity.value,
  }));

  const animatedScanLineStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: scanLineY.value }],
  }));

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <Animated.View style={[{ flex: 1 }, animatedScreenStyle]}>
        <LinearGradient
          colors={['#CBE91B', '#DDFF62']}
          style={styles.container}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {/* Scan Line */}
          <Animated.View
            style={[
              {
                position: 'absolute',
                width: '100%',
                height: 2,
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                zIndex: 10,
                shadowColor: '#fff',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 1,
                shadowRadius: 10,
                elevation: 5,
              },
              animatedScanLineStyle,
            ]}
          />

          <View style={{ alignItems: 'center' }}>
            <Animated.View style={animatedLogoStyle}>
              <MainLogo size={width * 0.25} color="#000000" />
            </Animated.View>

            <Animated.View style={[animatedWordmarkStyle, { marginTop: 16 }]}>
              <Text
                style={{
                  fontSize: 36,
                  fontWeight: '900',
                  color: '#000',
                  letterSpacing: -1.5,
                  textAlign: 'center',
                }}
              >
                endloop
              </Text>
            </Animated.View>
          </View>

          <Animated.View style={[animatedInfoStyle, { position: 'absolute', bottom: 60 }]}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '600',
                color: 'rgba(0,0,0,0.4)',
                letterSpacing: 3,
                textAlign: 'center',
              }}
            >
              AGENT LOOP INITIALISING...
            </Text>
          </Animated.View>
        </LinearGradient>
      </Animated.View>
    </View>
  );
};
