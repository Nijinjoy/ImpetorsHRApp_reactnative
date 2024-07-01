import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { HEIGHT, WIDTH } from '../constants/Dimension'
import colors from '../constants/Colors'
import BackbuttonComponent from '../components/BackbuttonComponent'
import { backarrow, location } from '../assets/images'
import { useNavigation } from '@react-navigation/native'
import ButtonComponent from '../components/ButtonComponent'

const branchFlatlist = [
    {
        id: 1,
        icon: location,
        placeName: "Basildon(UK)"
    },
    {
        id: 2,
        icon: location,
        placeName: "America(UK)"
    },
    {
        id: 3,
        icon: location,
        placeName: "Banglore(UK)"
    },
    {
        id: 4,
        icon: location,
        placeName: "Kozhikode(UK)"
    },
    {
        id: 4,
        icon: location,
        placeName: "Kozhikode(UK)"
    },
]

const BranchScreen = () => {
    const navigation = useNavigation()
    const [branches, setBranches] = useState(branchFlatlist.slice(0, 4))
    const [showMore, setShowMore] = useState(false)

    const handleShowMore = () => {
        setBranches(branchFlatlist)
        setShowMore(true)
    }

    const branchNavigate = () => {
        navigation.navigate("DateofBirthScreen")
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.subContainer}>
                <BackbuttonComponent
                    backarrow={backarrow}
                    onPress={() => navigation.goBack()}
                    containStyle={styles.buttonContainerStyle}
                />
                <Text style={styles.mainText}>Your Branch</Text>
                <Text style={styles.subText}>If you are not assigned to this branch, please reach out to HR for assistance.</Text>
                <View style={styles.flatlistContainer}>
                    <FlatList
                        data={branches}
                        keyExtractor={(item) => item.id.toString()}
                        numColumns={2}
                        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
                        renderItem={({ item }) => {
                            const isBasildon = item.placeName === "Basildon(UK)";
                            return (
                                <View style={styles.flatlistStyle}>
                                    <Image
                                        source={item.icon}
                                        resizeMode='contain'
                                        style={[
                                            styles.iconStyle,
                                            isBasildon && { tintColor: colors.orange }
                                        ]}
                                    />
                                    <Text
                                        style={[
                                            styles.placeNameText,
                                            isBasildon && { color: colors.orange, fontWeight: '500' }
                                        ]}
                                    >
                                        {item.placeName}
                                    </Text>
                                </View>
                            )
                        }}
                    />
                </View>
                {!showMore && (
                    <TouchableOpacity onPress={handleShowMore}>
                        <Text style={styles.moreText}>+2 More</Text>
                    </TouchableOpacity>
                )}
                <ButtonComponent
                    buttonValue="Next"
                    buttonContainer={styles.nextButton}
                    labelStyle={styles.textStyle}
                    onPress={branchNavigate}
                />
            </View>
        </View>
    )
}

export default BranchScreen

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.white,
    },
    subContainer: {
        marginHorizontal: WIDTH * 0.05,
    },
    buttonContainerStyle: {
        marginTop: HEIGHT * 0.08
    },
    mainText: {
        fontSize: 27,
        fontWeight: '500',
        marginTop: HEIGHT * 0.1,
    },
    subText: {
        fontSize: 16,
        fontWeight: '400',
        marginTop: HEIGHT * 0.006,
    },
    flatlistStyle: {
        borderWidth: 1,
        borderColor: colors.grey,
        width: WIDTH * 0.4,
        alignItems: 'center',
        padding: HEIGHT * 0.04,
        borderRadius: WIDTH * 0.03,
        justifyContent: "center",
        margin: WIDTH * 0.02,
        backgroundColor: colors.white,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        elevation: 3,
    },
    flatlistContainer: {
        alignItems: "center",
        justifyContent: 'center',
        marginTop: HEIGHT * 0.03
    },
    iconStyle: {
        width: WIDTH * 0.1,
        height: HEIGHT * 0.03,
        tintColor: colors.grey
    },
    placeNameText: {
        marginTop: HEIGHT * 0.01,
        width: WIDTH * 0.4,
        textAlign: 'center',
        color: colors.grey
    },
    itemSeparator: {
        height: HEIGHT * 0.01,
    },
    moreText: {
        color: colors.pink,
        fontWeight: "500",
        textAlign: 'center',
        marginTop: HEIGHT * 0.03
    },
    nextButton: {
        backgroundColor: colors.orange,
        width: WIDTH * 0.9,
        height: HEIGHT * 0.08,
        borderRadius: WIDTH * 0.02,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: HEIGHT * 0.03,
    }
})
