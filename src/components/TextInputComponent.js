import React from 'react';
import { TextInput, StyleSheet, View, Pressable } from 'react-native';
import { HEIGHT, WIDTH } from '../constants/Dimension';
import colors from '../constants/Colors';

const TextInputComponent = ({ containerStyle, placeholder, keyboardType, value, editable, rightComponent, placeholderTextColor }) => {
    return (
        <View style={[styles.container, containerStyle]}>
            <TextInput
                style={styles.textInput}
                placeholder={placeholder}
                keyboardType={keyboardType}
                value={value}
                editable={editable}
                placeholderTextColor={placeholderTextColor}
                multiline
                textAlignVertical="top"
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









// import { View, Text, TextInput, Image, Pressable } from 'react-native'
// import React from 'react'
// import { HEIGHT, WIDTH } from '../constants/Dimension'
// import colors from '../constants/Colors'
// import { backarrow, eye } from '../assets/images'

// const TextInputComponent = (props) => {
//     const { rightComponent, rightStyle, value, onChangeText, editable, placeholder, keyboardType, containerStyle } = props
//     return (
//         <View style={{ borderWidth: 1, width: WIDTH * 0.9, borderRadius: WIDTH * 0.02, padding: HEIGHT * 0.02, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderColor: colors.grey, marginTop: HEIGHT * 0.02, backgroundColor: colors.lightgrey, ...containerStyle }}>
//             <View style={{ justifyContent: "center", alignItems: "center" }}>
//                 <TextInput 
//                     placeholder={placeholder}
//                     value={value}
//                     editable={editable}
//                     // textAlignVertical="top"
//                     keyboardType={keyboardType}
//                     onChangeText={onChangeText}
//                     style={{ marginLeft: WIDTH * 0.02, width: WIDTH * 0.7, color: colors.black }}
//                 />
//             </View>
//             {rightComponent && (
//                 <Pressable style={{ position: "absolute", right: WIDTH * 0.02, ...rightStyle }}>
//                     {rightComponent}
//                 </Pressable>
//             )}
//         </View>
//     )
// }

// export default TextInputComponent;
