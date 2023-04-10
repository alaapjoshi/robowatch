import { React, useState, createContext, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, TextInput, Button, Appearance, useColorScheme } from 'react-native';
const AppContext = createContext();
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider } from "react-native-redux"

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  //console.log(colorScheme)

  const [colorAccent, setColorAccent] = useState("#ff0303");
  const [teamNumber, setTeamNumber] = useState('75');
  const [DistrictNumber, setDistrictNumber] = useState('fma');

  const storeColor = async (value) => {
    setColorAccent(value)
    try {
      await AsyncStorage.setItem('color', JSON.stringify(value))
      console.log(value)
    } catch (e) {
      console.log("umm...")
    }

  }
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);


  const handleTeamNumberChange = (number) => {
    setTeamNumber(number);
  };
  const saveTextInputValue = async (number) => {
    try {
      await AsyncStorage.setItem('district', number);
      setDistrictNumber(number);

    } catch (e) {
      console.log('Error saving text input value: ', e);
    }
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
              <TextInput style={styles.input} value={DistrictNumber} onChangeText={saveTextInputValue} />
            </View>
              <Text style={styles.settingLabel}>Color / Accent</Text>
              <View style={styles.colorPicker}  color={colorAccent}>
                <TouchableOpacity style={[styles.colorOption, { backgroundColor: '#ff0303' }]} onPress={() => storeColor('#ff0303')} />
                <TouchableOpacity style={[styles.colorOption, { backgroundColor: '#FFA500' }]} onPress={() => storeColor('#FFA500')} />
                <TouchableOpacity style={[styles.colorOption, { backgroundColor: '#00BFFF' }]} onPress={() => storeColor('#00BFFF')} />
                <TouchableOpacity style={[styles.colorOption, { backgroundColor: '#FF69B4' }]} onPress={() => storeColor('#FF69B4')} />
              </View>
            </View>
      
            <View style={{flexDirection: 'column', alignItems: 'center',marginBottom: 20 }}>
              <Text style={styles.settingLabel}>Notifications</Text>
              <Switch value={notificationsEnabled} onValueChange={handleNotificationsToggle} />
            </View>

            <TouchableOpacity style={{padding: 10,borderRadius: 10,backgroundColor: colorAccent, justifyContent: 'center', alignItems: 'center',}} onPress={() => this.forceUpdate}>
              <Text style={styles.text}> Save Changes</Text>
              </TouchableOpacity>
              <Text style={styles.settingLabel}>Some settings require a refresh of the app</Text>
              <Text style={styles.settingLabel}>(Swipe out the app and open it again)</Text>

      
      
          </View>
        )
      };
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    padding: 20,
  },
  button: {
    padding: 10,
    borderRadius: 5,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
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