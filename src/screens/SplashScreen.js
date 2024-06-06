import { View, Text, Image, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import colors from '../constants/Colors'
import { splashLogo } from '../assets/images'
import { HEIGHT, WIDTH } from '../constants/Dimension'
import { useNavigation } from '@react-navigation/native'

const SplashScreen = () => {
    const navigation = useNavigation()

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate("PassportScreen")
        }, 4000)
    }, [])

    return (
        <View style={styles.container}>
            <Image source={splashLogo} style={styles.logoStyle} resizeMode='contain' />
        </View>
    )
}


export default SplashScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.orange,
        justifyContent: "center",
        alignItems: "center"
    },
    logoStyle: {
        width: WIDTH * 0.5,
        height: HEIGHT * 0.15
    }
})

