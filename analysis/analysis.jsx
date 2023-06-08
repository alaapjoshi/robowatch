import { React, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Appearance,
  useColorScheme,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { LogBox } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]);
LogBox.ignoreAllLogs();

export default function Analysis() {
  const [dark, setdark] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("light");
        if (value !== null) {
          setdark(value);
        }
      } catch (e) {
        console.log("umm...");
      }
    };
    getData();
  }, []);

  matches = [];

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

  useEffect(() => {
    fetch(
      "https://www.thebluealliance.com/api/v3/event/2023njski/predictions",
      {
        headers: {
          "X-TBA-Auth-Key":
            "pn7EQlAcawiyWsJ1HpxNgNzvkJg0ajReJ75lPhiCj6FF3G34PEa0bHRiqGzQhRoR",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        //console.log(JSON.stringify(data))
      })
      .catch((error) => console.error(error));
  }, []);
  if (dark == true) {
    return (
      <Text
        style={{
          textAlign: "center",
          paddingTop: "50%",
          fontSize: 40,
          color: colorAccent,
        }}
      >
        Not Built yet...
      </Text>
    );
  } else {
    return (
      <View style={{ backgroundColor: "#080808", flex: 1 }}>
        <Text
          style={{
            textAlign: "center",
            fontSize: 40,
            paddingTop: "50%",
            color: colorAccent,
            backgroundColor: "#080808",
          }}
        >
          Not Built yet...
        </Text>
      </View>
    );
  }
}
/*
const styles = StyleSheet.create({
  
});
*/
