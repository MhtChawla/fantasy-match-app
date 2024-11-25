import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity, Modal, FlatList, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Match, addMatch, updateMatch } from '../redux/slices/matchdata';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { dateToString, formatTimeWithAddedHours } from '../utils/helpers';
import { useDispatch, useSelector } from 'react-redux';

const allAvailableParticipants = ["Amit", "Ravi", "Vikram", "Rohan", "Rahul", "Karan", "Ajay", "Sandeep", "Manish", "Suresh", "Arjun", "Vivek", "Anil", "Rajesh", "Shankar", "Harish", "Sunil", "Pradeep", "Raghav", "Nitin"]

const AddEditMatchScreen = ({ route, navigation }: any) => {

  const dispatch = useDispatch();
  const matches = useSelector((state: any) => state.matchdata.matches);

  const { match } = route.params || {};
  const [name, setName] = useState(match ? match.name : '');
  const [time, setTime] = useState(match ? match.timeSlot : '');
  const [date, setDate] = useState(match ? match.day : '');
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>(match ? match.participants : []);
  const [modalVisible, setModalVisible] = useState(false);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const handleSelectParticipant = (participant: string) => {
    setSelectedParticipants(prevState => {
      if (prevState.includes(participant)) {
        return prevState.filter(item => item !== participant);
      } else {
        return [...prevState, participant];
      }
    });
  };


  const handleSave = () => {
    if (match) {
      const updatedMatch = {
        id: name!,
        name,
        day: date,
        timeSlot: time,
        participants: selectedParticipants,
      };

      dispatch(updateMatch(updatedMatch));
    } else {
      if (!name || !date || !time || !selectedParticipants) {
        Alert.alert('Error', 'Please fill all fields');
        return;
      }
      const isOverlap = matches?.some((match: Match) => match.day === date && match.timeSlot === time);
      if (isOverlap) {
        Alert.alert('Error', 'Time slot already taken for this day');
        return;
      }
      const newMatch = {
        id: name,
        name: name,
        day: date.toString(),
        timeSlot: time.toString(),
        participants: selectedParticipants,
      };
      console.log("===>", newMatch)
      dispatch(addMatch(newMatch));
    }
    navigation.goBack();
  };

  // for date

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDConfirm = (date: Date) => {
    const pickedDate = dateToString(date);
    const pickedTime = formatTimeWithAddedHours(date);
    setDate(pickedDate);
    setTime(pickedTime);
    hideDatePicker();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{`${match ? "Edit" : "Add"} Match Details`}</Text>
      <TextInput
        placeholder="Match Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TouchableOpacity onPress={showDatePicker}>
        <TextInput
          value={date.toString()}
          placeholder="Select Match Date"
          editable={false}
          style={styles.input}
        />

        <TextInput
          value={time.toString()}
          placeholder="Select Match Time"
          editable={false}
          style={styles.input}
        />
      </TouchableOpacity>

      <TouchableOpacity style={{ marginBottom: "auto" }} onPress={() => setModalVisible(true)}>
        <TextInput
          value={selectedParticipants?.join(', ')}
          placeholder="Select Participants"
          editable={false}
          style={styles.input}
        />
      </TouchableOpacity>

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Participants</Text>
            <FlatList
              data={allAvailableParticipants}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.participantItem,
                  selectedParticipants.includes(item) && styles.selectedItem]}
                  onPress={() => handleSelectParticipant(item)}
                >
                  <Text>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <Button title="Done" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleDConfirm}
        onCancel={hideDatePicker}
      />

      <Button title="Save" onPress={handleSave} />
    </SafeAreaView>
  )
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
    marginVertical: 20
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    height: "80%"
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  participantItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  selectedItem: {
    backgroundColor: '#28a745',
    color: 'white',
  },
});

export default AddEditMatchScreen;
