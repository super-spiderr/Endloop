import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const StreakScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Welcome to StreakScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
