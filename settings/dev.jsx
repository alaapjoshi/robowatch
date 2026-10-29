import { React, useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Dev({ navigation }) {
  const storeColor = async (value) => {
    try {
      await AsyncStorage.setItem("login", "");
    } catch (e) {
      console.error("Failed to save 'login' to device storage:", e);
    }
  };
  function clearAllData() {
    AsyncStorage.getAllKeys()
      .then((keys) => AsyncStorage.multiRemove(keys))
      .then(() => alert("Data Cleared"));
  }
  return (
    <>
      <Text style={styles.item}>
        Please only touch these settings if you know what you are doing
      </Text>
      <Button onPress={clearAllData} title="Clear Async Storage"></Button>

      <TouchableOpacity style={styles.button} onPress={storeColor}>
      <Text style={styles.text}>Log out</Text>
    </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  item: {
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: '#FF0000',
    marginTop: 30,
    height: 30,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
