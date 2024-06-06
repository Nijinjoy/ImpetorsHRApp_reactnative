import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import colors from '../constants/Colors'
import { appIcon } from '../assets/images'
import { HEIGHT, WIDTH } from '../constants/Dimension'
import TextInputComponent from '../components/TextInputComponent'
import ButtonComponent from '../components/ButtonComponent'

const UniqueIdScreen = () => {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.subContainer}>
                <Image source={appIcon} resizeMode='contain' style={styles.iconStyle} />
                <View style={{ alignItems: 'center', marginTop: HEIGHT * 0.13 }}>
                    <Text style={styles.mainText}>Company Unique ID Number</Text>
                    <Text style={styles.subText}>If you don't know this. Then please ask to your employer. </Text>
                </View>
                <TextInputComponent
                    placeholder="Unique ID"
                    keyboardType="numeric"
                    containerStyle={styles.textinputStyle}
                />
                <ButtonComponent
                    buttonValue="Continue"
                    // onPress={handleCancel}
                    textStyle={styles.buttonText}
                    buttonStyle={styles.nextButton}
                />
            </View>
        </View>
    )
}

export default UniqueIdScreen

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
        marginTop: HEIGHT * 0.1
    },
    textinputStyle: {
        colors: colors.grey,
        marginTop: HEIGHT * 0.03,
        padding: HEIGHT * 0.005
    },
    mainText: {
        fontSize: 27,
        fontWeight: '500',
        width: WIDTH * 0.6,
        textAlign: 'center'
    },
    subText: {
        fontSize: 14,
        fontWeight: '400',
        color: colors.ash,
        marginHorizontal: WIDTH * 0.15,
        textAlign: 'center',
        margin: 10
    },
    nextButton: {
        marginTop: HEIGHT * 0.02,
        width: WIDTH * 0.9,
        backgroundColor: colors.orange,
    },
    buttonText: {
        color: colors.white,
    },
})
