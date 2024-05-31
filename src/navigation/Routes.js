import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SplashScreen from '../screens/SplashScreen'
import DateofBirthScreen from '../screens/DateofBirthScreen'
import PersonalDetailScreen from '../screens/PersonalDetailScreen'
import DocumentScreen from '../screens/DocumentScreen'
import PassportScreen from '../screens/PassportScreen'


const Stack = createNativeStackNavigator();

const Routes = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='SplashScreen' screenOptions={{ headerShown: false }}>
                <Stack.Screen name='SplashScreen' component={SplashScreen} />
                <Stack.Screen name='DateofBirthScreen' component={DateofBirthScreen} />
                <Stack.Screen name='PersonalDetailScreen' component={PersonalDetailScreen} />
                <Stack.Screen name='DocumentScreen' component={DocumentScreen} />
                <Stack.Screen name='PassportScreen' component={PassportScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes

//PassportScreen
