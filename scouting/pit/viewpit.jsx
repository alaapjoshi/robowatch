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
export default function Read() {
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
      const querySnapshot = await getDocs(collection(db, "pit"));
      const pitsData = [];
      querySnapshot.forEach((doc) => {
        pitsData.push({ id: doc.id, ...doc.data() });
      });
      setPits(pitsData);
    };
    fetchPits();
  }, []);

  const renderItem = ({ item }) => (
    <View
      style={{
        marginVertical: 8,
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
      }}
    >
      <Text style={{ fontSize: 30, color: colorAccent }}>
        Team Number: {item.Team_Number}
      </Text>
      <Text style={styles.text}>Height: {item.Height}</Text>
      <Text style={styles.text}>Dimensions: {item.Dimensions}</Text>
      <Text style={styles.text}>Drive Train: {item.DriveTrain}</Text>
      <Text style={styles.text}>Source Intake: {item.Source ? "Yes" : "No"}</Text>
      <Text style={styles.text}>Ground Intake: {item.Ground ? "Yes" : "No"}</Text>
      <Text style={styles.text}>Focus on Speaker: {item.FocusSpeakers ? "Yes" : "No"}</Text>
      <Text style={styles.text}>Human Player Accuracy: {item.HumanAccuracy}</Text>
      <Text style={styles.text}>Feeding: {item.Feeding}</Text>
      <Text style={styles.text}>Notes: {item.AdditionalNotes}</Text>
      <Text style={styles.text}>Sent: {item.UTCdatetime}</Text>
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
});
