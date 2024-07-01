import React, { useState } from 'react';
import { View, Text, Pressable, Image, StyleSheet, ScrollView } from 'react-native';
import colors from '../constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { HEIGHT, WIDTH } from '../constants/Dimension';
import { backarrow } from '../assets/images';
import BackbuttonComponent from '../components/BackbuttonComponent';
import ButtonComponent from '../components/ButtonComponent';
import { MaterialIcons } from '@expo/vector-icons';

const PreviewScreen = ({ route, navigation }) => {
    const { images } = route.params;
    const [imageList, setImageList] = useState(images);

    console.log("imageList==>", imageList);

    console.log();
    const handleAddImage = async () => {
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.cancelled) {
            const uri = result.assets[0].uri;
            const fileInfo = await FileSystem.getInfoAsync(uri);
            const fileName = uri.split('/').pop();
            const fileSize = fileInfo.size || 'N/A';
            const type = 'image';

            setImageList([...imageList, { uri, fileName, fileSize, type }]);
        }
    };

    const handleDeleteImage = (index) => {
        const newImageList = [...imageList];
        newImageList.splice(index, 1);
        setImageList(newImageList);
    };

    const generateRandomFileName = () => {
        return `image_${Math.random().toString(36).substr(2, 9)}.jpg`;
    };

    const handleSaveImages = async () => {
        try {
            const savedImages = await Promise.all(
                imageList.map(async (image) => {
                    const randomFileName = generateRandomFileName();
                    const newPath = `${FileSystem.documentDirectory}${randomFileName}`;
                    await FileSystem.moveAsync({
                        from: image.uri,
                        to: newPath,
                    });
                    return { ...image, uri: newPath, fileName: randomFileName };
                })
            );
            const fileNames = savedImages.map(image => image.fileName);
            navigation.navigate('PassportScreen', { images: savedImages, fileNames });
            console.log("hascasj===>", { images: savedImages, fileNames });
        } catch (error) {
            console.error('Error saving images:', error);
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

                <ScrollView style={styles.scrollView} contentContainerStyle={styles.imageContainer}>
                    {imageList.map((image, index) => (
                        <View key={index} style={styles.imageWrapper}>
                            <Image source={{ uri: image.uri }} style={styles.imageStyle} resizeMode='stretch' />
                            <Pressable
                                style={styles.deleteButton}
                                onPress={() => handleDeleteImage(index)}
                            >
                                <MaterialIcons name="close" size={20} color={colors.lightBlack} />
                            </Pressable>
                        </View>
                    ))}

                    <Pressable
                        onPress={handleAddImage}
                        style={styles.addMore}
                    >
                        <Text style={styles.addpageStyle}>Add Page</Text>
                    </Pressable>
                </ScrollView>
            </View>
            <ButtonComponent
                buttonValue="Save"
                onPress={handleSaveImages}
                textStyle={styles.buttonText}
                buttonStyle={styles.nextButton}
            />
        </View>
    );
};

export default PreviewScreen;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.white,
    },
    subContainer: {
        flex: 1,
        marginHorizontal: WIDTH * 0.05,
    },
    buttonContainerStyle: {
        marginTop: HEIGHT * 0.08,
    },
    scrollView: {
        flex: 1,
        marginTop: HEIGHT * 0.03,
    },
    imageContainer: {
        alignItems: 'center',
    },
    imageWrapper: {
        width: WIDTH * 0.85,
        height: HEIGHT * 0.36,
        borderRadius: WIDTH * 0.03,
        backgroundColor: colors.grey,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: HEIGHT * 0.01,
        position: 'relative',
    },
    imageStyle: {
        width: WIDTH * 0.8,
        height: WIDTH * 0.65,
        borderRadius: WIDTH * 0.03,
    },
    deleteButton: {
        position: 'absolute',
        width: WIDTH * 0.08,
        height: WIDTH * 0.08,
        top: 10,
        right: 10,
        backgroundColor: colors.lightAsh,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: WIDTH * 0.04,
    },
    deleteButtonText: {
        color: colors.white,
        fontSize: 12,
        fontWeight: 'bold',
    },
    nextButton: {
        width: WIDTH * 0.89,
        backgroundColor: colors.orange,
        marginBottom: HEIGHT * 0.02,
        alignSelf: 'center',
    },
    buttonText: {
        color: colors.white,
    },
    addMore: {
        alignItems: 'center',
        marginVertical: HEIGHT * 0.02,
    },
    addpageStyle: {
        fontSize: 15,
        color: colors.orange,
        fontWeight: '500',
    },
});
