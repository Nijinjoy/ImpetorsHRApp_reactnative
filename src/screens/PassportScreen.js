import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ScrollView, Pressable, Alert, Modal, Button, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { MaterialIcons } from '@expo/vector-icons';
import colors from '../constants/Colors';
import { HEIGHT, WIDTH } from '../constants/Dimension';
import BackbuttonComponent from '../components/BackbuttonComponent';
import TextInputComponent from '../components/TextInputComponent';
import ButtonComponent from '../components/ButtonComponent';
import UploadComponent from '../components/UploadComponent';
import { backarrow, camera, cross, mark, passportdo, passportdont, upload } from '../assets/images';
import { generateRandomFilename } from '../constants/Helpers';
import WebView from 'react-native-webview';



const passportInstruction = [
    { id: 1, image: passportdo, text: "Do it", markIcon: mark },
    { id: 2, image: passportdont, text: "Don't", markIcon: cross }
];

const instructionsData = [
    { id: 1, text: "For passport verification, ensure the photo is clear" },
    { id: 2, text: "Place your passport on a flat surface and adjust lighting if necessary." },
    { id: 3, text: "Avoid glare or obstructions for accurate document capture" }
];

const PassportScreen = () => {
    const navigation = useNavigation();
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [fileFormat, setFileFormat] = useState(null);
    const [imageUri, setImageUri] = useState(null);
    const [imageFileName, setImageFileName] = useState(null);
    const [isPreviewVisible, setIsPreviewVisible] = useState(false);
    const [docName, setDocName] = useState(null);
    const [isPdfViewerVisible, setIsPdfViewerVisible] = useState(false);


    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        const formattedDate = date.toLocaleDateString();
        setSelectedDate(formattedDate);
        hideDatePicker();
    };

    const handleCameraPress = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        if (!permissionResult.granted) {
            Alert.alert('Permission to access camera required.');
            return;
        }

        const imageResult = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: false,
        });

        if (!imageResult.canceled) {
            const { uri, mimeType } = imageResult.assets[0];
            if (uri) {
                setFileFormat(mimeType || 'image/jpeg');
                setImageUri(uri);
                const newFileName = generateRandomFilename();
                setImageFileName(newFileName);
                setIsPreviewVisible(true);
            } else {
                Alert.alert('No URI found in the captured image.');
            }
        } else {
            Alert.alert('Image capture cancelled.');
        }
    };


    const handleDocumentPress = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: ['application/pdf', 'image/*'],
            });

            console.log('DocumentPicker result:', result);

            if (!result.canceled && result.assets && result.assets.length > 0) {
                const { mimeType, name, uri } = result.assets[0];
                console.log('Document details:', { name, uri, mimeType });

                if (uri) {
                    setDocName(name);
                    setImageUri(uri);
                    setFileFormat(mimeType || 'application/pdf');
                    setIsPreviewVisible(true);
                } else {
                    Alert.alert('No URI found in the uploaded document.');
                }
            } else if (result.canceled) {
                console.log('Document upload cancelled by the user.');
                Alert.alert('Document upload cancelled.');
            }
        } catch (error) {
            console.error('Error during document upload:', error);
            Alert.alert('An error occurred during document upload.');
        }
    };


    const togglePreviewModal = () => {
        setIsPreviewVisible(!isPreviewVisible);
        setIsPdfViewerVisible(false); 
    };

    return (
        <View style={styles.mainContainer}>
            <View style={{ marginHorizontal: WIDTH * 0.05 }}>
                <BackbuttonComponent
                    backarrow={backarrow}
                    onPress={() => navigation.goBack()}
                    containStyle={styles.buttonContainerStyle}
                />
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.subContainer}>
                    <Text style={styles.headerText}>Passport Upload</Text>
                    <View style={styles.instructionStyle}>
                        <FlatList
                            data={instructionsData}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <View style={styles.lineContainer}>
                                    <Text style={styles.bulletPoint}>{'\u2022'}</Text>
                                    <Text style={styles.instructionText}>{item.text}</Text>
                                </View>
                            )}
                        />
                    </View>

                    <FlatList
                        data={passportInstruction}
                        style={styles.flatlistStyle}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <Pressable style={styles.imageContainer}>
                                <Image source={item.image} style={styles.imageStyle} resizeMode='contain' />
                                <View style={styles.contentStyle}>
                                    <Image source={item.markIcon} resizeMode='contain' />
                                    <Text style={{ marginLeft: WIDTH * 0.02 }}>{item.text}</Text>
                                </View>
                            </Pressable>
                        )}
                        numColumns={2}
                    />
                    <Text style={styles.documentText}>Document Details</Text>
                    <TextInputComponent placeholder="Your Passport Number" />
                    <TextInputComponent keyboardType="numeric" placeholder="Phone Number" />
                    <TextInputComponent containerStyle={{ height: HEIGHT * 0.15 }} placeholder="Contact Address" />
                    <TextInputComponent
                        placeholder="Passport Expiry"
                        value={selectedDate}
                        editable={false}
                        rightComponent={
                            <Pressable style={styles.calenderStyle} onPress={showDatePicker}>
                                <MaterialIcons name="date-range" size={25} color={colors.lightBlack} />
                            </Pressable>
                        }
                    />

                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                        style={styles.dateTimePicker}
                        pickerContainerStyle={styles.pickerContainer}
                        confirmTextStyle={styles.confirmText}
                        cancelTextStyle={styles.cancelText}
                    />

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: HEIGHT * 0.02 }}>
                        <UploadComponent icon={camera} text="Take Picture" onPress={handleCameraPress} />
                        <UploadComponent icon={upload} text="Upload Now" onPress={handleDocumentPress} />
                    </View>

                    <View style={{ flexDirection: "row", alignItems: 'center', marginTop: HEIGHT * 0.01 }}>
                        <MaterialIcons name="insert-drive-file" size={20} color={colors.orange} />
                        {imageFileName && (
                            <Text style={styles.fileFormatText}>{imageFileName}</Text>
                        )}
                        {docName && (
                            <Text style={styles.fileFormatText}>{docName}</Text>
                        )}
                        <Pressable onPress={() => setIsPdfViewerVisible(true)}>
                            <Text style={{ color: colors.blue, marginLeft: HEIGHT * 0.02 }}>Preview</Text>
                        </Pressable>
                    </View>

                    <ButtonComponent
                        buttonValue="Next"
                        onPress={() => navigation.navigate("PolicyScreen")}
                        textStyle={styles.buttonText}
                        buttonStyle={styles.nextButton}
                    />
                </View>
            </ScrollView>

            <Modal
                animationType="fade"
                transparent={true}
                visible={isPdfViewerVisible}
                onRequestClose={() => setIsPdfViewerVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalHeaderText}>Preview Document</Text>
                        <Image source={{ uri: imageUri }} style={styles.previewImage} resizeMode="contain" />

                        {imageUri && (
                            <WebView
                                source={{ html: `<embed src="${imageUri}" type="application/pdf" width="100%" height="100%" />` }}
                                style={{ flex: 1 }}
                            />
                        )}
                        <Pressable style={{ backgroundColor: colors.orange, borderWidth: 0, padding: WIDTH * 0.03, borderRadius: 10 }} onPress={() => setIsPdfViewerVisible(false)}>
                            <Text>Close</Text>
                        </Pressable>
                        {/* <Button title="Close" onPress={() => setIsPdfViewerVisible(false)} /> */}
                    </View>
                </View>
            </Modal>
        </View>
    );
};

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
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: HEIGHT * 0.05
    },
    headerText: {
        fontSize: 27,
        fontWeight: '500',
        width: WIDTH * 0.7,
        marginTop: HEIGHT * 0.06,
    },
    instructionStyle: {
        marginTop: HEIGHT * 0.03,
    },
    lineContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: "center",
        alignItems: "center",
        marginBottom: HEIGHT * 0.01,
    },
    bulletPoint: {
        fontSize: 30,
        marginRight: WIDTH * 0.02,
    },
    instructionText: {
        flex: 1,
        fontSize: 15,
        color: colors.lightBlack,
        textAlign: 'left',
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: HEIGHT * 0.02,
    },
    flatlistStyle: {
        marginTop: HEIGHT * 0.02
    },
    contentStyle: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: HEIGHT * 0.01
    },
    imageStyle: {
        width: WIDTH * 0.4,
        height: HEIGHT * 0.2
    },
    documentText: {
        fontSize: 18,
        fontWeight: '500',
        marginTop: HEIGHT * 0.02
    },
    nextButton: {
        width: WIDTH * 0.89,
        backgroundColor: colors.orange,
        marginTop: HEIGHT * 0.04,
    },
    buttonText: {
        color: colors.white,
    },
    calenderStyle: {
        marginRight: WIDTH * 0.01
    },
    uploadContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: HEIGHT * 0.03
    },
    fileFormatText: {
        color: colors.black
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    modalContent: {
        height: HEIGHT * 0.7,
        width: WIDTH * 0.9,
        backgroundColor: colors.lightBlack,
        borderRadius: WIDTH * 0.02,
        alignItems: "center"
    },
    modalHeaderText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    previewImage: {
        width: WIDTH * 0.8,
        height: HEIGHT * 0.5,
        marginBottom: 20,
    },
    pdfPreview: {
        justifyContent: 'center',
        alignItems: 'center',
        height: HEIGHT * 0.5,
        marginBottom: 20,
    },
    pdfText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
    },
    pickerContainer: {
        backgroundColor: colors.orange,
        color: colors.orange
    }
});

export default PassportScreen;
