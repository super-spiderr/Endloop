import React from 'react';
import * as LucideIcons from 'lucide-react-native';
import { useTheme } from '../../theme';
import { ColorValue, ViewStyle, StyleProp } from 'react-native';

export type IconName = keyof typeof LucideIcons;

interface IconProps extends LucideIcons.LucideProps {
  name: IconName;
  color?: ColorValue;
  size?: number;
  strokeWidth?: number;
  style?: StyleProp<ViewStyle>;
}

export const Icon = ({ 
  name, 
  color, 
  size = 24, 
  strokeWidth = 2, 
  ...props 
}: IconProps) => {
  const { theme } = useTheme();
  if (!(name in LucideIcons)) {
    // eslint-disable-next-line no-console
    console.warn(`Icon "${name}" not found in lucide-react-native`);
    return null;
  }

  const LucideIcon = LucideIcons[name] as React.ElementType;
  const iconColor = color ?? theme.colors.textPrimary;

  return (
    <LucideIcon 
      color={iconColor} 
      size={size} 
      strokeWidth={strokeWidth} 
      {...props} 
    />
  );
};
