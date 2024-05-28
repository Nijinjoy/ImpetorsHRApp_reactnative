import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import React from 'react'
import { HEIGHT, WIDTH } from '../constants/Dimension'
import { passport } from '../assets/images'
import colors from '../constants/Colors'

const FileComponent = (props) => {
    const { value, uploadValue } = props;
    return (
        <View style={styles.mainContainer}>
            <Image source={passport} resizeMode='contain' style={styles.imageStyle} />
            <View style={styles.textContainer}>
                <Text style={styles.passportText}>{value}</Text>
                <Text style={styles.uploadText}>{uploadValue}</Text>
            </View>
        </View>
    );
}

export default FileComponent

const styles = StyleSheet.create({
    mainContainer: {
        width: WIDTH * 0.9,
        borderColor: colors.lightGray,
        flexDirection: "row",
        padding: WIDTH * 0.03,
        borderRadius: WIDTH * 0.02,
        alignItems: "center",
        backgroundColor: colors.white,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    textContainer: {
        marginHorizontal: WIDTH * 0.05,
    },
    uploadText: {
        color: colors.orange,
        fontSize: 14,
        fontWeight: '300',
        marginTop: HEIGHT * 0.01,
    },
    passportText: {
        fontSize: 18,
        fontWeight: '500',
    },
    imageStyle: {
        width: WIDTH * 0.15,
        height: HEIGHT * 0.09,
    },
});
