import { View, Text, StyleSheet, FlatList, Image, Pressable } from 'react-native'
import React from 'react'
import { brp, nidoc, passport } from '../assets/images'
import colors from '../constants/Colors'
import { HEIGHT, WIDTH } from '../constants/Dimension'
import BackbuttonComponent from './BackbuttonComponent'


const DcumentFlatlist = [
    {
        id: 1,
        icon: brp,
        fileType: "Passport",
        uploadText: 'Not uploaded',
        path: 'PassportScreen'
    },
    {
        id: 2,
        icon: brp,
        fileType: "BRP",
        uploadText: 'Not uploaded',
        path: 'PassportScreen'
    },
    {
        id: 3,
        icon: nidoc,
        fileType: "NI document",
        uploadText: 'Not uploaded',
        path: 'PassportScreen'
    }
]

const FileComponent = ({ documentStatuses, onUpload, onNavigate }) => {
    return (
        <View style={styles.mainContainer}>
            <FlatList
                data={DcumentFlatlist}
                keyExtractor={(item) => item}
                renderItem={({ item }) => {
                    return (
                        <Pressable style={[styles.flatlistStyle, { marginBottom: HEIGHT * 0.02 }]} onPress={() => {
                            onNavigate(item.path);
                        }}>
                            <View>
                                <Image source={item.icon} resizeMode='contain' style={styles.imageStyle} />
                            </View>
                            <View style={styles.contentStyle}>
                                <Text style={styles.filetypeStyle}>{item.fileType}</Text>
                                <Text style={styles.uploadtextStyle}>{item.uploadText}</Text>
                            </View>
                        </Pressable>
                    )
                }}
            />
        </View>
    )
}

export default FileComponent

const styles = StyleSheet.create({
    subContainer: {
        marginHorizontal: WIDTH * 0.05
    },
    imageStyle: {
        width: WIDTH * 0.15,
        height: WIDTH * 0.15
    },
    flatlistStyle: {
        flexDirection: "row",
        borderWidth: 1,
        alignItems: "center",
        borderRadius: WIDTH * 0.02,
        padding: WIDTH * 0.04,
        borderColor: colors.grey,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 6.27,
        elevation: WIDTH * 0.01,
        backgroundColor: colors.white,
    },
    uploadtextStyle: {
        fontSize: 14,
        fontWeight: '300',
        color: colors.pink,
        marginTop: HEIGHT * 0.01
    },
    filetypeStyle: {
        fontSize: 18,
        fontWeight: '500'
    },
    contentStyle: {
        marginLeft: WIDTH * 0.04
    }
})
