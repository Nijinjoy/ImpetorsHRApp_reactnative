import { View, Text, TextInput, Image, Pressable } from 'react-native'
import React from 'react'
import { HEIGHT, WIDTH } from '../constants/Dimension'
import colors from '../constants/Colors'
import { backarrow, eye } from '../assets/images'

const TextInputComponent = (props) => {
    const { rightComponent, rightStyle, value, onChangeText, editable, placeholder } = props
    return (
        <View style={{ borderWidth: 1, width: WIDTH * 0.9, borderRadius: WIDTH * 0.02, padding: HEIGHT * 0.02, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderColor: colors.grey, marginTop: HEIGHT * 0.02, backgroundColor: colors.lightgrey }}>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <TextInput 
                    placeholder={placeholder}
                    value={value}
                    editable={editable}
                    onChangeText={onChangeText}
                    style={{ marginLeft: WIDTH * 0.02, width: WIDTH * 0.7, color: colors.black }}
                />
            </View>
            {rightComponent && (
                <Pressable style={{ position: "absolute", right: WIDTH * 0.02, ...rightStyle }}>
                    {rightComponent}
                </Pressable>
            )}
        </View>
    )
}

export default TextInputComponent;


