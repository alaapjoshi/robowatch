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
import { RadioButton } from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Teleop({ navigation }) {

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

  const [bottomCone, setbottomCone] = useState(0);
  const onPressbottomCone = () => setbottomCone(bottomCone => bottomCone + 1);
  const onPressbottomConedelete = () =>  {
    if (bottomCone <= 0) {}
    else {
    setbottomCone(bottomCone => bottomCone - 1);
  }
  }
  const [midCone, setMidCone] = useState(0);
  const onPressmidCone = () => setMidCone(midCone => midCone + 1);
  const onPressmidConedelete = () =>  {
    if (midCone <= 0) {}
    else {
      setMidCone(midCone => midCone - 1);
  }
  }
  const [highCone, sethighCone] = useState(0);
  const onPresshighCone = () => sethighCone(highCone => highCone + 1);
  const onPresshighConedelete = () =>  {
    if (highCone <= 0) {}
    else {
      sethighCone(highCone => highCone - 1);
  }
  }


  const [bottomCube, setbottomCube] = useState(0);
  const onPressbottomCube = () => setbottomCube(bottomCube => bottomCube + 1);
  const onPressbottomCubedelete = () =>  {
    if (bottomCube <= 0) {}
    else {
    setbottomCube(bottomCube => bottomCube - 1);
  }
  }
  const [midCube, setMidCube] = useState(0);
  const onPressmidCube = () => setMidCube(midCube => midCube + 1);
  const onPressmidCubedelete = () =>  {
    if (midCube <= 0) {}
    else {
      setMidCube(midCube => midCube - 1);
  }
  }
  const [highCube, sethighCube] = useState(0);
  const onPresshighCube = () => sethighCube(highCube => highCube + 1);
  const onPresshighCubedelete = () =>  {
    if (highCube <= 0) {}
    else {
      sethighCube(highCube => highCube - 1);
  }
  }

  const [stationcone, Setstationcone] = useState(0);
  const onPressstationcone = () => Setstationcone(stationcone => stationcone + 1);
  const onPressstationconedelete = () =>  {
    if (stationcone <= 0) {}
    else {
      Setstationcone(stationcone => stationcone - 1);
  }
  }
  const [stationcube, Setstationcube] = useState(0);
  const onPressstationcube = () => Setstationcube(stationcube => stationcube + 1);
  const onPressstationcubedelete = () =>  {
    if (stationcube <= 0) {}
    else {
      Setstationcube(stationcube => stationcube - 1);
  }
  }

  const [floorcone, Setfloorcone] = useState(0);
  const onPressfloorcone = () => Setfloorcone(floorcone => floorcone + 1);
  const onPressfloorconedelete = () =>  {
    if (floorcone <= 0) {}
    else {
      Setfloorcone(floocone => floocone - 1);
  }
  }
  const [floorcube, Setfloorcube] = useState(0);
  const onPressfloorcube = () => Setfloorcube(floorcube => floorcube + 1);
  const onPressfloorcubedelete = () =>  {
    if (floorcube <= 0) {}
    else {
      Setfloorcube(floorcube => floorcube - 1);
  }
  }


  return (
    <ScrollView>
    <View style={{flexDirection: 'row', paddingBottom: 20, justifyContent: "space-between",alignItems: "center", paddingHorizontal: 20}}> 

    <Text style={{fontSize: 30, marginLeft: 20,}}> 
      Cubes 
    </Text>
    <Text style={{fontSize: 30,  marginRight: 20,}}> 
      Cones 
    </Text>
    </View>
    <View style={{flexDirection: 'row', paddingBottom: 40}}> 
    <TouchableOpacity style={styles.button} onPress={onPresshighConedelete}>
  <Text style={styles.buttonText}>-</Text>
  </TouchableOpacity>
  <Text style={{fontSize: 50, paddingHorizontal: 10}}> 
    {highCone}
  </Text>
  <TouchableOpacity style={styles.button} onPress={onPresshighCone}>
  <Text style={styles.buttonText}>+</Text>
  </TouchableOpacity>
  <Text style={{fontSize: 23, paddingHorizontal: 10}}>
    High
  </Text>
  <TouchableOpacity style={styles.button} onPress={onPresshighCubedelete}>
  <Text style={styles.buttonText}>-</Text>
  </TouchableOpacity>
  <Text style={{fontSize: 50, paddingHorizontal: 10}}> 
    {highCube}
  </Text>
  <TouchableOpacity style={styles.button} onPress={onPresshighCube}>
  <Text style={styles.buttonText}>+</Text>
  </TouchableOpacity>
    </View>


    <View style={{flexDirection: 'row', paddingBottom: 40}}> 
    <TouchableOpacity style={styles.button} onPress={onPressmidConedelete}>
  <Text style={styles.buttonText}>-</Text>
  </TouchableOpacity>
  <Text style={{fontSize: 50, paddingHorizontal: 10}}> 
    {midCone}
  </Text>
  <TouchableOpacity style={styles.button} onPress={onPressmidCone}>
  <Text style={styles.buttonText}>+</Text>
  </TouchableOpacity>
  <Text style={{fontSize: 30, paddingHorizontal: 10}}>
    Mid   
  </Text>
  <TouchableOpacity style={styles.button} onPress={onPressmidCubedelete}>
  <Text style={styles.buttonText}>-</Text>
  </TouchableOpacity>
  <Text style={{fontSize: 50, paddingHorizontal: 10}}> 
    {midCube}
  </Text>
  <TouchableOpacity style={styles.button} onPress={onPressmidCube}>
  <Text style={styles.buttonText}>+</Text>
  </TouchableOpacity>

    </View>


    <View style={{flexDirection: 'row', paddingBottom: 40}}> 
    <TouchableOpacity style={styles.button} onPress={onPressbottomConedelete}>
  <Text style={styles.buttonText}>-</Text>
  </TouchableOpacity>
  <Text style={{fontSize: 50, paddingHorizontal: 10}}> 
    {bottomCone}
  </Text>
  <TouchableOpacity style={styles.button} onPress={onPressbottomCone}>
  <Text style={styles.buttonText}>+</Text>
  </TouchableOpacity>
  <Text style={{fontSize: 30, paddingHorizontal: 10}}>
    Low
  </Text>
  <TouchableOpacity style={styles.button} onPress={onPressbottomCubedelete}>
  <Text style={styles.buttonText}>-</Text>
  </TouchableOpacity>
  <Text style={{fontSize: 50, paddingHorizontal: 10}}> 
    {bottomCube}
  </Text>
  <TouchableOpacity style={styles.button} onPress={onPressbottomCube}>
  <Text style={styles.buttonText}>+</Text>
  </TouchableOpacity>
    </View>

    <View style={{flexDirection: 'row', paddingBottom: 20, justifyContent: "space-between",alignItems: "center", paddingHorizontal: 20}}> 

<Text style={{fontSize: 30, marginLeft: 0,}}> 
  Cone Intake 
</Text>
<Text style={{fontSize: 30,  marginRight: 0,}}> 
  Cube Intake
</Text>
</View>

  
  <View style={{margintop: 200}}> 
  <View style={{flexDirection: 'row', paddingBottom: 40}}> 
    <TouchableOpacity style={styles.button} onPress={onPressstationconedelete}>
  <Text style={styles.buttonText}>-</Text>
  </TouchableOpacity>
  <Text style={{fontSize: 50, paddingHorizontal: 10}}> 
    {stationcone}
  </Text>
  <TouchableOpacity style={styles.button} onPress={onPressstationcone}>
  <Text style={styles.buttonText}>+</Text>
  </TouchableOpacity>
  <Text style={{fontSize: 25, paddingHorizontal: 0}}>
    Station   
  </Text>
  <TouchableOpacity style={styles.button} onPress={onPressstationcubedelete}>
  <Text style={styles.buttonText}>-</Text>
  </TouchableOpacity>
  <Text style={{fontSize: 50, paddingHorizontal: 10}}> 
    {stationcube}
  </Text>
  <TouchableOpacity style={styles.button} onPress={onPressstationcube}>
  <Text style={styles.buttonText}>+</Text>
  </TouchableOpacity>
    </View>
    <View style={{flexDirection: 'row', paddingBottom: 40}}> 
    <TouchableOpacity style={styles.button} onPress={onPressfloorconedelete}>
  <Text style={styles.buttonText}>-</Text>
  </TouchableOpacity>
  <Text style={{fontSize: 50, paddingHorizontal: 10}}> 
    {floorcone}
  </Text>
  <TouchableOpacity style={styles.button} onPress={onPressfloorcone}>
  <Text style={styles.buttonText}>+</Text>
  </TouchableOpacity>
  <Text style={{fontSize: 30, paddingHorizontal: 10}}>
    Floor   
  </Text>
  <TouchableOpacity style={styles.button} onPress={onPressfloorcubedelete}>
  <Text style={styles.buttonText}>-</Text>
  </TouchableOpacity>
  <Text style={{fontSize: 50, paddingHorizontal: 10}}> 
    {floorcube}
  </Text>
  <TouchableOpacity style={styles.button} onPress={onPressfloorcube}>
  <Text style={styles.buttonText}>+</Text>
  </TouchableOpacity>

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
    width: 60,
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