import { View, Text, StyleSheet, Image, Pressable, Modal, TouchableOpacity, Animated, Easing, Button, ScrollView } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import colors from '../constants/Colors'
import { appIcon, backarrow, handscan, logo, scan } from '../assets/images'
import { HEIGHT, WIDTH } from '../constants/Dimension'
import TextInputComponent from '../components/TextInputComponent'
import ButtonComponent from '../components/ButtonComponent'
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import BackbuttonComponent from '../components/BackbuttonComponent'
import { CameraView, useCameraPermissions } from 'expo-camera';
import QrcodeComponent from '../components/QrCodeComponent'

const UniqueIdScreen = () => {
    const navigation = useNavigation()
    const [modalVisible, setModalVisible] = useState(false);
    const [showInstructions, setShowInstructions] = useState(false);
    const [scannerOpen, setScannerOpen] = useState(false);
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);
    const [cameraType, setCameraType] = useState('back');
    const [scannedData, setScannedData] = useState('');

    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        (async () => {
            if (!permission) {
                await requestPermission();
            }
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        setUniqueId(data);
        setScannerOpen(false);
        setModalVisible(false);
    };
    if (!permission) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    const onNavigate = () => {
        navigation.navigate("ProfilePictureScreen")
    }

    const toggleModal = () => {
        if (!modalVisible) {
            setModalVisible(true);
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 300,
                easing: Easing.ease,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 300,
                easing: Easing.ease,
                useNativeDriver: true,
            }).start(() => setModalVisible(false));
        }
    };

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setShowInstructions(false);
    };

    const openScanner = () => {
        setScannerOpen(true);
    }

    const onHowto = () => {
        setShowInstructions(true);
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start();
    };

    const hideInstructions = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start(() => setShowInstructions(false));
    };

    const closeModals = () => {
        setScannerOpen(false);
        setModalVisible(false);
    };

    const handleScannedData = (data) => {
        console.log("Scanned data:", data);
        setScannedData(data);
    };

    return (
        <View style={styles.mainContainer}>
            <View style={styles.subContainer}>
                <Image source={appIcon} resizeMode='contain' style={styles.iconStyle} />
                <View style={{ alignItems: 'center', marginTop: HEIGHT * 0.13 }}>
                    <Text style={styles.mainText}>Company Unique ID Number</Text>
                    <Text style={styles.subText}>If you don't know this. Then please ask to your employer.</Text>
                </View>
                <TextInputComponent
                    value={scannedData}
                    editable={false}
                    onChangeText={text => {
                        console.log("Text input changed:", text);
                        setScannedData(text);
                    }}
                    placeholder="Unique ID"
                    keyboardType="numeric"
                    containerStyle={styles.textinputStyle}
                />
                <ButtonComponent
                    buttonValue="Continue"
                    onPress={onNavigate}
                    buttonContainer={styles.continueButton}
                />

                <View style={styles.scanStyle}>
                    <Text style={{ fontSize: 15, fontWeight: '500' }}>Or scan with QR code</Text>
                    <Pressable style={styles.scanContainer} onPress={toggleModal}>
                        <MaterialIcons name="qr-code-scanner" size={20} color={colors.lightBlack} />
                    </Pressable>
                </View>
            </View>


            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <TouchableOpacity style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: "flex-end" }} activeOpacity={1} onPress={closeModal}>
                    <View style={{ backgroundColor: colors.white, height: HEIGHT * 0.73, borderTopLeftRadius: WIDTH * 0.07, borderTopRightRadius: WIDTH * 0.07, justifyContent: "center", alignItems: "center" }}>
                        <TouchableOpacity activeOpacity={1} style={{ width: '100%', height: '100%', justifyContent: "center", alignItems: "center" }}>
                            {showInstructions ? (

                                <Animated.View
                                    style={{
                                        opacity: fadeAnim,
                                        transform: [{ translateY: fadeAnim.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }],
                                        padding: HEIGHT * 0.01,
                                        marginTop: HEIGHT * 0.02,
                                    }}
                                >
                                    <View style={{ marginHorizontal: WIDTH * 0.05 }}>
                                        <BackbuttonComponent onPress={hideInstructions} containStyle={{ top: HEIGHT * -0.05 }} />
                                        <View style={{ marginTop: HEIGHT * 0.01 }}>
                                            <Image source={handscan} style={{ width: WIDTH * 0.3, height: HEIGHT * 0.2 }} resizeMode="contain" />
                                            <Text style={{ fontSize: 20, fontWeight: '500', color: colors.black, fontSize: 22, width: WIDTH * 0.6, marginTop: HEIGHT * 0.05 }}>How to login using QR Code</Text>
                                            <Text style={{ fontSize: 17, fontWeight: '500', marginTop: HEIGHT * 0.02 }}>
                                                {'\u2022'}  Open "https://temp.recsy.co.uk" in your web browser.
                                                {'\n\n'}
                                                {'\u2022'}  Navigate to the settings section.
                                                {'\n\n'}
                                                {'\u2022'}  Click "Connect Mobile App" tab.
                                                {'\n\n'}
                                                {'\u2022'} Scan the QR Code.
                                            </Text>
                                        </View>
                                    </View>
                                </Animated.View>
                            ) : (
                                <View style={{ alignItems: "center" }}>
                                    <View style={{ marginBottom: 50 }}>
                                        <Text style={{ fontWeight: '500', fontSize: 22 }}>QR Code</Text>
                                    </View>

                                    <View style={{ justifyContent: "center", alignItems: "center", width: WIDTH * 0.75, height: HEIGHT * 0.35, backgroundColor: colors.lightAsh, borderRadius: WIDTH * 0.02, position: 'relative', marginTop: HEIGHT * 0.0 }}>
                                        <View style={{ position: 'absolute', top: -WIDTH * 0.075, left: '50%', marginLeft: -WIDTH * 0.075, backgroundColor: colors.white, width: WIDTH * 0.18, height: WIDTH * 0.18, borderRadius: WIDTH * 0.15, justifyContent: 'center', alignItems: 'center' }}>
                                            <Image source={logo} style={{ width: WIDTH * 0.18, height: WIDTH * 0.15 }} resizeMode="contain" />
                                        </View>
                                        <Image source={scan} style={{ width: WIDTH * 0.8, height: HEIGHT * 0.23 }} resizeMode="contain" />
                                    </View>
                                    <Text style={{ width: WIDTH * 0.7, textAlign: "center", marginTop: HEIGHT * 0.02 }}>This QR code will redirect you to your login screen</Text>
                                    <Pressable onPress={onHowto} style={{ justifyContent: "center", alignItems: "center" }}>
                                        <Text style={{ color: colors.orange, fontSize: 16, fontWeight: "500", marginTop: HEIGHT * 0.01 }}>How to?</Text>
                                    </Pressable>
                                    <ButtonComponent
                                        onPress={openScanner}
                                        buttonValue="Scan"
                                        buttonContainer={{ width: WIDTH * 0.7, backgroundColor: colors.orange, padding: HEIGHT * 0.025, borderRadius: WIDTH * 0.02, marginTop: HEIGHT * 0.02 }}
                                    />

                                </View>
                            )}
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>

                {scannerOpen && (
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={scannerOpen}
                        onRequestClose={() => setScannerOpen(false)}
                    >
                        <QrcodeComponent
                            onCloseModals={closeModals}
                            onScanned={handleScannedData}
                        />
                    </Modal>
                )}

            </Modal>
        </View>
    )
}

export default UniqueIdScreen

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.white,
    },
    subContainer: {
        alignItems: "center",
        marginHorizontal: WIDTH * 0.05
    },
    iconStyle: {
        marginTop: HEIGHT * 0.1,
        width: WIDTH * 0.3,
        height: WIDTH * 0.3
    },
    textinputStyle: {
        colors: colors.grey,
        marginTop: HEIGHT * 0.03,
        padding: HEIGHT * 0.005
    },
    mainText: {
        fontSize: 27,
        fontWeight: '500',
        width: WIDTH * 0.6,
        textAlign: 'center'
    },
    subText: {
        fontSize: 14,
        fontWeight: '400',
        color: colors.ash,
        marginHorizontal: WIDTH * 0.15,
        textAlign: 'center',
        margin: 10
    },
    scanStyle: {
        marginTop: HEIGHT * 0.1,
        alignItems: 'center'
    },
    scanContainer: {
        marginTop: HEIGHT * 0.01,
        width: WIDTH * 0.13,
        height: WIDTH * 0.13,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: WIDTH * 0.08,
        backgroundColor: colors.padColor
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: WIDTH,
        padding: HEIGHT * 0.02,
        height: HEIGHT * 0.7,
        backgroundColor: colors.white,
        borderTopLeftRadius: WIDTH * 0.05,
        borderTopRightRadius: WIDTH * 0.05,
        // borderRadius: WIDTH * 0.02,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        fontWeight: '500',
        marginBottom: HEIGHT * 0.02,
    },
    closeButton: {
        backgroundColor: colors.orange,
        width: WIDTH * 0.4,
        height: HEIGHT * 0.06,
        borderRadius: WIDTH * 0.02,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: HEIGHT * 0.02,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
        marginBottom: 20,
    },
    headerText: {
        marginLeft: 10,
        fontSize: 18,
        fontWeight: 'bold',
    },
})
