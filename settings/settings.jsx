import { React, useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  TextInput,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dev from "./dev";

export default function SettingsScreen() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Set">
        <Stack.Screen
          name="Set"
          component={Set}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Dev" component={Dev} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
function Set({ navigation }) {
  const [isEnabled, setIsEnabled] = useState();
  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("light");
        if (value !== null) {
          setIsEnabled(Boolean(value));
        }
      } catch (e) {
        console.error("Failed to load 'light' from device storage:", e);
      }
    };
    getData();
  }, []);

  const [colorAccent, setColorAccent] = useState("#ff0303");
  const [teamNumber, setTeamNumber] = useState("75");

  const [DistrictNumber, setDistrictNumber] = useState("");
  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("district");
        if (value === null) {
          setDistrictNumber("fma");
        } else {
          setDistrictNumber(JSON.stringify(value));
        }
      } catch (e) {
        console.error("Failed to load 'district' from device storage:", e);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("color");
        if (value !== null) {
          setColorAccent(value);
        }
      } catch (e) {
        console.error("Failed to load 'color' from device storage:", e);
      }
    };
    getData();
  }, []);

  const storeColor = async (value) => {
    setColorAccent(value);
    try {
      await AsyncStorage.setItem("color", JSON.stringify(value));
    } catch (e) {
      console.error("Failed to save 'color' to device storage:", e);
    }
  };

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const handleTeamNumberChange = (number) => {
    setTeamNumber(number);
  };
  const saveTextInputValue = async (value) => {
    setDistrictNumber(value);
    try {
      await AsyncStorage.setItem("district", value.toLowerCase());
    } catch (e) {
      console.error("Failed to save 'district' to device storage:", e);
    }
  };
  const bruh = () => {
    null;
  };
  const toggleSwitch = async () => {
    setIsEnabled((previousState) => !previousState);
    try {
      await AsyncStorage.setItem("light", String(isEnabled));
    } catch (e) {
      console.error("Failed to save 'light' to device storage:", e);
    }
  };
  function saved() {
    return alert("Saved! Now close out the app and reload it to apply effects");
  }
  function handleNotificationsToggle() {
    if (notificationsEnabled == true) {
      setNotificationsEnabled(false);
    } else {
      setNotificationsEnabled(true);
    }
  }
  if (isEnabled == true) {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text
            style={{
              fontSize: 32,
              fontWeight: "bold",
              color: colorAccent,
              marginBottom: 20,
              textAlign: "center",
            }}
          >
            Settings
          </Text>
          <View style={styles.setting}>
            <View style={styles.setting}>
              <Text style={styles.settingLabel}>Team Number</Text>
              <TextInput
                style={styles.input}
                value={teamNumber}
                onChangeText={handleTeamNumberChange}
              />
            </View>
            <View style={styles.setting}>
              <Text style={styles.settingLabel}>District</Text>
              <TextInput
                style={styles.input}
                value={DistrictNumber}
                onChangeText={saveTextInputValue}
              />
            </View>

          </View>

          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              marginBottom: 40,
            }}
          >
            <Text style={styles.settingLabel}>Notifications</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={handleNotificationsToggle}
            />
          </View>
          <Text
            style={{
              fontSize: 18,
              textAlign: "center",
              fontWeight: "bold",
              color: "#808080",
              marginBottom: 20,
            }}
          >
            Light mode:
          </Text>

          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 40,
            }}
          >
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
        </View>

        <TouchableOpacity
          style={{
            padding: 10,
            borderRadius: 10,
            backgroundColor: colorAccent,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={null}
        >
          <Text style={styles.text}> Save Changes</Text>
        </TouchableOpacity>
        <Text style={styles.settingLabel}>
          Some settings require a manual refresh of the app
        </Text>
        <Text style={styles.settingLabel}>
          (Swipe out the app and open it again)
        </Text>
        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
            height: 30,
            backgroundColor: "#080808",
          }}
          onPress={() => null}
        >
        </TouchableOpacity>
      </ScrollView>
    );
  } else {
    return (
      <ScrollView>
      <View style={{ flex: 1, backgroundColor: "#080808", padding: 20 }}>
          <Text
            style={{
              fontSize: 32,
              fontWeight: "bold",
              color: colorAccent,
              marginBottom: 20,
              textAlign: "center",
            }}
          >
            Settings
          </Text>
          <View style={styles.setting}>
            <View style={styles.setting}>
              <Text
                style={{
                  fontSize: 18,
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "#FFFFFF",
                }}
              >
                Team Number
              </Text>
              <TextInput
                style={{
                  borderWidth: 2,
                  borderColor: "#FFFFFF",
                  borderRadius: 5,
                  padding: 10,
                  fontSize: 16,
                  color: "#FFFFFF",
                }}
                value={teamNumber}
                onChangeText={handleTeamNumberChange}
              />
            </View>
            <View style={styles.setting}>
              <Text
                style={{
                  fontSize: 18,
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "#FFFFFF",
                }}
              >
                District
              </Text>
              <TextInput
                style={{
                  borderWidth: 2,
                  borderColor: "#FFFFFF",
                  borderRadius: 5,
                  padding: 10,
                  fontSize: 16,
                  color: "#FFFFFF",
                }}
                value={DistrictNumber}
                onChangeText={saveTextInputValue}
              />
            </View>

          </View>

          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              marginBottom: 40,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                textAlign: "center",
                fontWeight: "bold",
                color: "#FFFFFF",
              }}
            >
              Notifications
            </Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={handleNotificationsToggle}
            />
          </View>
          {/*
          <Text
            style={{
              fontSize: 18,
              textAlign: "center",
              fontWeight: "bold",
              color: "#FFFFFF",
              marginBottom: 20,
            }}
          >
            Light mode:
          </Text>

          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 40,
            }}
          >
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
          */}

          <TouchableOpacity
            style={{
              padding: 10,
              borderRadius: 10,
              backgroundColor: colorAccent,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => bruh()}
          >
            <Text style={styles.text}> Save Changes</Text>
          </TouchableOpacity>
          <Text style={styles.settingLabel}>
            Some settings require a manual refresh of the app
          </Text>
          <Text style={styles.settingLabel}>
            (Swipe out the app and open it again)
          </Text> 
      </View>
              </ScrollView>

    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    padding: 20,
  },
  button: {
    padding: 10,
    borderRadius: 5,
  },
  text: {
    color: "white",
    fontWeight: "bold",
  },
  setting: {
    marginBottom: 20,
  },
  settingLabel: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
    color: "#808080",
  },
  colorPicker: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  colorOption: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  input: {
    borderWidth: 2,
    borderColor: "#808080",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    color: "#000000",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
