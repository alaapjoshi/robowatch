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

export default function Endgame({navigation}) {
  return (
    <View>
  <Text style={{textAlign: 'center'}}> This page is in works </Text>
  <TouchableOpacity style={{backgroundColor: '#4CAF50',paddingVertical: 12,paddingHorizontal: 16,borderRadius: 4,margintop: 90}} onPress={() => navigation.navigate("Final")}>
  <Text style={{color: '#FFFFFF',fontSize: 16,fontWeight: 'bold',textAlign: 'center',}}>Navigate to Final</Text>
</TouchableOpacity>
</View>
  
  );
}
