import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import colors from '../constants/Colors'
import { HEIGHT, WIDTH } from '../constants/Dimension'
import BackbuttonComponent from '../components/BackbuttonComponent'
import { backarrow, google } from '../assets/images'
import { useNavigation } from '@react-navigation/native'
import TextInputComponent from '../components/TextInputComponent'
import { MaterialIcons } from '@expo/vector-icons';
import ButtonComponent from '../components/ButtonComponent'

const LoginScreen = () => {
    const navigation = useNavigation()
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    }
    const loginOtpNavigate = () => {
        navigation.navigate("LoginOtpScreen")
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.subContainer}>
                <BackbuttonComponent
                    ackarrow={backarrow}
                    onPress={() => navigation.goBack()}
                    containStyle={styles.buttonContainerStyle}
                />
                <Text style={styles.headerText}>Welcome back! Glad to see you.Again!</Text>
                <TextInputComponent
                    placeholder="Enter your email"
                    containerStyle={styles.textinputStyle}
                />
                <TextInputComponent
                    placeholder="Enter your password"
                    // keyboardType="numeric"
                    secureTextEntry={!passwordVisible}
                    containerStyle={styles.textinputStyle}
                    rightComponent={
                        <TouchableOpacity onPress={togglePasswordVisibility}>
                            <MaterialIcons name={passwordVisible ? "visibility" : "visibility-off"} size={20} color={colors.black} />
                        </TouchableOpacity>
                    }
                />
                <Text style={styles.passwordStyle}>Forgot Password?</Text>
                <ButtonComponent
                    // onPress={loginNavigate}
                    buttonValue="Login"
                    buttonContainer={styles.loginButton}
                />
                <ButtonComponent
                    onPress={loginOtpNavigate}
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
                    buttonIcon={google}
                    buttonContainer={styles.googleButton}
                    labelStyle={styles.textStyle}
                />

            </View>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.white,
    },
    subContainer: {
        marginHorizontal: WIDTH * 0.05
    },
    buttonContainerStyle: {
        marginTop: HEIGHT * 0.08,
    },
    headerText: {
        fontSize: 27,
        fontWeight: '500',
        marginTop: HEIGHT * 0.08
    },
    textinputStyle: {
        colors: colors.grey,
        marginTop: HEIGHT * 0.03,
        padding: HEIGHT * 0.005
    },
    passwordStyle: {
        textAlign: 'right',
        fontSize: 15,
        fontWeight: '400',
        color: colors.lightash
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
    googleButton: {
        borderWidth: 1,
        width: WIDTH * 0.9,
        height: HEIGHT * 0.08,
        borderRadius: WIDTH * 0.02,
        borderColor: colors.grey
    },
    textStyle: {
        color: colors.black,
        fontWeight: '500',
        fontSize: 15,
        marginLeft: WIDTH * 0.02
    },
})
