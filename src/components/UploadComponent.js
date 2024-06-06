import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import React from 'react';
import { WIDTH } from '../constants/Dimension';
import colors from '../constants/Colors';

const UploadComponent = ({ icon, text, onPress }) => {
    return (
        <Pressable style={styles.mainContainer} onPress={onPress}>
            <Image source={icon} style={styles.iconStyle} />
            <Text style={styles.textStyle}>{text}</Text>
        </Pressable>
    );
};

export default UploadComponent;

const styles = StyleSheet.create({
    mainContainer: {
        borderWidth: 1,
        width: WIDTH * 0.42,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: 'center',
        padding: WIDTH * 0.045,
        borderColor: colors.orange,
        borderRadius: WIDTH * 0.02,
    },
    iconStyle: {
        width: 24,
        height: 24,
        marginRight: WIDTH * 0.02,
    },
    textStyle: {
        fontSize: 16,
        color: colors.black,
    }
});
