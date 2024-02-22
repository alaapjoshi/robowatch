import React, { useState, useEffect } from "react";
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
import GestureRecognizer, { swipeDirections } from "react-native-swipe-gestures";

export default function Setup({ navigation }) {
  const [studentID, setStudentID] = useState("");
  const [match, setMatch] = useState("");
  const [team, setTeam] = useState("");
  const [alliance, setAlliance] = useState("");
  const [pos, setPos] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const Student_ID = await AsyncStorage.getItem("Student_ID");
        setStudentID(Student_ID);

        const Match_Number = await AsyncStorage.getItem("Match_Number");
        setMatch(Match_Number);

        const Team_Number = await AsyncStorage.getItem("Team_Number");
        setTeam(Team_Number);

        const Alliance = await AsyncStorage.getItem("Alliance");
        setAlliance(Alliance);

        const Position = await AsyncStorage.getItem("Position");
        setPos(Position);
      } catch (error) {
        // Handle errors if necessary
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const onSwipeLeft = () => {
    navigation.goBack();
  };

  const onSwipeRight = () => {
    navigation.navigate("Teleop"); // Navigate to "teleop" screen
  };

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };

  const send = async () => {
    navigation.navigate("Auto");
    try {
      await AsyncStorage.setItem("Student_ID", studentID);
      await AsyncStorage.setItem("Match_Number", match);
      await AsyncStorage.setItem("Team_Number", team);
      await AsyncStorage.setItem("Alliance", alliance);
      await AsyncStorage.setItem("Position", pos);
    } catch (e) {
      console.log("Error:", e);
    }
  };

  return (
    <GestureRecognizer
      onSwipeLeft={onSwipeLeft}
      onSwipeRight={onSwipeRight}
      config={config}
      style={{ flex: 1 }}
    >
      <ScrollView>
        <View style={{ backgroundColor: "white", flex: 1 }}>
          <View style={styles.text}>
            <View style={{backgroundColor: 'red'}}>
              <Text style={{fontSize: 30, textAlign: 'center'}}> Setup</Text>
            </View>
            <Text style={styles.text}>Student ID</Text>
            <TouchableWithoutFeedback
              onPress={Keyboard.dismiss}
              accessible={false}
            >
              <View style={{ flex: 1 }}>
                <TextInput
                  style={styles.input}
                  onChangeText={setStudentID}
                  value={studentID}
                  placeholder="e.g. 3"
                  keyboardType="numeric"
                />
              </View>
            </TouchableWithoutFeedback>
          </View>

          <View style={{ marginTop: 30 }}>
            <Text style={styles.text}>Match Number</Text>
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
            <Text style={styles.text}>Team Number</Text>
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
            <Text style={styles.text}>Alliance</Text>
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
            <Text style={styles.text}>Driver Station</Text>
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

          <View style={{ marginBottom: 15 }}>
            {/* Some content */}
          </View>
          <TouchableOpacity style={styles.button} onPress={() => send()}>
            <Text style={styles.text}>Navigate to Auto</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </GestureRecognizer>
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
    backgroundColor: "#ff0000",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 4,
    margintop: 90,
  },
  text: {
    color: "#000000",
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },
});
