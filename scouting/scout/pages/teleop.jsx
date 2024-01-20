import { React, useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  TextInput,
  Alert,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Checkbox from "expo-checkbox";
export default function Teleop({ navigation }) {
  const [coopertition, setCoopertition] = useState(false);
  const [Amp, setAmp] = useState(false);

  const send = async () => {
    navigation.navigate("Endgame")
    try {
      await AsyncStorage.setItem("teleopbottomCone", String(bottomCone));
    } catch (e) {
      console.log("umm...");
    }
    try {
      await AsyncStorage.setItem("teleopmidcone", String(midCone));
    } catch (e) {
      console.log("umm...");
    }
    try {
      await AsyncStorage.setItem("teleophighcone", String(highCone));
    } catch (e) {
      console.log("umm...");
    }
    try {
      await AsyncStorage.setItem("teleopbottomcube", String(bottomCube));
    } catch (e) {
      console.log("umm...");
    }
    try {
      await AsyncStorage.setItem("teleopmidcube", String(midCube));
    } catch (e) {
      console.log("umm...");
    }
    try {
      await AsyncStorage.setItem("teleophighcube", String(highCube));
    } catch (e) {
      console.log("umm...");
    }
    try {
      await AsyncStorage.setItem("floorcone", String(floorcone));
    } catch (e) {
      console.log("umm...");
    }
    try {
      await AsyncStorage.setItem("floorcube", String(floorcube));
    } catch (e) {
      console.log("umm...");
    }
    try {
      await AsyncStorage.setItem("stationcone", String(stationcone));
    } catch (e) {
      console.log("umm...");
    }
    try {
      await AsyncStorage.setItem("stationcube", String(stationcube));
    } catch (e) {
      console.log("umm...");
    }

  }

  
  return (
    <ScrollView>
      <View style={{flexDirection: "row",alignItems: 'center', marginTop: 10,  justifyContent: "space-evenly"}}>
      <View style={{
            backgroundColor: "red",
            padding: 20,
            borderRadius: 20,
            marginTop: 40,
      }}> 

        <View style={{flexDirection: "row",alignItems: 'center',}}>
        <Checkbox
          style={{width: 30, height: 30}}
          value={coopertition}
          onValueChange={setCoopertition}
          color={coopertition ? '#4630EB' : undefined}
        />
        <Text style={{fontSize: "20"}}> Coopertition </Text>

        </View>
        </View>

        <View style={{
            backgroundColor: "red",
            padding: 20,
            borderRadius: 20,
            marginTop: 40,
      }}> 

        <View style={{flexDirection: "row",alignItems: 'center'}}>
        <Checkbox
          style={{width: 30, height: 30}}
          value={Amp}
          onValueChange={setAmp}
          color={Amp ? '#4630EB' : undefined}
        />
        <Text style={{fontSize: "20"}}> Amplified </Text>

        </View>
        </View>
        </View>

      <TouchableOpacity style={{backgroundColor: '#4CAF50',paddingVertical: 12,paddingHorizontal: 16,borderRadius: 4,margintop: 90}} onPress={() => send()}>
      <Text style={{color: '#FFFFFF',fontSize: 16,fontWeight: 'bold',textAlign: 'center',}}>Navigate to Endgame</Text>
    </TouchableOpacity>
      

    </ScrollView>
  )

}

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 60,
    backgroundColor: "red",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});