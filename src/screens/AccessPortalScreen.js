import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import colors from '../constants/Colors'
import { HEIGHT, WIDTH } from '../constants/Dimension'
import { appIcon, google } from '../assets/images'
import ButtonComponent from '../components/ButtonComponent'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import { useAuthRequest } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import { makeRedirectUri } from 'expo-auth-session';


const AccessPortalScreen = () => {
    const navigation = useNavigation()
    const [userInfo, setUserInfo] = useState(null)

    const [request, response, promptAsync] = Google.useAuthRequest({
        webClientId:
            "129749438564-j8ip9hfhn17i1nrrqo501i61psmkvpj3.apps.googleusercontent.com",
        androidClientId:
            "129749438564-l101s7tis6lp4gvig7uq8lrh2i9o12k7.apps.googleusercontent.com",
        iosClientId:
            "129749438564-p8uo40hv1kse0tbqf3nk9ofl7mgpv3cs.apps.googleusercontent.com",
        redirectUri: makeRedirectUri({ useProxy: true }, { useProxy: true }),
    }
    )

    const loginNavigate = () => {
        navigation.navigate("LoginScreen")
    }

    const handleLoginWithGoogle = async () => {
        try {
            const result = await promptAsync();
            if (result.type === 'success') {
                console.log('Authentication successful:', result.params);
                navigation.navigate('LoggedInScreen');
            } else {
                console.log('Authentication canceled');
            }
        } catch (e) {
            console.error('Authentication error:', e.message);
        }
    };

    return (
        <View style={styles.mainContainer}>
            <View style={styles.subContainer}>
                <Image source={appIcon} resizeMode='contain' style={styles.iconStyle} />
                <Text style={{ fontSize: 27, fontWeight: '500', textAlign: 'center', marginTop: HEIGHT * 0.15 }}>Access Your HR Portal On-the-Go!</Text>
                <ButtonComponent
                    onPress={loginNavigate}
                    buttonValue="Login"
                    buttonContainer={styles.loginButton}
                />
                <ButtonComponent
                    buttonValue="Login With OTP"
                    buttonContainer={styles.otpButton}
                    labelStyle={styles.labelStyle}
                />

                <View style={styles.orContainer}>
                    <View style={styles.line} />
                    <Text tyle={styles.orText}>Or Continue Log In with</Text>
                    <View style={styles.line} />
                </View>

                <ButtonComponent
                    buttonValue="Google"
                    onPress={handleLoginWithGoogle}
                    buttonIcon={google}
                    buttonContainer={styles.googleButton}
                    labelStyle={styles.textStyle}
                />
            </View>
        </View>
    )
}

export default AccessPortalScreen

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.white,
    },
    subContainer: {
        alignItems: "center",
        marginHorizontal: WIDTH * 0.05
    },
    iconStyle: {
        marginTop: HEIGHT * 0.1,
        width: WIDTH * 0.3,
        height: WIDTH * 0.3
    },
    otpButton: {
        backgroundColor: colors.white,
        borderWidth: 1,
        width: WIDTH * 0.9,
        height: HEIGHT * 0.08,
        borderRadius: WIDTH * 0.02,
        borderColor: colors.orange
    },
    labelStyle: {
        color: colors.orange,
        fontWeight: '500',
        fontSize: 15,
        marginHorizontal: WIDTH * 0.07
    },
    googleButton: {
        borderWidth: 1,
        width: WIDTH * 0.9,
        height: HEIGHT * 0.08,
        borderRadius: WIDTH * 0.02,
        borderColor: colors.grey,
        marginVertical: HEIGHT * 0.025
    },
    textStyle: {
        color: colors.black,
        fontWeight: '500',
        fontSize: 15,
        marginLeft: WIDTH * 0.02
    },
    loginButton: {
        backgroundColor: colors.orange,
        width: WIDTH * 0.9,
        height: HEIGHT * 0.08,
        borderRadius: WIDTH * 0.02,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: HEIGHT * 0.03,
    },
    orContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: HEIGHT * 0.025,
        width: WIDTH * 0.9,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: colors.grey,
    },
    orText: {
        marginHorizontal: WIDTH * 0.02,
        fontSize: 16,
        color: colors.black,
    },

})


// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View,Button } from 'react-native';
// import { useAuthRequest } from 'expo-auth-session';
// import * as Google from 'expo-auth-session/providers/google';
// import { useEffect,useState } from 'react';
// import { makeRedirectUri } from 'expo-auth-session';

// export default function App() {
//   const [userInfo,setUserInfo]= useState(null)
// const [request,response,promptAsync]=Google.useAuthRequest({
//   webClientId:
//   "129749438564-j8ip9hfhn17i1nrrqo501i61psmkvpj3.apps.googleusercontent.com",
//   androidClientId:
//   "129749438564-l101s7tis6lp4gvig7uq8lrh2i9o12k7.apps.googleusercontent.com",
//   iosClientId:
//   "129749438564-p8uo40hv1kse0tbqf3nk9ofl7mgpv3cs.apps.googleusercontent.com",
//   redirectUri: makeRedirectUri({ useProxy: true },{useProxy:true}),
// }
// )


//   return (
//     <View style={styles.container}>
//     <View style={{ borderWidth: 2, padding: 10 }}>
//       <Button
//         disabled={!request}
//         title="Login with Google"
//         onPress={() => {
//           promptAsync();
//         }}
//       />
//     </View>
//   </View>
//   );
// }


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
