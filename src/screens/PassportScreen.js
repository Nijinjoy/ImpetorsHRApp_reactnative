import { View, Text, StyleSheet, FlatList, Image, ScrollView, Pressable, Alert, Modal, Button } from 'react-native'
import React, { useState } from 'react'
import colors from '../constants/Colors'
import BackbuttonComponent from '../components/BackbuttonComponent'
import { backarrow, camera, cross, mark, passportdo, passportdont, upload } from '../assets/images'
import { HEIGHT, WIDTH } from '../constants/Dimension'
import { useNavigation } from '@react-navigation/native'
import TextInputComponent from '../components/TextInputComponent'
import ButtonComponent from '../components/ButtonComponent'
import { MaterialIcons } from '@expo/vector-icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import UploadComponent from '../components/UploadComponent'
import * as ImagePicker from 'expo-image-picker';

const passportInstruction = [
    {
        id: 1,
        image: passportdo,
        text: "Do it",
        markIcon: mark
    },
    {
        id: 2,
        image: passportdont,
        text: "Don't",
        markIcon: cross
    }
]

const uploadComponentsData = [
    { id: 1, icon: camera, text: 'Take Picture' },
    { id: 2, icon: upload, text: 'Upload Now' }
];

const instructionsData = [
    { id: 1, text: "For passport verification, ensure the photo is clear" },
    { id: 2, text: "Place your passport on a flat surface and adjust lighting if necessary." },
    { id: 3, text: "Avoid glare or obstructions for accurate document capture" }
];


const PassportScreen = () => {
    const navigation = useNavigation()
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [fileFormat, setFileFormat] = useState(null);
    const [imageUri, setImageUri] = useState(null);
    const [imageFileName, setImageFileName] = useState(null);
    const [isPreviewVisible, setIsPreviewVisible] = useState(false);

    console.log("fileFormat===>", fileFormat);
    console.log("imageFileName===>", imageFileName);
    console.log("imageUri===>", imageUri);

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
        if (permissionResult.granted === false) {
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

        console.log('Image Result:', imageResult); // Log the result to check the structure

        if (!imageResult.cancelled) {
            const { uri, fileName, mimeType } = imageResult.assets[0]; // Destructure the first asset
            if (uri) {
                setFileFormat(mimeType || 'image/jpeg');
                setImageUri(uri);
                setImageFileName(fileName);

                console.log('File Format:', mimeType || 'image/jpeg');
                console.log('Image URI:', uri);
                console.log('Image File Name:', fileName);

                setIsPreviewVisible(true); // Show the image preview
            } else {
                Alert.alert('No URI found in the captured image.');
            }
        } else {
            Alert.alert('Image capture cancelled.');
        }
    };


    const togglePreviewModal = () => {
        setIsPreviewVisible(!isPreviewVisible);
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
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => {
                            return (
                                <Pressable style={styles.imageContainer}>
                                    <Image source={item.image} style={styles.imageStyle} resizeMode='contain' />
                                    <View style={styles.contentStyle}>
                                        <Image source={item.markIcon} resizeMode='contain' />
                                        <Text style={{ marginLeft: WIDTH * 0.02 }}>{item.text}</Text>
                                    </View>
                                </Pressable>
                            )
                        }}
                        numColumns={2}
                    />
                    <Text style={styles.documentText}>Document Details</Text>
                    <TextInputComponent
                        placeholder="Your Passport Number"
                    />
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
                    <FlatList
                        data={uploadComponentsData}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <Pressable style={styles.uploadContainer} onPress={() => item.text === 'Take Picture' ? handleCameraPress() : null}>
                                <UploadComponent icon={item.icon} text={item.text} onPress={() => item.text === 'Take Picture' ? handleCameraPress() : null} />
                            </Pressable>
                        )}
                        numColumns={2}
                    />

                    <View style={{ flexDirection: "row" }}>
                        {imageFileName && (
                            <Text style={styles.fileFormatText}>{imageFileName}</Text>
                        )}
                        <Pressable onPress={togglePreviewModal}>
                            <Text style={{ color: colors.orange }}>Preview</Text>
                        </Pressable>
                    </View>


                    <ButtonComponent
                        buttonValue="Next"
                        textStyle={styles.buttonText}
                        buttonStyle={styles.nextButton}
                    />
                </View>
            </ScrollView>

            <Modal
                animationType="slide"
                transparent={true}
                visible={isPreviewVisible}
                onRequestClose={() => setIsPreviewVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalHeaderText}>Preview Image</Text>
                        <Image source={{ uri: imageUri }} style={styles.previewImage} resizeMode="contain" />
                        <Button title="Close" onPress={() => setIsPreviewVisible(false)} />
                    </View>
                </View>
            </Modal>

        </View>
    )
}

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
        flexGrow: 1
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: colors.white,
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
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
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
    },
})

export default PassportScreen;



