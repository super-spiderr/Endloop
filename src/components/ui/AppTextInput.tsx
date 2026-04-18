import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  Text,
  ViewStyle,
  StyleProp,
  TextStyle,
  FocusEvent,
  BlurEvent,
} from 'react-native';
import { useTheme } from '../../theme';
import Animated, {
  useAnimatedStyle,
  withTiming,
  interpolateColor,
  useDerivedValue,
} from 'react-native-reanimated';

interface AppTextInputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const AppTextInput: React.FC<AppTextInputProps> = ({
  label,
  error,
  containerStyle,
  inputStyle,
  leftIcon,
  rightIcon,
  onFocus,
  onBlur,
  ...props
}) => {
  const { theme } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const focusValue = useDerivedValue(() => withTiming(isFocused ? 1 : 0), [isFocused]);

  const animatedContainerStyle = useAnimatedStyle(() => ({
    borderColor: interpolateColor(
      focusValue.value,
      [0, 1],
      [
        error ? theme.colors.error : theme.colors.border,
        error ? theme.colors.error : theme.colors.primary,
      ],
    ),
  }));

  const handleFocus = (e: FocusEvent) => {
    setIsFocused(true);
    if (onFocus) {
      onFocus(e);
    }
  };

  const handleBlur = (e: BlurEvent) => {
    setIsFocused(false);
    if (onBlur) {
      onBlur(e);
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={[styles.label, { color: theme.colors.textSecondary }]}>{label}</Text>}
      <Animated.View
        style={[
          styles.inputWrapper,
          { backgroundColor: theme.colors.surface },
          animatedContainerStyle,
        ]}
      >
        {leftIcon && <View style={styles.icon}>{leftIcon}</View>}
        <TextInput
          style={[styles.input, { color: theme.colors.textPrimary }, inputStyle]}
          placeholderTextColor={theme.colors.textSecondary}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        {rightIcon && <View style={styles.icon}>{rightIcon}</View>}
      </Animated.View>
      {error && <Text style={[styles.error, { color: theme.colors.error }]}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: '100%',
  },
  error: {
    fontSize: 12,
    marginTop: 4,
  },
  icon: {
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    height: '100%',
    paddingHorizontal: 16,
  },
  inputWrapper: {
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1.5,
    flexDirection: 'row',
    height: 56,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
});
