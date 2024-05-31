import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { HEIGHT, WIDTH } from '../constants/Dimension';
import colors from '../constants/Colors';
import CountryPicker from 'react-native-country-picker-modal';
import { MaterialIcons } from '@expo/vector-icons';

const NumberTextinputComponent = (props) => {
    const { placeholder, containerStyle } = props;
    const [countryCode, setCountryCode] = useState('GB');
    const [callingCode, setCallingCode] = useState('44'); 
    const [countryModalVisible, setCountryModalVisible] = useState(false);

    const onSelectCountry = (country) => {
        setCountryCode(country.cca2);
        setCallingCode(country.callingCode[0]);
        setCountryModalVisible(false);
    };

    return (
        <View style={{ borderWidth: 1, borderRadius: WIDTH * 0.02, padding: HEIGHT * 0.015, flexDirection: "row", ...containerStyle, borderColor: colors.grey, backgroundColor: colors.lightgrey }}>
            <TouchableOpacity onPress={() => setCountryModalVisible(true)} style={{ justifyContent: "center", alignItems: "center", flexDirection: "row", backgroundColor: colors.whiteGrey, borderRadius: WIDTH * 0.02, paddingVertical: WIDTH * 0.02, paddingHorizontal: WIDTH * 0.01, }}>
                <CountryPicker
                    visible={countryModalVisible}
                    onClose={() => setCountryModalVisible(false)}
                    onSelect={onSelectCountry}
                    withFlag
                    withFilter
                    withCallingCode
                    withAlphaFilter
                    countryCode={countryCode}
                    translation="eng"
                />
                <Text style={{ right: WIDTH * 0.02 }}>+{callingCode}</Text>
                <MaterialIcons name="keyboard-arrow-down" size={25} color={colors.black} style={{ right: WIDTH * 0.01 }} />
            </TouchableOpacity>
            <TextInput
                keyboardType="numeric"
                placeholder={placeholder}
                style={{ marginHorizontal: WIDTH * 0.04, flex: 1 }}
            />
        </View>
    );
};

export default NumberTextinputComponent;


