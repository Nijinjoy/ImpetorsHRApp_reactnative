import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import colors from '../constants/Colors';
import BackbuttonComponent from '../components/BackbuttonComponent';
import { backarrow } from '../assets/images';
import { HEIGHT, WIDTH } from '../constants/Dimension';
import FileComponent from '../components/FileComponent';
import { useNavigation } from '@react-navigation/native';
import * as DocumentPicker from 'expo-document-picker';
import ButtonComponent from '../components/ButtonComponent';

const DocumentScreen = () => {
    const navigation = useNavigation();
    const [selectedDocument, setSelectedDocument] = useState(null);


    const handleDocumentUpload = async (value) => {
        try {
            const document = await DocumentPicker.getDocumentAsync();
            if (document.type === 'success') {
                setSelectedDocument(document.uri);
            }
        } catch (error) {
            console.log('Error selecting document:', error);
        }
    };

    const renderFileComponent = (value, uploadValue) => {
        return (
            <Pressable onPress={() => handleDocumentUpload(value)} activeOpacity={0.7}>
                <View style={styles.componentContainer}>
                    <FileComponent uploadValue={uploadValue} value={value} />
                </View >
            </Pressable>
        );
    };

    return (
        <View style={styles.mainContainer}>
            <View style={styles.subContainer}>
                <BackbuttonComponent
                    backarrow={backarrow}
                    onPress={() => navigation.goBack()}
                    containStyle={styles.buttonContainerStyle}
                />
                <Text style={styles.headerText}>Click & Upload Your Documents</Text>
                <View style={styles.fileComponentsContainer}>
                    {renderFileComponent('Passport', 'Not uploaded')}
                    {renderFileComponent('BRP', 'Not uploaded')}
                    {renderFileComponent('NI Document', 'Not uploaded')}
                </View>
                <ButtonComponent
                    buttonValue="Next"
                    textStyle={styles.buttonText}
                    buttonStyle={styles.nextButton}
                    onPress={() => navigation.navigate("DocumentScreen")}
                />
            </View>
        </View>
    );
};

export default DocumentScreen;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.white,
    },
    subContainer: {
        marginHorizontal: WIDTH * 0.05,
    },
    buttonContainerStyle: {
        marginTop: HEIGHT * 0.08,
    },
    headerText: {
        fontSize: 27,
        fontWeight: '500',
        width: WIDTH * 0.7,
        marginTop: HEIGHT * 0.06
    },
    componentContainer: {
        marginBottom: HEIGHT * 0.025
    },
    fileComponentsContainer: {
        marginTop: HEIGHT * 0.05,
    },
    nextButton: {
        width: WIDTH * 0.89,
        backgroundColor: colors.orange,
        marginTop: HEIGHT * 0.08,
    },
    buttonText: {
        color: colors.white,
    },
});
