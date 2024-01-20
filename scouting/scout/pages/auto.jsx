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
import Checkbox from "expo-checkbox";
import { ScrollView } from "react-native-gesture-handler";
import { RadioButton } from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Auto({ navigation }) {
  const [left, setLeft] = useState(true);
  const [relocated, setrelocated] = useState(true);

  const [ampSuccsess, setampSuccsess] = useState(0);
  const onPressampSuccsess = () => setampSuccsess(ampSuccsess => ampSuccsess + 1);
  const onPressampSuccsessDelete = () =>  {
    if (ampSuccsess <= 0) {}
    else {
      setampSuccsess(ampSuccsess => ampSuccsess - 1);
  }
  }
  const [ampfail, setampfail] = useState(0);
  const onPressampfail = () => setampfail(ampfail => ampfail + 1);
  const onPressampfailDelete = () =>  {
    if (ampSuccsess <= 0) {}
    else {
      setampfail(ampfail => ampfail - 1);
  }
  }

  const [speakerSuccsess, setspeakerSuccsess] = useState(0);
  const onPressspeakerSuccsess = () => setspeakerSuccsess(speakerSuccsess => speakerSuccsess + 1);
  const onPressspeakerSuccsessDelete = () =>  {
    if (speakerSuccsess <= 0) {}
    else {
      setspeakerSuccsess(speakerSuccsess => speakerSuccsess - 1);
  }
  }
  const [speakerfail, setspeakerfail] = useState(0);
  const onPressspeakerfail = () => setspeakerfail(speakerfail => speakerfail + 1);
  const onPressspeakerfailDelete = () =>  {
    if (speakerfail <= 0) {}
    else {
      setspeakerfail(speakerSuccsess => speakerSuccsess - 1);
  }
  }



  function leave() {
    navigation.navigate("Teleop")
  }
  return (
    <ScrollView>
      <View style={{flexDirection: 'row', justifyContent: "space-evenly"}}> 


      <View style={{
            backgroundColor: "red",
            padding: 20,
            borderRadius: 20,
            marginTop: 40,
            flexDirection: 'row'
          }}> 
           <Checkbox
          style={{width: 20, height: 20, marginHorizontal: 10}}
          value={left}
          onValueChange={setLeft}
          color={left ? '#4630EB' : undefined}
        />
        <Text style={{fontSize: 20}}> 
          Left Alliance Zone
        </Text>
          </View>
          <View style={{
            backgroundColor: "red",
            padding: 20,
            borderRadius: 20,
            marginTop: 40,
            flexDirection: 'row'
          }}> 
          <Checkbox
          style={{width: 20, height: 20, marginHorizontal: 10}}
          value={relocated}
          onValueChange={setrelocated}
          color={relocated ? '#4630EB' : undefined}
        />
        <Text style={{fontSize: 20}}> 
          Relocated
        </Text>
          </View>
      </View>
      <View style={{flexDirection: 'row', paddingBottom: 40}}> 
    <TouchableOpacity style={styles.button} onPress={onPressampSuccsessDelete}>
  <Text style={styles.buttonText}>-</Text>
  </TouchableOpacity>
  <Text style={{fontSize: 50, paddingHorizontal: 10}}> 
    {ampSuccsess}
  </Text>
  <TouchableOpacity style={styles.button} onPress={onPressampSuccsess}>
  <Text style={styles.buttonText}>+</Text>
  </TouchableOpacity>
  <Text style={{fontSize: 23, paddingHorizontal: 10}}>
    High
  </Text>
  <TouchableOpacity style={styles.button} onPress={onPressampfailDelete}>
  <Text style={styles.buttonText}>-</Text>
  </TouchableOpacity>
  <Text style={{fontSize: 50, paddingHorizontal: 10}}> 
    {ampfail}
  </Text>
  <TouchableOpacity style={styles.button} onPress={onPressampfail}>
  <Text style={styles.buttonText}>+</Text>
  </TouchableOpacity>
    </View>

    <Text> Speaker Fail</Text>
    <View style={{flexDirection: 'row', paddingBottom: 40}}> 
    <TouchableOpacity style={styles.button} onPress={onPressspeakerfailDelete}>
  <Text style={styles.buttonText}>-</Text>
  </TouchableOpacity>
  <Text style={{fontSize: 50, paddingHorizontal: 10}}> 
    {speakerfail}
  </Text>
  
  <TouchableOpacity style={styles.button} onPress={onPressspeakerfail}>
  <Text style={styles.buttonText}>+</Text>
  </TouchableOpacity>
  <Text style={{fontSize: 23, paddingHorizontal: 10}}>
    High
  </Text>
  <TouchableOpacity style={styles.button} onPress={onPressspeakerSuccsessDelete}>
  <Text style={styles.buttonText}>-</Text>
  </TouchableOpacity>
  <Text style={{fontSize: 50, paddingHorizontal: 10}}> 
    {speakerSuccsess}
  </Text>
  <TouchableOpacity style={styles.button} onPress={onPressspeakerSuccsess}>
  <Text style={styles.buttonText}>+</Text>
  </TouchableOpacity>
    </View>

      <TouchableOpacity style={{backgroundColor: '#4CAF50',paddingVertical: 12,paddingHorizontal: 16,borderRadius: 4,margintop: 90}} onPress={() => leave()}>
  <Text style={{color: '#FFFFFF',fontSize: 16,fontWeight: 'bold',textAlign: 'center',}}>Navigate to Final</Text>
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