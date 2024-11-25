import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar } from 'react-native-calendars';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@reduxjs/toolkit/query';
import { Match } from '../redux/slices/matchdata';

const HomeScreen = ({ navigation }: any) => {

    const dispatch = useDispatch();
    const matches = useSelector((state: any) => state.matchdata.matches);

    const renderItem = ({ item }: { item: Match }) => (
        <View style={styles.matchItem}>
            <Text>{item.day} at {item.timeSlot}</Text>
            <View style={styles.matchActions}>
                <TouchableOpacity
                    style={styles.actionButton}
                // onPress={() => handleEditMatch(item)}
                >
                    <Text>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.actionButton}
                // onPress={() => handleDeleteMatch(item.id)}
                >
                    <Text>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
    return (
        <SafeAreaView style={styles.container}>
            <Calendar
                markedDates={{
                    '2024-11-25': { selected: true, marked: true, selectedColor: 'blue' },
                    '2024-11-26': { selected: true, marked: true, selectedColor: 'blue' },
                }}
                // onDayPress={handleDayPress}
                monthFormat={'yyyy MM'}
            />

            <FlatList
                data={matches}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                style={styles.matchList}
            />

            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('AddEditMatchScreen')}
            >
                <Text style={styles.addButtonText}>+ Add Match</Text>
            </TouchableOpacity>

        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
    },
    matchList: {
        marginTop: 20,
    },
    matchItem: {
        padding: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    matchActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
    },
    actionButton: {
        padding: 5,
        backgroundColor: '#ddd',
        borderRadius: 5,
    },
    addButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#28a745',
        padding: 15,
        borderRadius: 50,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 18,
    },
});

export default HomeScreen;
