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
  SafeAreaView,
  Image,
  ScrollView,
  TextInput
} from 'react-native';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';

import { LineChart } from 'react-native-chart-kit';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useRoute } from '@react-navigation/native';
import AnimatedSplash from "react-native-animated-splash-screen";

import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").height;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import {LogBox} from 'react-native';
// Ignore log notification by message:
LogBox.ignoreLogs(['Warning: ...']);

// Ignore all log notifications:
LogBox.ignoreAllLogs();


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//Screens 
var dict = new Object();

function New ({ route, navigation })  {
  const { team } = route.params;
  const teamKey = "pn7EQlAcawiyWsJ1HpxNgNzvkJg0ajReJ75lPhiCj6FF3G34PEa0bHRiqGzQhRoR";
  const endpoint = "https://www.thebluealliance.com/api/v3/team/" + team + "/events";
  const controller = new AbortController();
  const signal = controller.signal;
  const [products, setProducts] = useState([]);
  const matchList = [];
  const keyList = [];
  const [data, setData] = useState([]);
  const [message, setMessage] = useState('');
  useEffect(() => {
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

const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('Graph', {
      match: item,
      team: team,
    })}>
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
        <Button
        title="Go to Notifications"
        onPress={() => navigation.navigate('Notifications')}
      />
    
  </>

);
};

function Graph({ route } ) {
  const [myObject, setMyObject] = useState([]);  
  const [grid, setgrid] = useState([]);  
  const [finalgrid, setfinalgrid] = useState([]);  
  const auto = [];
  const teleop = [];
  const [myString, setMyString] = useState('null');
  const [Results, setResults] = useState('null');
  const [jkcount, setjkcount] = useState(1);
  const [matchNum, setMatchNum] = useState(0);
  const [chartLabels, setchartLabels] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [chartData, setchartData] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [final, setfinal] = useState()
  const { match, team } = route.params;

  const ihavenoidea = dict[match]
  const autoPoints = [];
  const teleopPoints = [];
  const matchNumber = [];
  const matchType = [];
  const foulCount = [];
  const [averagescore, setaveragescore] = useState(0);
  const [averagefouls, setaveragefouls] = useState(0);
  const [averageteleop, setaverageteleop] = useState(0);
  const [averageauto, setaverageauto] = useState();
  const endpoint = "https://www.thebluealliance.com/api/v3/team/frc11/event/" + String(ihavenoidea) + "/matches"
  const endpoint2 = "https://www.thebluealliance.com/api/v3/event/" + String(ihavenoidea);
  const uhh = []
  const teamKey = "pn7EQlAcawiyWsJ1HpxNgNzvkJg0ajReJ75lPhiCj6FF3G34PEa0bHRiqGzQhRoR";
  const nameList = [];
  const max = [];
  const bikinibottom = [];
  const bikinibottom2 = [];
  const bikinibottom3 = [];

  const autobottom = [];
  const automid = [];
  const autotop = [];
  const teleopbottom = [];
  const teleopmid = [];
  const teleoptop = [];

  useEffect(() => {
  fetch(endpoint, { headers: { 'X-TBA-Auth-Key': teamKey } })
    .then(response => response.json())
    .then(data => {

    const parsedData = JSON.stringify(data);
    const size = data.length;
    for (let i = 0; i < size; i++) {
      let win = "";
      if (data[i].alliances.red.team_keys[0] == "frc75" || data[i].alliances.red.team_keys[1] == "frc75" || data[i].alliances.red.team_keys[2] == "frc75") {
        if (data[i].winning_alliance == "red") {
          win = "win";
        }
        else {
          win = "lose";
        }
        uhh.push(win);
        autobottom.push(data[i].score_breakdown.red.autoCommunity.B);
        automid.push(data[i].score_breakdown.red.autoCommunity.M);
        autotop.push(data[i].score_breakdown.red.autoCommunity.T);
        teleopbottom.push(data[i].score_breakdown.red.autoCommunity.B);
        teleopmid.push(data[i].score_breakdown.red.autoCommunity.M);
        teleoptop.push(data[i].score_breakdown.red.autoCommunity.T);


          nameList.push(data[i].alliances.red.score);
          matchNumber.push(data[i].match_number);
          matchType.push(data[i].comp_level);
          autoPoints.push(data[i].score_breakdown.red.autoPoints);
          teleopPoints.push(data[i].score_breakdown.red.teleopPoints);
          foulCount.push(data[i].score_breakdown.red.foulCount);

          const send3 = data[i].score_breakdown.red.autoCommunity.T + "," + data[i].score_breakdown.red.autoCommunity.M + "," + data[i].score_breakdown.red.autoCommunity.B
          const arr = send3.split(',');
          const size = 9; // number of columns
          const groups = arr.map((_, i) => i % size === 0 ? arr.slice(i, i + size) : null)
                   .filter(e => e);
          auto.push(groups);
          const send4 = data[i].score_breakdown.red.teleopCommunity.T + "," + data[i].score_breakdown.red.teleopCommunity.M + "," + data[i].score_breakdown.red.teleopCommunity.B
          const arr2 = send4.split(',');
          const groups2 = arr2.map((_, i) => i % size === 0 ? arr.slice(i, i + size) : null)
                   .filter(e => e);
        
          teleop.push(groups2);
          const send = {Auto: send3, Teleop: send4, MatchNumber:data[i].match_number,MatchLevel:data[i].comp_level, autoPoints: data[i].score_breakdown.red.autoPoints,teleopPoints: data[i].score_breakdown.red.teleopPoints, fouls: data[i].score_breakdown.red.foulCount, Score: data[i].alliances.red.score, win: win, id: i };
          
          bikinibottom.push(send);
          continue;
      }
      else if (data[i].alliances.blue.team_keys[0] == "frc75" || data[i].alliances.blue.team_keys[1] == "frc75" || data[i].alliances.blue.team_keys[2] == "frc75") {
        if (data[i].winning_alliance == "blue") {
          win = "win";
        }
        else {
          win = "lose";
        }
        uhh.push(win);
        autobottom.push(data[i].score_breakdown.blue.autoCommunity.B);
        automid.push(data[i].score_breakdown.blue.autoCommunity.M);
        autotop.push(data[i].score_breakdown.blue.autoCommunity.T);
        teleopbottom.push(data[i].score_breakdown.blue.autoCommunity.B);
        teleopmid.push(data[i].score_breakdown.blue.autoCommunity.M);
        teleoptop.push(data[i].score_breakdown.blue.autoCommunity.T);
        nameList.push(data[i].alliances.blue.score);
        matchNumber.push(data[i].match_number);
        matchType.push(data[i].comp_level);
        autoPoints.push(data[i].score_breakdown.blue.autoPoints);
        teleopPoints.push(data[i].score_breakdown.blue.teleopPoints);
        foulCount.push(data[i].score_breakdown.blue.foulCount);

        const send3 = data[i].score_breakdown.blue.autoCommunity.T + "," + data[i].score_breakdown.blue.autoCommunity.M + "," + data[i].score_breakdown.blue.autoCommunity.B
        const arr = send3.split(',');
        const size = 9; // number of columns
        const groups = arr.map((_, i) => i % size === 0 ? arr.slice(i, i + size) : null)
                 .filter(e => e);
        auto.push(groups);
        const send4 = data[i].score_breakdown.blue.teleopCommunity.T + "," + data[i].score_breakdown.blue.teleopCommunity.M + "," + data[i].score_breakdown.blue.teleopCommunity.B
        const arr2 = send4.split(',');
        const groups2 = arr2.map((_, i) => i % size === 0 ? arr.slice(i, i + size) : null)
                 .filter(e => e);
      
        teleop.push(groups2);
        const send = {Auto: send3, Teleop: send4, MatchNumber: data[i].match_number ,MatchLevel:data[i].comp_level, autoPoints: data[i].score_breakdown.blue.autoPoints,teleopPoints: data[i].score_breakdown.blue.teleopPoints, fouls: data[i].score_breakdown.blue.foulCount,Score: data[i].alliances.blue.score, win: win, id: i };
        bikinibottom.push(send);
        continue;
      }
        continue;
    }

    for (let i = 0; i < nameList.length; i++) {
      max.push(String(i));
    };
    if (nameList.length != 0 || max.length != 0) {
      setchartLabels(max);
      setchartData(nameList);
    }
    const sum = autoPoints.reduce((acc, curr) => acc + curr, 0);
    setaverageauto((Math.round(sum / autoPoints.length)));
    const temp = sum / autoPoints.length;
    setaverageauto((Math.round(temp)));

    const sumteleop = teleopPoints.reduce((acc, curr) => acc + curr, 0);
    setaverageteleop((Math.round(sumteleop / teleopPoints.length)));

    const sumscore = nameList.reduce((acc, curr) => acc + curr, 0);
    setaveragescore((Math.round(sumscore / nameList.length)));

    const sumfouls = autoPoints.reduce((acc, curr) => acc + curr, 0);
    setaveragefouls((Math.round(sumfouls / foulCount.length)));

    setMyObject(bikinibottom)
    const searchString = "win";
    const searchString2 = "lose";
    const count = uhh.filter((item) => item === searchString).length;
    const count2 = uhh.filter((item) => item === searchString2).length;
    if (count > count2) {
      setResults("Win")
    }
    if (count2 > count) {
      setResults("Lose")
    }
    if (count2 == count) {
      setResults("Tie")
    }
    const send2 = {Average: Results, Score: averagescore, averageAuto: averageauto, averageteleop: averageteleop, averagefouls: averagefouls}
    bikinibottom2.push(send2)

    setgrid(bikinibottom3)


    




  }).catch(error => console.error(error));
}, []);

/*
const roundedscore = Number(averagescore.toFixed(2));
const roundedauto = Number(averageauto.toFixed(2));
const roundedTeleop= Number(averageteleop.toFixed(2));
const roundedFouls = Number(averagefouls.toFixed(2));


*/
const test123 = [
  ['None', 'None', 'None', 'None', 'None', 'None', 'None', 'Cube', 'None'],
  ['None', 'None', 'None', 'None', 'None', 'Cone', 'None', 'None', 'None'],
  ['Cube', 'None', 'None', 'None', 'None', 'None', 'None', 'None', 'None'],
];

const renderItem = ({ item }) => {
  return (
    <>
  <View style={[styles.item, item.win === "win" ? styles.win : styles.lose]}>
  <Text style={styles.title}>Match Number: {item.MatchNumber}</Text>
  <Text>Match Level: {item.MatchLevel}</Text>
  <Text>Score: {item.Score}</Text>
  <Text>Auto Points: {item.autoPoints}</Text>
  <Text>Teleop Points: {item.teleopPoints}</Text>
  <Text>Fouls: {item.fouls}</Text>
  <Text>Results: {item.win}</Text>
</View>
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

<Text style={{textAlign: 'center', fontSize: 30}}> Teleop Grid: </Text>
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
  </>
)
};
const renderTop = ({ item }) => (
  <View style={styles.item}>
  <Text style={styles.title}>Average: {item.Average}</Text>
  <Text>Average Score: {item.Score} </Text>
  <Text>Auto Points: {item.averageAuto}</Text>
  <Text>Teleop Points: {item.averageteleop}</Text>
  <Text>Number of Fouls: {item.averagefouls}</Text>
</View>
);
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
      data={bikinibottom2}
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
    return (
    <View style={styles.container7}>
    <View style={styles.logoContainer}>
      <Text style={styles.logoText}>Team75</Text>
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
  const [loading, setLoading] = useState(false);

  setTimeout(() => {
    setLoading(true);
  }, 5000);

  return (
    <AnimatedSplash
      translucent={true}
      isLoaded={loading}
      logoImage={require("./assets/charge.gif")}
      backgroundColor={"#262626"}
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

container7: {
  flex: 1,
  backgroundColor: '#ffffff',
  alignItems: 'center',
  justifyContent: 'center',
},
logoContainer: {
  marginBottom: 60,
},
logoText: {
  fontSize: 50,
  fontWeight: 'bold',
  color: '#ff0303',
},
inputContainer: {
  marginHorizontal: 30,
  marginBottom: 30,
},
label: {
  fontSize: 20,
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
button: {
  backgroundColor: '#ff0303',
  paddingHorizontal: 20,
  paddingVertical: 10,
  borderRadius: 10,
},
buttonText: {
  fontSize: 20,
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
},
item: {
  backgroundColor: '#FFD700',
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
  backgroundColor: '#03ff03',
},
lose: {
  backgroundColor: '#ff0303',
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