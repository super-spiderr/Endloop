import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { OnboardingStackParamList } from '../../../navigation/types';
import { colors } from '../../../theme';

export const RoastStyleScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<OnboardingStackParamList>>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Roast Style</Text>
      <Text style={styles.subtitle}>How aggressive should the roasts be?</Text>
      <Button
        title="Continue"
        onPress={() => navigation.navigate('AllDone')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 18,
    marginBottom: 48,
    textAlign: 'center',
  },
  title: {
    color: colors.textPrimary,
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
});


