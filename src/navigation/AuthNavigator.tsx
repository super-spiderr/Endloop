import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthStackParamList, RootStackParamList } from './types';
import { Login } from '../screens/Login';
import { Register } from '../screens/Register';

const Stack = createNativeStackNavigator<AuthStackParamList>();


export const AuthNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
    )
}