import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import colors from '../constants/Colors'
import { HEIGHT, WIDTH } from '../constants/Dimension'
import BackbuttonComponent from '../components/BackbuttonComponent'
import { backarrow, google } from '../assets/images'
import { useNavigation } from '@react-navigation/native'
import TextInputComponent from '../components/TextInputComponent'
import ButtonComponent from '../components/ButtonComponent'

const LoginOtpScreen = () => {
    const navigation = useNavigation()

    const loginOtpNavigate = () => {
        navigation.navigate("OtpScreen")
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.subContainer}>
                <BackbuttonComponent
                    backarrow={backarrow}
                    onPress={() => navigation.goBack()}
                    containStyle={styles.buttonContainerStyle}
                />
                <Text style={styles.mainText}>Login With OTP</Text>
                <Text style={styles.subText}>We will send an OTP to this email.</Text>
                <TextInputComponent
                    placeholder="Enter your email"
                    containerStyle={styles.textinputStyle}
                />
                <ButtonComponent
                    buttonValue="Continue"
                    onPress={loginOtpNavigate}
                    buttonContainer={styles.loginButton}
                    labelStyle={styles.continuetextStyle}
                />

                <View style={styles.bottomContainer}>
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
        </View>
    )
}

export default LoginOtpScreen

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.white,
    },
    buttonContainerStyle: {
        marginTop: HEIGHT * 0.08
    },
    subContainer: {
        marginHorizontal: WIDTH * 0.05,
    },
    mainText: {
        fontSize: 27,
        fontWeight: '500',
        marginTop: HEIGHT * 0.15,
    },
    subText: {
        fontSize: 16,
        fontWeight: '400'
    },
    textinputStyle: {
        colors: colors.grey,
        marginTop: HEIGHT * 0.03,
        padding: HEIGHT * 0.005
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
    continuetextStyle: {
        color: colors.white,
        fontSize: 15
    },
    bottomContainer: {
        marginVertical: HEIGHT * 0.15
    }
})
