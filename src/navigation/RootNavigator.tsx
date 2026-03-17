import { AppNavigator } from "./AppNavigator"
import { NavigationContainer } from "@react-navigation/native"
import { AuthNavigator } from "./AuthNavigator"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();
export const RootNavigator = () => {
    const isAuthenticated = true
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {isAuthenticated ? (
                <Stack.Screen name="App" component={AppNavigator} />
            ) : (
                <Stack.Screen name="Auth" component={AuthNavigator} />
            )}
        </Stack.Navigator>
    )
}