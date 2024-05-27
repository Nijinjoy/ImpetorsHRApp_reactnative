import { View, Text, TextInput, Image } from 'react-native'
import React from 'react'
import { HEIGHT, WIDTH } from '../constants/Dimension'
import colors from '../constants/Colors'
import { backarrow } from '../assets/images'
import CountryPicker from 'react-native-country-picker-modal';


const NumberTextinputComponent = (props) => {
    const { placeholder, containerStyle } = props
    return (
        <View style={{ borderWidth: 1, borderRadius: WIDTH * 0.02, padding: HEIGHT * 0.018, flexDirection: "row", ...containerStyle, borderColor: colors.grey, backgroundColor: colors.lightgrey }}>
            <View style={{ borderWidth: 0, justifyContent: "center", alignItems: "center", flexDirection: "row", backgroundColor: colors.lightash, padding: 5 }}>
                <Image source={{}} />
                <Text>UK</Text>
                <Image source={backarrow} />
            </View>
            <TextInput
                placeholder={placeholder}
                style={{ marginHorizontal: WIDTH * 0.04 }}
            />
        </View>
    )
}

export default NumberTextinputComponent
