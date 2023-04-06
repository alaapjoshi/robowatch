import {React, useState, useEffect} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Button,
  Text,
  FlatList,
  SafeAreaView,
  ScrollView,
  TextInput,
  ActivityIndicator
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LineChart } from 'react-native-chart-kit';
import AnimatedSplash from "react-native-animated-splash-screen";
import { Dimensions } from "react-native";
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//Screens

var dict = new Object();

function New ({ route, navigation })  {
  const { team } = route.params;
  const teamKey = "pn7EQlAcawiyWsJ1HpxNgNzvkJg0ajReJ75lPhiCj6FF3G34PEa0bHRiqGzQhRoR";
  const endpoint = "https://www.thebluealliance.com/api/v3/team/" + team + "/events";
  const endpoint2 = "https://www.thebluealliance.com/api/v3/team/" + team;
  const [myObject3, setMyObject3] = useState([]);  

  const controller = new AbortController();
  const matchList = [];
  const keyList = [];
  const [data, setData] = useState([]);
  let data2 = [];

  useEffect(() => {
  fetch(endpoint2, { headers: { 'X-TBA-Auth-Key': teamKey } })
    .then(response => response.json())
    .then(data => {
      const send = {city: data.city, sponsers: data.name, Name: data.nickname, team_number: data.team_number, School_Name:data.school_name,State: data.state_prov, rookie_year: data.rookie_year };
      data2.push(send);
      setMyObject3(send);
    }).catch(error => console.error(error));
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
}, []);
const NoMatchesFound = () => {  
  return (
    <View style={{flex: 1,justifyContent: 'center',alignItems: 'center',backgroundColor: '#EAEAEA'}}>
      <Text style={{fontSize: 24,fontWeight: 'bold',color: '#222222'}}>No Matches found!</Text>
    </View>
  );
}
 
const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('Graph', {
      match: item,
      team: team,
    })}>
      <Text style={styles.itemText}>{item}</Text>
  </TouchableOpacity>
);

/*
<Button
title="Go to Notifications"
onPress={() => navigation.navigate('Notifications')}
/>
*/
return (
  <ScrollView style={{flex: 1, backgroundColor: "#FFFFFF"}}>
<FlatList
  data={data}
  renderItem={renderItem}
  keyExtractor={(item, index) => index.toString()}
  style={{ backgroundColor: '#F5F5F5' }}/>

<View style={{ backgroundColor: '#333', padding: 20}}>
  <Text style={{ color: '#FFA500', fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>{myObject3.Name}</Text>
  <View style={{ flexDirection: 'row', marginBottom: 5 }}>
    <Text style={{ color: '#FFF', fontSize: 16, fontWeight: 'bold', marginRight: 10 }}>Team Number:</Text>
    <Text style={{ color: '#FFF', fontSize: 16 }}>{myObject3.team_number}</Text>
  </View>
  <View style={{ flexDirection: 'row', marginBottom: 5 }}>
    <Text style={{ color: '#FFF', fontSize: 16, fontWeight: 'bold', marginRight: 10 }}>School Name:</Text>
    <Text style={{ color: '#FFF', fontSize: 16 }}>{myObject3.School_Name}</Text>
  </View>
  <View style={{ flexDirection: 'row', marginBottom: 5 }}>
    <Text style={{ color: '#FFF', fontSize: 16, fontWeight: 'bold', marginRight: 10 }}>Location:</Text>
    <Text style={{ color: '#FFF', fontSize: 16 }}>{myObject3.city}, {myObject3.State}</Text>
  </View>
  <View style={{ flexDirection: 'row', marginBottom: 5 }}>
    <Text style={{ color: '#FFF', fontSize: 16, fontWeight: 'bold', marginRight: 10 }}>Rookie Year:</Text>
    <Text style={{ color: '#FFF', fontSize: 16 }}>{myObject3.rookie_year}</Text>
  </View>
  <View style={{ flexDirection: 'row', marginBottom: 5 }}>
    <Text style={{ color: '#FFF', fontSize: 16, fontWeight: 'bold', marginRight: 10 }}>Sponsors:</Text>
    <Text style={{ color: '#FFF', fontSize: 16 }}>{myObject3.sponsers}</Text>
  </View>

</View>




  </ScrollView>
);
};

function Graph({ route } ) {
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
    const size = data.length;
    for (let i = 0; i < size; i++) {
      let win = "";
      if (data[i].alliances.red.team_keys[0] == team || data[i].alliances.red.team_keys[1] == team || data[i].alliances.red.team_keys[2] == team) {
        if (data[i].winning_alliance == "red") {
          win = "win";
        }
        else {
          win = "lose";
        }
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
          continue;
      }
      else if (data[i].alliances.blue.team_keys[0] == team || data[i].alliances.blue.team_keys[1] == team || data[i].alliances.blue.team_keys[2] == team) {
        if (data[i].winning_alliance == "blue") {
          win = "win";
        }
        else {
          win = "lose";
        }
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
  <View style={[styles.item, item.win === "win" ? styles.win : styles.lose]}>
  <Text style={styles.title}>Match Number: {item.MatchNumber}</Text>
  <Text>Match Level: {item.MatchLevel}</Text>
  <Text>Auto Points: {item.autoPoints}</Text>
  <Text>Teleop Points: {item.teleopPoints}</Text>
  <Text>Fouls: {item.fouls}</Text>
  <Text style={{fontSize: 20, fontWeight: 'bold'}}>Score: {item.Score}</Text>
  <Text style={{fontSize: 20, fontWeight: 'bold'}}>Results: {item.win}</Text>
</View>
<Text style={{textAlign: 'center', fontSize: 30}}> Auto Grid: {"\n"}</Text>
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

<Text style={{textAlign: 'center', fontSize: 30}}> Teleop Grid: </Text>
{item.Teleop && (
  <View style={{ flexDirection: "column",justifyContent: "center", alignItems: "center", padding: 40}}>
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
      <ActivityIndicator size="large" color="#ff0303" />
      <Text style={{fontSize: 30}}>Loading...</Text>
    </View>
  );
}

  return (
  <SafeAreaView>
    <ScrollView>
    <View >
    <Text style={{textAlign: 'center', fontSize: 30, paddingHorizontal: 20}}> { match } </Text>
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
  //yAxisLabel="$"
  //yAxisSuffix="k"
  chartConfig={{
  backgroundGradientFrom: '#1E2923',
  backgroundGradientTo: '#08130D',
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  }}
  bezier
  style={{
    marginVertical: 8,
    borderRadius: 16,
  }}
/>
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
//
function HomeScreen({ navigation }) {
  const [text, onChangeText] = useState();
  const [team, setTeam] = useState('');
  const handlePress = () => {
    if (team.trim() !== '') {
      navigation.navigate('New', { team });
    }
  };

const NoInternetPage = () => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const response = await fetch('https://www.thebluealliance.com/api/v3/status', {
          headers: { 'X-TBA-Auth-Key': 'YOUR_API_KEY' }
        });
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
          <TouchableOpacity style={styles.retryButton} onPress={handleRetryPress}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
    return (
      
    <View style={styles.container7}>
      
    <View style={styles.logoContainer}>
    <Ionicons name={'glasses-outline'} color="red" size={120} style={{textAlign:'center', marginTop:40}} />

    <Text style={styles.logoText}>RoboWatch</Text>
    <Text style={styles.subLogoText}>Presented by Team75</Text>
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
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('New',{ team: "frc" + team,
 })}>
      <Text style={styles.buttonText}>Go to Matches</Text>
    </TouchableOpacity>
  </View>

      /*
    <View style={styles.container3}>
      <Text style={styles.title2}>Welcome to Team75</Text>
      <Text style={styles.subtitle2}>Connect, Compete, Win</Text>
      <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate('New')}>
        <Text style={styles.buttonText2}>Go to Matches</Text>
      </TouchableOpacity>
    </View>
    */
  );
}

function ProfileScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Go to Notifications"
        onPress={() => navigation.navigate('Notifications')}
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Go to Settings"
        onPress={() => navigation.navigate('Settings')}
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

function SettingsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="New" component={New} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Graph" component={Graph} />
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
      AnimatedSplash>

    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
    </AnimatedSplash>

  );
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
  paddingBottom: 20,
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
  marginBottom: 30,
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
  backgroundColor: '#2196F3',
},
lose: {
  backgroundColor: '#FF9800',
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