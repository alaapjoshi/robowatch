import {React, useState, useEffect} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  Button,
  ScrollView, 
  FlatList,
  ActivityIndicator,
  SafeAreaView
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import {Collapse,CollapseHeader, CollapseBody} from 'accordion-collapse-react-native';
import { Dimensions } from "react-native";
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();
import { Ionicons } from '@expo/vector-icons';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Stack = createStackNavigator();
var dict = new Object();

export default function Tra() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="The Red Alliance" component={MyStack} options={{ headerShown: false }} />
      <Stack.Screen name="New" component={New} options={{ headerShown: false }}  />
      <Stack.Screen name="Graph" component={Graph} options={{ headerShown: false }}  />
    </Stack.Navigator>
  );
  }

function MyStack({ navigation }) {
  const [team, setTeam] = useState('');
  const [colorAccent, setColorAccent] = useState();
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

    return (
      <>
       
    <View style={styles.container7}>
    <View style={styles.logoContainer}>
    <Ionicons name={'glasses-outline'} color= { colorAccent } size={120} style={{textAlign:'center', marginTop:40}} />
<Text style={{fontSize: 50,
  fontWeight: 'bold',
  textAlignVertical: 'top',
  textAlign: 'center',
  paddingBottom: 0,
  color: colorAccent,}}>RoboSense</Text>
    </View>
    <View style={styles.inputContainer}>
      <Text style={{fontSize: 30,marginBottom: 10,color: colorAccent,}}>Enter a team number:</Text>
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
    <TouchableOpacity style={{backgroundColor: colorAccent,paddingHorizontal: 20,paddingVertical: 10,borderRadius: 10,}} onPress={() => navigation.navigate('New',{ team: "frc" + team,
 })}>
      <Text style={{fontSize: 25,fontWeight: 'bold',color: '#ffffff',}}>Go to Matches</Text>
    </TouchableOpacity>
    <Text style={{fontSize: 30,fontWeight: 'bold',textAlign: 'center',color: colorAccent,}}>{"\n"} Presented by Team75</Text>

  </View>

  </>

  );
}

function New ({ route, navigation })  {
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
    const { team } = route.params;
    const endpoint = "https://www.thebluealliance.com/api/v3/team/" + team + "/events";
    const endpoint2 = "https://www.thebluealliance.com/api/v3/team/" + team;
    const [myObject3, setMyObject3] = useState([]);  
  
    const matchList = [];
    const keyList = [];
    const [data, setData] = useState([]);
    let data2 = [];
  
  
    useEffect(() => {
    fetch(endpoint2, { headers: { 'X-TBA-Auth-Key': "pn7EQlAcawiyWsJ1HpxNgNzvkJg0ajReJ75lPhiCj6FF3G34PEa0bHRiqGzQhRoR" } })
      .then(response => response.json())
      .then(data => {
        const send = {city: data.city, sponsers: data.name, Name: data.nickname, team_number: data.team_number, School_Name:data.school_name,State: data.state_prov, rookie_year: data.rookie_year };
        data2.push(send);
        setMyObject3(send);
      }).catch(error => console.error(error));
    fetch(endpoint, { headers: { 'X-TBA-Auth-Key': "pn7EQlAcawiyWsJ1HpxNgNzvkJg0ajReJ75lPhiCj6FF3G34PEa0bHRiqGzQhRoR" } })
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
  }, []);
  const renderItem = ({ item }) => (
      <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('Graph', {
        match: item,
        team: team,
      })}>
        <Text style={{fontSize: 30,
    fontWeight: 'bold',
    color: colorAccent,}}>{item}</Text>
    </TouchableOpacity>
  );
  return (
    <ScrollView style={{flex: 1, backgroundColor: "#FFFFFF"}}>
  
  <View style={{ backgroundColor: '#D3D3D3', padding: 20}}>
    <Text style={{ color: colorAccent, fontSize: 30, fontWeight: 'bold', marginBottom: 10 }}>{myObject3.Name}</Text>
    <View style={{ flexDirection: 'row', marginBottom: 5 }}>
      <Text style={{ color: colorAccent, fontSize: 16, fontWeight: 'bold', marginRight: 10 }}>Team Number:</Text>
      <Text style={{ color: colorAccent, fontSize: 16 }}>{myObject3.team_number}</Text>
    </View>
    <View style={{ flexDirection: 'row', marginBottom: 5 }}>
      <Text style={{ color: colorAccent, fontSize: 16, fontWeight: 'bold', marginRight: 10 }}>School Name:</Text>
      <Text style={{ color: colorAccent, fontSize: 16 }}>{myObject3.School_Name}</Text>
    </View>
    <View style={{ flexDirection: 'row', marginBottom: 5 }}>
      <Text style={{ color: colorAccent, fontSize: 16, fontWeight: 'bold', marginRight: 10 }}>Location:</Text>
      <Text style={{ color: colorAccent, fontSize: 16 }}>{myObject3.city}, {myObject3.State}</Text>
    </View>
    <View style={{ flexDirection: 'row', marginBottom: 5 }}>
      <Text style={{ color: colorAccent, fontSize: 16, fontWeight: 'bold', marginRight: 10 }}>Rookie Year:</Text>
      <Text style={{ color: colorAccent, fontSize: 16 }}>{myObject3.rookie_year}</Text>
    </View>
    <View style={{ flexDirection: 'row', marginBottom: 5 }}>
      <Text style={{ color: colorAccent, fontSize: 16, fontWeight: 'bold', marginRight: 10 }}>Sponsors:</Text>
      <Text style={{ color: colorAccent, fontSize: 16 }}>{myObject3.sponsers}</Text>
    </View>
  
  </View>
  <FlatList
    data={data}
    renderItem={renderItem}
    keyExtractor={(item, index) => index.toString()}
    style={{ backgroundColor: '#F5F5F5' }}/>
  
        <Button
          title="Go to Analysis"
          color="#FFA500"
          onPress={() => navigation.navigate('analysis')}
          />
    </ScrollView>
  );
  };
function Graph({ route } ) {
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
    const { match, team } = route.params;
    const [myObject, setMyObject] = useState([]);  
    const [myObject2, setMyObject2] = useState([]);  
    const [Results, setResults] = useState('null');
    const [chartLabels, setchartLabels] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [chartData, setchartData] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  
    const ihavenoidea = dict[match]
    const autoPoints = [];
    const teleopPoints = [];
    const matchNumber = [];
    const matchType = [];
    const foulCount = [];
    const uhh = [];
    const nameList = [];
    const max = [];
    const bikinibottom = [];
    const bikinibottom2 = [];
    const [what, setwhat] = useState("Unknown...");
    const [loading, setLoading] = useState(true);
  
  
    useEffect(() => {
    fetch("https://www.thebluealliance.com/api/v3/team/" + team + "/event/" + String(ihavenoidea) + "/matches", { headers: { 'X-TBA-Auth-Key': "pn7EQlAcawiyWsJ1HpxNgNzvkJg0ajReJ75lPhiCj6FF3G34PEa0bHRiqGzQhRoR" } })
      .then(response => response.json())
      .then(data => {
        const re = JSON.stringify(data)
      const size = data.length;
      for (let i = 0; i < size; i++) {
        let win = "";
        if (data[i].alliances.red.team_keys[0] == team || data[i].alliances.red.team_keys[1] == team || data[i].alliances.red.team_keys[2] == team) {
          if (data[i].winning_alliance == "red") {
            win = "win";
          }
          else if (data[i].winning_alliance == "blue"){
            win = "lose";
          }
        else {
          win = "No data"
        }
        if (data[i].score_breakdown === null) {
          continue;
  
        }
        else {
  
          uhh.push(win);
          nameList.push(data[i].alliances.red.score);
          matchNumber.push(data[i].match_number);
          matchType.push(data[i].comp_level);
          autoPoints.push(data[i].score_breakdown.red.autoPoints);
          teleopPoints.push(data[i].score_breakdown.red.teleopPoints);
          foulCount.push(data[i].score_breakdown.red.foulCount);
            const send3 = data[i].score_breakdown.red.autoCommunity.T + "," + data[i].score_breakdown.red.autoCommunity.M + "," + data[i].score_breakdown.red.autoCommunity.B
            const send4 = data[i].score_breakdown.red.teleopCommunity.T + "," + data[i].score_breakdown.red.teleopCommunity.M + "," + data[i].score_breakdown.red.teleopCommunity.B
            const send = {Auto: send3, Teleop: send4, MatchNumber:data[i].match_number,MatchLevel:data[i].comp_level, autoPoints: data[i].score_breakdown.red.autoPoints,teleopPoints: data[i].score_breakdown.red.teleopPoints, fouls: data[i].score_breakdown.red.foulCount, Score: data[i].alliances.red.score, win: win, id: i };
            bikinibottom.push(send);
          }
            continue;
        }
        else if (data[i].alliances.blue.team_keys[0] == team || data[i].alliances.blue.team_keys[1] == team || data[i].alliances.blue.team_keys[2] == team) {
          if (data[i].winning_alliance == "blue") {
            win = "win";
          }
        else if (data[i].winning_alliance == "red"){
            win = "lose";
          }
        else {
          win = "No data"
        }
        if (data[i].score_breakdown === null) {
          continue;
        }
        else {
          uhh.push(win);
          nameList.push(data[i].alliances.blue.score);
          matchNumber.push(data[i].match_number);
          matchType.push(data[i].comp_level);
          autoPoints.push(data[i].score_breakdown.blue.autoPoints);
          teleopPoints.push(data[i].score_breakdown.blue.teleopPoints);
          foulCount.push(data[i].score_breakdown.blue.foulCount);
          const send3 = data[i].score_breakdown.blue.autoCommunity.T + "," + data[i].score_breakdown.blue.autoCommunity.M + "," + data[i].score_breakdown.blue.autoCommunity.B
          const send4 = data[i].score_breakdown.blue.teleopCommunity.T + "," + data[i].score_breakdown.blue.teleopCommunity.M + "," + data[i].score_breakdown.blue.teleopCommunity.B
          const send = {Auto: send3, Teleop: send4, MatchNumber: data[i].match_number ,MatchLevel:data[i].comp_level, autoPoints: data[i].score_breakdown.blue.autoPoints,teleopPoints: data[i].score_breakdown.blue.teleopPoints, fouls: data[i].score_breakdown.blue.foulCount,Score: data[i].alliances.blue.score, win: win, id: i };
          bikinibottom.push(send);
        }
          continue;
        }
          continue;
      }
      setMyObject(bikinibottom)
  
      for (let i = 0; i < nameList.length; i++) {
        max.push(String(i));
      };
      if (nameList.length != 0 || max.length != 0) {
        setchartLabels(max);
        setchartData(nameList);
      }
      const sum = autoPoints.reduce((acc, curr) => acc + curr, 0);
      const temp = sum / autoPoints.length;
      const sumteleop = teleopPoints.reduce((acc, curr) => acc + curr, 0);
      const sumscore = nameList.reduce((acc, curr) => acc + curr, 0);
      const sumfouls = autoPoints.reduce((acc, curr) => acc + curr, 0);
  
      const searchString = "win";
      const searchString2 = "lose";
      const count = uhh.filter((item) => item === searchString).length;
      const count2 = uhh.filter((item) => item === searchString2).length;
        if (count > count2) {
          setwhat("Win");
        }
        else if (count2 > count) {
          setwhat("Lose")
        }
        else if (count2 == count) {
          setwhat("Tie")
        }
      const send2 = {Average: what, Score: (Math.round(sumscore / nameList.length)), averageAuto: (Math.round(temp)), averageteleop: (Math.round(sumteleop / teleopPoints.length)), averagefouls: (Math.round(sumfouls / foulCount.length))}
      bikinibottom2.push(send2)
      setMyObject2(bikinibottom2)
  
    }).catch(error => console.error(error));
  }, []);
  
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);
  
  const renderItem = ({ item }) => {
    return (
      <>
  <Collapse>
      <CollapseHeader>
        <View style={[styles.item, item.win === "win" ? styles.win : styles.lose]}>
        <Text style={{fontSize: 30,
  fontWeight: 'bold'}}>Match Number: {item.MatchNumber}</Text>
          <Text>Match Level: {item.MatchLevel}</Text>
          <Text>Auto Points: {item.autoPoints}</Text>
          <Text>Teleop Points: {item.teleopPoints}</Text>
          <Text>Fouls: {item.fouls}</Text>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Score: {item.Score}</Text>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Results: {item.win}</Text>
        </View>
      </CollapseHeader>
      <CollapseBody>
  <Text style={{textAlign: 'center', fontSize: 30}}> Auto Grid: </Text>
  {item.Auto && (
    <View style={{ flexDirection: "column",justifyContent: "center", alignItems: "center", paddingHorizontal: 20 }}>
      {[...Array(3)].map((_, i) => (
        <View key={i} style={{ flexDirection: "row" }}>
          {item.Auto.split(",").slice(i * 9, (i + 1) * 9).map((item, index) => (
            <View
              key={index}
              style={[
                styles.gridItem,
                item === "Cube" ? { backgroundColor: "purple" } : item === "Cone" ? { backgroundColor: "yellow" } : { backgroundColor: "gray" }
              ]}
            >
              <Text style={styles.gridText}>{item}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  )}
  <Text style={{textAlign: 'center', fontSize: 30}}> {"\n"} Teleop Grid: </Text>
  {item.Teleop && (
    <View style={{ flexDirection: "column",justifyContent: "center", alignItems: "center", paddingHorizontal: 20}}>
      {[...Array(3)].map((_, i) => (
        <View key={i} style={{ flexDirection: "row" }}>
          {item.Teleop.split(",").slice(i * 9, (i + 1) * 9).map((item, index) => (
            <View
              key={index}
              style={[
                styles.gridItem,
                item === "Cube" ? { backgroundColor: "purple" } : item === "Cone" ? { backgroundColor: "yellow" } : { backgroundColor: "gray" }
              ]}
            >
              <Text style={styles.gridText}>{item}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  )}
      </CollapseBody>
  </Collapse>
    </>
  )
  
  };
  const renderTop = ({ item }) => {
  return (
    <View style={styles.item}>
    <Text style={styles.title}>Average</Text>
  
  <Text>Auto Points: {item.averageAuto}</Text>
  <Text>Teleop Points: {item.averageteleop}</Text>
  <Text>Number of Fouls: {item.averagefouls}</Text>
  <Text style={{fontSize: 20, fontWeight: 'bold'}}>Average Score: {item.Score} </Text>
  </View>
  )
  }
  if (loading) {
    // Render loading widget
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={ colorAccent } />
        <Text style={{fontSize: 30, color: colorAccent}}>Loading...</Text>
      </View>
    );
  }
  
    return (
    <SafeAreaView>
      <ScrollView>
      <View >
      <Text style={{textAlign: 'center', fontSize: 30, paddingHorizontal: 20}}> { match }  {'\n'}</Text>
      
      <Text style={{fontSize: 30,
  fontWeight: 'bold',
  textAlign: 'center',
  color: colorAccent}}> Chart of Scores</Text>
      
  
      <LineChart
    data={{
      labels: chartLabels,
      datasets: [
        {
          data: chartData
        }
      ]
    }}
    width={windowWidth}
    height={windowHeight / 2}
    chartConfig={{
    backgroundGradientFrom: "#0000000",
    backgroundGradientTo: "#000000",
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    }}
    style={{
      marginVertical: 8,
      borderRadius: 16,
    }}
  />
  <Text> {'\n'}</Text>
  <FlatList
        data={myObject2}
        renderItem={renderTop}
        keyExtractor={(item) => 1}
      />
  
  <FlatList
        data={myObject}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
  </View>
  </ScrollView>
    </SafeAreaView>
    )
  };

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