/* eslint-disable react-native/no-unused-styles */
import React, { useMemo } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
  StyleProp,
  TextStyle,
  ActivityIndicator,
  GestureResponderEvent,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme, ThemeType } from '../../theme';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

interface AppButtonProps extends TouchableOpacityProps {
  title?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  gradientColors?: string[];
  leftIcon?: React.ReactNode;
}

const createStyles = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      borderRadius: 12,
      height: 56,
      justifyContent: 'center',
      overflow: 'hidden',
      width: '100%',
    },
    contentRow: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    gradient: {
      alignItems: 'center',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      paddingHorizontal: 20,
      width: '100%',
    },
    outlineContainer: {
      borderWidth: 1,
    },
    text: {
      fontFamily: theme.typography.mono.medium, // Using Syne Bold for CTA
      fontSize: 11,
      letterSpacing: 2,
      textTransform: 'uppercase',
    },
    textWithIcon: {
      marginLeft: 8,
    },
    transparent: {
      backgroundColor: theme.colors.transparent,
    },
  });

export const AppButton: React.FC<AppButtonProps> = ({
  title,
  variant = 'primary',
  loading = false,
  style,
  textStyle,
  gradientColors,
  leftIcon,
  onPressIn,
  onPressOut,
  ...props
}) => {
  const { theme } = useTheme();
  const scale = useSharedValue(1);

  const styles = useMemo(() => createStyles(theme), [theme]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = (e: GestureResponderEvent) => {
    scale.set(withSpring(0.96));
    onPressIn?.(e);
  };

  const handlePressOut = (e: GestureResponderEvent) => {
    scale.set(withSpring(1));
    onPressOut?.(e);
  };

  const renderContent = () => {
    if (loading) {
      return (
        <ActivityIndicator
          color={isPrimary ? theme.colors.black : theme.colors.primary}
        />
      );
    }
    return (
      <View style={styles.contentRow}>
        {leftIcon}
        {title ? (
          <Text
            style={[
              styles.text,
              variant === 'primary' && { color: theme.colors.black },
              variant === 'secondary' && { color: theme.colors.textPrimary },
              variant === 'outline' && { color: theme.colors.primary },
              variant === 'ghost' && { color: theme.colors.textSecondary },
              textStyle,
              !!leftIcon && styles.textWithIcon,
            ]}
          >
            {title}
          </Text>
        ) : null}
      </View>
    );
  };

  const isPrimary = variant === 'primary';
  const defaultGradient = ['#E0F566', '#CBE91B', '#AECC00'];

  if (isPrimary) {
    return (
      <AnimatedTouchableOpacity
        activeOpacity={0.8}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[styles.container, animatedStyle, style]}
        {...props}
      >
        <LinearGradient
          colors={gradientColors ?? defaultGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        >
          {renderContent()}
        </LinearGradient>
      </AnimatedTouchableOpacity>
    );
  }

  return (
    <AnimatedTouchableOpacity
      activeOpacity={0.8}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[
        styles.container,
        variant === 'secondary' && { backgroundColor: theme.colors.surface },
        variant === 'outline' && [styles.outlineContainer, { borderColor: theme.colors.primary }],
        variant === 'ghost' && styles.transparent,
        animatedStyle,
        style,
      ]}
      {...props}
    >
      {renderContent()}
    </AnimatedTouchableOpacity>
  );
};
