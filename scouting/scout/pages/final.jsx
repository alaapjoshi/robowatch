import { React, useState, useCallback } from "react";
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
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { useFocusEffect } from "@react-navigation/native";

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

// Every AsyncStorage key the match scouting pages write to.
const MATCH_KEYS = [
  "Student_ID", "Match_Number", "Team_Number", "Alliance", "Position",
  "Auto_Grid", "LeftAllianceauto", "ReloadAuto",
  "Teleop_Grid", "coopertitionbonus", "Relocatedtele",
  "Parked", "Harmony", "Spotlight", "trap", "climb",
  "Win", "Lose", "tie", "notes", "stabilitySlider", "agressionSlider",
];

// Reads the answers saved by each page and builds one match record.
const readRecord = async () => {
  const values = Object.fromEntries(await AsyncStorage.multiGet(MATCH_KEYS));
  return {
    Student_ID: values.Student_ID,
    Match_Number: values.Match_Number,
    Team_Number: values.Team_Number,
    Alliance: values.Alliance,
    Position: values.Position,
    updatedCoordinates: JSON.parse(values.Auto_Grid ?? "[]"),
    left_alliance_auto: values.LeftAllianceauto,
    Reload_Auto: values.ReloadAuto,
    Teleop_Field: JSON.parse(values.Teleop_Grid ?? "[]"),
    coopertitionbonus: values.coopertitionbonus,
    Parked: values.Parked,
    Harmony: values.Harmony,
    Spotlight: values.Spotlight,
    trap: values.trap,
    climb: values.climb,
    win: values.Win,
    lose: values.Lose,
    tie: values.tie,
    notes: values.notes,
    stabilitySlider: values.stabilitySlider,
    agressionSlider: values.agressionSlider,
  };
};

export default function Final() {
  const [qe, setQe] = useState("Blank");

  const refreshQr = useCallback(() => {
    readRecord()
      .then((record) => setQe(JSON.stringify(record)))
      .catch((e) => console.error("Failed to build match record for QR code:", e));
  }, []);

  // Rebuild the QR code every time this tab is opened, so it reflects the latest answers.
  useFocusEffect(refreshQr);

  const cleardata = async () => {
    try {
      await AsyncStorage.multiRemove(MATCH_KEYS);
      refreshQr();
      Alert.alert("Data Cleared!");
    } catch (e) {
      console.error("Failed to clear match data from device storage:", e);
      Alert.alert("Could not clear data");
    }
  };

  const sendDataToFirestore = async () => {
    const record = await readRecord();
    const failures = [];

    try {
      const token = await AsyncStorage.getItem("token");
      const response = await Promise.race([
        fetch("http://10.75.128.119:5002/", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(record),
        }),
        new Promise((resolve, reject) => {
          setTimeout(() => reject(new Error("Timeout")), 3000);
        }),
      ]);
      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }
    } catch (e) {
      console.error("Failed to send match record to team server:", e);
      failures.push("team server");
    }

    try {
      await addDoc(collection(db, "scouting"), record);
    } catch (e) {
      console.error("Failed to save match record to Firestore:", e);
      failures.push("Firestore");
    }

    if (failures.length === 0) {
      Alert.alert("Data Sent");
    } else {
      Alert.alert("Could not send data", `Failed: ${failures.join(", ")}`);
    }
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
