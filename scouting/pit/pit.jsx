
import { React, useState, useEffect, useMemo } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  Alert,
} from "react-native";

const firebaseConfig = {
  apiKey: "AIzaSyCfmW98iWLhhNtFrjy-3niS_OWPhrQTb5U",
  authDomain: "robowatch-4c113.firebaseapp.com",
  projectId: "robowatch-4c113",
  storageBucket: "robowatch-4c113.appspot.com",
  messagingSenderId: "416751963314",
  appId: "1:416751963314:web:eaae18d08b2da367298dab",
  measurementId: "G-HNHKV87TTL",
};
import Checkbox from "expo-checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";
import QRCode from "react-native-qrcode-svg";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { initializeApp } from "firebase/app";
import RadioGroup from 'react-native-radio-buttons-group';
import { getFirestore, collection, addDoc } from "firebase/firestore";
import Slider from "@react-native-community/slider"; // Import Slider component


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function Pit() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Move">
        <Stack.Screen
          name="data"
          component={Data}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="qr"
          component={Qr}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function Data({ navigation }) {
  const [team, setTeam] = useState(""); // State for team number
  const [height, setHeight] = useState(""); // State for height
  const [dimensions, setDimensions] = useState(""); // State for dimensions
  const [driveTrain, setDriveTrain] = useState(""); // State for drive train
  const [source, setSource] = useState(false); // State for source
  const [ground, setGround] = useState(false); // State for ground
  const [focusSpeakers, setFocusSpeakers] = useState(false); // State for focus speakers
  const [humanAccuracy, setHumanAccuracy] = useState(0); // State for human accuracy slider value
  const [feeding, setFeeding] = useState(""); // State for robot feeding
  const [additionalNotes, setAdditionalNotes] = useState(""); // State for additional notes

  const onHumanAccuracyChange = (value) => {
    setHumanAccuracy(value);
  };

  const send = async () => {
    const token = await AsyncStorage.getItem("token");
    const currentTimeUTC = new Date().toUTCString(); // Get current UTC time

    const data = {
      Team_Number: team,
      Height: height,
      Dimensions: dimensions,
      DriveTrain: driveTrain,
      Source: source,
      Ground: ground,
      FocusSpeakers: focusSpeakers,
      HumanAccuracy: humanAccuracy,
      Feeding: feeding,
      AdditionalNotes: additionalNotes,
      UTCdatetime: currentTimeUTC,
      event_code: "NJFLA"
    };
    const response = await Promise.race([
    fetch("http://10.75.128.119:5002/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }),
    new Promise((resolve, reject) => {
      setTimeout(() => reject(new Error("Timeout")), 3000);
    })
  ]);
  response()
  Alert.alert("Data Sent")
  }

  return (
    <ScrollView>
      <Text style={{fontSize: 30, textAlign: 'center', paddingTop: 20}}>
        Pit Scouting
      </Text>
      {/* UI elements */}
      {/* Team Number */}
      <View style={styles.inputContainer}> 
        <Text>Team Number</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          onChangeText={setTeam}
          value={team}
        />
      </View>
      {/* Height */}
      <View style={styles.inputContainer}> 
        <Text>Height (in)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          onChangeText={setHeight}
          value={height}
        />
      </View>
      {/* Dimensions */}
      <View style={styles.inputContainer}> 
        <Text>Dimensions (in*in)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          onChangeText={setDimensions}
          value={dimensions}
        />
      </View>
      {/* Drive Train */}
      <View style={styles.inputContainer}> 
        <Text>Drive Train</Text>
        <RadioGroup 
            radioButtons={[
              { label: 'Swerve', value: 'Swerve' },
              { label: 'Tank', value: 'Tank' },
              { label: 'Mecanum', value: 'Mecanum' },
              { label: 'Other', value: 'Other' }
            ]} 
            onPress={(value) => setDriveTrain(value)}
            selectedId={driveTrain}
        />
      </View>
      {/* Pickup */}
      <View style={styles.inputContainer}> 
        <Text style={{fontSize: 30}}>Pickup</Text>
        <Text style={{fontSize: 20}}>Source</Text>
        <Checkbox
          style={styles.checkbox}
          value={source}
          onValueChange={setSource}
          color={'#4630EB'}
        />
                <Text style={{fontSize: 20}}>Ground</Text>

        <Checkbox
          style={styles.checkbox}
          value={ground}
          onValueChange={setGround}
          color={'#4630EB'}
        />
      </View>
      {/* Focus Speakers */}
      <View style={styles.inputContainer}> 
      <Text style={{fontSize: 30}}>Focus Speakers</Text>
        <Checkbox
          style={styles.checkbox}
          value={focusSpeakers}
          onValueChange={setFocusSpeakers}
          color={'#4630EB'}
        />
        <Text>Source</Text>
      </View>
      {/* Human Accuracy */}
      <View style={styles.inputContainer}> 
        <Text>Human Accuracy: {humanAccuracy}</Text>
        <Slider
          style={{ width: 350, alignSelf: "center" }}
          minimumValue={0}
          maximumValue={10}
          step={1}
          value={humanAccuracy}
          onValueChange={onHumanAccuracyChange}
        />
      </View>
      {/* Shooting Location */}
      <View style={styles.inputContainer}> 
        <Text style={{fontSize: 30,textAlign: 'center'}}> Shooting Location</Text>
      </View>
      {/* Robot Feeding */}
      <View style={styles.inputContainer}> 
        <Text>Robot Feeding</Text>
        <RadioGroup 
            radioButtons={[
              { label: 'Human Payer', value: 'humanPlayer' },
              { label: 'Anyone Can Feed', value: 'Anyone' }
            ]} 
            onPress={(value) => setFeeding(value)}
            selectedId={feeding}
        />
      </View>
      {/* Additional Notes */}
      <View style={styles.inputContainer}> 
        <Text>Additional Notes</Text>
        <TextInput
          style={styles.input}
          onChangeText={setAdditionalNotes}
          value={additionalNotes}
        />
      </View>
      {/* Send to server button */}
      <TouchableOpacity
        style={styles.button}
        onPress={send}
      >
        <Text style={{ fontSize: 18, color: "#FFFFFF" }}>Send to server + QR</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: '#ff0303',
    padding: 20,
    borderRadius: 20,
    marginTop: 20,
  },
  input: {
    height: 40,
    borderColor: 'black',
    marginTop: 5,
    paddingLeft: 5,
    marginHorizontal: 30,
    paddingHorizontal: 30, 
    borderBottomWidth: 1, 
  },
  checkbox: {
    width: 50,
    height: 50,
    marginBottom: 20,
    
  },
  button: {
    backgroundColor: '#ff0303',
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center'
  }
});

function Qr({ route }) {
  useEffect(() => {
    // Your code here
  }, []);

  const {

  } = route.params;
  const qr = [
    {

    },
  ];
  const real = JSON.stringify(qr);
  const [colorAccent, setColorAccent] = useState("#ff0303");

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("color");
        if (value !== null) {
          setColorAccent(value.replace(/['"]+/g, ""));
        }
      } catch (e) {
        console.log("umm...");
      }
    };

    getData();
  }, [colorAccent]);

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        marginTop: "50%",
      }}
    >
      <QRCode size={300} color={colorAccent} value={real} />
    </View>
  );
}
