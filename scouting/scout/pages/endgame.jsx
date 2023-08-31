import { React, useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";
import Checkbox  from 'expo-checkbox';
import Slider from '@react-native-community/slider';




export default function Endgame( { navigation } ) {
  const [attempted, setattempted] = useState(false);
  const [docked, setdocked] = useState(false);
  const [engaged, setengaged] = useState(false);
  const [soloclimb, setsoloclimb] = useState(false);
  const [gaveassistance, setgaveassistance] = useState(false);
  const [recievedassistance, setrecievedassistance] = useState(false);
  const [parked, setparked] = useState(false);

  const [Slider1, setSlider] = useState(0);

  useEffect(async () => {
    const attempted = await AsyncStorage.getItem('attempted');
    setattempted(attempted);
    const docked = await AsyncStorage.getItem('docked');
    setdocked(docked);
    const engaged = await AsyncStorage.getItem('engaged');
    setengaged(engaged);
    const soloclimb = await AsyncStorage.getItem('soloclimb');
    setsoloclimb(soloclimb);
    const gaveassistance = await AsyncStorage.getItem('gaveassistance');
    setgaveassistance(gaveassistance);
    const recievedassistance = await AsyncStorage.getItem('recievedassistance');
    setrecievedassistance(recievedassistance);
    const parked = await AsyncStorage.getItem('parked');
    setparked(parked);
    const Slider1 = await AsyncStorage.getItem('Slider1');
    setSlider(Slider1);
  }, []);

  const leave = async async => {
    navigation.navigate("Notes")
    try {
      await AsyncStorage.setItem("attempted", String(attempted));
    } catch (e) {
      console.log("umm...");
    }
    try {
      await AsyncStorage.setItem("docked", String(docked));
    } catch (e) {
      console.log("umm...");
    }
    try {
      await AsyncStorage.setItem("engaged", String(engaged));
    } catch (e) {
      console.log("umm...");
    }
    try {
      await AsyncStorage.setItem("soloclimb", String(soloclimb));
    } catch (e) {
      console.log("umm...");
    }
    try {
      await AsyncStorage.setItem("gaveassistance", String(gaveassistance));
    } catch (e) {
      console.log("umm...");
    }
    try {
      await AsyncStorage.setItem("recievedassistance", String(recievedassistance));
    } catch (e) {
      console.log("umm...");
    }
    try {
      await AsyncStorage.setItem("parked", String(parked));
    } catch (e) {
      console.log("umm...");
    }
    try {
      await AsyncStorage.setItem("Slider1", String(Slider1));
    } catch (e) {
      console.log("umm...");
    }
  }

  return (
    <ScrollView>

      <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 30}}>
        <View>
        <Text style={{marginBottom: 30, fontSize: 20}}> Attempted </Text>
      <Checkbox
        value={attempted}
        onValueChange={setattempted}
        style={styles.checkbox}
      />
        </View>


        <View>
        <Text style={{marginBottom: 30, fontSize: 20}}> Docked </Text>
      <Checkbox
        value={docked}
        onValueChange={setdocked}
        style={styles.checkbox}
      />
        </View>
        </View>


        <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 30}}>
        <View>
        <Text style={{marginBottom: 30, fontSize: 20}}> Engaged </Text>
      <Checkbox
        value={engaged}
        onValueChange={setengaged}
        style={styles.checkbox}
      />
        </View>


        <View>
        <Text style={{marginBottom: 30, fontSize: 20}}> Solo Climb </Text>
      <Checkbox
        value={soloclimb}
        onValueChange={setsoloclimb}
        style={styles.checkbox}
      />
        </View>
        </View>

        <View style={{marginBottom: 30, alignItems: 'center'}}>
        <View style={{marginBottom: 30}}>
        <Text style={{marginBottom: 30, fontSize: 20}}> Gave Assistance </Text>
        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                <Checkbox
        value={gaveassistance}
        onValueChange={setgaveassistance}
        style={styles.checkbox}
      />
            </View>

        </View>


        <View styles={{marginBottom: 30}}>
        <Text style={{marginBottom: 30, fontSize: 20}}> Recieved Assistance </Text>
        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                <Checkbox
        value={recievedassistance}
        onValueChange={setrecievedassistance}
        style={styles.checkbox}
      />
            </View>
        </View>

        <View style={{marginTop: 20}}>
        <Text style={{marginBottom: 30, fontSize: 20}}> Parked </Text>
        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                <Checkbox
        value={parked}
        onValueChange={setparked}
        style={styles.checkbox}
      />
            </View>
        </View>
        </View>
        <Text style={{marginBottom: 10, textAlign: 'center', marginTop: 20, fontSize: 30}}>
      Climb Time
    </Text>
        <Text style={{marginBottom: 10, textAlign: 'center', marginTop: 5, fontSize: 30}}>
      {Slider1}
    </Text>

    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>

  <Slider
  style={{width: 400, height: 40, }}
  minimumValue={0}
  maximumValue={30}
  value={Slider1}
  onValueChange={setSlider}
  step={1}
/>
      
</View>




      
  <TouchableOpacity style={{backgroundColor: '#4CAF50',paddingVertical: 12,paddingHorizontal: 16,borderRadius: 4,margintop: 90}} onPress={() => leave()}>
  <Text style={{color: '#FFFFFF',fontSize: 16,fontWeight: 'bold',textAlign: 'center',}}>Navigate to Final</Text>
</TouchableOpacity>
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