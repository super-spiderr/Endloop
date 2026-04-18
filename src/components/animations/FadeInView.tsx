import React, { useEffect } from 'react';
import { ViewStyle, StyleProp } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
  interpolate,
} from 'react-native-reanimated';

interface FadeInViewProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  translateX?: number;
  translateY?: number;
  style?: StyleProp<ViewStyle>;
}

export const FadeInView: React.FC<FadeInViewProps> = ({
  children,
  delay = 0,
  duration = 600,
  translateX = 0,
  translateY = 0,
  style,
}) => {
  const introValue = useSharedValue(0);

  useEffect(() => {
    introValue.value = withDelay(
      delay,
      withTiming(1, {
        duration,
        easing: Easing.out(Easing.back(1)),
      })
    );
  }, [delay, duration, introValue]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: introValue.value,
    transform: [
      { translateX: interpolate(introValue.value, [0, 1], [translateX, 0]) },
      { translateY: interpolate(introValue.value, [0, 1], [translateY, 0]) },
    ],
  }));

  return (
    <Animated.View style={[style, animatedStyle]}>
      {children}
    </Animated.View>
  );
};
