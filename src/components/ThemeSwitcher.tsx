import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { useTheme } from '../theme';

export const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: theme.colors.surface, borderColor: theme.colors.border },
        ]}
        onPress={toggleTheme}
      >
        <Text style={[styles.text, { color: theme.colors.textPrimary }]}>
          {theme.isDark ? '☀️ Switch to Light' : '🌙 Switch to Dark'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  container: {
    marginVertical: 16,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});
