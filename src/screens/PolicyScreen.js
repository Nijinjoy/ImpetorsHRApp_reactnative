import { View, Text, StyleSheet, Pressable, ScrollView, Platform } from 'react-native';
import React, { useState } from 'react';
import colors from '../constants/Colors';
import { HEIGHT, WIDTH } from '../constants/Dimension';
import BackbuttonComponent from '../components/BackbuttonComponent';
import { backarrow } from '../assets/images';
import { useNavigation } from '@react-navigation/core';
import DrawComponent from '../components/DrawComponent';
import WriteComponent from '../components/WriteComponent';
import ButtonComponent from '../components/ButtonComponent';
// import PDFView from 'react-native-view-pdf/lib/index';
// import PDFView from 'react-native-view-pdf';


const PolicyScreen = () => {
    const navigation = useNavigation();
    const [selectedComponent, setSelectedComponent] = useState('draw');


    const resources = {
        file: Platform.OS === 'ios' ? 'downloadedDocument.pdf' : '/sdcard/Download/downloadedDocument.pdf',
        url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        base64: 'JVBERi0xLjMKJcfs...',
    };

    const resourceType = 'url';

    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                <BackbuttonComponent
                    backarrow={backarrow}
                    onPress={() => navigation.goBack()}
                    containStyle={styles.buttonContainerStyle}
                />
                <Text style={styles.mainText}>Social Media Policy</Text>
                <Text style={styles.subText}>Through sign in you are agreeing to the policy</Text>
                <ScrollView style={styles.pdfContainer}>
                    {/* <PDFView
                        fadeInDuration={250.0}
                        style={{ flex: 1 }}
                        resource={resources[resourceType]}
                        resourceType={resourceType}
                        onLoad={() => console.log(`PDF rendered from ${resourceType}`)}
                        onError={(error) => console.log('Cannot render PDF', error)}
                    /> */}
                </ScrollView>
                <View style={{ flexDirection: 'row', marginVertical: HEIGHT * 0.02 }}>
                    <Pressable
                        onPress={() => setSelectedComponent('draw')}
                        style={[
                            styles.tabButton,
                            selectedComponent === 'draw' && styles.activeTab,
                        ]}
                    >
                        <Text style={[styles.tabText, selectedComponent === 'draw' && { color: colors.orange }]}>
                            Draw
                        </Text>
                        {/* Border indicator for Draw tab */}
                        {selectedComponent === 'draw' && <View style={styles.tabIndicator} />}
                    </Pressable>
                    <Pressable
                        onPress={() => setSelectedComponent('write')}
                        style={[
                            styles.tabButton,
                            selectedComponent === 'write' && styles.activeTab,
                        ]}
                    >
                        <Text style={[styles.tabText, selectedComponent === 'write' && { color: colors.orange }]}>
                            Write
                        </Text>
                        {/* Border indicator for Write tab */}
                        {selectedComponent === 'write' && <View style={styles.tabIndicator} />}
                    </Pressable>
                </View>
                {/* Border indicator */}
                <View style={styles.selectedTabIndicator} />
                <View style={{ marginTop: 5 }}>
                    {selectedComponent === 'draw' && <DrawComponent />}
                    {selectedComponent === 'write' && <WriteComponent />}
                </View>
                <View style={{ flexDirection: "row", justifyContent: 'space-between', marginTop: HEIGHT * 0.03 }}>
                    <ButtonComponent
                        buttonValue="Clear"
                        textStyle={styles.clearText}
                        buttonStyle
                        ={styles.clearButton}
                    // onPress={() => navigation.navigate("DocumentScreen")}
                    />
                    <ButtonComponent
                        buttonValue="Confirm"
                        textStyle={styles.buttonText}
                        buttonStyle
                        ={styles.nextButton}
                    // onPress={() => navigation.navigate("DocumentScreen")}
                    />
                </View>
            </View>
        </View>
    );
};

export default PolicyScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    subContainer: {
        marginHorizontal: WIDTH * 0.05,
    },
    buttonContainerStyle: {
        marginTop: HEIGHT * 0.07,
    },
    mainText: {
        fontSize: 27,
        fontWeight: '500',
        marginTop: HEIGHT * 0.04,
    },
    subText: {
        fontSize: 16,
        fontWeight: '400',
        marginTop: HEIGHT * 0.006,
    },
    tabButton: {
        alignItems: 'center',
        marginHorizontal: WIDTH * 0.01,
        position: 'relative',
    },
    activeTab: {
        backgroundColor: colors.primary,
    },
    tabText: {
        fontSize: 16,
        fontWeight: '500',
    },
    pdfContainer: {
        marginTop: HEIGHT * 0.02,
        marginBottom: HEIGHT * 0.02,
        paddingHorizontal: WIDTH * 0.05,
    },
    tabIndicator: {
        position: 'absolute',
        bottom: -1,
        left: 0,
        height: 2,
        width: '100%',
        backgroundColor: colors.orange,
    },
    selectedTabIndicator: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: 2,
        width: WIDTH * 0.435,
        backgroundColor: 'transparent',
        zIndex: 1,
    },
    clearButton: {
        width: WIDTH * 0.4,
        borderWidth: 1.5,
        borderColor: colors.orange
    },
    clearText: {
        color: colors.orange,
        fontWeight: '500'
    },
    nextButton: {
        width: WIDTH * 0.4,
        backgroundColor: colors.orange
    },
    buttonText: {
        color: colors.white
    }
});
