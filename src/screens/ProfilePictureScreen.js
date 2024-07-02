import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, Modal, FlatList, Button, Alert } from 'react-native';
import colors from '../constants/Colors';
import axios from 'axios';
import { WIDTH, HEIGHT } from '../constants/Dimension';
import BackbuttonComponent from '../components/BackbuttonComponent';
import { avatar, avatar2, avatar3, avatar4, backarrow, uploadcamera } from '../assets/images';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';
import ButtonComponent from '../components/ButtonComponent';
import * as ImageManipulator from 'expo-image-manipulator';
import * as FileSystem from 'expo-file-system'; 


const avatarFlatlist = [
    { id: 'uploadButton', icon: uploadcamera, isUploadButton: true },
    { id: 1, icon: avatar },
    { id: 2, icon: avatar2 },
    { id: 3, icon: avatar3 },
    { id: 4, icon: avatar4 },
    { id: 5, icon: avatar },
    { id: 6, icon: avatar },
    { id: 7, icon: avatar }
];

const COLORS = [
    { id: '1', color: '#FF0000' },
    { id: '2', color: '#00FF00' },
    { id: '3', color: '#0000FF' },
    { id: '4', color: '#FFFF00' },
    { id: '5', color: '#FF00FF' },
    { id: '6', color: '#FF00FF' },
    { id: '7', color: '#0000FF' },
];

const ProfilePictureScreen = () => {
    const navigation = useNavigation();
    const [profileImage, setProfileImage] = useState(null);
    const [selectedAvatar, setSelectedAvatar] = useState(null);
    const [editingModalVisible, setSecondEditingVisible] = useState(null)
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedAvatarId, setSelectedAvatarId] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedColor, setSelectedColor] = useState(null);
    const [backgroundColor, setBackgroundColor] = useState(null);


    useEffect(() => {
        console.log("profileImage===>", profileImage);
    }, [profileImage]);

    const selectImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
            return;
        }
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [1, 1],
            quality: 1,
        });
        if (!result.canceled) {
            setProfileImage(result.assets[0].uri);
            setSelectedAvatar(null);
            setSelectedImage(result.uri);
            setModalVisible(false);
            setSecondEditingVisible(true);
        }
    };

    const takePhoto = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera permissions to make this work!');
            return;
        }
        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: false,
            aspect: [1, 1],
            quality: 1,
        });
        if (!result.canceled) {
            setSelectedAvatar(null);
            setProfileImage(result.assets[0].uri);
            setModalVisible(false);
            setSecondEditingVisible(true);
            console.log(selectedImage);
        }
    };

    const handleUpload = () => {
        if (!selectedAvatar) {
            setModalVisible(true);
        }
    };

    const handleAvatarPress = (id) => {
        setSelectedAvatarId(id);
        setProfileImage(null);
    };

    const handleEditingDone = () => {
        setProfileImage(selectedImage);
        setSecondEditingVisible(false);
    };

    const accessportalNavigate = () => {
        navigation.navigate("AccessPortalScreen")
    }

    const getImageSize = (uri) => {
        return new Promise((resolve, reject) => {
            Image.getSize(uri, (width, height) => {
                resolve({ width, height });
            }, (error) => {
                reject(error);
            });
        });
    };

    const handleFlip = async () => {
        if (profileImage) {
            try {
                const flippedImage = await ImageManipulator.manipulateAsync(
                    profileImage,
                    [{ flip: ImageManipulator.FlipType.Horizontal }],
                    { compress: 1, format: ImageManipulator.SaveFormat.PNG }
                );
                setProfileImage(flippedImage.uri);
                setSelectedImage(flippedImage.uri);
            } catch (error) {
                console.error('Error flipping image:', error);
            }
        }
    };

    const handleRotate = async () => {
        if (profileImage) {
            try {
                const rotatedImage = await ImageManipulator.manipulateAsync(
                    profileImage,
                    [{ rotate: 90 }],
                    { compress: 1, format: ImageManipulator.SaveFormat.PNG }
                );
                setProfileImage(rotatedImage.uri);
                setSelectedImage(rotatedImage.uri);
            } catch (error) {
                console.error('Error rotating image:', error);
            }
        }
    };

    const handleColorSelect = async (color) => {
        setSelectedColor(color);

        if (profileImage) {
            try {
                const { width, height } = await getImageSize(profileImage);
                const cropWidth = width;
                const cropHeight = height / 1.5;
                const croppedImage = await ImageManipulator.manipulateAsync(
                    profileImage,
                    [{ crop: { originX: 0, originY: 0, width: cropWidth, height: cropHeight } }],
                    { compress: 1, format: ImageManipulator.SaveFormat.PNG }
                );
                const result = await removeImageBackground(croppedImage.uri, color);
                setProfileImage(result.uri);

                setModalVisible(false); // Close color selection modal if needed
            } catch (error) {
                console.error('Error applying background color:', error);
                Alert.alert('Error', 'Failed to change background. Please try again.');
            }
        } else {
            Alert.alert('No Image', 'Please select an image first.');
        }
    };

    const removeImageBackground = async (imageUri, backgroundColor) => {
        const apiUrl = 'https://aiengine.impetorshr.com/api/remove-image-background/';

        try {
            const formData = new FormData();
            formData.append('image_file', {
                uri: imageUri,
                type: 'image/png',
                name: 'image.png',
            });
            formData.append('background_color', backgroundColor);

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
                body: formData,
            });

            const result = await response.json();

            if (response.ok) {
                console.log('Background changed successfully:', result);

                // Decode base64 and save the file
                const base64Data = result.processed_image;
                const filePath = `${FileSystem.documentDirectory}/profile_image.png`;

                await FileSystem.writeAsStringAsync(filePath, base64Data, {
                    encoding: FileSystem.EncodingType.Base64,
                });

                // Check the image format using file metadata
                try {
                    const fileInfo = await FileSystem.getInfoAsync(filePath);
                    console.log('File MIME type:', fileInfo.mimeType);

                    if (fileInfo.mimeType === 'image/png') {
                        console.log('Image format is PNG');
                    } else {
                        console.log('Image format is not PNG');
                    }
                } catch (error) {
                    console.error('Error getting file info:', error);
                }

                return { uri: filePath };
            } else {
                console.error('Failed to change background:', result);
                throw new Error(result.message || 'Failed to change background');
            }
        } catch (error) {
            console.error('Error changing background:', error);
            throw error;
        }
    };

    return (
        <View style={styles.mainContainer}>
            <View style={styles.subContainer}>
                <BackbuttonComponent
                    backarrow={backarrow}
                    onPress={() => navigation.goBack()}
                    containStyle={styles.buttonContainerStyle}
                />
                <Text style={styles.headerText}>Profile Picture</Text>
                <Text style={styles.subText}>Upload or choose your profile photo.</Text>

                <View style={styles.flatListContainer}>
                    <FlatList
                        data={avatarFlatlist}
                        keyExtractor={(item) => item.id.toString()}
                        numColumns={3}
                        renderItem={({ item }) => {
                            if (item.isUploadButton) {
                                return (
                                    <Pressable
                                        style={styles.uploadButton}
                                        onPress={handleUpload}>
                                        <Image
                                            source={profileImage && selectedAvatarId === 'uploadButton' ? { uri: profileImage } : item.icon}
                                            resizeMode='cover'
                                            style={[profileImage && selectedAvatarId === 'uploadButton' ? styles.uploadedImage : styles.uploadIcon, selectedAvatarId === item.id ? styles.selectedAvatarIcon : null]}
                                        />
                                        {selectedAvatarId === item.id && (
                                            <MaterialIcons name="check-circle" size={24} color={colors.green} style={styles.tickIcon} />
                                        )}
                                    </Pressable>
                                );
                            } else {
                                return (
                                    <Pressable
                                        style={styles.avatarContainer}
                                        onPress={() => handleAvatarPress(item.id)}
                                    >
                                        <Image source={item.icon} style={styles.avatarImage} />
                                        {selectedAvatarId === item.id && (
                                            <MaterialIcons name="check-circle" size={24} color={colors.green} style={styles.tickIcon} />
                                        )}
                                    </Pressable>
                                );
                            }
                        }}
                    />
                </View>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}>
                    <Pressable style={styles.modalContainer} onPress={() => setModalVisible(false)}>
                        <Pressable style={styles.modalView} onPress={() => { }}>
                            <Text style={styles.modalText}>Choose an option</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={takePhoto}>
                                    <Image source={uploadcamera} tintColor={colors.black} />
                                    <Text style={styles.textStyle}>Camera</Text>
                                </Pressable>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={selectImage}>
                                    <MaterialIcons name="upload" size={20} color={colors.black} />
                                    <Text style={styles.textStyle}>Upload</Text>
                                </Pressable>
                            </View>
                        </Pressable>
                    </Pressable>
                </Modal>

                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={editingModalVisible}
                    onRequestClose={() => setSecondEditingVisible(false)}
                >
                    <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)', }}>
                        <Pressable style={{
                            backgroundColor: colors.white,
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                            padding: 35,
                            shadowColor: '#000',
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 4,
                            elevation: 5,
                            height: HEIGHT * 0.7,
                            width: '100%',
                            // alignItems: "center"
                        }}>
                            <Text style={{ fontSize: 20, fontWeight: '500', marginBottom: HEIGHT * 0.01 }}>Edit Profile</Text>
                            <View style={{ borderWidth: 1, borderColor: colors.orange, height: WIDTH * 0.7, width: WIDTH * 0.8, alignItems: 'center', justifyContent: "center", borderRadius: 0, }}>

                                <Image
                                    source={profileImage ? { uri: profileImage } : null}
                                    resizeMode='cover'
                                    style={styles.editingIcon}
                                />
                            </View>


                            <View style={{ marginTop: HEIGHT * 0.01 }}>
                                <Text style={{ fontWeight: '500', fontSize: 15 }}>Change Background- <Text style={{ fontWeight: '400', fontSize: 15 }}>Choose Colour</Text></Text>
                                <View>
                                    <FlatList
                                        data={COLORS}
                                        horizontal
                                        keyExtractor={(item) => item.id.toString()}
                                        showsHorizontalScrollIndicator={false}
                                        extraData={selectedColor}
                                        renderItem={({ item }) => {
                                            return (
                                                <Pressable
                                                    style={[styles.colorPickerItem, { backgroundColor: item.color }]}
                                                    onPress={() => handleColorSelect(item.color)}
                                                >
                                                </Pressable>
                                            )
                                        }}
                                    />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                                {/* <Pressable onPress={handleCrop} >
                                    <MaterialIcons name="crop" size={20} color={colors.black} />
                                </Pressable> */}
                                <Pressable onPress={handleFlip} >
                                    <MaterialIcons name="flip" size={20} color={colors.black} />
                                </Pressable>
                                <Pressable onPress={handleRotate}>
                                    <MaterialIcons name="rotate-right" size={20} color={colors.black} />
                                </Pressable>

                            </View>
                            <ButtonComponent
                                buttonValue="Next"
                                textStyle={styles.buttonText}
                                buttonContainer={styles.nextButton}
                                onPress={handleEditingDone}
                            />
                        </Pressable>
                    </View>
                </Modal>

                <View style={{ justifyContent: "flex-end", bottom: 10 }}>
                    <ButtonComponent
                        buttonValue="Next"
                        onPress={accessportalNavigate}
                        buttonContainer={{ width: WIDTH * 0.9, backgroundColor: colors.orange, borderRadius: WIDTH * 0.01, padding: WIDTH * 0.04 }}
                    />
                    <ButtonComponent
                        buttonValue="Skip"
                        labelStyle={colors.grey}
                        buttonContainer={{ width: WIDTH * 0.9, backgroundColor: colors.white, borderRadius: WIDTH * 0.01, padding: WIDTH * 0.04, borderWidth: 1, borderColor: colors.grey, marginTop: HEIGHT * 0.02 }}
                    />
                </View>
            </View>
        </View>
    );
};

export default ProfilePictureScreen;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.white,
    },
    subContainer: {
        marginHorizontal: WIDTH * 0.05,
        flex: 1,
    },
    buttonContainerStyle: {
        marginTop: HEIGHT * 0.08,
    },
    headerText: {
        fontSize: 27,
        fontWeight: '500',
        marginTop: HEIGHT * 0.08,
    },
    subText: {
        fontSize: 16,
        fontWeight: '400',
        width: WIDTH * 0.9,
    },
    flatListContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: HEIGHT * 0.02,
    },
    uploadButton: {
        backgroundColor: colors.orange,
        width: WIDTH * 0.22,
        height: WIDTH * 0.22,
        justifyContent: 'center',
        alignItems: "center",
        borderRadius: WIDTH * 0.2,
        margin: 15,
    },
    uploadIcon: {
        width: 30,
        height: 30,
    },
    uploadedImage: {
        height: WIDTH * 0.22,
        width: WIDTH * 0.22,
        borderRadius: WIDTH * 0.2
    },
    avatarContainer: {
        margin: 15,
        padding: 10,
        width: WIDTH * 0.22,
        height: WIDTH * 0.22,
        backgroundColor: 'white',
        borderRadius: WIDTH * 0.2,
        alignItems: "center",
        justifyContent: 'center'
    },
    avatarImage: {
        width: WIDTH * 0.22,
        height: WIDTH * 0.22,
        resizeMode: 'cover',
        borderRadius: 5,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        height: HEIGHT * 0.3,
        width: '100%',
    },
    button: {
        width: WIDTH * 0.4,
        height: HEIGHT * 0.15,
        borderRadius: WIDTH * 0.02,
        padding: 10,
        elevation: 2,
        marginLeft: 10,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonClose: {
        backgroundColor: colors.lightgrey,
    },
    textStyle: {
        color: colors.lightash,
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
    nextButton: {
        width: WIDTH * 0.8,
        padding: WIDTH * 0.04,
        borderRadius: WIDTH * 0.02,
        backgroundColor: colors.orange,
        marginTop: HEIGHT * 0.01,
    },
    selectedAvatarIcon: {
        width: WIDTH * 0.22,
        height: WIDTH * 0.22,
        borderRadius: WIDTH * 0.11,
    },
    editingIcon: {
        height: WIDTH * 0.7,
        width: WIDTH * 0.8,
        borderRadius: 8,
        alignItems: 'center'
    },
    tickIcon: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
    buttonStyle: {
        borderWidth: 1,
        padding: WIDTH * 0.03,
        borderRadius: WIDTH * 0.04,
        width: WIDTH * 0.25,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttontextStyle: {
        textAlign: 'center'
    },
    colorPickerItem: {
        width: 30,
        height: 30,
        borderRadius: 25,
        marginHorizontal: 10,
    },
    selectedImage: {
        width: WIDTH * 0.8,
        height: HEIGHT * 0.4,
        borderRadius: 10,
        marginBottom: 20,
    },

});

