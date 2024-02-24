import {React, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import { TapGestureHandler } from 'react-native-gesture-handler';
import Checkbox from 'expo-checkbox';
import { Alert, Portal, Dialog, Button, Provider as PaperProvider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
const SCREEN_WIDTH = Dimensions.get('window').width;

export default function Auto({ navigation }) {
  const [overlayCoordinates, setOverlayCoordinates] = useState([]);
  const [left, setLeft] = useState(false);
  const [reload, setReload] = useState(false);
  const [tapEnabled, setTapEnabled] = useState(true);
  const [selectedOutcome, setSelectedOutcome] = useState(null);
  const [deviceSelectionVisible, setDeviceSelectionVisible] = useState(false);
  const [tappedCoordinates, setTappedCoordinates] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const updatedCoordinates = await AsyncStorage.getItem('Auto_Grid');
        if (updatedCoordinates == null) {
          setOverlayCoordinates([])
        }
        else {
          setOverlayCoordinates(JSON.parse(updatedCoordinates));
        }
      } catch (error) {
        // Handle errors if necessary
        console.error('Error fetching data:', error);
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
    setDeviceSelectionVisible(true);
  };

  const handleOutcome = (outcome) => {
    const { x, y } = tappedCoordinates;
    if (selectedOutcome == null) {
      setDeviceSelectionVisible(false);
      setSelectedDevice(null);
      setSelectedOutcome(null)
    }
    else {
      const newCoordinates = [...overlayCoordinates, { x, y, selectedOutcome, selectedDevice }];
      console.log(newCoordinates);
      setOverlayCoordinates(newCoordinates);
      setDeviceSelectionVisible(false);
      setSelectedDevice(null);
    }

  };

  const handleBack = () => {
    const updatedCoordinates = [...overlayCoordinates];
    updatedCoordinates.pop(); // Remove the last coordinate
    setOverlayCoordinates(updatedCoordinates);
    console.log('Undo button clicked. Updated coordinates:', updatedCoordinates);
  };

  const leave = async () => {
    navigation.navigate('Teleop');
console.log(reload)
console.log(left)

    try {
      await AsyncStorage.setItem("Auto_Grid", JSON.stringify(overlayCoordinates));
    } catch (e) {
      console.log("umm...");
    }
    try {
      await AsyncStorage.setItem("LeftAllianceauto", str(left));
    } catch (e) {
      console.log("umm...");
    }
    try {
      await AsyncStorage.setItem("ReloadAuto", str(reload));
    } catch (e) {
      console.log("umm...");
    }
  };

  const submitSelection = () => {
    // Access the tapped coordinates here
    const { x, y } = tappedCoordinates;
    // Do something with the coordinates
    console.log('Submitted:', { selectedOutcome, x, y });
  };

  return (
    <PaperProvider>
      <ScrollView>
      <View style={{backgroundColor: 'red', marginBottom: -20}}>
              <Text style={{fontSize: 30, textAlign: 'center'}}> Auto</Text>
            </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
          
        <TouchableOpacity onPress={() => setLeft(!left)}>
          
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
              value={left}
              onValueChange={setLeft}
              color={left ? '#4630EB' : undefined}
            />
            <Text style={{ fontSize: 20 }}>Left Alliance Zone</Text>
          </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setReload(!reload)}>
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
              value={reload}
              onValueChange={setReload}
              color={reload ? '#4630EB' : undefined}
            />
            <Text style={{ fontSize: 20 }}> Reload</Text>
          </View>
          </TouchableOpacity>

        </View>


        <View style={styles.imageContainer}>
          <Image source={require('./LeftField.png')} style={styles.image} />

          {/* Render multiple overlays for each coordinate */}
          {overlayCoordinates.map((coordinate, index) => (
            <View
              key={index}
              style={[
                styles.overlay,
                { left: coordinate.x, top: coordinate.y },
                coordinate.selectedOutcome === 'Success'
                  ? { backgroundColor: 'green' }
                  : coordinate.selectedOutcome === 'Failure'
                  ? { backgroundColor: 'red' }
                  : null,
              ]}
            >
              <Text style={styles.overlayText}>
              {coordinate.selectedOutcome === 'Success' ? '✅' : coordinate.selectedOutcome === 'failure' ? '❌' : 'X'}
              </Text>
            </View>
          )
          )

        }

          {/* Grid Tap Gesture Handler */}
          <TapGestureHandler onHandlerStateChange={handleTap}>
            <View style={styles.grid} />
          </TapGestureHandler>

          {/* Back Button */}
          <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'center' }} />
        </View>

        <Portal>
          <Dialog visible={deviceSelectionVisible} onDismiss={() => setDeviceSelectionVisible(false)}>
            <Dialog.Title>Select Outcome</Dialog.Title>
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
            <Text style={{ color: 'white' }}>Navigate to Teleop</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </PaperProvider>
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
