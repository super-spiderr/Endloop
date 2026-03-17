import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '../screens/Home';
import { Profile } from '../screens/Profile';
import { AppStackParamList, RootStackParamList } from './types';
import { TabNavigator } from './TabNavigator';

const Stack = createNativeStackNavigator<AppStackParamList>();


export const AppNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={TabNavigator} />
            <Stack.Screen name="Profile" component={Profile} />
        </Stack.Navigator>
    )
}