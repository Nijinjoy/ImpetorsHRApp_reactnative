import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SplashScreen from '../screens/SplashScreen'
import DateofBirthScreen from '../screens/DateofBirthScreen'
import PersonalDetailScreen from '../screens/PersonalDetailScreen'
import DocumentScreen from '../screens/DocumentScreen'
import PassportScreen from '../screens/PassportScreen'
import AgreementScreen from '../screens/AgreementScreen'
import PolicyScreen from '../screens/PolicyScreen'
import UniqueIdScreen from '../screens/UniqueIdScreen'
import PreviewScreen from '../screens/PreviewScreen'
import AccessPortalScreen from '../screens/AccessPortalScreen'
import LoginScreen from '../screens/LoginScreen'
import LoginOtpScreen from '../screens/LoginOtpScreen'
import OtpScreen from '../screens/OtpScreen'
import BranchScreen from '../screens/BranchScreen'
import QrcodeScreen from '../screens/QrcodeScreen'
import ProfilePictureScreen from '../screens/ProfilePictureScreen'


const Stack = createNativeStackNavigator();

const Routes = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='SplashScreen' screenOptions={{ headerShown: false }}>
                <Stack.Screen name='SplashScreen' component={SplashScreen} />
                <Stack.Screen name='UniqueIdScreen' component={UniqueIdScreen} />
                <Stack.Screen name='AccessPortalScreen' component={AccessPortalScreen} />
                <Stack.Screen name='LoginScreen' component={LoginScreen} />
                <Stack.Screen name='LoginOtpScreen' component={LoginOtpScreen} />
                <Stack.Screen name='OtpScreen' component={OtpScreen} />
                <Stack.Screen name='BranchScreen' component={BranchScreen} />
                <Stack.Screen name='DateofBirthScreen' component={DateofBirthScreen} />
                <Stack.Screen name='PersonalDetailScreen' component={PersonalDetailScreen} />
                <Stack.Screen name='DocumentScreen' component={DocumentScreen} />
                <Stack.Screen name='PassportScreen' component={PassportScreen} />
                <Stack.Screen name='AgreementScreen' component={AgreementScreen} />
                <Stack.Screen name='PolicyScreen' component={PolicyScreen} />
                <Stack.Screen name='PreviewScreen' component={PreviewScreen} />
                <Stack.Screen name='QrcodeScreen' component={QrcodeScreen} />
                <Stack.Screen name='ProfilePictureScreen' component={ProfilePictureScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes
