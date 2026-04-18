import React from 'react';
import { View, ViewStyle, StyleProp, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView, Edge } from 'react-native-safe-area-context';
import { useTheme } from '../theme';
import { Icon } from './Icon/Icon';
import { useNavigation } from '@react-navigation/native';

interface ScreenProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  edges?: Edge[];
  title?: string;
  showBackButton?: boolean;
  onBack?: () => void;
}

export const Screen = ({ children, style, edges, title, showBackButton = true, onBack }: ScreenProps) => {
  const { theme } = useTheme();
  const navigation = useNavigation();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView 
      style={[styles.container, { backgroundColor: theme.colors.background }, style]} 
      edges={edges ?? ['top', 'left', 'right', 'bottom']}
    >
      {(title !== undefined || showBackButton) && (
        <View style={styles.header}>
          <View style={styles.leftContainer}>
            {showBackButton && navigation.canGoBack() && (
              <TouchableOpacity 
                activeOpacity={0.7}
                onPress={handleBack} 
                style={[styles.backButton, { backgroundColor: theme.colors.surface }]}
              >
                <Icon color={theme.colors.textPrimary} name="ArrowLeft" size={20} />
              </TouchableOpacity>
            )}
          </View>
          
          {title !== undefined && (
            <View style={styles.titleContainer}>
              <Text style={[styles.titleText, { color: theme.colors.textPrimary }]}>
                {title}
              </Text>
            </View>
          )}
          
          <View style={styles.rightContainer} />
        </View>
      )}
      <View style={styles.content}>
        {children}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backButton: {
    alignItems: 'center',
    borderRadius: 20,
    elevation: 5,
    height: 40,
    justifyContent: 'center',
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    width: 40,
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 64,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  leftContainer: {
    alignItems: 'flex-start',
    width: 40,
  },
  rightContainer: {
    width: 40,
  },
  titleContainer: {
    alignItems: 'center',
    flex: 1,
  },
  titleText: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
