import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../constants/Colors';
import BackbuttonComponent from '../components/BackbuttonComponent';
import { HEIGHT, WIDTH } from '../constants/Dimension';
import ModalSelector from 'react-native-modal-selector';

const DateofBirthScreen = () => {
    const [date, setDate] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');

    const [isDateFocused, setIsDateFocused] = useState(false);
    const [isMonthFocused, setIsMonthFocused] = useState(false);
    const [isYearFocused, setIsYearFocused] = useState(false);

    const handleDateChange = (selectedDate) => {
        setDate(selectedDate);
        setIsDateFocused(false);
    };

    const handleMonthChange = (selectedMonth) => {
        setMonth(selectedMonth);
        setIsMonthFocused(false);
    };

    const handleYearChange = (selectedYear) => {
        setYear(selectedYear);
        setIsYearFocused(false);
    };

    const monthNames = [
        { key: 1, label: 'January' },
        { key: 2, label: 'February' },
        { key: 3, label: 'March' },
        { key: 4, label: 'April' },
        { key: 5, label: 'May' },
        { key: 6, label: 'June' },
        { key: 7, label: 'July' },
        { key: 8, label: 'August' },
        { key: 9, label: 'September' },
        { key: 10, label: 'October' },
        { key: 11, label: 'November' },
        { key: 12, label: 'December' }
    ];

    const dateData = [...Array(31).keys()].map((day) => ({ key: day + 1, label: (day + 1).toString() }));
    const yearData = [...Array(100).keys()].map((year) => ({ key: 2024 - year, label: (2024 - year).toString() }));

    return (
        <View style={{ flex: 1, backgroundColor: colors.white }}>
            <View style={{ marginHorizontal: WIDTH * 0.05 }}>
                <BackbuttonComponent
                    onPress={() => navigation.goBack()}
                    containStyle={styles.buttonContainerStyle}
                />
                <Text style={{ fontWeight: "500", fontSize: 27, width: WIDTH * 0.6 }}>Choose Your Date of Birth</Text>

                <View style={styles.pickerRow}>
                    <View
                        style={[
                            styles.pickerContainer,
                            isDateFocused && { borderColor: colors.orange }
                        ]}
                    >
                        <ModalSelector
                            data={dateData}
                            initValue="DD"
                            onChange={(option) => handleDateChange(option.label)}
                            onModalOpen={() => setIsDateFocused(true)}
                            onModalClose={() => setIsDateFocused(false)}
                            style={styles.datePickerStyle}
                            overlayStyle={[styles.modalOverlay, { top: HEIGHT * 0.08 + 20 }]} // Adjust top offset
                            optionContainerStyle={[styles.modalOptionContainer, { width: WIDTH * 0.26 }]}
                            cancelText="" // Remove cancel button
                        >
                            <Text style={styles.selectedValue}>{date || 'DD'}</Text>
                        </ModalSelector>
                    </View>

                    <View
                        style={[
                            styles.pickerContainer,
                            isMonthFocused && { borderColor: colors.orange }
                        ]}
                    >
                        <ModalSelector
                            data={monthNames}
                            initValue="Month"
                            onChange={(option) => handleMonthChange(option.key.toString())}
                            onModalOpen={() => setIsMonthFocused(true)}
                            onModalClose={() => setIsMonthFocused(false)}
                            style={styles.monthPickerStyle}
                            overlayStyle={[styles.modalOverlay, { top: HEIGHT * 0.08 + 20 }]} // Adjust top offset
                            optionContainerStyle={[styles.modalOptionContainer, { width: WIDTH * 0.26 }]}
                            cancelText=""
                        >
                            <Text style={styles.selectedValue}>{monthNames.find(m => m.key.toString() === month)?.label || 'Month'}</Text>
                        </ModalSelector>
                    </View>

                    <View
                        style={[
                            styles.pickerContainer,
                            isYearFocused && { borderColor: colors.orange }
                        ]}
                    >
                        <ModalSelector
                            data={yearData}
                            initValue="Year"
                            onChange={(option) => handleYearChange(option.label)}
                            onModalOpen={() => setIsYearFocused(true)}
                            onModalClose={() => setIsYearFocused(false)}
                            style={styles.yearPickerStyle}
                            overlayStyle={[styles.modalOverlay, { top: HEIGHT * 0.08 + 20 }]} // Adjust top offset
                            optionContainerStyle={[styles.modalOptionContainer, { width: WIDTH * 0.26 }]}
                            cancelText="" // Remove cancel button
                        >
                            <Text style={styles.selectedValue}>{year || 'Year'}</Text>
                        </ModalSelector>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default DateofBirthScreen;

const styles = StyleSheet.create({
    buttonContainerStyle: {
        marginTop: HEIGHT * 0.08
    },
    pickerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        marginBottom: 20,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: colors.grey,
        marginRight: 20,
        borderRadius: WIDTH * 0.03,
        height: HEIGHT * 0.08,
        width: WIDTH * 0.26,
        justifyContent: 'center',
        alignItems: 'center'
    },
    datePickerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    monthPickerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    yearPickerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    selectedValue: {
        fontSize: 16,
        color: colors.grey
    },
    modalOverlay: {
        backgroundColor: colors.white,
        width: WIDTH * 0.25,
        justifyContent: 'flex-start',
        borderWidth: 3
    },
    modalOptionContainer: {
        position: 'absolute',
        left: 0
    }
});

