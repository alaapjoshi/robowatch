import React, { useState, useEffect } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import { TapGestureHandler } from "react-native-gesture-handler";
import Checkbox from "expo-checkbox";
import { Alert, Portal, Dialog, Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GestureRecognizer, { swipeDirections } from "react-native-swipe-gestures";
const SCREEN_WIDTH = Dimensions.get("window").width;

export default function Teleop({ navigation }) {
  const [overlayCoordinates, setOverlayCoordinates] = useState([]);
  const [cooperttion, setcoopertition] = useState(false);
  const [relocated, setRelocated] = useState(false);
  const [tapEnabled, setTapEnabled] = useState(true);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [selectedpickup, setselectedpickup] = useState(null);
  const [selectedOutcome, setSelectedOutcome] = useState(null);
  const [outcomeDialogVisible, setOutcomeDialogVisible] = useState(false);
  const [tappedCoordinates, setTappedCoordinates] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const updatedCoordinates = await AsyncStorage.getItem("Teleop_Grid");
        if (updatedCoordinates == null) {
          setOverlayCoordinates([]);
        } else {
          setOverlayCoordinates(JSON.parse(updatedCoordinates));
        }
      } catch (error) {
        // Handle errors if necessary
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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

    // Store tapped coordinates
    setTappedCoordinates({ x, y });

    // Show device selection alert when tapping on the grid
    showDeviceSelectionAlert();
  };

  const showDeviceSelectionAlert = () => {
    setOutcomeDialogVisible(true);
  };

  const handleOutcome = () => {
    const { x, y } = tappedCoordinates;
    if (selectedDevice == null) {
      setOutcomeDialogVisible(false);
      console.log({ x, y, outcome: selectedOutcome, device: selectedDevice, pickup: selectedpickup });
      // Reset choices after submission
      setSelectedDevice(null);
      setselectedpickup(null);
      setSelectedOutcome(null);
      setOutcomeDialogVisible(false);
    } else {
      const newCoordinates = [...overlayCoordinates, { x, y, outcome: selectedOutcome, device: selectedDevice, pickup: selectedpickup }];
      console.log({ x, y, outcome: selectedOutcome, device: selectedDevice, pickup: selectedpickup });
      setOverlayCoordinates(newCoordinates);
      setOutcomeDialogVisible(false);
      // Reset choices after submission
      setSelectedDevice(null);
      setselectedpickup(null);
      setSelectedOutcome(null);
    }
  };

  const handleBack = () => {
    const updatedCoordinates = [...overlayCoordinates];
    updatedCoordinates.pop(); // Remove the last coordinate
    setOverlayCoordinates(updatedCoordinates);
    console.log('Undo button clicked. Updated coordinates:', updatedCoordinates);
  };

  const leave = async () => {
    navigation.navigate("Endgame");
    try {
      await AsyncStorage.setItem("Teleop_Grid", JSON.stringify(overlayCoordinates));
    } catch (e) {
      console.log("umm...");
    }

    try {
      await AsyncStorage.setItem("coopertitionbonus", cooperttion.toString());
    } catch (e) {
      console.log("umm...");
    }
    try {
      await AsyncStorage.setItem("Relocatedtele", relocated.toString());
    } catch (e) {
      console.log("umm...");
    }
  };

  const submitSelection = () => {
    // Access the tapped coordinates here
    const { x, y } = tappedCoordinates;
    // Do something with the coordinates
    console.log('Submitted:', { selectedDevice, selectedOutcome, x, y });
  };

  const onSwipeRight = () => {
    navigation.navigate("Endgame");
  };
  const onSwipeDown = () => {
    navigation.navigate("Endgame");
  };

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };

  return (
    <GestureRecognizer
      onSwipeRight={onSwipeRight}
      onSwipeDown={onSwipeDown}
      config={config}
      style={{ flex: 1 }}
    >
      <PaperProvider>
        <ScrollView>
        <View style={{backgroundColor: 'red', marginBottom: -20}}>
              <Text style={{fontSize: 30, textAlign: 'center'}}> Teleop</Text>
            </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 10 }}>
          <TouchableOpacity onPress={() => setcoopertition(!cooperttion)}>

            <View
              style={{
                backgroundColor: 'red',
                padding: 20,
                borderRadius: 20,
                marginTop: 40,
                flexDirection: 'row',
              }}
            >
              <Checkbox
                style={{ width: 20, height: 20, marginHorizontal: 10 }}
                value={cooperttion}
                onValueChange={setcoopertition}
                color={cooperttion ? '#4630EB' : undefined}
              />
              <Text style={{ fontSize: 15 }}>Coopertition Bonus</Text>
            </View>
            </TouchableOpacity>


          </View>

          <View style={styles.imageContainer}>
            <Image
              source={require('./LeftField.png')}
              style={styles.image}
            />

            {/* Render multiple overlays for each coordinate */}
            {overlayCoordinates.map((coordinate, index) => (
              <View
                key={index}
                style={[
                  styles.overlay,
                  { left: coordinate.x, top: coordinate.y },
                  coordinate.outcome === 'Success'
                    ? { backgroundColor: 'green' }
                    : coordinate.outcome === 'Failure'
                    ? { backgroundColor: 'red' }
                    : null,
                ]}
              >
                <Text style={styles.overlayText}>
                {coordinate.outcome === 'Success' ? '✅' : coordinate.outcome === 'failure' ? '❌' : 'X'}
                </Text>
              </View>))}

            {/* Grid Tap Gesture Handler */}
            <TapGestureHandler onHandlerStateChange={handleTap}>
              <View style={styles.grid} />
            </TapGestureHandler>

            {/* Back Button */}
            <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'center' }} />
          </View>

          <Portal>
            <Dialog visible={outcomeDialogVisible} onDismiss={() => setOutcomeDialogVisible(false)}>
              <Dialog.Title>Select Device and Outcome</Dialog.Title>
              <Dialog.Content>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                  <Button
                    onPress={() => setSelectedDevice('Amp')}
                    mode={selectedDevice === 'Amp' ? 'contained' : 'outlined'}
                  >
                    Amp
                  </Button>
                  <Button
                    onPress={() => setSelectedDevice('Speaker')}
                    mode={selectedDevice === 'Speaker' ? 'contained' : 'outlined'}
                  >
                    Speaker
                  </Button>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10 }}>
                  <Button
                    onPress={() => setSelectedOutcome('Success')}
                    mode={selectedOutcome === 'Success' ? 'contained' : 'outlined'}
                  >
                    Success
                  </Button>
                  <Button
                    onPress={() => setSelectedOutcome('Failure')}
                    mode={selectedOutcome === 'Failure' ? 'contained' : 'outlined'}
                  >
                    Failure
                  </Button>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10 }}>
                  <Button
                    onPress={() => setselectedpickup('Source')}
                    mode={selectedpickup === 'Source' ? 'contained' : 'outlined'}
                  >
                    Source
                  </Button>
                  <Button
                    onPress={() => setselectedpickup('Ground')}
                    mode={selectedpickup === 'Ground' ? 'contained' : 'outlined'}
                  >
                    Ground
                  </Button>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                  <Button onPress={() => handleOutcome()} mode="contained">
                    Submit
                  </Button>
                </View>
              </Dialog.Content>
            </Dialog>
          </Portal>

          <View style={{ flexDirection: 'row', alignContent: 'center', justifyContent: 'center' }}>
            <TouchableOpacity style={styles.backButton3} onPress={() => handleBack()}>
              <Text style={{ color: 'white' }}>Undo</Text>
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'row', alignContent: 'center', justifyContent: 'center' }}>
            <TouchableOpacity style={styles.backButton2} onPress={() => leave()}>
              <Text style={{ color: 'white' }}>Navigate to Endgame</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </PaperProvider>
    </GestureRecognizer>
  );
}

const styles = StyleSheet.create({
  // ... Your existing styles

  imageContainer: {
    position: 'relative',
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH,
  },
  grid: {
    position: 'absolute',
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH,
    backgroundColor: 'transparent',
  },
  overlay: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  overlayText: {
    color: 'white',
    fontSize: 14,
  },
  backButton2: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginVertical: 20,
    alignSelf: 'center',
  },
  backButton3: {
    backgroundColor: '#0000FF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginVertical: 20,
    alignSelf: 'center',
  },
  image: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH,
    resizeMode: 'cover',
    transform: [{ rotate: '90deg' }],
  },
});
