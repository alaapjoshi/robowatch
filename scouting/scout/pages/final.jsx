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
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";
import QRCode from "react-native-qrcode-svg";

export default function Final() {
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
        const value02 = await AsyncStorage.getItem('teleopbottomCone');
        const value22 = await AsyncStorage.getItem('teleopmidcone');
        const value32 = await AsyncStorage.getItem('teleophighcone');


        const value42 = await AsyncStorage.getItem('teleopbottomcube');
        const value52 = await AsyncStorage.getItem('teleopmidcube');
        const value62 = await AsyncStorage.getItem('teleophighcube');


        const value72 = await AsyncStorage.getItem('floorcone');
        const value82 = await AsyncStorage.getItem('floorcube');
        const value92 = await AsyncStorage.getItem('stationcone');
        const value102 = await AsyncStorage.getItem('stationcube');

        const value03 = await AsyncStorage.getItem('Match_Number');
        const value23 = await AsyncStorage.getItem('Team_Number');
        const value33 = await AsyncStorage.getItem('Alliance');
        const value43 = await AsyncStorage.getItem('Position');
      } catch (e) {
        // handle error
      }
    };
    checkStorage();
  }, []);
  const qr = [
    {
    autodock: value


    }
    
  ]


  return (
  <Text> Final </Text>
  );
}
