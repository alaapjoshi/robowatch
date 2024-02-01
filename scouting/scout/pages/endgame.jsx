import { React, useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";
import Checkbox  from 'expo-checkbox';
import { RadioButton } from 'react-native-paper';




export default function Endgame( { navigation } ) {


  const [attempted, setattempted] = useState(false);
  const [docked, setdocked] = useState(false);
  const [checked, setChecked] = useState('left');


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
  }

  return (
    <ScrollView>

      <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 30}}>
        <View style={{
            backgroundColor: "red",
            padding: 20,
            borderRadius: 20,
            marginTop: 40,
      }}> 
        <View style={{flexDirection: "row",alignItems: 'center'}}>
        <Text style={{fontSize: 20, marginBottom: 5}}> Parked </Text>
        <Checkbox
          style={{width: 20, height: 20}}
          value={attempted}
          onValueChange={setattempted}
          color={attempted ? '#4630EB' : undefined}
        />
        </View>        
      
        </View>
        <View style={{
            backgroundColor: "red",
            padding: 20,
            borderRadius: 20,
            marginTop: 40,
      }}> 
        <View style={{flexDirection: "row",alignItems: 'center'}}>
        <Text style={{fontSize: 20, marginBottom: 5}}> Harmony </Text>
        <Checkbox
          style={{width: 20, height: 20}}
          value={docked}
          onValueChange={setdocked}
          color={docked ? '#4630EB' : undefined}
        />
        </View>        
      
        </View>
        
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 30}}>
        <View style={{
            backgroundColor: "red",
            padding: 20,
            borderRadius: 20,
            marginTop: 40,
      }}> 
        <View style={{flexDirection: "row",alignItems: 'center'}}>
        <Text style={{fontSize: 20, marginBottom: 5}}> Spotlight </Text>
        <Checkbox
          style={{width: 20, height: 20}}
          value={attempted}
          onValueChange={setattempted}
          color={attempted ? '#4630EB' : undefined}
        />
        </View>        
      
        </View>
        <View style={{
            backgroundColor: "red",
            padding: 20,
            borderRadius: 20,
            marginTop: 40,
      }}> 
        <View style={{flexDirection: "row",alignItems: 'center'}}>
        <Text style={{fontSize: 20, marginBottom: 5}}> Trap </Text>
        <Checkbox
          style={{width: 20, height: 20}}
          value={docked}
          onValueChange={setdocked}
          color={docked ? '#4630EB' : undefined}
        />
        </View>     
      
        </View>
        <View style={{
            backgroundColor: "red",
            padding: 20,
            borderRadius: 20,
            marginTop: 40,
      }}> 
        <View style={{flexDirection: "row",alignItems: 'center'}}>
        <Text style={{fontSize: 20, marginBottom: 5}}> Climb </Text>
        <Checkbox
          style={{width: 20, height: 20}}
          value={docked}
          onValueChange={setdocked}
          color={docked ? '#4630EB' : undefined}
        />
        </View>     
        </View>
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