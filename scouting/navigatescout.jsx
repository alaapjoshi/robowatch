import { React, useEffect, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Pit from "./pit/pit";
import scouting from "./scout/scouting";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import Read from "./pit/viewpit";
import Viewscout from "./scout/viewscout";
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

export default function Navigatescout({ navigation }) {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Move">
        <Stack.Screen
          name="Move"
          component={Move}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Pit" component={Pit} />
        <Stack.Screen name="Scout" component={scouting} />
        <Stack.Screen name="read" component={Read} />
        <Stack.Screen name="Viewscout" component={Viewscout} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function Move({ navigation }) {
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
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text
        style={{
          fontSize: 40,
          fontWeight: "bold",
          color: colorAccent,
          marginBottom: 40,
        }}
      >
        Select Scouting Type:
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: colorAccent,
          padding: 20,
          borderRadius: 10,
          marginBottom: 40,
        }}
        onPress={() => navigation.navigate("Scout")}
      >
        <Text style={{ fontSize: 18, color: "#FFFFFF" }}>Match Scouting</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: colorAccent,
          padding: 20,
          borderRadius: 10,
          marginBottom: 40,
        }}
        onPress={() => navigation.navigate("Viewscout")}
      >
        <Text style={{ fontSize: 18, color: "#FFFFFF" }}>View Scout Data</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: colorAccent,
          padding: 20,
          borderRadius: 10,
          marginBottom: 40,
        }}
        onPress={() => navigation.navigate("Pit")}
      >
        <Text style={{ fontSize: 18, color: "#FFFFFF" }}>Pit Scouting</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: colorAccent,
          padding: 20,
          borderRadius: 10,
          marginBottom: 40,
        }}
        onPress={() => navigation.navigate("read")}
      >
        <Text style={{ fontSize: 18, color: "#FFFFFF" }}>View Pit Data</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 4,
    marginTop: "50%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    fontSize: 30,
    height: 150,
  },
  button: {
    backgroundColor: "#ff0303",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    width: "50%",
    paddingBottom: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#ffffff",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    width: "100%",
    paddingHorizontal: 16,
  },
  item: {
    marginVertical: 8,
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  itemText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
