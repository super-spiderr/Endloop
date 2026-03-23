import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/types';
import { colors } from '../../../theme';

export const AllDoneScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleFinish = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'App' }],
      })
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Set!</Text>
      <Text style={styles.subtitle}>You&apos;re ready to take back your time.</Text>
      <Button title="Start Using Endloop" onPress={handleFinish} />
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


