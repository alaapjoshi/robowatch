import React, { useState, useEffect } from 'react';
import { FlatList, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ScrollView } from 'react-native-gesture-handler';

const Stack = createStackNavigator();


const Matchover = () => {
    return (
      <NavigationContainer independent={true}>
        <Stack.Navigator >
          <Stack.Screen name="matches" component={matches}options={{ headerShown: false }}/>
          <Stack.Screen name="Rankings" component={rank} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  };
  export default Matchover;

function rank({ route })  {
const { eventKey } = route.params;
const [rankings, setRankings] = useState();
const [test, settest] = useState();

const ran = [];

useEffect(() => {
    fetch('https://www.thebluealliance.com/api/v3/event/' + eventKey + "/rankings",{ headers: { 'X-TBA-Auth-Key': "pn7EQlAcawiyWsJ1HpxNgNzvkJg0ajReJ75lPhiCj6FF3G34PEa0bHRiqGzQhRoR" } })
    .then(response => response.json())
      .then(data => {
        for (let i = 1; i < Object.keys(data.rankings).length +1; i++) {
            fetch("https://www.thebluealliance.com/api/v3/team/" + data.rankings[i - 1].team_key,{ headers: { 'X-TBA-Auth-Key': "pn7EQlAcawiyWsJ1HpxNgNzvkJg0ajReJ75lPhiCj6FF3G34PEa0bHRiqGzQhRoR" } })
            .then(response => response.json())
            .then(data => {
                ran.push(data.nickname)
            })
            .catch(error => console.error(error));

        }
        
      })
      
      .catch(error => console.error(error));
  }, 
  
  []);

  const renderItem = ({ item, index }) => (
    <View style={styles.item}>
      <Text style={[styles.itemText, { color: '#FF4136' }]}>
        {index + 1}.
      </Text>
      <Text style={styles.itemText}>
        {item}
      </Text>
    </View>
  );
    return (
      <FlatList
      data={ran}
      renderItem={renderItem}
      keyExtractor={(item) => item}
    />

    )
}
function matches() {
  const navigation = useNavigation();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('https://www.thebluealliance.com/api/v3/district/2023fma/events',{ headers: { 'X-TBA-Auth-Key': "pn7EQlAcawiyWsJ1HpxNgNzvkJg0ajReJ75lPhiCj6FF3G34PEa0bHRiqGzQhRoR" } })
    .then(response => response.json())
      .then(data => {
        // Sort events by newest first
        const sortedEvents = data.sort((a, b) => b.start_date > a.start_date);
        setEvents(sortedEvents);
      })
      .catch(error => console.error(error));
  }, []);

  const handleEventPress = (eventKey) => {
    navigation.navigate('Rankings', { eventKey });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={{ padding: 10 }} onPress={() => handleEventPress(item.key)}>
      <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#fff' }}>{item.name}</Text>
      <Text style={{ fontSize: 12, color: '#999' }}>{item.location_name}</Text>
      <Text style={{ fontSize: 12, color: '#999' }}>{item.start_date} - {item.end_date}</Text>
    </TouchableOpacity>
  );
  return (
    <ScrollView style={{backgroundColor: '#333'}}>
      <FlatList
        data={events}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        style={{ backgroundColor: '#333' }}
      />

    </ScrollView>
  );
};
const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        marginVertical: 10,
      },
      itemText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 5,
      },
  });