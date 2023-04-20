import React, { useState, useEffect } from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();

const Matchover = () => {
  return (
    <NavigationContainer independent={true} initialRouteName="matches">
      <Stack.Navigator>
        <Stack.Screen
          name="matches"
          component={Matches}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Rankings"
          component={Rank}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Matchover;
function Matches() {
  const navigation = useNavigation();
  const [events, setEvents] = useState([]);
  const [colorAccent, setColorAccent] = useState("#ff0303");

  const [district, setdistrict] = useState("fma");
  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("district");
        if (value !== null) {
          setdistrict(value.replace(/['"]+/g, ""));
        }
      } catch (e) {
        console.log("umm...");
      }
    };
    getData();
  }, []);

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
      "https://www.thebluealliance.com/api/v3/district/2023" +
        district +
        "/events",
      {
        headers: {
          "X-TBA-Auth-Key":
            "pn7EQlAcawiyWsJ1HpxNgNzvkJg0ajReJ75lPhiCj6FF3G34PEa0bHRiqGzQhRoR",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // Sort events by newest first
        const sortedEvents = data.sort((a, b) => b.start_date > a.start_date);
        setEvents(sortedEvents);
      })
      .catch((error) => console.error(error));
  }, []);
  const handleEventPress = (eventKey) => {
    navigation.navigate("Rankings", { eventKey });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={{ padding: 10 }}
      onPress={() => handleEventPress(item.key)}
    >
      <Text style={{ fontSize: 16, fontWeight: "bold", color: colorAccent }}>
        {item.name}
      </Text>
      <Text style={{ fontSize: 12, color: "#000000" }}>
        {item.location_name}
      </Text>
      <Text style={{ fontSize: 12, color: "#000000" }}>
        {item.start_date} - {item.end_date}
      </Text>
    </TouchableOpacity>
  );
  return (
    <FlatList
      data={events}
      renderItem={renderItem}
      keyExtractor={(item) => item.key}
      style={{ backgroundColor: "#FFFFFF" }}
    />
  );
}

function Rank({ route }) {
  const { eventKey } = route.params;
  const [colorAccent, setColorAccent] = useState();
  const [final, setfinal] = useState([]);

  const ran = [];
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
      "https://www.thebluealliance.com/api/v3/event/" + eventKey + "/rankings",
      {
        headers: {
          "X-TBA-Auth-Key":
            "pn7EQlAcawiyWsJ1HpxNgNzvkJg0ajReJ75lPhiCj6FF3G34PEa0bHRiqGzQhRoR",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        for (let i = 1; i < Object.keys(data.rankings).length + 1; i++) {
          fetch(
            "https://www.thebluealliance.com/api/v3/team/" +
              data.rankings[i - 1].team_key,
            {
              headers: {
                "X-TBA-Auth-Key":
                  "pn7EQlAcawiyWsJ1HpxNgNzvkJg0ajReJ75lPhiCj6FF3G34PEa0bHRiqGzQhRoR",
              },
            }
          )
            .then((response) => response.json())
            .then((data) => {
              ran.push(data.nickname);
              setfinal(ran);
            })
            .catch((error) => console.error(error));
        }
      })

      .catch((error) => console.error(error));
  }, []);

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.item}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            marginLeft: 5,
            color: colorAccent,
          }}
        >
          {index + 1}.
        </Text>
        <Text style={styles.itemText}>{item}</Text>
      </View>
    );
  };
  return (
    <>
      <FlatList
        data={final}
        renderItem={renderItem}
        keyExtractor={(item) => item}
      />
    </>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 10,
  },
  itemText: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 5,
  },
  text: {
    color: "white",
    fontWeight: "bold",
  },
});
