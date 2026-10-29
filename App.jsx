import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { React, useEffect, useState } from "react";
import {
  Button,
  Dimensions,
  FlatList,
  LogBox,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import AnimatedSplash from "react-native-animated-splash-screen";
import Analysis from "./analysis/analysis";
import Navigatescout from "./scouting/navigatescout";
import SettingsScreen from "./settings/settings";
const Tab = createBottomTabNavigator();
LogBox.ignoreLogs(["Warning: ..."]);
LogBox.ignoreAllLogs();
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

import Navigate from "./TBA/navigate";
import { TBA_API_KEY } from "./config";
const Stack = createStackNavigator();
function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Nav"
        component={Nav}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Analysis" component={Analysis} />
      <Stack.Screen
        name="The Red Alliance"
        component={Navigate}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="New" component={New} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [loading2, setLoading2] = useState(false);
  setTimeout(() => {
    setLoading2(true);
  }, 1000);
  return (
    <AnimatedSplash
      translucent={true}
      isLoaded={loading2}
      logoImage={require("./assets/splash.png")}
      backgroundColor={"#FFFFFF"}
      logoHeight={windowHeight}
      logoWidth={windowWidth}
      AnimatedSplash
    >
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </AnimatedSplash>
  );
}
var dict = new Object();

function New({ route, navigation }) {
  const { team } = route.params;
  const teamKey = TBA_API_KEY;
  const endpoint =
    "https://www.thebluealliance.com/api/v3/team/" + team + "/events";
  const endpoint2 = "https://www.thebluealliance.com/api/v3/team/" + team;
  const [myObject3, setMyObject3] = useState([]);

  const matchList = [];
  const keyList = [];
  const [data, setData] = useState([]);
  let data2 = [];

  useEffect(() => {
    fetch(endpoint2, { headers: { "X-TBA-Auth-Key": teamKey } })
      .then((response) => response.json())
      .then((data) => {
        const send = {
          city: data.city,
          sponsers: data.name,
          Name: data.nickname,
          team_number: data.team_number,
          School_Name: data.school_name,
          State: data.state_prov,
          rookie_year: data.rookie_year,
        };
        data2.push(send);
        setMyObject3(send);
      })
      .catch((error) => console.error(error));
    fetch(endpoint, { headers: { "X-TBA-Auth-Key": teamKey } })
      .then((response) => response.json())
      .then((data) => {
        const parsedData = JSON.stringify(data);
        const asd = JSON.parse(parsedData);
        const size = data.length;
        for (let i = 0; i < size; i++) {
          if (asd[i].year == "2023") {
            matchList.push(data[i].name);
            keyList.push(data[i].key);
            dict[data[i].name] = data[i].key;
          }
        }
        setData(matchList);
      })
      .catch((error) => console.error(error));
  }, []);
  const NoMatchesFound = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#EAEAEA",
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: "bold", color: "#222222" }}>
          No Matches found!
        </Text>
      </View>
    );
  };
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() =>
        navigation.navigate("Graph", {
          match: item,
          team: team,
        })
      }
    >
      <Text style={styles.itemText}>{item}</Text>
    </TouchableOpacity>
  );
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <View style={{ backgroundColor: "#D3D3D3", padding: 20 }}>
        <Text
          style={{
            color: "#ff0303",
            fontSize: 30,
            fontWeight: "bold",
            marginBottom: 10,
          }}
        >
          {myObject3.Name}
        </Text>
        <View style={{ flexDirection: "row", marginBottom: 5 }}>
          <Text
            style={{
              color: "#ff0303",
              fontSize: 16,
              fontWeight: "bold",
              marginRight: 10,
            }}
          >
            Team Number:
          </Text>
          <Text style={{ color: "#ff0303", fontSize: 16 }}>
            {myObject3.team_number}
          </Text>
        </View>
        <View style={{ flexDirection: "row", marginBottom: 5 }}>
          <Text
            style={{
              color: "#ff0303",
              fontSize: 16,
              fontWeight: "bold",
              marginRight: 10,
            }}
          >
            School Name:
          </Text>
          <Text style={{ color: "#ff0303", fontSize: 16 }}>
            {myObject3.School_Name}
          </Text>
        </View>
        <View style={{ flexDirection: "row", marginBottom: 5 }}>
          <Text
            style={{
              color: "#ff0303",
              fontSize: 16,
              fontWeight: "bold",
              marginRight: 10,
            }}
          >
            Location:
          </Text>
          <Text style={{ color: "#ff0303", fontSize: 16 }}>
            {myObject3.city}, {myObject3.State}
          </Text>
        </View>
        <View style={{ flexDirection: "row", marginBottom: 5 }}>
          <Text
            style={{
              color: "#ff0303",
              fontSize: 16,
              fontWeight: "bold",
              marginRight: 10,
            }}
          >
            Rookie Year:
          </Text>
          <Text style={{ color: "#ff0303", fontSize: 16 }}>
            {myObject3.rookie_year}
          </Text>
        </View>
        <View style={{ flexDirection: "row", marginBottom: 5 }}>
          <Text
            style={{
              color: "#ff0303",
              fontSize: 16,
              fontWeight: "bold",
              marginRight: 10,
            }}
          >
            Sponsors:
          </Text>
          <Text style={{ color: "#ff0303", fontSize: 16 }}>
            {myObject3.sponsers}
          </Text>
        </View>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        style={{ backgroundColor: "#F5F5F5" }}
      />

      <Button
        title="Go to Analysis"
        color="#FFA500"
        onPress={() => navigation.navigate("analysis")}
      />
    </ScrollView>
  );
}

function HomeScreen({ navigation }) {
  const [text, onChangeText] = useState();
  const [team, setTeam] = useState("");
  const handlePress = () => {
    if (team.trim() !== "") {
      navigation.navigate("New", { team });
    }
  };

  const NoInternetPage = () => {
    const [isConnected, setIsConnected] = useState(true);

    useEffect(() => {
      const checkConnection = async () => {
        try {
          const response = await fetch(
            "https://www.thebluealliance.com/api/v3/status",
            {
              headers: { "X-TBA-Auth-Key": TBA_API_KEY },
            }
          );
          const json = await response.json();
          setIsConnected(true);
        } catch (error) {
          setIsConnected(false);
        }
      };
      checkConnection();
    }, []);

    const handleRetryPress = () => {
      setIsConnected(true);
    };

    return (
      <View style={styles.container9}>
        {!isConnected && (
          <View style={styles.noInternetContainer}>
            <Text style={styles.noInternetText}>No Internet Connection</Text>
            <TouchableOpacity
              style={styles.retryButton}
              onPress={handleRetryPress}
            >
              <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };
  return (
    <>
      <View style={styles.container7}>
        <View style={styles.logoContainer}>
          <Ionicons
            name={"glasses-outline"}
            color="red"
            size={120}
            style={{ textAlign: "center", marginTop: 40 }}
          />

          <Text style={styles.logoText}>The Red Alliance</Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Enter a team number:</Text>
          <TextInput
            style={styles.input}
            value={team}
            onChangeText={setTeam}
            placeholder="e.g. 75"
            placeholderTextColor="#b2b2b2"
            autoCorrect={false}
            autoCapitalize="words"
            clearButtonMode="while-editing"
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("New", { team: "frc" + team })}
        >
          <Text style={styles.buttonText}>Go to Matches</Text>
        </TouchableOpacity>
        <Text style={styles.subLogoText}>{"\n"} Presented by Team75</Text>
      </View>
    </>
  );
}
function Nav() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Scouting"
        component={Navigatescout}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="clipboard-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="TBA"
        component={Navigate}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="globe-outline" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Analysis"
        component={Analysis}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="game-controller-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />


    </Tab.Navigator>
  );
}

function ProfileScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        title="Go to Notifications"
        onPress={() => navigation.navigate("Notifications")}
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        title="Go to Settings"
        onPress={() => navigation.navigate("settings")}
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 4,
    paddingTop: 20,
    fontSize: 30,
    height: 150,
    backgroundColor: "#F5FCFF",
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    fontSize: 30,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  itemContainer: {
    backgroundColor: "#f2f2f2",
    borderRadius: 5,
    padding: 10,
    fontSize: 30,
    marginVertical: 5,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  container23: {
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFA500",
    marginBottom: 10,
  },
  info: {
    fontSize: 20,
    color: "#ff0303",
    marginBottom: 10,
    paddingTop: 10,
  },
  container3: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
  title2: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#020101",
    marginBottom: 10,
  },
  infoList: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  infoItem: {
    backgroundColor: "#2D2D2D",
    borderRadius: 10,
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 25,
  },
  infoLabel: {
    color: "#BDBDBD",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  infoValue: {
    color: "#FFFFFF",
    fontSize: 18,
  },

  container7: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    justifyContent: "top",
  },
  logoContainer: {
    marginBottom: 60,
  },
  logoText: {
    fontSize: 50,
    fontWeight: "bold",
    textAlignVertical: "top",
    textAlign: "center",
    paddingBottom: 0,
    color: "#ff0303",
  },
  subLogoText: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "#ff0303",
  },
  inputContainer: {
    marginHorizontal: 30,
    marginBottom: 40,
  },
  label: {
    fontSize: 30,
    marginBottom: 10,
    color: "#020101",
  },
  input: {
    fontSize: 18,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#020101",
    color: "#020101",
  },
  container9: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  noInternetContainer: {
    alignItems: "center",
  },
  noInternetText: {
    color: "#ff0303",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: "#020101",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  retryButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#ff0303",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#ffffff",
  },
  subtitle2: {
    fontSize: 18,
    color: "#020101",
    marginBottom: 20,
  },
  button2: {
    backgroundColor: "#ff0303",
    padding: 15,
    borderRadius: 10,
  },
  buttonText2: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
  itemText2: {
    fontSize: 40,
    fontWeight: "bold",
  },
  itemText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#ff0303",
  },
  item: {
    backgroundColor: "#FFEB3B",
    padding: 20,
    fontSize: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
  win: {
    backgroundColor: "#5DBB63",
  },
  lose: {
    backgroundColor: "#D0312D",
  },
  container2: {
    flex: 1,
  },
  gridItem: {
    flex: 1,
    height: 100,
    margin: 5,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: "center",
  },
  gridItem: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
    margin: 2,
  },
  gridText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  cone: {
    backgroundColor: "yellow",
    height: 30,
    width: 30,
  },
  cube: {
    backgroundColor: "purple",
    height: 30,
    width: 30,
  },
});
