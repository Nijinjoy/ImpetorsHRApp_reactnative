import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import { backarrow } from '../assets/images'
import { HEIGHT, WIDTH } from '../constants/Dimension'
import colors from '../constants/Colors'

const BackbuttonComponent = (props) => {
    const { containStyle, onPress } = props
    return (
        <Pressable style={{ borderWidth: 1, width: WIDTH * 0.115, justifyContent: "center", alignItems: "center", marginTop: HEIGHT * 0.05, height: HEIGHT * 0.06, borderRadius: WIDTH * 0.03, padding: WIDTH * 0.05, borderColor: colors.grey, ...containStyle }} onPress={onPress}>
            <Image source={backarrow} style={{ width: WIDTH * 0.05, height: WIDTH * 0.05 }} resizeMode='contain' />
        </Pressable>
    )
}

export default BackbuttonComponent
