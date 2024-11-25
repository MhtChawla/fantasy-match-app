import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar } from 'react-native-calendars';
import { useDispatch, useSelector } from 'react-redux';
import { Match, deleteMatch } from '../redux/slices/matchdata';
import { generateDateObjects } from '../utils/helpers';

const HomeScreen = ({ navigation }: any) => {

    const dispatch = useDispatch();

    const matches = useSelector((state: any) => {
        console.log(state);
        return state.matchdata?.matches;
    });

    const renderItem = ({ item }: { item: Match }) => (
        <View style={styles.matchItem}>
            <Text>{item.day} at {item.timeSlot}</Text>
            <View style={styles.matchActions}>
                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleEditMatch(item)}
                >
                    <Text>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleDeleteMatch(item.id)}
                >
                    <Text>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const handleEditMatch = (match: Match) => {
        navigation.navigate('AddEditMatchScreen', { match });
    };


    const handleDeleteMatch = (id: string) => {
        Alert.alert(
            "Delete Match",
            "Are you sure you want to delete this match?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "OK",
                    onPress: () => dispatch(deleteMatch(id))
                }
            ]
        );
    };

    const uniqueDays = [...new Set(matches.map((match: Match) => match.day))]

    return (
        <SafeAreaView style={styles.container}>
            <Calendar
                markedDates={uniqueDays.length ? generateDateObjects(uniqueDays as string[]) : {}}
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
