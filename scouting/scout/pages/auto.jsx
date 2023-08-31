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

export default function Auto({ navigation }) {
  const [value, setValue] = useState('Nothing');

  const send = async () => {
    navigation.navigate("Teleop")  
    try {
      await AsyncStorage.setItem("autodock", value);
    } catch (e) {
      console.log("umm...");
    }
    try {
      await AsyncStorage.setItem("autobottomCone", String(bottomCone));
    } catch (e) {
      console.log("umm...");
    }
    try {
      await AsyncStorage.setItem("automidcone", String(midCone));
    } catch (e) {
      console.log("umm...");
    }
    try {
      await AsyncStorage.setItem("autohighcone", String(highCone));
    } catch (e) {
      console.log("umm...");
    }
    try {
      await AsyncStorage.setItem("autobottomcube", String(bottomCube));
    } catch (e) {
      console.log("umm...");
    }
    try {
      await AsyncStorage.setItem("automidcube", String(midCube));
    } catch (e) {
      console.log("umm...");
    }
    try {
      await AsyncStorage.setItem("autohighcube", String(highCube));
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

  useEffect(() => {
    const checkStorage = async () => {
      try {
        const value = await AsyncStorage.getItem('autodock');
        const value2 = await AsyncStorage.getItem('autobottomCone');
        const value3 = await AsyncStorage.getItem('automidcone');
        const value4 = await AsyncStorage.getItem('autohighcone');
        const value5 = await AsyncStorage.getItem('autobottomcube');
        const value6 = await AsyncStorage.getItem('automidcube');
        const value7 = await AsyncStorage.getItem('autohighcube');

        if (value !== null || value2 !== null || value3 !== null || value4 !== null || value5 !== null || value6 !== null || value7 !== null || value8 !== null || value9 !== null || value10 !== null) {
          setbottomCone(Number(value2))
          setbottomCube(Number(value5))
          setMidCone(Number(value3))
          setMidCube(Number(value6))
          sethighCone(Number(value4))
          sethighCube(Number(value7))
          setValue(value)
        }
      } catch (e) {
        // handle error
      }
    };
    checkStorage();
  }, []);

  return (
    <ScrollView>
    <View style={{flexDirection: 'row', paddingBottom: 40, justifyContent: "space-between",alignItems: "center", paddingHorizontal: 20}}> 

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
    <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
        <Text>Nothing</Text>
        <RadioButton value="Nothing" />
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
        <Text>Docked</Text>
        <RadioButton value="Docked" />
      </View>
    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{alignItems: 'center'}}>Engaged</Text>
        <RadioButton value="Engaged" />
      </View>
      </RadioButton.Group>
 
      <TouchableOpacity style={{backgroundColor: '#4CAF50',paddingVertical: 12,paddingHorizontal: 16,borderRadius: 4,marginBottom: 90}} onPress={() => send()}>
      <Text style={{color: '#FFFFFF',fontSize: 16,fontWeight: 'bold',textAlign: 'center',}}>Navigate to Teleop</Text>
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