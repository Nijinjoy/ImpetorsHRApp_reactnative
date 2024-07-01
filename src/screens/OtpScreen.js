import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, { useState, useRef } from 'react'
import colors from '../constants/Colors'
import { HEIGHT, WIDTH } from '../constants/Dimension'
import BackbuttonComponent from '../components/BackbuttonComponent'
import { backarrow } from '../assets/images'
import { useNavigation } from '@react-navigation/native'
import ButtonComponent from '../components/ButtonComponent'

const OtpScreen = () => {
    const navigation = useNavigation()
    const [otp, setOtp] = useState(['', '', '', ''])

    const inputRefs = useRef([])

    const handleChange = (text, index) => {
        const newOtp = [...otp]
        newOtp[index] = text
        setOtp(newOtp)

        if (text && index < 3) {
            inputRefs.current[index + 1].focus()
        }
    }

    const otpNavigate = () => {
        navigation.navigate("BranchScreen")
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
                <Text style={styles.subText}>We have sent a 4 digit OTP to ajith***@gmail.com. Please verify</Text>
                <View style={styles.otpContainer}>
                    {otp.map((digit, index) => (
                        <TextInput
                            key={index}
                            ref={(ref) => inputRefs.current[index] = ref}
                            style={styles.otpInput}
                            value={digit}
                            onChangeText={(text) => handleChange(text, index)}
                            keyboardType="numeric"
                            maxLength={1}
                        />
                    ))}
                </View>
                <Text style={styles.validationStyle}>Wrong OTP. Please check the mail or resend.</Text>
                <ButtonComponent
                    buttonValue="Continue"
                    onPress={otpNavigate}
                    buttonContainer={styles.loginButton}
                    labelStyle={styles.continuetextStyle}
                />
                <View style={styles.resendotpContainer}>
                    <Text style={styles.resendotpText}>Resend OTP</Text>
                </View>

            </View>
        </View>
    )
}

export default OtpScreen

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.white,
    },
    subContainer: {
        marginHorizontal: WIDTH * 0.05,
    },
    buttonContainerStyle: {
        marginTop: HEIGHT * 0.08
    },
    mainText: {
        fontSize: 27,
        fontWeight: '500',
        marginTop: HEIGHT * 0.15,
    },
    subText: {
        fontSize: 16,
        fontWeight: '400',
        width: WIDTH * 0.9
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: HEIGHT * 0.03,
    },
    otpInput: {
        borderWidth: 1,
        borderColor: colors.grey,
        borderRadius: WIDTH * 0.03,
        padding: HEIGHT * 0.02,
        textAlign: 'center',
        fontSize: 18,
        width: WIDTH * 0.18,
        backgroundColor: colors.lightgrey
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
    resendotpContainer: {
        alignItems: 'center'
    },
    resendotpText: {
        fontSize: 15,
        fontWeight: '500',
        color: colors.pink,
        textDecorationLine: 'underline',
    },
    validationStyle: {
        color: colors.pink,
        marginVertical: HEIGHT * 0.01,
        fontWeight: '400'
    }
})
