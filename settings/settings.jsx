import { React, useState, createContext, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, TextInput, Button, Appearance, useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import RNRestart from 'react-native-restart'; // Import package from node modules

export default function SettingsScreen() {

  const [colorAccent, setColorAccent] = useState("#ff0303");
  const [teamNumber, setTeamNumber] = useState('75');
  const [test, settest] = useState(0);

  const [DistrictNumber, setDistrictNumber] = useState('');
  useEffect(() => {
    if (DistrictNumber == '') {
      null
    }
    else {
      useEffect(() => {
        const getData = async () => {
          try {
            const value = await AsyncStorage.getItem('district');
              setDistrictNumber(JSON.stringify(value));
              console.log(JSON.stringify(value))
          } catch (e) {
            console.log("umm...")
          }
        }
        getData()
    
      }, []);


    }

  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('color');
        if (value !== null) {
          setColorAccent(value.replace(/['"]+/g, ''));

        }
      } catch (e) {
        console.log("umm...")
      }
    }
    getData()

  }, []);
  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('district');
        setDistrictNumber(value.replace(/['"]+/g, ''));
      } catch (e) {
        console.log("umm...")
      }
    }
    getData()

  }, []);

  const storeColor = async (value) => {
    setColorAccent(value)
    try {
      await AsyncStorage.setItem('color', JSON.stringify(value))
    } catch (e) {
      console.log("umm...")
    }

  }

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);


  const handleTeamNumberChange = (number) => {
    setTeamNumber(number);
  };
  const saveTextInputValue = async (value) => {
    setDistrictNumber(value);
    try {
      await AsyncStorage.setItem('district', JSON.stringify(value).toLowerCase())
    } catch (e) {
      console.log("umm...")
    }
  }
  const bruh = () => {
    this.forceUpdate();
  };
  function handleNotificationsToggle() {
    if (notificationsEnabled == true) {
      setNotificationsEnabled(false)
    }
    else {
      setNotificationsEnabled(true)

    }

  }


        return (
          <ScrollView style={styles.container}>
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

            <TouchableOpacity style={{padding: 10,borderRadius: 10,backgroundColor: colorAccent, justifyContent: 'center', alignItems: 'center',}} onPress={() => bruh()}>
              <Text style={styles.text}> Save Changes</Text>
              </TouchableOpacity>
              <Text style={styles.settingLabel}>Some settings require a refresh of the app</Text>
              <Text style={styles.settingLabel}>(Swipe out the app and open it again)</Text>
              <View style={{flex: 1,backgroundColor: '#F5F5F5',padding: 20,}}>
              <View style={{position:'absolute',bottom: 0,left: 0,right: 0,backgroundColor: '#333',padding: 10,alignItems: 'center'}}>
                <Text style={{color: '#FFF',fontSize: 12,fontWeight: 'bold',}}>Made by AJ</Text>
              </View>
              </View>
      
          </ScrollView>
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