import { View, Text, StyleSheet, Pressable, Image } from 'react-native'
import React from 'react'
import { HEIGHT, WIDTH } from '../constants/Dimension'
import colors from '../constants/Colors'

const ButtonComponent = (props) => {
    const { buttonValue, buttonIcon, buttonContainer = { backgroundColor: colors.orange, width: WIDTH * 0.9, height: HEIGHT * 0.08, borderRadius: WIDTH * 0.02 }, labelStyle = { color: colors.white }, onPress } = props
    return (
        <Pressable style={[styles.buttonStyle, buttonContainer]} onPress={onPress}>
            <Image source={buttonIcon} resizeMode='contain' style={styles.iconStyle} />
            <Text style={labelStyle}>{buttonValue}</Text>
        </Pressable>
    )
}


export default ButtonComponent

const styles = StyleSheet.create({
    buttonStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
})

