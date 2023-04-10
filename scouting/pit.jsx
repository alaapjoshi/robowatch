import {React, useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity
} from 'react-native';
import Checkbox from 'expo-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import QRCode from 'react-native-qrcode-svg';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
export default function Pit() {

const Stack = createNativeStackNavigator();
return (
<NavigationContainer independent={true}>
  <Stack.Navigator initialRouteName="Move">
    <Stack.Screen name="data" component={Data} options={{ headerShown: false }} />
    <Stack.Screen name="qr" component={qr} options={{ headerShown: false }} />
  </Stack.Navigator>
  </NavigationContainer>
)
}
function Data({ navigation }) {
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
    const [number, onChangeNumber] = useState('');
    const [cubeslow, setcubeslow] = useState(false);
    const [cubesmid, setcubesmid] = useState(false);
    const [cubeshigh, setcubeshigh] = useState(false);
    
    const [coneslow, setconeslow] = useState(false);
    const [conesmid, setconesmid] = useState(false);
    const [coneshigh, setconeshigh] = useState(false);

    const [pickuplowcubes, setpickuplowcubes] = useState(false);
    const [pickupstationcubes, setpickupstationcubes] = useState(false);

    const [pickuplowcones, setpickuplowcones] = useState(false);
    const [pickupstationcones, setpickupstationcones] = useState(false);

    const [autobalanceyes, setautobalanceyes] = useState(false);

    const [pieces, setpieces] = useState('');

    const [autoalign, setautoalign] = useState(false);


    const [autoaligngame, setautoaligngame] = useState(false);

    const [autosub, setautosub] = useState(false);
    const qr = [
      {
        "Team Number": number,
        "cubeplacelow": cubeslow,
        "cubeplacemid": cubesmid,
        "cubeplacehigh": cubeshigh,
        "coneplacelow": coneslow,
        "coneplacemid": conesmid,
        "coneplacehigh":coneshigh,
        "pickupcubesG": pickuplowcubes,
        "pickupcubesS": pickupstationcubes,
        "pickupconesG": pickuplowcones,
        "pickupconesS": pickupstationcones,
        "autobalance": autobalanceyes,
        "pieces": pieces,
        "autoaligngamepiece": autoalign,
        "autoalignapril": autoaligngame,
        "autosub": autosub
      }
    ]

    return (
        <ScrollView>

    <View style={styles.center}>
    <Text style={{fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        color: colorAccent,}}>
        Team Number
    </Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="           eg 75           "
        keyboardType="numeric"
      />
    <Text style={{fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        color: colorAccent,}}>
        Where can this team place cubes?
    </Text>
    <View style={{ flexDirection: 'row' }}>
        <Text style={{width: 50,height: 50,fontSize: 20,color: colorAccent ,marginHorizontal: 50,flexDirection: 'row'}}>
            Low
        </Text>
        <Text style={{width: 50,height: 50,fontSize: 20,color: colorAccent ,marginHorizontal: 50,flexDirection: 'row'}}>
            Mid
        </Text>
        <Text style={{width: 50,height: 50,fontSize: 20,color: colorAccent ,marginHorizontal: 50,flexDirection: 'row'}}>
            High
        </Text>
    </View>

    <View style={{ flexDirection: 'row' }}>
          <Checkbox
            style={{width: 50,height: 50,fontSize: 20,color: colorAccent ,marginHorizontal: 50,flexDirection: 'row'}}
          value={cubeslow}
          onValueChange={setcubeslow}
        />
        <Checkbox
        style={{width: 50,height: 50,fontSize: 20,color: colorAccent ,marginHorizontal: 50,flexDirection: 'row'}}
          value={cubesmid}
          onValueChange={setcubesmid}
        />
        <Checkbox
        style={{width: 50,height: 50,fontSize: 20,color: colorAccent ,marginHorizontal: 50,flexDirection: 'row'}}
 
          value={cubeshigh}
          onValueChange={setcubeshigh}
        />
      </View>

      <Text style={{fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        color: colorAccent,}}>
        Where can this team place cones?
    </Text>
    <View style={{ flexDirection: 'row' }}>
        <Text style={{width: 50,height: 50,fontSize: 20,color: colorAccent ,marginHorizontal: 50,flexDirection: 'row'}}>
            Low
        </Text>
        <Text style={{width: 50,height: 50,fontSize: 20,color: colorAccent ,marginHorizontal: 50,flexDirection: 'row'}}>
            Mid
        </Text>
        <Text style={{width: 50,height: 50,fontSize: 20,color: colorAccent ,marginHorizontal: 50,flexDirection: 'row'}}>
            High
        </Text>
    </View>

    <View style={{ flexDirection: 'row' }}>
          <Checkbox
            style={{width: 50,height: 50,fontSize: 20,color: colorAccent ,marginHorizontal: 50,flexDirection: 'row'}}
          value={coneslow}
          onValueChange={setconeslow}
        />
        <Checkbox
        style={{width: 50,height: 50,fontSize: 20,color: colorAccent ,marginHorizontal: 50,flexDirection: 'row'}}
          value={conesmid}
          onValueChange={setconesmid}
        />
        <Checkbox
        style={{width: 50,height: 50,fontSize: 20,color: colorAccent ,marginHorizontal: 50,flexDirection: 'row'}}
 
          value={coneshigh}
          onValueChange={setconeshigh}
        />
      </View>
    <Text style={{fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        color: colorAccent}}>
        where can this team pick up cubes

    </Text>

    <View style={{ flexDirection: 'row' }}>
        <Text style={{width: 50,height: 50,fontSize: 20,color: colorAccent ,marginHorizontal: 50,flexDirection: 'row'}}>
            G
        </Text>
        <Text style={{width: 50,height: 50,fontSize: 20,color: colorAccent ,marginHorizontal: 50,flexDirection: 'row'}}>
            S
        </Text>
    </View>

    <View style={{ flexDirection: 'row' }}>
          <Checkbox
            style={{width: 50,height: 50,fontSize: 20,color: colorAccent ,marginHorizontal: 50,flexDirection: 'row'}}
          value={pickuplowcubes}
          onValueChange={setpickuplowcubes}
        />
        <Checkbox
        style={{width: 50,height: 50,fontSize: 20,color: colorAccent ,marginHorizontal: 50,flexDirection: 'row'}}
          value={pickupstationcubes}
          onValueChange={setpickupstationcubes}
        />
    </View>

    <Text style={{fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        color: colorAccent,}}>
        where can this team pick up cones?
    </Text>

    <View style={{ flexDirection: 'row' }}>
        <Text style={{width: 50,height: 50,fontSize: 20,color: colorAccent ,marginHorizontal: 50,flexDirection: 'row'}}>
            G
        </Text>
        <Text style={{width: 50,height: 50,fontSize: 20,color: colorAccent ,marginHorizontal: 50,flexDirection: 'row'}}>
            S
        </Text>
    </View>

    <View style={{ flexDirection: 'row' }}>
          <Checkbox
            style={{width: 50,height: 50,fontSize: 20,color: colorAccent ,marginHorizontal: 50,flexDirection: 'row'}}
          value={pickuplowcones}
          onValueChange={setpickuplowcones}
        />
        <Checkbox
        style={{width: 50,height: 50,fontSize: 20,color: colorAccent ,marginHorizontal: 50,flexDirection: 'row'}}
          value={pickupstationcones}
          onValueChange={setpickupstationcones}
        />
    </View>

    
    <Text style={{fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        color: colorAccent}}>
        Can this team autobalance?
    </Text>
    <View style={{ flexDirection: 'row' }}>
        <Text style={{width: 50,height: 50,fontSize: 20,color: colorAccent ,marginHorizontal: 50,flexDirection: 'row'}}>
            Yes
        </Text>
    </View>
    <View style={{ flexDirection: 'row'}}>
          <Checkbox
            style={{width: 50,height: 50,fontSize: 20,color: colorAccent ,marginHorizontal: 50,flexDirection: 'row'}}
          value={autobalanceyes}
          onValueChange={setautobalanceyes}
        />
    </View>
    <Text style={{fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        color: colorAccent}}>
        How many pieces does their auto do?
    </Text>
    <TextInput
        style={styles.input}
        onChangeText={setpieces}
        value={pieces}
        placeholder="           eg 1           "
        keyboardType="numeric"
      />
    <Text style={{fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        color: colorAccent}}>
        Can this team auto align to gamepieces?
    </Text>
    <View style={{ flexDirection: 'row' }}>
        <Text style={{width: 50,height: 50,fontSize: 20,color: colorAccent ,marginHorizontal: 50,flexDirection: 'row'}}>
            Yes
        </Text>
    </View>
    <View style={{ flexDirection: 'row' }}>
          <Checkbox
            style={{width: 50,height: 50,fontSize: 20,color: colorAccent ,marginHorizontal: 50,flexDirection: 'row'}}
          value={autoalign}
          onValueChange={setautoalign}
        />
    </View>
    <Text style={{fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        color: colorAccent}}>
        Can this team auto align to april tags or reflective tape?
    </Text>
    <View style={{ flexDirection: 'row' }}>
        <Text style={{width: 50,height: 50,fontSize: 20,color: colorAccent ,marginHorizontal: 50,flexDirection: 'row'}}>
            Yes
        </Text>
    </View>
    <View style={{ flexDirection: 'row' }}>
          <Checkbox
            style={{width: 50,height: 50,fontSize: 20,color: colorAccent ,marginHorizontal: 50,flexDirection: 'row'}}
          value={autoaligngame}
          onValueChange={setautoaligngame}
        />
    </View>
    <Text style={{fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        color: colorAccent}}>
        Does this team have an auto for when they enter the substation to pick up pieces?
    </Text>
    <View style={{ flexDirection: 'row' }}>
        <Text style={{width: 50,height: 50,fontSize: 20,color: colorAccent ,marginHorizontal: 50,flexDirection: 'row'}}>
            Yes
        </Text>
    </View>
    <View style={{ flexDirection: 'row' }}>
          <Checkbox
            style={{width: 50,height: 50,fontSize: 20,color: colorAccent ,marginHorizontal: 50,flexDirection: 'row'}}
          value={autosub}
          onValueChange={setautosub}
        />
    </View>
    <TouchableOpacity style={{ backgroundColor: colorAccent, padding: 20, borderRadius: 10, marginBottom: 40 }} onPress={() => navigation.navigate('qr', {
   "TeamNumber": number,
   "cubeplacelow": cubeslow,
   "cubeplacemid": cubesmid,
   "cubeplacehigh": cubeshigh,
   "coneplacelow": coneslow,
   "coneplacemid": conesmid,
   "coneplacehigh":coneshigh,
   "pickupcubesG": pickuplowcubes,
   "pickupcubesS": pickupstationcubes,
   "pickupconesG": pickuplowcones,
   "pickupconesS": pickupstationcones,
   "autobalance": autobalanceyes,
   "pieces": pieces,
   "autoaligngamepiece": autoalign,
   "autoalignapril": autoaligngame,
   "autosub": autosub   
    })
}>
    <Text style={{ fontSize: 18, color: '#FFFFFF' }}>Pit Scouting</Text>
  </TouchableOpacity>

</View>

</ScrollView>
    )

}
function qr({ route, navigation }) {
  const { TeamNumber, cubeplacelow,cubeplacemid,cubeplacehigh,coneplacelow,coneplacemid,coneplacehigh,pickupcubesG,pickupcubesS,pickupconesG,pickupconesS,autobalance,pieces,autoaligngamepiece,autoalignapril,autosub,  } = route.params;
  const qr = [
    {
      "TeamNumber": TeamNumber,
      "cubeplacelow": cubeplacelow,
      "cubeplacemid": cubeplacemid,
      "cubeplacehigh": cubeplacehigh,
      "coneplacelow": coneplacelow,
      "coneplacemid": coneplacemid,
      "coneplacehigh":coneplacehigh,
      "pickupcubesG": pickupcubesG,
      "pickupcubesS": pickupcubesS,
      "pickupconesG": pickupconesG,
      "pickupconesS": pickupconesS,
      "autobalance": autobalance,
      "pieces": pieces,
      "autoaligngamepiece": autoaligngamepiece,
      "autoalignapril": autoalignapril,
      "autosub": autosub
    }
  ]
  const real = JSON.stringify(qr)
  console.log(real)
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

  return (
    <View style={{alignItems: 'center', justifyContent: 'center', marginTop: '50%'}}> 
  <QRCode
    size={300}
    color={colorAccent}
    logo={"assets/icon.png"}
  value=  { real }
/>
</View>
  )
}
const styles = StyleSheet.create({
    center: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    checkbox: {
        width: 50,
        height: 50,
        fontSize: 20,
        color: '#ff0303',
        marginHorizontal: 50,
        flexDirection: 'row'
      },
    subLogoText: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#ff0303',
      },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
  });