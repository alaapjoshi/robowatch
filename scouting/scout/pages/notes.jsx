import { React, useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';

import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";
import Checkbox  from 'expo-checkbox';
import Slider from '@react-native-community/slider';




export default function Notes( { navigation } ) {
  const [fullcycler, setfullcycler] = useState(false);
  const [halfcycler, sethalfcycler] = useState(false);
  const [feeder, setfeeder] = useState(false);
  const [defense, setdefense] = useState(false);
  const [topheavy, settopheavy] = useState(false);
  const [Slider1, setSlider] = useState(0);
  const [notes, setNotes] = useState('');


  useEffect(async () => {
    const fullcycler = await AsyncStorage.getItem('fullcycler');
    setfullcycler(fullcycler);
    const halfcycler = await AsyncStorage.getItem('halfcycler');
    sethalfcycler(halfcycler);
    const feeder = await AsyncStorage.getItem('feeder');
    setfeeder(feeder);
    const defense = await AsyncStorage.getItem('defense');
    setdefense(defense);
    const topheavy = await AsyncStorage.getItem('topheavy');
    settopheavy(topheavy);
    const notes = await AsyncStorage.getItem('notes');
    setNotes(notes);
    const Aggression = await AsyncStorage.getItem('Aggression');
    setSlider(Aggression);
  }, []);

  const leave = async async => {
    navigation.navigate("Final")
    try {
      await AsyncStorage.setItem("fullcycler", String(fullcycler));
    } catch (e) {
      console.log("umm...");
    }
    try {
      await AsyncStorage.setItem("halfcycler", String(halfcycler));
    } catch (e) {
      console.log("umm...");
    }
    try {
      await AsyncStorage.setItem("feeder", String(feeder));
    } catch (e) {
      console.log("umm...");
    }
    try {
      await AsyncStorage.setItem("defense", String(defense));
    } catch (e) {
      console.log("umm...");
    }
    try {
      await AsyncStorage.setItem("topheavy", String(topheavy));
    } catch (e) {
      console.log("umm...");
    }
    
    try {
      await AsyncStorage.setItem("notes", String(notes));
    } catch (e) {
      console.log("umm...");
    }


    try {
      await AsyncStorage.setItem("Aggression", String(Slider1));
    } catch (e) {
      console.log("umm...");
    }


  }

  return (
    <View>
            <Text style={{marginBottom: 10, textAlign: 'center', marginTop: 5, fontSize: 30}}>
                Aggression of Robot
            </Text>

    <Text style={{marginBottom: 10, textAlign: 'center', marginTop: 5, fontSize: 30}}>
      {Slider1}
    </Text>
          <Slider
  style={{width: 400, height: 40, }}
  minimumValue={0}
  maximumValue={5}
  value={Slider1}
  onValueChange={setSlider}
  step={1}
/>

      <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 30}}>
        <View>
            
        <Text style={{marginBottom: 30, fontSize: 20}}> Full Cycler </Text>
      <Checkbox
        value={fullcycler}
        onValueChange={setfullcycler}
        style={styles.checkbox}
      />
        </View>

        <View>
            
            <Text style={{marginBottom: 30, fontSize: 20}}> Half Cycler </Text>
          <Checkbox
            value={halfcycler}
            onValueChange={sethalfcycler}
            style={styles.checkbox}
          />
            </View>

            <View>
            
            <Text style={{marginBottom: 30, fontSize: 20}}> Feeder </Text>
          <Checkbox
            value={feeder}
            onValueChange={setfeeder}
            style={styles.checkbox}
          />
            </View>


        <View>
        <Text style={{marginBottom: 30, fontSize: 20}}> Defense  </Text>
      <Checkbox
        value={defense}
        onValueChange={setdefense}
        style={styles.checkbox}
      />
        </View>
        
        </View>



        <View style={{marginBottom: 30, alignItems: 'center'}}>





        <View style={{marginTop: 20}}>
        <Text style={{marginBottom: 30, fontSize: 20}}> Top Heavy? </Text>
        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                <Checkbox
        value={topheavy}
        onValueChange={settopheavy}
        style={styles.checkbox}
      />
            </View>
        </View>
        </View>
        <Text style={{marginBottom: 10, textAlign: 'center', marginTop: 5, fontSize: 30}}>
          Additional Notes:
        </Text>
        <View style={{padding: 30}}>
 
        <TextInput
        style={{borderWidth: 1,borderColor: '#000',borderRadius: 4,padding: 8,marginBottom: 16,}}
        placeholder="Enter your additional notes..."
        multiline
        numberOfLines={6}
        onChangeText={(text) => setNotes(text)}
        value={notes}
      />

         
</View>



      
  <TouchableOpacity style={{backgroundColor: '#4CAF50',paddingVertical: 12,paddingHorizontal: 16,borderRadius: 4,margintop: 90}} onPress={() => leave()}>
  <Text style={{color: '#FFFFFF',fontSize: 16,fontWeight: 'bold',textAlign: 'center',}}>Navigate to QR</Text>
</TouchableOpacity>
    </View>
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