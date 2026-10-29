import { React, useState, useEffect } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
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
export default function ViewScout() {
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
        console.error("Failed to load 'color' from device storage:", e);
      }
    };

    getData();
  }, [colorAccent]);
  const [pits, setPits] = useState([]);

  useEffect(() => {
    const fetchPits = async () => {
      const querySnapshot = await getDocs(collection(db, "scouting"));
      const pitsData = [];
      querySnapshot.forEach((doc) => {
        pitsData.push({ id: doc.id, ...doc.data() });
      });
      setPits(pitsData);
    };
    fetchPits();
  }, []);

  // Auto shots are saved as { selectedOutcome }, teleop shots as { outcome }.
  const countShots = (shots, outcomeKey) => {
    const list = Array.isArray(shots) ? shots : [];
    const made = list.filter((shot) => shot[outcomeKey] === "Success").length;
    return `${made} made / ${list.length} attempted`;
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={{ fontSize: 30, color: colorAccent }}>
        Match Number: {item.Match_Number}
      </Text>
      <Text style={styles.text}>Team Number: {item.Team_Number}</Text>
      <Text style={styles.text}>Alliance: {item.Alliance}</Text>
      <Text style={styles.text}>Position: {item.Position}</Text>
      <Text style={styles.text}>Scout: {item.Student_ID}</Text>

      <Text style={styles.heading}>Auto</Text>
      <Text style={styles.text}>Shots: {countShots(item.updatedCoordinates, "selectedOutcome")}</Text>
      <Text style={styles.text}>Left Alliance Zone: {item.left_alliance_auto}</Text>
      <Text style={styles.text}>Reload: {item.Reload_Auto}</Text>

      <Text style={styles.heading}>Teleop</Text>
      <Text style={styles.text}>Shots: {countShots(item.Teleop_Field, "outcome")}</Text>
      <Text style={styles.text}>Coopertition Bonus: {item.coopertitionbonus}</Text>

      <Text style={styles.heading}>Endgame</Text>
      <Text style={styles.text}>Parked: {item.Parked}</Text>
      <Text style={styles.text}>Climb: {item.climb}</Text>
      <Text style={styles.text}>Harmony: {item.Harmony}</Text>
      <Text style={styles.text}>Trap: {item.trap}</Text>
      <Text style={styles.text}>Spotlight: {item.Spotlight}</Text>

      <Text style={styles.heading}>Notes</Text>
      <Text style={styles.text}>Stability: {item.stabilitySlider}</Text>
      <Text style={styles.text}>Aggression: {item.agressionSlider}</Text>
      <Text style={styles.text}>{item.notes}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={pits}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
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
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 12,
  },
  text: {
    fontSize: 16,
  },
});
