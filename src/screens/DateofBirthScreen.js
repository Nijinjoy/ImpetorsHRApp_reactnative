import { View, Text, StyleSheet, TouchableOpacity, Platform, Alert } from 'react-native';
import React, { useState } from 'react';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import BackbuttonComponent from '../components/BackbuttonComponent';
import { HEIGHT, WIDTH } from '../constants/Dimension';
import colors from '../constants/Colors';
import { backarrow } from '../assets/images';
import ButtonComponent from '../components/ButtonComponent';

const DateofBirthScreen = ({ navigation }) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isMonthPickerVisible, setMonthPickerVisibility] = useState(false);
    const [isYearPickerVisible, setYearPickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [selectedYear, setSelectedYear] = useState(null);

    const [focusedBox, setFocusedBox] = useState(null);

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

    const showDatePicker = (mode) => {
        if (mode === 'date') {
            setDatePickerVisibility(true);
            setFocusedBox('date');
        } else if (mode === 'month') {
            setMonthPickerVisibility(true);
            setFocusedBox('month');
        } else if (mode === 'year') {
            setYearPickerVisibility(true);
            setFocusedBox('year');
        }
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
        setMonthPickerVisibility(false);
        setYearPickerVisibility(false);
        setFocusedBox(null);
    };

    const handleConfirm = (date, mode) => {
        if (mode === 'date') {
            setSelectedDate(date.getDate());
        } else if (mode === 'month') {
            setSelectedMonth(date.getMonth() + 1);
        } else if (mode === 'year') {
            setSelectedYear(date.getFullYear());
        }
        hideDatePicker();
    };

    const getBorderColor = (box) => {
        return focusedBox === box ? colors.orange : '#ccc';
    };

    const handleNextPress = () => {
        if (selectedDate && selectedMonth && selectedYear) {
            navigation.navigate('PersonalDetailScreen');
        } else {
            Alert.alert('Incomplete Information', 'Please select date, month, and year.');
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
                <View style={{ marginVertical: HEIGHT * 0.1 }}>
                    <Text style={{ color: colors.black, fontSize: 27, fontWeight: '500', width: WIDTH * 0.6 }}>Choose Your Date of Birth</Text>
                    <View style={{ marginTop: HEIGHT * 0.05, flexDirection: "row" }}>
                        <TouchableOpacity
                            style={[styles.box, { borderColor: getBorderColor('date') }]}
                            onPress={() => showDatePicker('date')}
                        >
                            <Text style={styles.text}>{selectedDate || "DD"}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.box, { borderColor: getBorderColor('month') }]}
                            onPress={() => showDatePicker('month')}
                        >
                            <Text style={styles.text}>{selectedMonth ? monthNames[selectedMonth - 1] : "Month"}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.box, { borderColor: getBorderColor('year') }]}
                            onPress={() => showDatePicker('year')}
                        >
                            <Text style={styles.text}>{selectedYear || "Year"}</Text>
                        </TouchableOpacity>
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={(date) => handleConfirm(date, 'date')}
                            onCancel={hideDatePicker}
                            display={Platform.OS === 'android' ? 'spinner' : 'default'}
                            date={new Date()}
                        />
                        <DateTimePickerModal
                            isVisible={isMonthPickerVisible}
                            mode="date"
                            onConfirm={(date) => handleConfirm(date, 'month')}
                            onCancel={hideDatePicker}
                            display={Platform.OS === 'android' ? 'spinner' : 'default'}
                            date={new Date()}
                            pickerMode="month"
                            headerTextIOS="Select Month"
                        />
                        <DateTimePickerModal
                            isVisible={isYearPickerVisible}
                            mode="date"
                            onConfirm={(date) => handleConfirm(date, 'year')}
                            onCancel={hideDatePicker}
                            display={Platform.OS === 'android' ? 'spinner' : 'default'}
                            date={new Date()}
                            pickerMode="year"
                            headerTextIOS="Select Year"
                        />
                    </View>
                </View>

                <ButtonComponent
                    buttonValue="Next"
                    textStyle={{ color: colors.white }}
                    buttonStyle={{
                        width: WIDTH * 0.89,
                        backgroundColor: colors.orange,
                        marginTop: HEIGHT * 0.1
                    }}
                    onPress={handleNextPress}
                />
            </View>
        </View>
    )
}

export default DateofBirthScreen

const styles = StyleSheet.create({
    buttonContainerStyle: {
        marginTop: HEIGHT * 0.08
    },
    subContainer: {
        marginHorizontal: WIDTH * 0.05
    },
    mainContainer: {
        backgroundColor: colors.white,
        flex: 1
    },
    box: {
        width: WIDTH * 0.26,
        padding: WIDTH * 0.05,
        borderWidth: 2,
        borderColor: '#ccc',
        borderRadius: WIDTH * 0.03,
        marginVertical: 10,
        alignItems: 'center',
        marginRight: WIDTH * 0.05,
        marginHorizontal: WIDTH * 0.0
    },
    text: {
        fontSize: 18,
    },

});
