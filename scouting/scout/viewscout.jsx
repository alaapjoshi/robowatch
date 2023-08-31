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
        console.log("umm...");
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

  const renderItem = ({ item }) => 
    <View
      style={{
        marginVertical: 8,
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
      }}
    >
      <Text style={{ fontSize: 30, color: colorAccent }}>
        Match Number: {item.Match_Number}
      </Text>
      <Text style={styles.text}>
        Team Number: {item.Team_Number}
      </Text>
      <Text style={styles.text}>
        Alliance: {item.Alliance}
      </Text>

      <Text style={styles.text}>
        Position: {item.Position}
      </Text>

      <Text style={styles.text}>
        

      </Text>

      <Text style={styles.text}>
        Docking Status: {item.autodock}
      </Text>

      <Text style={styles.text}>
        Auto Bottom Cone: {item.autobottomCone}
      </Text>
      <Text style={styles.text}>
      Auto Mid Cone: {item.automidcone}
      </Text>
      <Text style={styles.text}>
      Auto High Cone: {item.autohighcone}
      </Text>
      <Text style={styles.text}>
      Auto Bottom Cube: {item.autobottomcube}
      </Text>
      <Text style={styles.text}>
      Auto Bottom Cube: {item.automidcube}
      </Text>
      <Text style={styles.text}>
      Auto High Cube: {item.autohighcube}
      </Text>

      <Text style={styles.text}>


      </Text>
      <Text style={styles.text}>
        Teleop Bottom Cone: {item.teleopbottomCone}
      </Text>
      <Text style={styles.text}>
      Teleop Mid Cone: {item.teleopmidcone}
      </Text>
      <Text style={styles.text}>
      Teleop High Cone: {item.teleophighcone}
      </Text>
      <Text style={styles.text}>
      Teleop Bottom Cube: {item.teleopbottomcube}
      </Text>
      <Text style={styles.text}>
      Teleop Bottom Cube: {item.teleopmidcube}
      </Text>
      <Text style={styles.text}>
      Teleop High Cube: {item.teleophighcube}
      </Text>

      <Text style={styles.text}>
      
      

      </Text>

      <Text style={styles.text}>
        Floorcone: {item.floorcone}
      </Text>
      <Text style={styles.text}>
      Floorcube: {item.floorcube}
      </Text>
      <Text style={styles.text}>
        Station Cone: {item.stationcone}
      </Text>
      <Text style={styles.text}>
        Station Cube: {item.stationcube}
      </Text>
      <Text style={styles.text}>
        Attempted: {item.attempted}
      </Text>
      <Text style={styles.text}>
        Docked: {item.docked}
      </Text>

      <Text style={styles.text}>
        Engaged: {item.engaged}
      </Text>
      <Text style={styles.text}>
        Solo Climb: {item.soloclimb}
      </Text>
      <Text style={styles.text}>
        Gave Assistance: {item.gaveassistance}
      </Text>
      <Text style={styles.text}>
        Recieved Assistance: {item.recievedassistance}
      </Text>
      <Text style={styles.text}>
        Parked: {item.parked}
      </Text>
      <Text style={styles.text}>
        Climb Time: {item.Slider1}
      </Text>

      <Text style={styles.text}>


      </Text>
      

      <Text style={styles.text}>
        Full Cycler: {item.fullcycler}
      </Text>
      <Text style={styles.text}>
        Half Cycler: {item.halfcycler}
      </Text>
      <Text style={styles.text}>
        Feeder: {item.feeder}
      </Text>
      <Text style={styles.text}>
        Defense: {item.defense}
      </Text>
      <Text style={styles.text}>
        Topheavy: {item.topheavy}
      </Text>
      <Text style={styles.text}>
        Notes: {item.notes}
      </Text>

      <Text style={styles.text}>
        Aggression: {item.Aggression}
      </Text>
    </View>
  ;

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
