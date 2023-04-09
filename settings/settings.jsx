import { React, useState, createContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, TextInput, Button } from 'react-native';
const AppContext = createContext();

export default function SettingsScreen() {
  const [colorAccent, setColorAccent] = useState('#ff0303');
  const [teamNumber, setTeamNumber] = useState('75');
  const [DistrictNumber, setDistrictNumber] = useState('fma');

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleColorChange = (color) => {
    setColorAccent(color);
  };

  const handleTeamNumberChange = (number) => {
    setTeamNumber(number);
  };
  const handleDistrictNumberChange = (number) => {
    setDistrictNumber(number);
  };
  const handleNotificationsToggle = () => {
    setNotificationsEnabled((prevState) => !prevState);
  };

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 32,fontWeight: 'bold',color: colorAccent,marginBottom: 20, textAlign: 'center'}}>Settings</Text>
      <View style={styles.setting}>
      <View style={styles.setting}>
        <Text style={styles.settingLabel}>Team Number</Text>
        <TextInput style={styles.input} value={teamNumber} onChangeText={handleTeamNumberChange} />
      </View>
      <View style={styles.setting}>
        <Text style={styles.settingLabel}>District</Text>
        <TextInput style={styles.input} value={DistrictNumber} onChangeText={handleDistrictNumberChange} />
      </View>
        <Text style={styles.settingLabel}>Color / Accent</Text>
        <View style={styles.colorPicker}  color={colorAccent}>
          <TouchableOpacity style={[styles.colorOption, { backgroundColor: '#ff0303' }]} onPress={() => handleColorChange('#ff0303')} />
          <TouchableOpacity style={[styles.colorOption, { backgroundColor: '#FFA500' }]} onPress={() => handleColorChange('#FFA500')} />
          <TouchableOpacity style={[styles.colorOption, { backgroundColor: '#00BFFF' }]} onPress={() => handleColorChange('#00BFFF')} />
          <TouchableOpacity style={[styles.colorOption, { backgroundColor: '#FF69B4' }]} onPress={() => handleColorChange('#FF69B4')} />
        </View>
      </View>

      <View style={{flexDirection: 'column', alignItems: 'center',marginBottom: 20 }}>
        <Text style={styles.settingLabel}>Notifications</Text>
        <Switch value={notificationsEnabled} onValueChange={handleNotificationsToggle} />
      </View>
      <TouchableOpacity style={{backgroundColor: colorAccent,padding: 10,borderRadius: 5,marginTop: 20,alignSelf: 'center'}}>
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
  setting: {
    marginBottom: 20,
  },
  settingLabel: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#808080',
    marginBottom: 10,
    
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
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});