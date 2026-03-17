import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { View, Text, Button } from 'react-native';
import { RootStackParamList } from '../../navigation/types';


export const Home = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Endloop</Text>
            <Button title="Profile" onPress={() => {
                navigation.navigate('Profile');
            }} />
        </View>
    )
}