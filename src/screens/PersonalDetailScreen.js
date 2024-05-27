import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { HEIGHT, WIDTH } from '../constants/Dimension'
import colors from '../constants/Colors'
import BackbuttonComponent from '../components/BackbuttonComponent'
import { backarrow } from '../assets/images'
import { useNavigation } from '@react-navigation/native'
import NumberTextinputComponent from '../components/NumberTextinputComponent'

const PersonalDetailScreen = () => {
    const [isSameNumber, setIsSameNumber] = useState(false)
    const navigation = useNavigation()

    return (
        <View style={styles.mainContainer}>
            <View style={styles.subContainer}>
                <BackbuttonComponent
                    backarrow={backarrow}
                    onPress={() => navigation.goBack()}
                    containStyle={styles.buttonContainerStyle}
                />
                <Text style={styles.headerText}>Update Your Personal Details</Text>
                <NumberTextinputComponent
                    placeholder="Phone Number"
                />
                <View style={styles.checkboxContainer}>
                    <TouchableOpacity
                        style={styles.checkbox}
                        onPress={() => setIsSameNumber(!isSameNumber)}
                    >
                        {isSameNumber && <View style={styles.checked} />}
                    </TouchableOpacity>
                    <Text style={styles.checkboxLabel}>Is this your WhatsApp Number</Text>
                </View>

                {!isSameNumber && (
                    <NumberTextinputComponent
                        placeholder="WhatsApp Number"
                    />
                )}
            </View>
        </View>
    )
}

export default PersonalDetailScreen

const styles = StyleSheet.create({
    subContainer: {
        marginHorizontal: WIDTH * 0.05
    },
    mainContainer: {
        backgroundColor: colors.white,
        flex: 1
    },
    buttonContainerStyle: {
        marginTop: HEIGHT * 0.08
    },
    headerText: {
        fontSize: 27,
        fontWeight: "500",
        width: WIDTH * 0.7,
        marginTop: HEIGHT * 0.06
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10
    },
    checkbox: {
        borderWidth: 1,
        width: WIDTH * 0.08,
        height: HEIGHT * 0.04,
        borderRadius: WIDTH * 0.01,
        justifyContent: 'center',
        alignItems: 'center'
    },
    checked: {
        width: '100%',
        height: '100%',
        backgroundColor: colors.black
    },
    checkboxLabel: {
        marginLeft: 10
    }
});
