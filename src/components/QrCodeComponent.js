import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, Dimensions, ScrollView, Image } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';


export default function QrcodeComponent({ onCloseModals, onScanned }) {
    const navigation = useNavigation();
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);
    const [cameraType, setCameraType] = useState('back');
    const [imageUri, setImageUri] = useState(null);
    const [scannedData, setScannedData] = useState(null);
    const [images, setImages] = useState([]);
    const [mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions();


    useEffect(() => {
        (async () => {
            if (!permission) {
                await requestPermission();
            }
            if (!mediaPermission) {
                await requestMediaPermission();
            }
            if (mediaPermission?.granted) {
                fetchImages();
            }
        })();
    }, [mediaPermission]);

    const fetchImages = async () => {
        const assets = await MediaLibrary.getAssetsAsync({
            mediaType: 'photo',
            first: 20,
        });
        setImages(assets.assets);
    };

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        console.log(`Bar code with type ${type} and data ${data} has been scanned!`);
        onCloseModals();
        onScanned(data);
    };


    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImageUri(result.uri);
            const scanned = await BarCodeScanner.scanFromURLAsync(result.uri, {
                barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
            });
            if (scanned.length > 0) {
                const { type, data } = scanned[0];
                handleBarCodeScanned({ type, data });
            } else {
                console.log('No QR code found in the image');
            }
        }
    };


    if (!permission) {
        return <Text>Requesting for camera permission</Text>;
    }


    return (
        <View style={styles.container}>
            <CameraView
                style={styles.camera}
                facing={cameraType}
                onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                barcodeScannerSettings={{
                    barcodeTypes: ['qr'],
                }}
            >
                <View style={styles.topOverlay} />
                <View style={styles.middleOverlay}>
                    <View style={styles.sideOverlay} />
                    <View style={styles.scanWindow} />
                    <View style={styles.sideOverlay} />
                </View>
                <View style={styles.bottomOverlay} />
                {/* {scanned && <Button title="Tap to Scan Again" onPress={() => setScanned(false)} />} */}
                <ScrollView horizontal style={styles.imagePickerContainer}>
                    {images.map((image) => (
                        <TouchableOpacity key={image.id} onPress={() => pickImage(image.uri)}>
                            <Image source={{ uri: image.uri }} style={styles.thumbnail} />
                        </TouchableOpacity>
                    ))}
                </ScrollView>
                {imageUri && <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />}
            </CameraView>
        </View >
    );
}

const { width } = Dimensions.get('window');
const scanBoxSize = width * 0.6;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    camera: {
        flex: 1,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    topOverlay: {
        flex: 1,
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    middleOverlay: {
        flexDirection: 'row',
    },
    sideOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    scanWindow: {
        width: scanBoxSize,
        height: scanBoxSize,
        borderWidth: 2,
        borderColor: 'white',
        backgroundColor: 'transparent',
    },
    bottomOverlay: {
        flex: 1,
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    imagePickerContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 100,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    thumbnail: {
        width: 80,
        height: 80,
        margin: 5,
    },
});
