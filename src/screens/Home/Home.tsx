import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { AppStackParamList } from '../../navigation/types';

export const Home = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  return (
    <View style={styles.container}>
      <Text>Endloop</Text>
      <Button
        title="Profile"
        onPress={() => {
          navigation.navigate('Profile');
        }}
      />
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
