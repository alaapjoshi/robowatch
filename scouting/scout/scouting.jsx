import { React, useState, useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Stack = createStackNavigator();

//Scouting App
import Setup from "./pages/setup";
import Auto from "./pages/auto";
import Teleop from "./pages/teleop";
import Endgame from "./pages/endgame";
import Final from "./pages/final";

export default function Scouting() {
  return (
    <NavigationContainer independent={true} initialRouteName="Setup">
      <Stack.Navigator>
        <Stack.Screen
          name="Setup"
          component={Setup}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Auto"
          component={Auto}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Teleop"
          component={Teleop}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Endgame"
          component={Endgame}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Final"
          component={Final}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0",
  },
});
