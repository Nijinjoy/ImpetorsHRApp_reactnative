import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import colors from '../constants/Colors';
import BackbuttonComponent from '../components/BackbuttonComponent';
import { backarrow, brp, nidoc, passport } from '../assets/images';
import { HEIGHT, WIDTH } from '../constants/Dimension';
import FileComponent from '../components/FileComponent';
import { useNavigation } from '@react-navigation/native';
import * as DocumentPicker from 'expo-document-picker';
import ButtonComponent from '../components/ButtonComponent';

const DocumentScreen = () => {
    const navigation = useNavigation();
    const [documentStatuses, setDocumentStatuses] = useState({
        Passport: 'Not uploaded',
        BRP: 'Not uploaded',
        'NI Document': 'Not uploaded',
    });

    const handleDocumentUpload = async (value) => {
        try {
            const document = await DocumentPicker.getDocumentAsync();
            if (document.type === 'success') {
                setDocumentStatuses(prevStatuses => ({
                    ...prevStatuses,
                    [value]: 'Verification pending',
                }));
            }
        } catch (error) {
            console.log('Error selecting document:', error);
        }
    };

    const handleNavigate = (screenPath) => {
        navigation.navigate(screenPath);
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

                <View style={styles.fileStyle}>
                    <FileComponent
                        documentStatuses={documentStatuses}
                        onUpload={handleDocumentUpload}
                        style={styles.componentContainer}
                        onNavigate={handleNavigate}
                    />
                </View>

                <ButtonComponent
                    buttonValue="Next"
                    textStyle={styles.buttonText}
                    buttonStyle={styles.nextButton}
                    onPress={() => navigation.navigate("PassportScreen")}
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
        marginTop: HEIGHT * 0.06,
    },
    componentContainer: {
        marginBottom: HEIGHT * 0.025,
    },
    nextButton: {
        width: WIDTH * 0.89,
        backgroundColor: colors.orange,
        marginTop: HEIGHT * 0.1,
    },
    buttonText: {
        color: colors.white,
    },
    fileStyle: {
        marginTop: HEIGHT * 0.04
    }
});
