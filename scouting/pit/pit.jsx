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
} from "react-native";
import Checkbox from "expo-checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";
import QRCode from "react-native-qrcode-svg";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { initializeApp } from "firebase/app";
import RadioGroup from 'react-native-radio-buttons-group';
import { getFirestore, collection, addDoc } from "firebase/firestore";
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
  const [source, setSource] = useState(false);
  const [ground, setGround] = useState(false);
  const [amp, setAmp] = useState(false);
  const [speaker, setSpeaker] = useState(false);

  const radioButtons = useMemo(() => ([
    {
        id: '1', // acts as primary key, should be unique and non-empty string
        label: 'Swerve',
        value: 'Swerve'
    },
    {
        id: '2',
        label: 'Tank',
        value: 'Tank'
    },
    {
      id: '3',
      label: 'Mecanum',
      value: 'Mecanum'
  },
  {
    id: '4',
    label: 'Other',
    value: 'Other'
}
]), []);

const [DriveTrain, setDriveTrain] = useState();

const radioButtons2 = useMemo(() => ([
  {
      id: '1', // acts as primary key, should be unique and non-empty string
      label: 'Human Payer',
      value: 'humanPlayer'
  },
  {
      id: '2',
      label: 'Anyone Can Feed',
      value: 'Anyone'
  }
]), []);

const [Feeding, setFeeding] = useState();


  return (
    <ScrollView>
      <Text style={{fontSize: 30, textAlign: 'center', paddingTop: 20}}>
        Pit Scouting
      </Text>
      <View style={{flexDirection: "row", justifyContent: "space-evenly"}}>
      <View style={{
            backgroundColor: colorAccent,
            padding: 20,
            borderRadius: 20,
            marginTop: 40,
          }}> 
        
        <Text>
          Height (in)
        </Text>

        <TextInput
          style={{
            height: 40,
            borderColor: 'black',
            marginTop: 5,
            paddingLeft: 5,
            borderBottomWidth: 1, 
          }}
          keyboardType="numeric"
        />

      </View>
      <View style={{
            backgroundColor: colorAccent,
            padding: 20,
            borderRadius: 20,
            marginTop: 40,
          }}> 
        
        <Text>
        Dimensions with border (in)
        </Text>

        <TextInput
          style={{
            height: 40,
            borderColor: 'black',
            marginTop: 5,
            paddingLeft: 5,
            borderBottomWidth: 1, 
          }}
          keyboardType="numeric"
        />

      </View>
      </View>
      <View style={{flexDirection: "row", justifyContent: "space-evenly"}}>
      <View style={{
            backgroundColor: colorAccent,
            padding: 20,
            borderRadius: 20,
            marginTop: 40,
          }}> 
        
        <Text>
          Drivetrain
        </Text>
        <RadioGroup 
            radioButtons={radioButtons} 
            onPress={setDriveTrain}
            selectedId={DriveTrain}
        />

      </View>
      <View style={{
            backgroundColor: colorAccent,
            padding: 20,
            borderRadius: 20,
            marginTop: 40,
      }}> 
        
        <Text style={{fontSize: "30", marginBottom: 20}}>
        Pickup
        </Text>
        <View style={{flexDirection: "row",alignItems: 'center',}}>
        <Checkbox
          style={{width: 30, height: 30}}
          value={source}
          onValueChange={setSource}
          color={source ? '#4630EB' : undefined}
        />
        <Text style={{fontSize: "30"}}> Source </Text>

        </View>

        <View style={{flexDirection: "row",alignItems: 'center', marginTop: 10}}>
        <Checkbox
          style={{width: 30, height: 30}}
          value={ground}
          onValueChange={setGround}
          color={ground ? '#4630EB' : undefined}
        />
        <Text style={{fontSize: "30"}}> Ground </Text>

                </View>

        
      </View>
      </View>


          <View style={{
            backgroundColor: colorAccent,
            padding: 20,
            borderRadius: 20,
            marginTop: 40,
          }}> 
            <Text style={{fontSize: 30,textAlign: 'center'}}> Shooting Location</Text>

          </View>











      <View style={{flexDirection: "row", justifyContent: "space-evenly"}}>
      <View style={{
            backgroundColor: colorAccent,
            padding: 20,
            borderRadius: 20,
            marginTop: 40,
          }}> 
        
        <Text style={{fontSize: "20"}}>
          Robot Feeding
        </Text>
        <RadioGroup 
            radioButtons={radioButtons2} 
            onPress={setFeeding}
            selectedId={Feeding}
        />

      </View>
      <View style={{
            backgroundColor: colorAccent,
            padding: 20,
            borderRadius: 20,
            marginTop: 40,
          }}> 
        
        <Text style={{fontSize: "20", marginBottom: 20}}>
        Additional Notes
        </Text>
        <TextInput
          style={{
            height: 40,
            borderColor: 'black',
            marginTop: 5,
            paddingLeft: 5,
            borderBottomWidth: 1, 
          }}
        />


        

      </View>
      </View>

      
        <TouchableOpacity
          style={{
            backgroundColor: colorAccent,
            padding: 20,
            borderRadius: 10,
            marginTop: 40,
          }}
          onPress={() =>
            navigation.navigate("qr", {
              TeamNumber: number,
              cubeplacelow: cubeslow,
              cubeplacemid: cubesmid,
              cubeplacehigh: cubeshigh,
              coneplacelow: coneslow,
              coneplacemid: conesmid,
              coneplacehigh: coneshigh,
              pickupcubesG: pickuplowcubes,
              pickupcubesS: pickupstationcubes,
              pickupconesG: pickuplowcones,
              pickupconesS: pickupstationcones,
              autobalance: autobalanceyes,
              pieces: pieces,
              autoaligngamepiece: autoalign,
              autoalignapril: autoaligngame,
              autosub: autosub,
            })
          }
        >
          <Text style={{ fontSize: 18, color: "#FFFFFF" }}>
            Send to server + QR
          </Text>
        </TouchableOpacity>
    </ScrollView>
  );
}
function Qr({ route }) {
  useEffect(() => {
    if (TeamNumber != "") {
      async function addData() {
        try {
          const docRef = await addDoc(collection(db, "pit"), {
            TeamNumber: TeamNumber,
            cubeplacelow: cubeplacelow,
            cubeplacemid: cubeplacemid,
            cubeplacehigh: cubeplacehigh,
            coneplacelow: coneplacelow,
            coneplacemid: coneplacemid,
            coneplacehigh: coneplacehigh,
            pickupcubesG: pickupcubesG,
            pickupcubesS: pickupcubesS,
            pickupconesG: pickupconesG,
            pickupconesS: pickupconesS,
            autobalance: autobalance,
            pieces: pieces,
            autoaligngamepiece: autoaligngamepiece,
            autoalignapril: autoalignapril,
            autosub: autosub,
          });
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      }
      addData();
    }
  }, []);

  const {
    TeamNumber,
    cubeplacelow,
    cubeplacemid,
    cubeplacehigh,
    coneplacelow,
    coneplacemid,
    coneplacehigh,
    pickupcubesG,
    pickupcubesS,
    pickupconesG,
    pickupconesS,
    autobalance,
    pieces,
    autoaligngamepiece,
    autoalignapril,
    autosub,
  } = route.params;
  const qr = [
    {
      TeamNumber: TeamNumber,
      cubeplacelow: cubeplacelow,
      cubeplacemid: cubeplacemid,
      cubeplacehigh: cubeplacehigh,
      coneplacelow: coneplacelow,
      coneplacemid: coneplacemid,
      coneplacehigh: coneplacehigh,
      pickupcubesG: pickupcubesG,
      pickupcubesS: pickupcubesS,
      pickupconesG: pickupconesG,
      pickupconesS: pickupconesS,
      autobalance: autobalance,
      pieces: pieces,
      autoaligngamepiece: autoaligngamepiece,
      autoalignapril: autoalignapril,
      autosub: autosub,
    },
  ];
  const real = JSON.stringify(qr);
  const [colorAccent, setColorAccent] = useState("#ff0303");
  this.forceUpdate;
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
const styles = StyleSheet.create({
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  checkbox: {
    width: 50,
    height: 50,
    fontSize: 20,
    color: "#ff0303",
    marginHorizontal: 50,
    flexDirection: "row",
  },
  subLogoText: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "#ff0303",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
