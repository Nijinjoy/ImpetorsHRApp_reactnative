import React from 'react';
import { TextInput, StyleSheet, View, Pressable } from 'react-native';
import { HEIGHT, WIDTH } from '../constants/Dimension';
import colors from '../constants/Colors';

const TextInputComponent = ({ containerStyle, placeholder, keyboardType, value, editable, rightComponent, placeholderTextColor, secureTextEntry, onChangeText }) => {
    return (
        <View style={[styles.container, containerStyle]}>
            <TextInput
                style={styles.textInput}
                placeholder={placeholder}
                // style={{ fontSize: 20 }}
                keyboardType={keyboardType}
                secureTextEntry={secureTextEntry}
                value={value}
                editable={editable}
                onChangeText={onChangeText}
                placeholderTextColor={placeholderTextColor}
                multiline={false}
            />
            {rightComponent && (
                <Pressable style={styles.rightComponentContainer}>
                    {rightComponent}
                </Pressable>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        borderWidth: 1,
        borderColor: colors.grey,
        backgroundColor: colors.lightgrey,
        borderRadius: WIDTH * 0.02,
        paddingHorizontal: WIDTH * 0.02,
        marginVertical: HEIGHT * 0.01,
        alignItems: "center"
    },
    textInput: {
        flex: 1,
        height: '100%',
        fontSize: 16,
        color: '#000',
        paddingVertical: HEIGHT * 0.015,
        paddingHorizontal: WIDTH * 0.02,
    },
    rightComponentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 'auto',
        paddingRight: WIDTH * 0.01,
    },
});

export default TextInputComponent;
