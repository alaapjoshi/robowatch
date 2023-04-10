import {React, useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();


export default function Analysis() {
    matches = [];
    const [myObject3, setMyObject3] = useState([]);  

    const [colorAccent, setColorAccent] = useState("#ff0303");
    this.forceUpdate
    useEffect(() => {
      const getData = async () => {
        try {
          const value = await AsyncStorage.getItem('color');
          if (value !== null) {
            setColorAccent(value.replace(/['"]+/g, ''));
          }
        } catch (e) {
          console.log("umm...")
        }
      }
    
      getData();
    }, [colorAccent]);

  useEffect(() => {
    fetch("https://www.thebluealliance.com/api/v3/event/2023njski/predictions", { headers: { 'X-TBA-Auth-Key': "pn7EQlAcawiyWsJ1HpxNgNzvkJg0ajReJ75lPhiCj6FF3G34PEa0bHRiqGzQhRoR" } })
      .then(response => response.json())
      .then(data => {
        //console.log(JSON.stringify(data))
      }).catch(error => console.error(error));
    }, []);

    return (
        <View>
          <TouchableOpacity style={{alignItems: 'center',backgroundColor: '#DDDDDD',padding: 10,}}onPress={null} >

          </TouchableOpacity>
            <Text>
                umm.... this page isn't built yet
                
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 4,
    paddingTop: 20,
    fontSize: 30,
    height: 150,
    backgroundColor: '#F5FCFF',
  },
  item: {
    backgroundColor: '#f9c2ff',
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
  backgroundColor: '#f2f2f2',
  borderRadius: 5,
  padding: 10,
  fontSize: 30,
  marginVertical: 5,
  marginHorizontal: 10,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.2,
  shadowRadius: 1,
  elevation: 2,
},
container23: {
  paddingHorizontal: 20,
  backgroundColor: '#FFFFFF',
},
name: {
  fontSize: 20,
  fontWeight: 'bold',
  color: '#FFA500',
  marginBottom: 10,
},
info: {
  fontSize: 20,
  color: '#ff0303',
  marginBottom: 10,
  paddingTop: 10
},
container3: {
  flex: 1,
  backgroundColor: '#ffffff',
  justifyContent: 'center',
  alignItems: 'center',
},
title2: {
  fontSize: 24,
  fontWeight: 'bold',
  color: '#020101',
  marginBottom: 10,
},
infoList: {
  paddingHorizontal: 20,
  paddingTop: 10,
  paddingBottom: 20,
},
infoItem: {
  backgroundColor: '#2D2D2D',
  borderRadius: 10,
  marginBottom: 10,
  paddingVertical: 20,
  paddingHorizontal: 25,
},
infoLabel: {
  color: '#BDBDBD',
  fontSize: 16,
  fontWeight: 'bold',
  marginBottom: 10,
},
infoValue: {
  color: '#FFFFFF',
  fontSize: 18,
},

container7: {
  flex: 1,
  backgroundColor: '#ffffff',
  alignItems: 'center',
  justifyContent: 'center',
  justifyContent: 'top',
},
logoContainer: {
  marginBottom: 60,
},
logoText: {
  fontSize: 50,
  fontWeight: 'bold',
  textAlignVertical: 'top',
  textAlign: 'center',
  paddingBottom: 0,
  color: '#ff0303',
},
subLogoText: {
  fontSize: 30,
  fontWeight: 'bold',
  textAlign: 'center',
  color: '#ff0303',
},
inputContainer: {
  marginHorizontal: 30,
  marginBottom: 40,
},
label: {
  fontSize: 30,
  marginBottom: 10,
  color: '#020101',
},
input: {
  fontSize: 18,
  paddingHorizontal: 15,
  paddingVertical: 10,
  borderRadius: 10,
  borderWidth: 1,
  borderColor: '#020101',
  color: '#020101',
},
container9: {
  flex: 1,
  backgroundColor: '#ffffff',
  alignItems: 'center',
  justifyContent: 'center'
},
noInternetContainer: {
  alignItems: 'center'
},
noInternetText: {
  color: '#ff0303',
  fontSize: 20,
  fontWeight: 'bold',
  marginBottom: 20
},
retryButton: {
  backgroundColor: '#020101',
  paddingHorizontal: 20,
  paddingVertical: 10,
  borderRadius: 10
},
retryButtonText: {
  color: '#ffffff',
  fontWeight: 'bold',
  fontSize: 16
},
button: {
  backgroundColor: '#ff0303',
  paddingHorizontal: 20,
  paddingVertical: 10,
  borderRadius: 10,
},
buttonText: {
  fontSize: 25,
  fontWeight: 'bold',
  color: '#ffffff',
},
subtitle2: {
  fontSize: 18,
  color: '#020101',
  marginBottom: 20,
},
button2: {
  backgroundColor: '#ff0303',
  padding: 15,
  borderRadius: 10,
},
buttonText2: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#ffffff',
},
itemText2: {
  fontSize: 40,
  fontWeight: 'bold',
},
itemText: {
  fontSize: 30,
  fontWeight: 'bold',
  color: '#ff0303',
},
item: {
  backgroundColor: '#FFEB3B',
  padding: 20,
  fontSize: 20,
  marginVertical: 8,
  marginHorizontal: 16,
  borderRadius: 5,
},
title: {
  fontSize: 30,
  fontWeight: 'bold',
},
subtitle: {
  fontSize: 16,
  color: "#666"
},
win: {
  backgroundColor: '#5DBB63',
},
lose: {
  backgroundColor: '#D0312D',
},
container2: {
  flex:1
},
gridItem: {
  flex: 1,
  height: 100,
  margin: 5,
},
map: {
  width: '100%',
  height: '100%',
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