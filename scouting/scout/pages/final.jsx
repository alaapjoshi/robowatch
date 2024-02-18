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
    console.log("asd")
    /*
    try {

    await AsyncStorage.setItem('Match_Number', "");
    await AsyncStorage.setItem('Team_Number', "");
    await AsyncStorage.setItem('Alliance', "");
    await AsyncStorage.setItem('Position', "");

    await AsyncStorage.setItem('autodock');
    await AsyncStorage.setItem('autobottomCone', 0);
    await AsyncStorage.setItem('automidcone', 0);
   await AsyncStorage.setItem('autohighcone', 0);
    await AsyncStorage.setItem('autobottomcube', 0);
    await AsyncStorage.setItem('automidcube', 0);
    await AsyncStorage.setItem('autohighcube', 0);
    await AsyncStorage.setItem('teleopbottomCone', 0);
    await AsyncStorage.setItem('teleopmidcone', 0);
    await AsyncStorage.setItem('teleophighcone', 0);


    await AsyncStorage.setItem('teleopbottomcube', 0);
    await AsyncStorage.setItem('teleopmidcube', 0);
    await AsyncStorage.setItem('teleophighcube', 0);



    await AsyncStorage.setItem('floorcone', 0);
    await AsyncStorage.setItem('floorcube', 0);
    await AsyncStorage.setItem('stationcone', 0);
    await AsyncStorage.setItem('stationcube', 0);

    await AsyncStorage.setItem('attempted', false);
    await AsyncStorage.setItem('docked', false);
    await AsyncStorage.setItem('engaged', false);
    await AsyncStorage.setItem('soloclimb', false);
    await AsyncStorage.setItem('gaveassistance', false);
    await AsyncStorage.setItem('recievedassistance', false);
    await AsyncStorage.setItem('parked', false);
    await AsyncStorage.setItem('Slider1', 0);


    await AsyncStorage.setItem('fullcycler', false);
    await AsyncStorage.setItem('halfcycler', false);
    await AsyncStorage.setItem('feeder', false);
    await AsyncStorage.setItem('defense', false);
    await AsyncStorage.setItem('topheavy', false);
    await AsyncStorage.setItem('notes', "");
    await AsyncStorage.setItem('Aggression', 0);


  }
  catch (e) {
  }
  */
  await AsyncStorage.clear();
  AsyncStorage.clear();
clearAllData = () => {
  $reactNative.AsyncStorage.getAllKeys()
      .then(keys => $reactNative.AsyncStorage.multiRemove(keys))
      .then(() => alert('success'));
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
    const tie = await AsyncStorage.getItem('tie');
    const notes = await AsyncStorage.getItem('notes');
    const notes2 = str(notes)
    const stabilitySlider = await AsyncStorage.getItem('stabilitySlider');
    const agressionSlider = await AsyncStorage.getItem('agressionSlider');


    try {
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
      // Add the data to the collection
      const docRef = await addDoc(collection(db, "scouting"), {
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
      });
      const json_string = JSON.stringify(qe2, null, 2);
      Alert.alert(json_string);

    } catch (error) {
      Alert.alert('Error Sending data');
      console.error('Error sending data:', error);
    }
  };

  return (
    <View style={{alignContent: 'center', flex: 1, alignItems: 'center', paddingTop: 30}}>
  <QRCode
      value={qe}
      size={400}
    />
          <TouchableOpacity style={{padding: 15, borderColor: 'blue', }}onPress={sendDataToFirestore}>
        <Text style={{color: 'blue', fontSize: 30}}>Send Data to Firestore (Click)</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{padding: 15, borderColor: 'blue', }}onPress={cleardata}>
        <Text style={{color: 'blue', fontSize: 30}}>CLEAR ALL DATA</Text>
      </TouchableOpacity>
          
    </View>
  );
}
