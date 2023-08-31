import { React, useState, useRef, useEffect } from "react";
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
import { getFirestore, collection, addDoc, QueryLimitConstraint } from "firebase/firestore";

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
  const [qe, setQe] = useState("DATA DID NOT LOAD PROPERLY");

  useEffect(() => {
    console.log("test")
    const checkStorage = async () => {
      try {
        const Match_Number = await AsyncStorage.getItem('Match_Number');
        const Team_Number = await AsyncStorage.getItem('Team_Number');
        const Alliance = await AsyncStorage.getItem('Alliance');
        const Position = await AsyncStorage.getItem('Position');

        const autodock = await AsyncStorage.getItem('autodock');
        const autobottomCone = await AsyncStorage.getItem('autobottomCone');
        const automidcone = await AsyncStorage.getItem('automidcone');
        const autohighcone = await AsyncStorage.getItem('autohighcone');
        const autobottomcube = await AsyncStorage.getItem('autobottomcube');
        const automidcube = await AsyncStorage.getItem('automidcube');
        const autohighcube = await AsyncStorage.getItem('autohighcube');



        const teleopbottomCone = await AsyncStorage.getItem('teleopbottomCone');
        const teleopmidcone = await AsyncStorage.getItem('teleopmidcone');
        const teleophighcone = await AsyncStorage.getItem('teleophighcone');
        const teleopbottomcube = await AsyncStorage.getItem('teleopbottomcube');
        const teleopmidcube = await AsyncStorage.getItem('teleopmidcube');
        const teleophighcube = await AsyncStorage.getItem('teleophighcube');



        const floorcone = await AsyncStorage.getItem('floorcone');
        const floorcube = await AsyncStorage.getItem('floorcube');
        const stationcone = await AsyncStorage.getItem('stationcone');
        const stationcube = await AsyncStorage.getItem('stationcube');

        const attempted = await AsyncStorage.getItem('attempted');
        const docked = await AsyncStorage.getItem('docked');
        const engaged = await AsyncStorage.getItem('engaged');
        const soloclimb = await AsyncStorage.getItem('soloclimb');
        const gaveassistance = await AsyncStorage.getItem('gaveassistance');
        const recievedassistance = await AsyncStorage.getItem('recievedassistance');
        const parked = await AsyncStorage.getItem('parked');
        const Slider1 = await AsyncStorage.getItem('Slider1');


        const fullcycler = await AsyncStorage.getItem('fullcycler');
        const halfcycler = await AsyncStorage.getItem('halfcycler');
        const feeder = await AsyncStorage.getItem('feeder');
        const defense = await AsyncStorage.getItem('defense');
        const topheavy = await AsyncStorage.getItem('topheavy');
        const notes = await AsyncStorage.getItem('notes');
        const Aggression = await AsyncStorage.getItem('Aggression');
        const qe2 = [{
          Match_Number: Match_Number,
          Team_Number: Team_Number,
          Alliance: Alliance,
          Position: Position,
          autodock: autodock,
          autobottomCone: autobottomCone,
          automidcone: automidcone,
          autohighcone: autohighcone,
          autobottomcube: autobottomcube,
          automidcube: automidcube,
          autohighcube: autohighcube,
          teleopbottomCone: teleopbottomCone,
          teleopmidcone: teleopmidcone,
          teleophighcone: teleophighcone,
          teleopbottomcube: teleopbottomcube,
          teleopmidcube: teleopmidcube,
          teleophighcube: teleophighcube,
          floorcone: floorcone,
          floorcube: floorcube,
          stationcone: stationcone,
          stationcube: stationcube,
          attempted: attempted,
          docked: docked,
          engaged: engaged,
          soloclimb: soloclimb,
          gaveassistance: gaveassistance,
          recievedassistance: recievedassistance,
          parked: parked,
          Slider1: Slider1,
          fullcycler: fullcycler,
          halfcycler: halfcycler,
          feeder: feeder,
          defense: defense,
          topheavy: topheavy,
          notes: notes.toString(),
          Aggression: Aggression
        }];
        setQe(JSON.stringify(qe2));
      } catch (e) {
        // handle error
      }
      
    };
    checkStorage();
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
  Alert.alert('Data Cleared!');

}
  const sendDataToFirestore = async () => {
    const Match_Number = await AsyncStorage.getItem('Match_Number');
    const Team_Number = await AsyncStorage.getItem('Team_Number');
    const Alliance = await AsyncStorage.getItem('Alliance');
    const Position = await AsyncStorage.getItem('Position');

    const autodock = await AsyncStorage.getItem('autodock');
    const autobottomCone = await AsyncStorage.getItem('autobottomCone');
    const automidcone = await AsyncStorage.getItem('automidcone');
    const autohighcone = await AsyncStorage.getItem('autohighcone');
    const autobottomcube = await AsyncStorage.getItem('autobottomcube');
    const automidcube = await AsyncStorage.getItem('automidcube');
    const autohighcube = await AsyncStorage.getItem('autohighcube');
    const teleopbottomCone = await AsyncStorage.getItem('teleopbottomCone');
    const teleopmidcone = await AsyncStorage.getItem('teleopmidcone');
    const teleophighcone = await AsyncStorage.getItem('teleophighcone');


    const teleopbottomcube = await AsyncStorage.getItem('teleopbottomcube');
    const teleopmidcube = await AsyncStorage.getItem('teleopmidcube');
    const teleophighcube = await AsyncStorage.getItem('teleophighcube');



    const floorcone = await AsyncStorage.getItem('floorcone');
    const floorcube = await AsyncStorage.getItem('floorcube');
    const stationcone = await AsyncStorage.getItem('stationcone');
    const stationcube = await AsyncStorage.getItem('stationcube');

    const attempted = await AsyncStorage.getItem('attempted');
    const docked = await AsyncStorage.getItem('docked');
    const engaged = await AsyncStorage.getItem('engaged');
    const soloclimb = await AsyncStorage.getItem('soloclimb');
    const gaveassistance = await AsyncStorage.getItem('gaveassistance');
    const recievedassistance = await AsyncStorage.getItem('recievedassistance');
    const parked = await AsyncStorage.getItem('parked');
    const Slider1 = await AsyncStorage.getItem('Slider1');


    const fullcycler = await AsyncStorage.getItem('fullcycler');
    const halfcycler = await AsyncStorage.getItem('halfcycler');
    const feeder = await AsyncStorage.getItem('feeder');
    const defense = await AsyncStorage.getItem('defense');
    const topheavy = await AsyncStorage.getItem('topheavy');
    const notes = await AsyncStorage.getItem('notes');
    const Aggression = await AsyncStorage.getItem('Aggression');
    try {

      // Add the data to the collection
      const docRef = await addDoc(collection(db, "scouting"), {
        Match_Number: Match_Number,
          Team_Number: Team_Number,
          Alliance: Alliance,
          Position: Position,
          autodock: autodock,
          autobottomCone: autobottomCone,
          automidcone: automidcone,
          autohighcone: autohighcone,
          autobottomcube: autobottomcube,
          automidcube: automidcube,
          autohighcube: autohighcube,
          teleopbottomCone: teleopbottomCone,
          teleopmidcone: teleopmidcone,
          teleophighcone: teleophighcone,
          teleopbottomcube: teleopbottomcube,
          teleopmidcube: teleopmidcube,
          teleophighcube: teleophighcube,
          floorcone: floorcone,
          floorcube: floorcube,
          stationcone: stationcone,
          stationcube: stationcube,
          attempted: attempted,
          docked: docked,
          engaged: engaged,
          soloclimb: soloclimb,
          gaveassistance: gaveassistance,
          recievedassistance: recievedassistance,
          parked: parked,
          Slider1: Slider1,
          fullcycler: fullcycler,
          halfcycler: halfcycler,
          feeder: feeder,
          defense: defense,
          topheavy: topheavy,
          notes: notes.toString(),
          Aggression: Aggression,
      });
      Alert.alert('Data sent succsessfully!');

    } catch (error) {
      Alert.alert('Error Sending data, uhhh ask someone in strategy');
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
