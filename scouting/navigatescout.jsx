import React, { useEffect, useState } from "react";
import { Alert, TextInput, TouchableOpacity, View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Pit from "./pit/pit";
import scouting from "./scout/scouting";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import Read from "./pit/viewpit";
import Viewscout from "./scout/viewscout";

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

const Move = ({ navigation }) => {
  const [colorAccent, setColorAccent] = useState("#ff0303");

  useEffect(() => {
    const fetchData = async () => {
      let timer; // Variable to hold setTimeout reference

      try {
        // Retrieve credentials from AsyncStorage
        const credentials = await AsyncStorage.getItem("credentials");
        const { username, password } = JSON.parse(credentials) || {};
        const token = await AsyncStorage.getItem("token");
        console.log("sDSAD")
        const response = await Promise.race([ // Using Promise.race to race between fetch request and setTimeout
          fetch("http://10.75.128.119:5002/who_am_i", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, // Assuming your API expects a Bearer token
            },
          }),
          new Promise((_, reject) => { // Rejects after 3 seconds
            timer = setTimeout(() => {
              reject(new Error('Timeout'));
            }, 3000);
          })
        ]);

        clearTimeout(timer); // Clear the timer since we received a response

        if (response.status === 422 || response.status === 401) {
          // Prompt alert to sign in and update credentials
          Alert.alert(
            "Session Expired",
            "Please sign in again",
            [
              {
                text: "OK",
                onPress: async () => {
                  // Update credentials in AsyncStorage
                  const newCredentials = await getCredentialsFromInput();
                  if (newCredentials) {
                    await AsyncStorage.setItem(
                      "credentials",
                      JSON.stringify(newCredentials)
                    );

                    // Make another request with the new credentials if needed
                    fetchData2();
                  }
                },
              },
            ],
            { cancelable: false }
          );
        } else {
          // Continue with your logic
          console.log("Request successful");
        }
      } catch (error) {
        console.error("Error:", error);
        if (error.message === 'Timeout') {
          Alert.alert("Server is not responding"); // Show alert if request times out
        }
      }
    };

    // Call fetchData function
    fetchData();
  }, []);

  const getCredentialsFromInput = () => {
    return new Promise((resolve) => {
      let username = "";
      let password = "";
      Alert.prompt(
        "Sign In",
        "Please enter your username and password",
        [
          {
            text: "Cancel",
            onPress: () => resolve(null),
            style: "cancel",
          },
          {
            text: "OK",
            onPress: async (text) => {
              const response2 = await fetch("http://10.75.128.119:5002/login", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ "username": text.login, "password": text.password }),
              });
              const result2 = await response2.json();
              console.log(result2.access_token)
              while (result2.access_token == undefined) {
                console.log("asdsa")
                Alert.alert("Password wrong, swipe out and come back in")
              }
              await AsyncStorage.setItem("token", result2.access_token);

              response2()
              resolve({ username, password });
            },
          },
        ],
        "login-password"

      );
    });
  };

  return (
    <View style={styles.container}>
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
};


const styles = {
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
};
