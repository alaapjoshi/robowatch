import {React, useState, useEffect} from 'react';
import {
  Alert,
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
  Button,
  Text,
  FlatList,
  SafeAreaView
} from 'react-native';

import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

function Details({ route }) {
  const { name } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Text>Name: {name}</Text>
    </View>
  );
}

export default function New()  {  

    const teamKey = "pn7EQlAcawiyWsJ1HpxNgNzvkJg0ajReJ75lPhiCj6FF3G34PEa0bHRiqGzQhRoR";
    const endpoint = "https://www.thebluealliance.com/api/v3/team/frc75/events";
    const controller = new AbortController();
    const signal = controller.signal;
    const [products, setProducts] = useState([]);
    var dict = new Object();
    const matchList = [];
    const keyList = [];

    const [data, setData] = useState([]);
    const [message, setMessage] = useState('');
    const goToMessageScreen = () => {
      navigation.navigate('check', {
        message,
      });
    };
    fetch(endpoint, { headers: { 'X-TBA-Auth-Key': teamKey } })
    .then(response => response.json())
    .then(data => {
      const parsedData = JSON.stringify(data);
      const asd = JSON.parse(parsedData);
      const size = data.length;
      for (let i = 0; i < size; i++) {
        if (asd[i].year == "2023") {
            matchList.push(data[i].name);
            keyList.push(data[i].key)
            dict[data[i].name] = data[i].key;
        }
      }
      setData(matchList);
    
    }).catch(error => console.error(error));

  const renderItem = ({ item , navigation}) => (
      <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('Profile', {name: 'Jane'})}>
        <Text style={styles.itemText}>{item}</Text>
     </TouchableOpacity>
  );
  return (
    <>
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      style={styles.container}
    />
      
    </>

  );
};
const ProfileScreen = ({navigation, route}) => {
  return <Text>This is {route.params.name}'s profile</Text>;
};




const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5FCFF',
    },
    chart: {
      marginVertical: 8,
      borderRadius: 16,
    },

  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  itemContainer: {
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  });