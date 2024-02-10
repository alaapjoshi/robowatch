import { React, useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";
import Checkbox  from 'expo-checkbox';




export default function Endgame( { navigation } ) {

  const [parked, setparked] = useState(false);
  const [Harmony, setharmony] = useState(false);
  const [spotlight, setspotlight] = useState(false);
  const [trap, settrap] = useState(false);
  const [climb, setClimb] = useState(false);
  const leave = async () => {
    navigation.navigate("Notes")
    try {
      await AsyncStorage.setItem("Parked", str(parked));
    } catch (e) {
      console.log("umm...");
    }
    try {
      await AsyncStorage.setItem("Harmony", str(Harmony));
    } catch (e) {
      console.log("umm...");
    }
    try {
      await AsyncStorage.setItem("Spotlight", str(spotlight));
    } catch (e) {
      console.log("umm...");
    }
    try {
      await AsyncStorage.setItem("trap", str(trap));
    } catch (e) {
      console.log("umm...");
    }
    try {
      await AsyncStorage.setItem("climb", str(climb));
    } catch (e) {
      console.log("umm...");
    }
  }

  return (
    <ScrollView>

      <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 30}}>
      <TouchableOpacity onPress={() => setparked(!parked)}>
        <View style={{
            backgroundColor: "red",
            padding: 20,
            borderRadius: 20,
            marginTop: 40,
      }}> 
        <View style={{flexDirection: "row",alignItems: 'center'}}>
        <Checkbox
          style={{width: 20, height: 20}}
          value={parked}
          onValueChange={setparked}
          color={parked ? '#4630EB' : undefined}
        />
        <Text style={{fontSize: 20, marginBottom: 5}}> Parked </Text>

        </View>  
        </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setharmony(!Harmony)}>

        <View style={{
            backgroundColor: "red",
            padding: 20,
            borderRadius: 20,
            marginTop: 40,
      }}> 
        <View style={{flexDirection: "row",alignItems: 'center'}}>
        <Checkbox
          style={{width: 20, height: 20}}
          value={Harmony}
          onValueChange={setharmony}
          color={Harmony ? '#4630EB' : undefined}
        />
        <Text style={{fontSize: 20, marginBottom: 5}}> Harmony </Text>

        </View>        
      
        </View>
        </TouchableOpacity>

        </View>
        

        <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 30}}>
        <TouchableOpacity onPress={() => setspotlight(!spotlight)}>

        <View style={{
            backgroundColor: "red",
            padding: 20,
            borderRadius: 20,
            marginTop: 40,
      }}> 
        <View style={{flexDirection: "row",alignItems: 'center'}}>
        <Checkbox
          style={{width: 20, height: 20}}
          value={spotlight}
          onValueChange={setspotlight}
          color={spotlight ? '#4630EB' : undefined}
        />
        <Text style={{fontSize: 20, marginBottom: 5}}> Spotlight </Text>

        </View>        
      
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => settrap(!trap)}>

        <View style={{
            backgroundColor: "red",
            padding: 20,
            borderRadius: 20,
            marginTop: 40,
      }}> 
        <View style={{flexDirection: "row",alignItems: 'center'}}>
        <Checkbox
          style={{width: 20, height: 20}}
          value={trap}
          onValueChange={settrap}
          color={trap ? '#4630EB' : undefined}
        />
        <Text style={{fontSize: 20, marginBottom: 5}}> Trap </Text>

        </View>     
      
        </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setClimb(!climb)}>
        <View style={{
            backgroundColor: "red",
            padding: 20,
            borderRadius: 20,
            marginTop: 40,
      }}> 
        <View style={{flexDirection: "row",alignItems: 'center'}}>
        <Checkbox
          style={{width: 20, height: 20}}
          value={climb}
          onValueChange={setClimb}
          color={climb ? '#4630EB' : undefined}
        />
        <Text style={{fontSize: 20, marginBottom: 5}}> Climb </Text>

        </View>     
        </View>
        </TouchableOpacity>

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