import { View, Text, StyleSheet, FlatList, Image, Pressable } from 'react-native'
import React from 'react'
import colors from '../constants/Colors'
import { HEIGHT, WIDTH } from '../constants/Dimension'
import BackbuttonComponent from '../components/BackbuttonComponent'
import { backarrow, pen } from '../assets/images'
import { useNavigation } from '@react-navigation/native'
import ButtonComponent from '../components/ButtonComponent'

const agreementFlatlist = [
    {
        id: 1,
        icon: pen,
        text: "Social Media Policy",
        policyText: "Read Policy",
        signText: "Sign in Now"
    },
    {
        id: 2,
        icon: pen,
        text: "Sickness and Absent Policy",
        policyText: "Read Policy",
        signText: "Sign in Now"
    },
    {
        id: 3,
        icon: pen,
        text: "Bullying & Harassment Policy  ",
        policyText: "Read Policy",
        signText: "Sign in Now"
    },
    {
        id: 4,
        icon: pen,
        text: "HR Policy",
        policyText: "Read Policy",
        signText: "Sign in Now"
    }
]

const Separator = () => <View style={{ height: HEIGHT * 0.02 }} />;

const AgreementScreen = () => {
    const navigation = useNavigation()
    return (
        <View style={styles.mainContainer}>
            <View style={styles.subContainer}>
                <BackbuttonComponent
                    backarrow={backarrow}
                    onPress={() => navigation.goBack()}
                    containStyle={styles.buttonContainerStyle}
                />
                <Text style={styles.headerText}>Sign Your Agreement</Text>
                <FlatList
                    data={agreementFlatlist}
                    style={styles.flatlistStyle}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => {
                        return (
                            <View style={styles.flatlistContainer}>
                                <Text style={{ fontSize: 18, fontWeight: '500' }}>{item.text}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: HEIGHT * 0.02 }}>

                                    <Image source={item.icon} resizeMode='contain' />
                                    <Pressable onPress={() => navigation.navigate("PolicyScreen")}>
                                        <Text style={{ fontSize: 14, fontWeight: '400', marginLeft: WIDTH * 0.02, color: colors.orange }}>{item.signText}</Text>
                                    </Pressable>
                                    <Text style={{ fontSize: 14, fontWeight: "400", marginLeft: WIDTH * 0.1, color: colors.lightash }}>{item.policyText}</Text>

                                </View>
                            </View>
                        )
                    }}
                    ItemSeparatorComponent={Separator}
                />
                <ButtonComponent
                    buttonValue="Next"
                    onPress={() => navigation.navigate("AgreementScreen")}
                    textStyle={styles.buttonText}
                    buttonStyle={styles.nextButton}
                />
            </View>
        </View>
    )
}

export default AgreementScreen

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.white
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
        marginTop: HEIGHT * 0.03
    },
    flatlistContainer: {
        padding: HEIGHT * 0.025,
        borderRadius: WIDTH * 0.02,
        borderWidth: 1,
        borderColor: colors.grey,
        backgroundColor: colors.white,
        shadowColor: colors.grey,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 5,
    },
    flatlistStyle: {
        marginTop: HEIGHT * 0.05
    },
    nextButton: {
        width: WIDTH * 0.89,
        backgroundColor: colors.orange,
        marginTop: HEIGHT * 0.04,
    },
    buttonText: {
        color: colors.white,
    },
})
