import {React, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Tra from './team/tra';
import Matchover from './matches/matchoverview';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Navigate() {
    return (
      <Stack.Navigator initialRouteName="Overview">
        <Stack.Screen name="Overview" component={Overview} options={{ headerShown: false }}/>
        <Stack.Screen name="Matchover" component={Matchover}    />
        <Stack.Screen name="tra" component={Tra}  />
      </Stack.Navigator>
    );
    }
    
function Overview() {
  const navigation = useNavigation();
  const [colorAccent, setColorAccent] = useState("#ff0303");
  this.forceUpdate
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
  
    getData();
  }, [colorAccent]);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text style={{ fontSize: 40, fontWeight: 'bold', color: colorAccent, marginBottom: 40 }}>What kind of info?</Text>
    <TouchableOpacity style={{ backgroundColor: colorAccent, padding: 20, borderRadius: 10, marginBottom: 40 }} onPress={() => navigation.navigate('tra')}>
      <Text style={{ fontSize: 18, color: '#FFFFFF' }}>Team data</Text>
    </TouchableOpacity>
    <TouchableOpacity style={{ backgroundColor: colorAccent, padding: 20, borderRadius: 10 }} onPress={() => navigation.navigate('Matchover')}>
      <Text style={{ fontSize: 18, color: '#FFFFFF' }}>Match data</Text>
    </TouchableOpacity>
  
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F4F4',
  },
  button: {
    backgroundColor: '#2F80ED',
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});