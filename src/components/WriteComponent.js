import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TextInputComponent from './TextInputComponent';
import DropDownPicker from 'react-native-dropdown-picker';
import { HEIGHT, WIDTH } from '../constants/Dimension';
import colors from '../constants/Colors';

const fontOptions = [
    { label: 'Italic', value: 'italic' },
    { label: 'Arial', value: 'Arial' },
    { label: 'Helvetica', value: 'Helvetica' },
    { label: 'Times New Roman', value: 'Times New Roman' },
];

const WriteComponent = () => {
    const [name, setName] = useState([]);
    const [selectedFont, setSelectedFont] = useState('italic');
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState(fontOptions);

    let fontStyle = {};

    switch (selectedFont) {
        case 'italic':
            fontStyle = { fontStyle: 'italic' };
            break;
        case 'Arial':
            fontStyle = { fontFamily: 'Arial' };
            break;
        case 'Helvetica':
            fontStyle = { fontFamily: 'Helvetica' };
            break;
        case 'Times New Roman':
            fontStyle = { fontFamily: 'Times New Roman' };
            break;
        default:
            fontStyle = {};
            break;
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInputComponent
                    onChangeText={setName}
                    placeholder='Enter name'
                    containerStyle={styles.textInputContainer}
                />
            </View>
            <View style={styles.dropdownContainer}>

                <DropDownPicker
                    items={fontOptions}
                    defaultValue={selectedFont}
                    containerStyle={styles.dropdown}
                    onChangeItem={(item) => setSelectedFont(item.value)}
                />
            </View>
            <Text style={[styles.nameText, { fontStyle: 'italic' }]}>
                {name}
            </Text>
            <View style={styles.nameDisplayContainer}>
                {/* <Text style={[styles.nameText, { fontStyle: 'italic' }]}>
                    {name}
                </Text> */}
                <Text style={[styles.nameText, fontStyle]}>
                    {name}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        height: HEIGHT * 0.31,
        borderRadius: WIDTH * 0.02,
    },
    inputContainer: {
        borderWidth: 0,
        margin: 0,
    },
    textInputContainer: {
        margin: 10,
    },
    dropdownContainer: {
        marginHorizontal: 10,
    },
    dropdown: {
        backgroundColor: 'white',
        borderColor: 'grey',
    },
    dropdownList: {
        backgroundColor: 'white',
    },
    // nameDisplayContainer: {
    //     borderWidth: 1,
    //     margin: 10,
    //     height: HEIGHT * 0.1,
    //     borderRadius: WIDTH * 0.02,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },
    nameText: {
        fontSize: 16,
        textAlign: 'center',
        color: colors.black
    },
});

export default WriteComponent;




