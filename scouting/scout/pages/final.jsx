import { React, useState, useMemo, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  TextInput,
  Animated,
  Dimensions,
  Alert,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";
import QRCode from "react-native-qrcode-svg";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, QueryLimitConstraint, aggregateQuerySnapshotEqual } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCfmW98iWLhhNtFrjy-3niS_OWPhrQTb5U",
  authDomain: "robowatch-4c113.firebaseapp.com",
  projectId: "robowatch-4c113",
  storageBucket: "robowatch-4c113.appspot.com",
  messagingSenderId: "416751963314",
  appId: "1:416751963314:web:eaae18d08b2da367298dab",
  measurementId: "G-HNHKV87TTL",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function Final() {
  const [qe, setQe] = useState("Blank");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const Student_ID = await AsyncStorage.getItem('Student_ID');
        const Match_Number = await AsyncStorage.getItem('Match_Number');
        const Team_Number = await AsyncStorage.getItem('Team_Number');
        const Alliance = await AsyncStorage.getItem('Alliance');
        const Position = await AsyncStorage.getItem('Position');
        //Auto
        const updatedCoordinates = await AsyncStorage.getItem('Auto_Grid');
        const left_alliance_auto = await AsyncStorage.getItem('LeftAllianceauto');

        const reload_auto = await AsyncStorage.getItem('ReloadAuto');
        //Teleop
        const Teleop_Grid = await AsyncStorage.getItem('Teleop_Grid');
        const coopertitionbonus = await AsyncStorage.getItem('coopertitionbonus');
        //Endgame
        const Parked = await AsyncStorage.getItem('Parked');
        const Harmony = await AsyncStorage.getItem('Harmony');
        const Spotlight = await AsyncStorage.getItem('coopertitionbonus');
        const trap = await AsyncStorage.getItem('trap');
        const climb = await AsyncStorage.getItem('climb');
        const notes = await AsyncStorage.getItem('notes');
        const stabilitySlider = await AsyncStorage.getItem('stabilitySlider');
        const agressionSlider = await AsyncStorage.getItem('agressionSlider');
        const qe2 = {
          Student_ID: Student_ID,
          Match_Number: Match_Number,
          Team_Number: Team_Number,
          Alliance: Alliance,
          Position: Position,
          updatedCoordinates: updatedCoordinates,
          left_alliance_auto: left_alliance_auto,
          Reload_Auto: reload_auto,
          Teleop_Grid: Teleop_Grid,
          coopertitionbonus: coopertitionbonus,
          Parked: Parked,
          Harmony: Harmony,
          Spotlight: Spotlight,
          trap: trap,
          climb: climb,
          stabilitySlider: stabilitySlider,
          agressionSlider: agressionSlider
        }
  
        setQe(JSON.stringify(qe2));
      } catch (e) {
        // handle error
      }
    };
    fetchData();
  }, []);
  const cleardata = async () => {
    console.log("Cleared Data")
    try {

    await AsyncStorage.setItem('Student_ID', null);
    await AsyncStorage.setItem('Match_Number', null);
    await AsyncStorage.setItem('Team_Number',null);
    await AsyncStorage.setItem('Alliance', null);
    await AsyncStorage.setItem('Position', null);

    await AsyncStorage.setItem('Auto_Grid', null);
    await AsyncStorage.setItem('LeftAllianceauto', null);
    await AsyncStorage.setItem('ReloadAuto', null);


    await AsyncStorage.setItem('Teleop_Grid', null);
    await AsyncStorage.setItem('coopertitionbonus', null);
    //Endgame

    await AsyncStorage.setItem('Parked', null);
    await AsyncStorage.setItem('Harmony', null);
    await AsyncStorage.setItem('coopertitionbonus', null);
    await AsyncStorage.setItem('trap', null);
    await AsyncStorage.setItem('climb', null);
    await AsyncStorage.setItem('notes', null);

    await AsyncStorage.setItem('stabilitySlider', null);
    await AsyncStorage.setItem('agressionSlider', null);
  }
  catch (e) {
  }


  Alert.alert('Data Cleared!');

}
  const sendDataToFirestore = async () => {
    //Setup
    const Student_ID = await AsyncStorage.getItem('Student_ID');
    const Match_Number = await AsyncStorage.getItem('Match_Number');
    const Team_Number = await AsyncStorage.getItem('Team_Number');
    const Alliance = await AsyncStorage.getItem('Alliance');
    const Position = await AsyncStorage.getItem('Position');
    //Auto
    const updatedCoordinates = await AsyncStorage.getItem('Auto_Grid');
    const left_alliance_auto = await AsyncStorage.getItem('LeftAllianceauto');
    const reload_auto = await AsyncStorage.getItem('ReloadAuto');
    //Teleop
    const Teleop_Grid = await AsyncStorage.getItem('Teleop_Grid');
    const coopertitionbonus = await AsyncStorage.getItem('coopertitionbonus');
    //Endgame
    const Parked = await AsyncStorage.getItem('Parked');
    const Harmony = await AsyncStorage.getItem('Harmony');
    const Spotlight = await AsyncStorage.getItem('coopertitionbonus');
    const trap = await AsyncStorage.getItem('trap');
    const climb = await AsyncStorage.getItem('climb');
    const win = await AsyncStorage.getItem('win');
    const lose = await AsyncStorage.getItem('lose');
    const notes = await AsyncStorage.getItem('notes');
    const stabilitySlider = await AsyncStorage.getItem('stabilitySlider');
    const agressionSlider = await AsyncStorage.getItem('agressionSlider');
      const api = {
        Student_ID: Student_ID,
        Match_Number: Match_Number,
        Team_Number: Team_Number,
        Alliance: Alliance,
        Position: Position,
        updatedCoordinates: JSON.parse(updatedCoordinates),
        left_alliance_auto: left_alliance_auto,
        Reload_Auto: reload_auto,
        Teleop_Field: JSON.parse(Teleop_Grid),
        coopertitionbonus: coopertitionbonus,
        Parked: Parked,
        Harmony: Harmony,
        Spotlight: Spotlight,
        trap: trap,
        climb: climb,
        stabilitySlider: stabilitySlider,
        agressionSlider: agressionSlider
      }
      try {

      const token = await AsyncStorage.getItem("token");
      const response = await Promise.race([
        fetch("http://10.75.128.119:5002/", {
          method: "POST", 
          headers: {
            Authorization: `Bearer ${token}`, // Assuming your API expects a Bearer token
            "Content-Type": "application/json", // Specify content type for POST request
          },
          body: JSON.stringify(api), // Send username and password in the request body
        }),
        new Promise((resolve, reject) => {
          // Timeout after 3 seconds
          setTimeout(() => reject(new Error("Timeout")), 3000);
          console.log("Timeout")
        })
      ]);
      response()
      
      // Handle response...
    } catch {
      Alert.alert("Could not send data")
    }


      // Add the data to the collection
      const docRef = await addDoc(collection(db, "scouting"), {
        Student_ID: Student_ID,
        Match_Number: Match_Number,
        Team_Number: Team_Number,
        Alliance: Alliance,
        Position: Position,
        updatedCoordinates: JSON.parse(updatedCoordinates),
        left_alliance_auto: left_alliance_auto,
        Reload_Auto: reload_auto,
        Teleop_Field: JSON.parse(Teleop_Grid),
        coopertitionbonus: coopertitionbonus,
        Parked: Parked,
        Harmony: Harmony,
        Spotlight: Spotlight,
        trap: trap,
        climb: climb,
        stabilitySlider: stabilitySlider,
        agressionSlider: agressionSlider
      });

    };

  return (
    <View style={{alignContent: 'center', flex: 1, alignItems: 'center', paddingTop: 30}}>
              <View style={{backgroundColor: 'red'}}>
              <Text style={{fontSize: 30, textAlign: 'center'}}> QR</Text>
            </View>
  <QRCode
      value={qe}
      size={400}
    />
          <TouchableOpacity style={{padding: 15, borderColor: 'blue', }}onPress={sendDataToFirestore}>
        <Text style={{color: 'blue', fontSize: 30}}>Send Data to Firestore</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{padding: 15, borderColor: 'blue', }}onPress={cleardata}>
        <Text style={{color: 'blue', fontSize: 30}}>CLEAR ALL DATA</Text>
      </TouchableOpacity>
          
    </View>
  );
}
