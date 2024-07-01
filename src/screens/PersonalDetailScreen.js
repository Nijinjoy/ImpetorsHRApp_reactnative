import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
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
    const [postcode, setPostcode] = useState('');
    const [addressSuggestions, setAddressSuggestions] = useState([]);
    const [isLookupPerformed, setIsLookupPerformed] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState('');
    const [showAddressInput, setShowAddressInput] = useState(false);

    const handleLookupPress = async () => {
        try {
            console.log('Entered Postcode:', postcode);
            if (!postcode || postcode.trim() === '') {
                throw new Error('Postcode is required.');
            }
            const method = 'find';
            await fetchAddresses(method, postcode);
        } catch (error) {
            console.error('Error fetching addresses:', error.message);
        }
    };

    const fetchAddresses = async (method, postcode) => {
        try {
            const trimmedPostcode = postcode.trim();
            const encodedPostcode = encodeURIComponent(trimmedPostcode);
            const apiKey = 'a1s6ILYqIEqFkF82GY01SA36009';
            const url = `https://api.getAddress.io/${method}/${encodedPostcode}?api-key=${apiKey}`;
            console.log('Fetching URL:', url);
            const response = await fetch(url, {
                method: 'GET',
            });
            console.log('HTTP Status:', response.status);
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error response text:', errorText);
                throw new Error(`HTTP error! Status: ${response.status}, Details: ${errorText}`);
            }
            const data = await response.json();
            console.log('Address Data:', data);

            const formattedAddresses = data.addresses.map(address => {
                const parts = address.split(',').map(part => part.trim());
                const filteredParts = parts.filter(part => part !== '');
                return filteredParts.join(', ');
            });

            setAddressSuggestions(formattedAddresses);
            setIsLookupPerformed(true);
            setShowDropdown(true);
            setShowAddressInput(true);
        } catch (error) {
            console.error('Error fetching addresses:', error.message);
        }
    };

    const truncateAddress = (address, maxLength) => {
        if (address.length <= maxLength) return address;
        return address.substring(0, maxLength) + '...';
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 0}
            style={{ flex: 1 }}
        >
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
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
                                value={postcode}
                                onChangeText={setPostcode}
                                rightComponent={
                                    <TouchableOpacity onPress={handleLookupPress} style={{ backgroundColor: colors.orange, padding: HEIGHT * 0.01, borderRadius: WIDTH * 0.01 }}>
                                        <Text style={styles.lookupText}>Lookup</Text>
                                    </TouchableOpacity>
                                }
                                rightStyle={styles.lookupButton}
                                containerStyle={styles.inputSpacing}
                            />
                            {showAddressInput && (
                                <TextInputComponent
                                    placeholder="Select Address"
                                    value={truncateAddress(selectedAddress, 35)}
                                    editable={false}
                                    width={WIDTH * 0.9}
                                    rightComponent={
                                        <TouchableOpacity onPress={() => setShowDropdown(!showDropdown)}>
                                            <MaterialIcons name="keyboard-arrow-down" size={30} color={colors.black} />
                                        </TouchableOpacity>
                                    }
                                    containerStyle={styles.inputSpacing}
                                />
                            )}

                            <View style={styles.dropdownContainer}>
                                {showDropdown && (
                                    <FlatList
                                        data={addressSuggestions}
                                        renderItem={({ item }) => (
                                            <TouchableOpacity style={styles.addressSuggestionItem} onPress={() => {
                                                setSelectedAddress(item.replace(/,/g, ''));
                                                setShowDropdown(false);
                                            }}>
                                                <Text>{item}</Text>
                                            </TouchableOpacity>
                                        )}
                                        keyExtractor={(item, index) => index.toString()}
                                        contentContainerStyle={{ flexGrow: 1 }}
                                    />
                                )}
                            </View>
                            <ButtonComponent
                                buttonValue="Next"
                                textStyle={styles.buttonText}
                                buttonStyle
                                ={styles.nextButton}
                                onPress={() => navigation.navigate("DocumentScreen")}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default PersonalDetailScreen;

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: colors.white,
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'space-between',
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
        borderWidth: 1,
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
    addressSuggestionItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.lightgrey,
    },
    addressInputContainer: {
        marginTop: HEIGHT * 0.02,
        marginBottom: HEIGHT * 0.02,
    },
    dropdownContainer: {
        overflow: 'scroll',
        marginTop: HEIGHT * 0.01,
        maxHeight: HEIGHT * 0.15,
        borderColor: colors.lightgrey,
        borderRadius: WIDTH * 0.02,
        backgroundColor: colors.white,
    }

});
