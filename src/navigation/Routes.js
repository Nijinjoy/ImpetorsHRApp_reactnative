import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SplashScreen from '../screens/SplashScreen'
import DateofBirthScreen from '../screens/DateofBirthScreen'


const Stack = createNativeStackNavigator();

const Routes = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='SplashScreen' screenOptions={{ headerShown: false }}>
                <Stack.Screen name='SplashScreen' component={SplashScreen} />
                <Stack.Screen name='DateofBirthScreen' component={DateofBirthScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes

// DateofBirthScreen
