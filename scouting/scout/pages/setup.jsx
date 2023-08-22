import { React, useState } from "react";

import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { SegmentedButtons } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";

export default function Setup({ navigation }) {
  const [match, setMatch] = useState("");
  const [team, setTeam] = useState("");
  const [alliance, setAlliance] = useState("");
  const [pos, setPos] = useState("");
  const send = async () => {
    navigation.navigate("Auto");
    try {
      await AsyncStorage.setItem("Match_Number", match);
    } catch (e) {
      console.log("umm...");
    }
    try {
      await AsyncStorage.setItem("Team_Number", team);
    } catch (e) {
      console.log("umm...");
    }
    try {
      await AsyncStorage.setItem("Alliance", alliance);
    } catch (e) {
      console.log("umm...");
    }
    try {
      await AsyncStorage.setItem("Position", pos);
    } catch (e) {
      console.log("umm...");
    }
  };

  return (
    <ScrollView>
      <View style={{ backgroundColor: "white", flex: 1 }}>
        <Text style={{ color: "black", textAlign: "center", fontSize: 30 }}>
          Scouter App
        </Text>

        <View style={{ marginTop: 30 }}>
          <Text style={{ color: "black", textAlign: "center", fontSize: 30 }}>
            Match Number
          </Text>
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={false}
          >
            <View style={{ flex: 1 }}>
              <TextInput
                style={styles.input}
                onChangeText={setMatch}
                value={match}
                placeholder="e.g. 3"
                keyboardType="numeric"
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={{ marginTop: 60 }}>
          <Text style={{ color: "black", textAlign: "center", fontSize: 30 }}>
            Team Number
          </Text>
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={false}
          >
            <View style={{ flex: 1 }}>
              <TextInput
                style={styles.input}
                onChangeText={setTeam}
                value={team}
                placeholder="e.g 75"
                keyboardType="numeric"
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={{ alignItems: "center", marginTop: 60 }}>
          <Text style={{ fontSize: 30 }}>Alliance</Text>
          <SegmentedButtons
            value={alliance}
            onValueChange={setAlliance}
            buttons={[
              {
                value: "red",
                label: "Red",
              },
              {
                value: "blue",
                label: "Blue",
              },
            ]}
          />
        </View>
        <View style={{ flex: 1, alignItems: "center", marginTop: 30 }}>
          <Text style={{ fontSize: 30, padding: 10 }}>Position</Text>
          <SegmentedButtons
            value={pos}
            onValueChange={setPos}
            buttons={[
              {
                value: "left",
                label: "Left",
              },
              {
                value: "middle",
                label: "Mid",
              },
              {
                value: "right",
                label: "Right",
              },
            ]}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={() => send()}>
          <Text style={styles.text}>Navigate to Auto</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  input: {
    height: 40,
    backgroundColor: "#FFFFFF",
    marginHorizontal: 12,
    borderWidth: 1,
    padding: 10,
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 4,
    margintop: 90,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
