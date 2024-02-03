import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
  ScrollView,
} from "react-native";
import { TapGestureHandler } from "react-native-gesture-handler";
import Checkbox from "expo-checkbox";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function Auto({ navigation }) {
  const [overlayCoordinates, setOverlayCoordinates] = useState([]);
  const [left, setLeft] = useState(true);
  const [relocated, setRelocated] = useState(true);
  const [tapEnabled, setTapEnabled] = useState(true);

  const handleTap = (event) => {
    if (!tapEnabled) {
      return;
    }

    const { x, y } = event.nativeEvent;

    // Disable tapping for 0.5 seconds
    setTapEnabled(false);
    setTimeout(() => {
      setTapEnabled(true);
    }, 500);

    // Show alert when tapping on the grid
    showAlert({ x, y });
  };

  const showAlert = ({ x, y }) => {
    Alert.alert(
      "Choose an outcome",
      "",
      [
        {
          text: "Success",
          onPress: () => handleOutcome("success", x, y),
        },
        {
          text: "Failure",
          onPress: () => handleOutcome("failure", x, y),
        },
        {
          text: "Back",
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  };

  const handleOutcome = (outcome, x, y) => {
    const newCoordinates = [...overlayCoordinates, { x, y, outcome }];
    setOverlayCoordinates(newCoordinates);
  };

  const handleBack = () => {
    const updatedCoordinates = [...overlayCoordinates];
    updatedCoordinates.pop(); // Remove the last coordinate
    setOverlayCoordinates(updatedCoordinates);
    console.log("Undo button clicked. Updated coordinates:", updatedCoordinates);
  };
  

  const leave = () => {
    navigation.navigate("Teleop");
  };

  return (
    <ScrollView>
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <View
          style={{
            backgroundColor: "red",
            padding: 20,
            borderRadius: 20,
            marginTop: 40,
            flexDirection: "row",
          }}
        >
          <Checkbox
            style={{ width: 20, height: 20, marginHorizontal: 10 }}
            value={left}
            onValueChange={setLeft}
            color={left ? "#4630EB" : undefined}
          />
          <Text style={{ fontSize: 20 }}>Left Alliance Zone</Text>
        </View>
        <View
          style={{
            backgroundColor: "red",
            padding: 20,
            borderRadius: 20,
            marginTop: 40,
            flexDirection: "row",
          }}
        >
          <Checkbox
            style={{ width: 20, height: 20, marginHorizontal: 10 }}
            value={relocated}
            onValueChange={setRelocated}
            color={relocated ? "#4630EB" : undefined}
          />
          <Text style={{ fontSize: 20 }}>Relocated</Text>
        </View>
      </View>

      <View style={styles.imageContainer}>
        <Image
          source={require("./LeftField.png")}
          style={styles.image}
        />

        {/* Render multiple overlays for each coordinate */}
        {overlayCoordinates.map((coordinate, index) => (
          <View
            key={index}
            style={[
              styles.overlay,
              { left: coordinate.x, top: coordinate.y },
              coordinate.outcome === "success"
                ? { backgroundColor: "green" }
                : coordinate.outcome === "failure"
                ? { backgroundColor: "red" }
                : null,
            ]}
          >
            <Text style={styles.overlayText}>
              {coordinate.outcome === "success"
                ? "✅"
                : coordinate.outcome === "failure"
                ? "❌"
                : "X"}
            </Text>
          </View>
        ))}

        {/* Grid Tap Gesture Handler */}
        <TapGestureHandler onHandlerStateChange={handleTap}>
          <View style={styles.grid} />
        </TapGestureHandler>

        {/* Back Button */}
        <View style={{ flexDirection: "row", marginTop: 20, justifyContent: 'center'}}/>

          </View>

          <View style={{ flexDirection: "row", alignContent: 'center',justifyContent: 'center',
 }}>
        <TouchableOpacity style={styles.backButton3} onPress={() => handleBack()}>
          <Text style={{ color: "white" }}>Undo</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: "row", alignContent: 'center',justifyContent: 'center',
 }}>
        <TouchableOpacity style={styles.backButton2} onPress={() => leave()}>
          <Text style={{ color: "white" }}>Navigate to Final</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // ... Your existing styles

  imageContainer: {
    position: "relative",
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH,
  },
  grid: {
    position: "absolute",
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH,
    backgroundColor: "transparent",
  },
  overlay: {
    position: "absolute",
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
  },
  overlayText: {
    color: "white",
    fontSize: 14,
  },
  backButton: {
    position: "absolute",
    left: "50%",
    transform: [{ translateX: -50 }],
    backgroundColor: "blue",
    paddingHorizontal: 30,
    paddingVertical: 20,
    borderRadius: 5,
    zIndex: 3, // Set a higher zIndex
  },
  
  backButton2: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginVertical: 20,
    alignSelf: "center",
  },
  backButton3: {
    backgroundColor: "#0000FF",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginVertical: 20,
    alignSelf: "center",
  },
  backButtonText: {
    color: "white",
  },
  image: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH,
    resizeMode: "cover",
    transform: [{ rotate: "90deg" }],
  },
});
