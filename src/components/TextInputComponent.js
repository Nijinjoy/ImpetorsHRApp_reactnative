import { View, Text, TextInput, Image } from 'react-native'
import React from 'react'
import { WIDTH } from '../constants/Dimension'
import colors from '../constants/Colors'
import { backarrow, eye } from '../assets/images'

const TextInputComponent = (props) => {
    const { containerStyle, placeholder, textIcon, secureTextEntry, width, rightComponent, rightStyle } = props
    return (
        <View style={{ ...containerStyle, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            <TextInput
                secureTextEntry={secureTextEntry}
                placeholder={placeholder}
                style={{ borderWidth: 1, borderColor: 'rgba(0, 0, 0, 0.2)', padding: WIDTH * 0.04, width: width, borderRadius: WIDTH * 0.02, backgroundColor: colors.lightgrey }}
            />
            {rightComponent && (
                <View style={{ position: "absolute", right: WIDTH * 0.02, ...rightStyle }}>
                    {rightComponent}
                </View>
            )}
        </View>
    )
}

export default TextInputComponent;


