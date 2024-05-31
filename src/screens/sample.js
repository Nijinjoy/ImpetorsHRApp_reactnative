import { View, Text, TextInput, Image, Pressable } from 'react-native'
import React from 'react'
import { WIDTH } from '../constants/Dimension'
import colors from '../constants/Colors'
import { backarrow, eye } from '../assets/images'

const TextInputComponent = (props) => {
    const { containerStyle, placeholder, textIcon, secureTextEntry, width, rightComponent, rightStyle, text, handleTextChange, editable } = props
    return (
        <View style={{ ...containerStyle, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            <TextInput
                secureTextEntry={secureTextEntry}
                placeholder={placeholder}
                value={text}
                onChangeText={handleTextChange}
                editable={editable}
                style={{ borderWidth: 1, borderColor: 'rgba(0, 0, 0, 0.2)', padding: WIDTH * 0.04, width: width, borderRadius: WIDTH * 0.02, backgroundColor: colors.lightgrey, color: colors.black }}
                accessibilityLabel={placeholder} 
            />
            {rightComponent && (
                <Pressable style={{ position: "absolute", right: WIDTH * 0.02, ...rightStyle }}>
                    {rightComponent}
                </Pressable>
            )}
        </View>
    )
}

export default TextInputComponent;

///document screen

import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import { HEIGHT, WIDTH } from '../constants/Dimension';
import colors from '../constants/Colors';

const FileComponent = (props) => {
    const { value, uploadValue, iconSource } = props;
    return (
        <View style={styles.mainContainer}>
            <Image source={iconSource} resizeMode='contain' style={styles.imageStyle} />
            <View style={styles.textContainer}>
                <Text style={styles.documentText}>{value}</Text>
                <Text style={styles.uploadText}>{uploadValue}</Text>
            </View>
        </View>
    );
};

export default FileComponent;

const styles = StyleSheet.create({
    mainContainer: {
        width: WIDTH * 0.9,
        borderColor: colors.lightgrey,
        flexDirection: 'row',
        padding: WIDTH * 0.03,
        borderRadius: WIDTH * 0.02,
        alignItems: 'center',
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
        color: colors.pink,
        fontSize: 14,
        fontWeight: '300',
        marginTop: HEIGHT * 0.01,
    },
    documentText: {
        fontSize: 18,
        fontWeight: '500',
    },
    imageStyle: {
        width: WIDTH * 0.2,
        height: WIDTH * 0.15,
    },
});
