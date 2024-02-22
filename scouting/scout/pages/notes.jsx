import React, { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';

import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView, TapGestureHandler } from "react-native-gesture-handler";
import Checkbox  from 'expo-checkbox';
import Slider from '@react-native-community/slider';



export default function Notes( { navigation } ) {

  const [stabilitySlider, setStabilitySlider] = useState(0);
  const [agressionSlider, setAgrressionSlider] = useState(0);
  const [win, setwin] = useState(false);
  const [lose, setlose] = useState(false);
  const [tie, settie] = useState(false);
  const [notes, setNotes] = useState('');



  const leave = async async => {
    navigation.navigate("Final")
    try {
      await AsyncStorage.setItem("Win", String(win));
    } catch (e) {
      console.log("umm...");
    }
    try {
      await AsyncStorage.setItem("Lose", String(lose));
    } catch (e) {
      console.log("umm...");
    }
    try {
      await AsyncStorage.setItem("tie", String(tie));
    } catch (e) {
      console.log("umm...");
    }
    
    try {
      await AsyncStorage.setItem("notes", String(notes));
    } catch (e) {
      console.log("umm...");
    }


    try {
      await AsyncStorage.setItem("stabilitySlider", String(stabilitySlider));
    } catch (e) {
      console.log("umm...");
    }

    try {
      await AsyncStorage.setItem("agressionSlider", String(agressionSlider));
    } catch (e) {
      console.log("umm...");
    }


  }

  return (
    <ScrollView>
              <View style={{backgroundColor: 'red', }}>
              <Text style={{fontSize: 30, textAlign: 'center'}}> Notes</Text>
            </View>
    <View style={{marginHorizontal: 20}}>
            <Text style={{marginBottom: 10, textAlign: 'center', marginTop: 5, fontSize: 30}}>
                Stability
            </Text>

    <Text style={{marginBottom: 10, textAlign: 'center', marginTop: 5, fontSize: 30}}>
      {stabilitySlider}
    </Text>
          <Slider
  style={{width: 350, height: 40, }}
  minimumValue={0}
  maximumValue={5}
  value={stabilitySlider}
  onValueChange={setStabilitySlider}
  step={1}
/>
<Text style={{marginBottom: 10, textAlign: 'center', marginTop: 5, fontSize: 30}}>
                Aggression of Driver
            </Text>

    <Text style={{marginBottom: 10, textAlign: 'center', marginTop: 5, fontSize: 30}}>
      {agressionSlider}
    </Text>
          <Slider
  style={{width: 350, height: 40, }}
  minimumValue={0}
  maximumValue={5}
  value={agressionSlider}
  onValueChange={setAgrressionSlider}
  step={1}
/>


      
  <TouchableOpacity style={{backgroundColor: '#4CAF50',paddingVertical: 12,paddingHorizontal: 16,borderRadius: 4,margintop: 90}} onPress={() => leave()}>
  <Text style={{color: '#FFFFFF',fontSize: 16,fontWeight: 'bold',textAlign: 'center',}}>Navigate to QR</Text>
</TouchableOpacity>
    </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    borderColor: 'red', // Red border color
    borderWidth: 1, // Border width
    transform: [{ scaleX: 2 }, { scaleY: 2 }], // Make the checkbox bigger
  },
  checkboxLabel: {
    color: 'red', // Text color in red
    marginLeft: 10, // Add some space between checkbox and text
  },
});