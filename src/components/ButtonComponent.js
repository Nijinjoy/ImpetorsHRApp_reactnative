import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import colors from '../constants/Colors'
import { HEIGHT, WIDTH } from '../constants/Dimension'

const ButtonComponent = (props) => {
    const { onPress, buttonStyle, buttonValue, textStyle, iconStyle, buttonIcon } = props
    return (
        <Pressable style={{ width: WIDTH * 0.9, borderRadius: WIDTH * 0.02, padding: HEIGHT * 0.025, justifyContent: "center", alignItems: "center", ...buttonStyle }} onPress={onPress}>
            <Image source={buttonIcon} style={{ iconStyle }} />
            <Text style={{ ...textStyle }}>{buttonValue}</Text>
        </Pressable>
    )
}

export default ButtonComponent
