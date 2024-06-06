import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, ScrollView } from 'react-native';
import colors from '../constants/Colors';
import BackbuttonComponent from '../components/BackbuttonComponent';
import { backarrow } from '../assets/images';
import { HEIGHT, WIDTH } from '../constants/Dimension';
import SignaturePad from 'react-native-signature-canvas';
import ButtonComponent from '../components/ButtonComponent';
import WriteComponent from '../components/WriteComponent';
import { useNavigation } from '@react-navigation/native';
import MarkComponent from '../components/MarkComponent';

const PolicyScreen = () => {
    const navigation = useNavigation()
    const signatureRef = useRef(null);
    const [activeTab, setActiveTab] = useState('Draw');
    const [showTickMark, setShowTickMark] = useState(false);

    const handleSignature = (signature) => {
        Alert.alert('Signature', signature);
    };

    const handleCancel = () => {
        if (signatureRef.current) {
            signatureRef.current.clearSignature();
        }
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleMarkPress = () => {
        setShowTickMark(true);
    };

    return (
        <View style={styles.mainContainer}>
            <View style={styles.subContainer}>
                <BackbuttonComponent
                    backarrow={backarrow}
                    onPress={() => navigation.goBack()}
                    containStyle={styles.buttonContainerStyle}
                />
            </View>

            <View style={styles.subContainer}>
                <Text style={styles.headerText}>Social Media Policy</Text>
                <Text style={styles.subText}>Through sign in you are agreeing policy</Text>



                <View style={{ flexDirection: "row", alignItems: "center", marginTop: HEIGHT * 0.03 }}>
                    <MarkComponent onMarkPress={handleMarkPress} />
                    <Text style={{ marginHorizontal: WIDTH * 0.02, fontSize: 15 }}> I agree the Policy</Text>
                </View>

                <View style={styles.tabsContainer}>
                    <TouchableOpacity onPress={() => handleTabChange('Draw')}>
                        <Text style={[styles.tabText, activeTab === 'Draw' && styles.activeTabText]}>Draw</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleTabChange('Write')}>
                        <Text style={[styles.tabText, activeTab === 'Write' && styles.activeTabText]}>Write</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.dividerContainer}>
                    <View style={[styles.divider, { borderColor: colors.grey }]}>
                        {activeTab === 'Draw' && <View style={[styles.tabIndicator, { left: WIDTH * 0.0 }]} />}
                        {activeTab === 'Write' && <View style={[styles.tabIndicator, { left: WIDTH * 0.15 }]} />}
                    </View>
                </View>

                {activeTab === 'Draw' && (
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <View style={[styles.drawContainer, styles.commonWidth]}>
                            <SignaturePad
                                ref={signatureRef}
                                onSave={handleSignature}
                                onClear={() => console.log('Signature cleared')}
                                onChange={() => console.log('Signature changed')}
                                style={styles.signaturepadStyle}
                            />
                        </View>
                    </View>
                )}
                {activeTab === 'Write' && <WriteComponent />}
                <Text style={styles.validationText}>Please sign in to confirm</Text>

                <View style={styles.buttonContainer}>
                    <ButtonComponent
                        buttonValue="Clear"
                        onPress={handleCancel}
                        textStyle={styles.cancelbuttonText}
                        buttonStyle={styles.cancelButton}
                    />
                    <ButtonComponent
                        buttonValue="Confirm"
                        onPress={handleCancel}
                        textStyle={styles.buttonText}
                        buttonStyle={styles.nextButton}
                    />
                </View>
            </View>
        </View>
    );
};

export default PolicyScreen;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.white,
    },
    contentContainer: {
        flexGrow: 1,
        paddingBottom: HEIGHT * 0.05,
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
        marginTop: HEIGHT * 0.02,
    },
    subText: {
        fontSize: 14,
        fontWeight: '400',
        color: colors.black
    },
    tabsContainer: {
        flexDirection: 'row',
        marginHorizontal: WIDTH * 0.02,
        marginTop: HEIGHT * 0.03,
    },
    tabText: {
        fontSize: 16,
        fontWeight: '500',
        color: colors.black,
        marginHorizontal: WIDTH * 0.02,
    },
    activeTabText: {
        color: colors.orange,
    },
    commonWidth: {
        width: WIDTH * 0.88,
    },
    dividerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    divider: {
        borderWidth: 1,
        margin: 10,
        width: WIDTH * 0.88,
        position: 'relative',
    },
    tabIndicator: {
        position: 'absolute',
        bottom: -1,
        height: 2,
        width: WIDTH * 0.13,
        backgroundColor: colors.orange,
    },
    drawContainer: {
        height: HEIGHT * 0.19 + 5,
        borderRadius: WIDTH * 0.02,
        borderWidth: 1,
        borderColor: colors.grey,
        overflow: 'hidden',
    },
    signaturepadStyle: {
        flex: 1,
        borderRadius: WIDTH * 0.02,
    },
    nextButton: {
        marginTop: HEIGHT * 0.02,
        width: WIDTH * 0.4,
        backgroundColor: colors.orange,
    },
    cancelButton: {
        borderWidth: 2,
        marginTop: HEIGHT * 0.02,
        width: WIDTH * 0.4,
        borderColor: colors.orange,
    },
    cancelbuttonText: {
        color: colors.orange,
        fontWeight: '500',
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: 'space-between',
        paddingHorizontal: WIDTH * 0.05,
        marginTop: HEIGHT * 0.0,

    },
    buttonText: {
        color: colors.white,
    },
    validationText: {
        color: colors.pink,
        fontWeight: "400",
        marginVertical: HEIGHT * 0.002,
        // paddingHorizontal: WIDTH * 0.05,
    }
});



