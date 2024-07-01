import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ScrollView, Pressable, Alert, Modal, Platform } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
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
import * as FileSystem from 'expo-file-system';

const passportInstruction = [
    { id: 1, image: passportdo, text: "Do it", markIcon: mark },
    { id: 2, image: passportdont, text: "Don't", markIcon: cross }
];

const instructionsData = [
    { id: 1, text: "For passport verification, ensure the photo is clear" },
    { id: 2, text: "Place your passport on a flat surface and adjust lighting if necessary." },
    { id: 3, text: "Avoid glare or obstructions for accurate document capture" }
];

const PassportScreen = ({ route }) => {
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [fileFormat, setFileFormat] = useState(null);
    const [imageUri, setImageUri] = useState(null);
    const [imageFileName, setImageFileName] = useState(null);
    const [isPreviewVisible, setIsPreviewVisible] = useState(false);
    const [docName, setDocName] = useState(null);
    const [isPdfViewerVisible, setIsPdfViewerVisible] = useState(false);
    const [imageDetails, setImageDetails] = useState(null);
    const [savedFileName, setSavedFileName] = useState('');

    useEffect(() => {
        if (isFocused && route.params?.fileNames) {
            setSavedFileName(route.params.fileNames[0]);
            setImageUri(route.params.images[0].uri);
        }
    }, [isFocused, route.params]);


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
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission to access camera was denied');
            return;
        }
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.cancelled) {
            const uri = result.assets[0].uri;
            setImageUri(uri);
            const fileInfo = await FileSystem.getInfoAsync(uri);
            const fileName = uri.split('/').pop();
            const fileSize = fileInfo.size || 'N/A';
            const type = 'image';

            setImageDetails({ fileName, fileSize, type });
            navigation.navigate('PreviewScreen', { images: [{ uri, fileName, fileSize, type }] });
        }
    };

    const handleDocumentPress = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: ['application/pdf', 'image/*'],
            });

            if (!result.canceled && result.assets && result.assets.length > 0) {
                const { mimeType, name, uri } = result.assets[0];

                if (uri) {
                    setDocName(name);
                    setImageUri(uri);
                    setFileFormat(mimeType || 'application/pdf');
                    setIsPreviewVisible(true);
                } else {
                    Alert.alert('No URI found in the uploaded document.');
                }
            } else if (result.canceled) {
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

                    {savedFileName && (
                        <View style={{ flexDirection: "row", alignItems: 'center', marginTop: HEIGHT * 0.01 }}>
                            <MaterialIcons name="insert-drive-file" size={20} color={colors.orange} />
                            <Text style={{ color: colors.black, marginLeft: HEIGHT * 0.02 }}>{savedFileName}</Text>
                            <Pressable onPress={() => navigation.navigate("PreviewScreen")}>
                                <Text style={styles.previewStyle}>Preview</Text>
                            </Pressable>
                        </View>
                    )}

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
    buttonContainerStyle: {
        marginTop: HEIGHT * 0.08
    },
    scrollContainer: {
        paddingBottom: HEIGHT * 0.1,
    },
    subContainer: {
        marginHorizontal: WIDTH * 0.05,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.black,
        marginTop: HEIGHT * 0.03
    },
    instructionStyle: {
        marginBottom: HEIGHT * 0.02,
    },
    lineContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: HEIGHT * 0.005,
    },
    bulletPoint: {
        fontSize: 24,
        color: colors.lightBlack,
        marginRight: WIDTH * 0.02,
    },
    instructionText: {
        fontSize: 16,
        color: colors.lightBlack,
    },
    flatlistStyle: {
        marginVertical: HEIGHT * 0.02,
    },
    imageContainer: {
        flex: 1,
        alignItems: 'center',
        margin: WIDTH * 0.02,
    },
    imageStyle: {
        width: WIDTH * 0.4,
        height: HEIGHT * 0.2,
    },
    contentStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: HEIGHT * 0.01,
    },
    documentText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.black,
        marginBottom: HEIGHT * 0.02,
    },
    calenderStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
    },
    dateTimePicker: {
        width: WIDTH,
        backgroundColor: colors.white,
    },
    pickerContainer: {
        backgroundColor: colors.white,
    },
    confirmText: {
        color: colors.blue,
    },
    cancelText: {
        color: colors.lightBlack,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: WIDTH * 0.8,
        height: HEIGHT * 0.8,
        backgroundColor: colors.white,
        borderRadius: 10,
        padding: 20,
        justifyContent: 'space-between',
    },
    modalHeaderText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.black,
        marginBottom: 10,
    },
    previewImage: {
        width: '100%',
        height: '80%',
        marginBottom: 10,
    },
    buttonText: {
        fontSize: 18,
        color: colors.white,
    },
    nextButton: {
        backgroundColor: colors.orange,
        borderRadius: 10,
        paddingVertical: 10,
        marginTop: HEIGHT * 0.02,
    },
    previewStyle: {
        fontSize: 15,
        color: colors.blue,
        marginHorizontal: WIDTH * 0.03
    }
});

export default PassportScreen;

