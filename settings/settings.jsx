import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, TextInput } from 'react-native';

export default function SettingsScreen() {
  const [colorAccent, setColorAccent] = useState('#FFA500');
  const [teamNumber, setTeamNumber] = useState('75');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleColorChange = (color) => {
    setColorAccent(color);
  };

  const handleTeamNumberChange = (number) => {
    setTeamNumber(number);
  };

  const handleNotificationsToggle = () => {
    setNotificationsEnabled((prevState) => !prevState);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Settings</Text>
      <View style={styles.setting}>
      <View style={styles.setting}>
        <Text style={styles.settingLabel}>Team Number</Text>
        <TextInput style={styles.input} value={teamNumber} onChangeText={handleTeamNumberChange} />
      </View>
        <Text style={styles.settingLabel}>Color / Accent</Text>
        <View style={styles.colorPicker}>
          <TouchableOpacity style={[styles.colorOption, { backgroundColor: '#FFA500' }]} onPress={() => handleColorChange('#FFA500')} />
          <TouchableOpacity style={[styles.colorOption, { backgroundColor: '#00BFFF' }]} onPress={() => handleColorChange('#00BFFF')} />
          <TouchableOpacity style={[styles.colorOption, { backgroundColor: '#228B22' }]} onPress={() => handleColorChange('#228B22')} />
          <TouchableOpacity style={[styles.colorOption, { backgroundColor: '#FF69B4' }]} onPress={() => handleColorChange('#FF69B4')} />
        </View>
      </View>

      <View style={styles.setting}>
        <Text style={styles.settingLabel}>Notifications</Text>
        <Switch value={notificationsEnabled} onValueChange={handleNotificationsToggle} />
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    padding: 20,
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFA500',
    marginBottom: 20,
  },
  setting: {
    marginBottom: 20,
  },
  settingLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#808080',
    marginBottom: 5,
  },
  colorPicker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  colorOption: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  input: {
    borderWidth: 2,
    borderColor: '#808080',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    color: '#000000',
  },
  button: {
    backgroundColor: '#FFA500',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});