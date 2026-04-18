import React, { useEffect } from 'react';
import { TextInput, TextInputProps } from 'react-native';
import Animated, { useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated';

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  style?: TextInputProps['style'];
  prefix?: string;
  suffix?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration = 1000,
  style,
  prefix = '',
  suffix = '',
}) => {
  const sharedValue = useSharedValue(0);

  useEffect(() => {
    sharedValue.value = withTiming(value, { duration });
  }, [sharedValue, value, duration]);

  const animatedProps = useAnimatedProps(() => {
    const roundedValue = Math.floor(sharedValue.value);
    return {
      text: `${prefix}${roundedValue}${suffix}`,
    } as unknown as Partial<TextInputProps>;
  });

  return (
    <AnimatedTextInput
      underlineColorAndroid="transparent"
      editable={false}
      style={style}
      animatedProps={animatedProps}
      defaultValue={value.toString()}
    />
  );
};
