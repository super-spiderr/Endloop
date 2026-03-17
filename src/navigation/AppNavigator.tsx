import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Profile } from '../screens/Profile';
import { TabNavigator } from './TabNavigator';
import { AppStackParamList } from './types';

const Stack = createNativeStackNavigator<AppStackParamList>();

export const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={TabNavigator} />

      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};
