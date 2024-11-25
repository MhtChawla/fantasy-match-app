import { View, Text, StyleSheet, TextInput, Button } from 'react-native'
import React, { useState } from 'react'

const allAvailableParticipants = ["Amit", "Ravi", "Vikram", "Rohan", "Rahul", "Karan", "Ajay", "Sandeep", "Manish", "Suresh", "Arjun", "Vivek", "Anil", "Rajesh", "Shankar", "Harish", "Sunil", "Pradeep", "Raghav", "Nitin"]

const AddEditMatchScreen = ({ route, navigation }: any) => {
  const { match } = route.params || {};
  const [name, setName] = useState(match ? match.name : '');
  const [time, setTime] = useState(match ? match.time : '');
  const [date, setDate] = useState(match ? match.date : '');

  const handleSave = () => {
    if (match) {
    } else {
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{`${match ? "Edit" : "Add"} Match Details`}</Text>
      <TextInput
        placeholder="Match Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Match Time"
        value={time}
        onChangeText={setTime}
        style={styles.input}
      />
      <TextInput
        placeholder="Match Date"
        value={date}
        onChangeText={setDate}
        style={[styles.input, { marginBottom: "auto" }]}
      />
      <Button title="Save" onPress={handleSave} />
    </View>
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
});

export default AddEditMatchScreen;
