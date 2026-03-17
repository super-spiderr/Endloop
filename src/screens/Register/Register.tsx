import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const Register = () => {
  return (
    <View style={styles.container}>
      <Text>Register</Text>
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
