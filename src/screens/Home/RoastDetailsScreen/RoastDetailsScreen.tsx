import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const RoastDetailsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Roast Details</Text>
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
