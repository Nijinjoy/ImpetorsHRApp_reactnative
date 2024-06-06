import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import colors from '../constants/Colors';
import { HEIGHT, WIDTH } from '../constants/Dimension';

const MarkComponent = ({ onMarkPress }) => {
    const [marked, setMarked] = useState(false);

    const handleMarkPress = () => {
        setMarked(!marked);
        onMarkPress(!marked);
    };

    return (
        <TouchableOpacity onPress={handleMarkPress}>
            <View style={[styles.container, { backgroundColor: marked ? colors.orange : colors.grey }]}>
                {marked && <MaterialIcons name="check" size={20} color={colors.white} />}
            </View>
        </TouchableOpacity>
    );
}

export default MarkComponent;

const styles = StyleSheet.create({
    container: {
        borderRadius: WIDTH * 0.01,
        width: WIDTH * 0.07,
        height: WIDTH * 0.07,
        justifyContent: 'center',
        alignItems: 'center',
        padding: WIDTH * 0.01,
    }
});
