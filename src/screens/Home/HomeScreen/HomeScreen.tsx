import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { HomeStackParamList } from '../../../navigation/types';
import { colors } from '../../../theme';

export const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Endloop</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Go to App Details"
          onPress={() => {
            navigation.navigate('AppDetails', { appId: 'sample-app-id' });
          }}
        />
        <Button
          title="Go to Roast Details"
          onPress={() => {
            navigation.navigate('RoastDetails', { roastId: 'sample-roast-id' });
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    gap: 12,
    marginTop: 24,
  },
  container: {
    alignItems: 'center',
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    color: colors.textPrimary,
    fontSize: 32,
    fontWeight: 'bold',
  },
});


