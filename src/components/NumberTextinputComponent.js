import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { HEIGHT, WIDTH } from '../constants/Dimension'

const NumberTextinputComponent = (props) => {
    const { placeholder } = props
    return (
        <View style={{ borderWidth: 1, borderRadius: WIDTH * 0.02, padding: HEIGHT * 0.015, flexDirection: "row" }}>
            <View style={{ borderWidth: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>UKKKKK</Text>
            </View>
            <TextInput
                placeholder={placeholder}
            />
        </View>
    )
}

export default NumberTextinputComponent
