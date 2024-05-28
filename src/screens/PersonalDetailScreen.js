import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import BackbuttonComponent from '../components/BackbuttonComponent';
import NumberTextinputComponent from '../components/NumberTextinputComponent';
import TextInputComponent from '../components/TextInputComponent';
import ButtonComponent from '../components/ButtonComponent';
import { HEIGHT, WIDTH } from '../constants/Dimension';
import colors from '../constants/Colors';
import { backarrow } from '../assets/images';
import CountryPicker from 'react-native-country-picker-modal';

const PersonalDetailScreen = () => {
    const [isSameNumber, setIsSameNumber] = useState(false);
    const navigation = useNavigation();

    return (
        <View style={styles.mainContainer}>
            <View style={styles.subContainer}>
                <BackbuttonComponent
                    backarrow={backarrow}
                    onPress={() => navigation.goBack()}
                    containStyle={styles.buttonContainerStyle}
                />
                <Text style={styles.headerText}>Update Your Personal Details</Text>
                <View style={styles.formContainer}>
                    <NumberTextinputComponent
                    placeholder="Phone Number"
                    />
                    <View style={styles.checkboxContainer}>
                        <TouchableOpacity
                            style={[styles.checkbox, isSameNumber && styles.checkedBackground]}
                            onPress={() => setIsSameNumber(!isSameNumber)}
                        >
                            {isSameNumber && <MaterialIcons name="check" size={20} color={colors.white} />}
                        </TouchableOpacity>
                        <Text style={styles.checkboxLabel}>Is this your WhatsApp Number</Text>
                    </View>
                    {!isSameNumber && (
                        <NumberTextinputComponent
                            placeholder="WhatsApp Number"
                            containerStyle={styles.additionalInput}
                        />
                    )}
                    <Text style={styles.addressLabel}>Your Current Address</Text>
                    <TextInputComponent
                        placeholder="Postcode"
                        width={WIDTH * 0.9}
                        rightComponent={
                            <View>
                                <Text style={styles.lookupText}>Lookup</Text>
                            </View>
                        }
                        rightStyle={styles.lookupButton}
                        containerStyle={styles.inputSpacing}
                    />
                    <TextInputComponent
                        placeholder="Select Address"
                        width={WIDTH * 0.9}
                        rightComponent={<MaterialIcons name="keyboard-arrow-down" size={30} color={colors.black} />}
                        containerStyle={styles.inputSpacing}
                    />
                    <ButtonComponent
                        buttonValue="Next"
                        textStyle={styles.buttonText}
                        buttonStyle={styles.nextButton}
                        onPress={() => navigation.navigate("DocumentScreen")}
                    />
                </View>
            </View>
        </View>
    );
};

export default PersonalDetailScreen;

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: colors.white,
        flex: 1,
    },
    subContainer: {
        marginHorizontal: WIDTH * 0.05,
    },
    buttonContainerStyle: {
        marginTop: HEIGHT * 0.08,
    },
    headerText: {
        fontSize: 27,
        fontWeight: '500',
        width: WIDTH * 0.7,
        marginTop: HEIGHT * 0.06,
    },
    formContainer: {
        marginTop: HEIGHT * 0.05,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    checkbox: {
        width: WIDTH * 0.08,
        height: HEIGHT * 0.04,
        backgroundColor: colors.lightgrey,
        borderRadius: WIDTH * 0.015,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkedBackground: {
        backgroundColor: colors.orange,
    },
    checkboxLabel: {
        marginLeft: 10,
    },
    additionalInput: {
        marginTop: HEIGHT * 0.03,
    },
    addressLabel: {
        marginTop: HEIGHT * 0.03,
        fontSize: 15,
        fontWeight: '500',
    },
    lookupText: {
        color: colors.white,
    },
    lookupButton: {
        backgroundColor: colors.orange,
        padding: WIDTH * 0.03,
        borderRadius: WIDTH * 0.02,
    },
    inputSpacing: {
        marginTop: HEIGHT * 0.02,
    },
    buttonText: {
        color: colors.white,
    },
    nextButton: {
        width: WIDTH * 0.89,
        backgroundColor: colors.orange,
        marginTop: HEIGHT * 0.05,
    },
});

