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
import Checkbox from 'expo-checkbox';

export default function pit() {
    const [text, onChangeText] = useState('Useless Text');
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


    const [autosub, setautosub] = useState(false);


    return (
        <ScrollView>

    <View style={styles.center}>
    <Text style={styles.subLogoText}>
        Team Number
    </Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="           eg 75           "
        keyboardType="numeric"
      />
    <Text style={styles.subLogoText}>
        Where can this team place cubes?
    </Text>
    <View style={{ flexDirection: 'row' }}>
        <Text style={styles.checkbox}>
            Low
        </Text>
        <Text style={styles.checkbox}>
            Mid
        </Text>
        <Text style={styles.checkbox}>
            High
        </Text>
    </View>

    <View style={{ flexDirection: 'row' }}>
          <Checkbox
            style={styles.checkbox}
          value={cubeslow}
          onValueChange={setcubeslow}
        />
        <Checkbox
        style={styles.checkbox}
          value={cubesmid}
          onValueChange={setcubesmid}
        />
        <Checkbox
        style={styles.checkbox}
 
          value={cubeshigh}
          onValueChange={setcubeshigh}
        />
      </View>

      <Text style={styles.subLogoText}>
        Where can this team place cones?
    </Text>
    <View style={{ flexDirection: 'row' }}>
        <Text style={styles.checkbox}>
            Low
        </Text>
        <Text style={styles.checkbox}>
            Mid
        </Text>
        <Text style={styles.checkbox}>
            High
        </Text>
    </View>

    <View style={{ flexDirection: 'row' }}>
          <Checkbox
            style={styles.checkbox}
          value={coneslow}
          onValueChange={setconeslow}
        />
        <Checkbox
        style={styles.checkbox}
          value={conesmid}
          onValueChange={setconesmid}
        />
        <Checkbox
        style={styles.checkbox}
 
          value={coneshigh}
          onValueChange={setconeshigh}
        />
      </View>
    <Text style={styles.subLogoText}>
        where can this team pick up cubes

    </Text>

    <View style={{ flexDirection: 'row' }}>
        <Text style={styles.checkbox}>
            G
        </Text>
        <Text style={styles.checkbox}>
            S
        </Text>
    </View>

    <View style={{ flexDirection: 'row' }}>
          <Checkbox
            style={styles.checkbox}
          value={pickuplowcubes}
          onValueChange={setpickuplowcubes}
        />
        <Checkbox
        style={styles.checkbox}
          value={pickupstationcubes}
          onValueChange={setpickupstationcubes}
        />
    </View>

    <Text style={styles.subLogoText}>
        where can this team pick up cones?
    </Text>

    <View style={{ flexDirection: 'row' }}>
        <Text style={styles.checkbox}>
            G
        </Text>
        <Text style={styles.checkbox}>
            S
        </Text>
    </View>

    <View style={{ flexDirection: 'row' }}>
          <Checkbox
            style={styles.checkbox}
          value={pickuplowcones}
          onValueChange={setpickuplowcones}
        />
        <Checkbox
        style={styles.checkbox}
          value={pickupstationcones}
          onValueChange={setpickupstationcones}
        />
    </View>

    
    <Text style={styles.subLogoText}>
        Can this team autobalance?
    </Text>
    <View style={{ flexDirection: 'row' }}>
        <Text style={styles.checkbox}>
            Yes
        </Text>
    </View>
    <View style={{ flexDirection: 'row'}}>
          <Checkbox
            style={styles.checkbox}
          value={autobalanceyes}
          onValueChange={setautobalanceyes}
        />
    </View>
    <Text style={styles.subLogoText}>
        How many pieces does their auto do?
    </Text>
    <TextInput
        style={styles.input}
        onChangeText={setpieces}
        value={pieces}
        placeholder="           eg 1           "
        keyboardType="numeric"
      />
    <Text style={styles.subLogoText}>
        Can this team auto align to gamepieces?
    </Text>
    <View style={{ flexDirection: 'row' }}>
        <Text style={styles.checkbox}>
            Yes
        </Text>
    </View>
    <View style={{ flexDirection: 'row' }}>
          <Checkbox
            style={styles.checkbox}
          value={autoalign}
          onValueChange={setautoalign}
        />
    </View>
    <Text style={styles.subLogoText}>
        Can this team auto align to april tags or reflective tape?
    </Text>
    <View style={{ flexDirection: 'row' }}>
        <Text style={styles.checkbox}>
            Yes
        </Text>
        <Text style={styles.checkbox}>
            No
        </Text>
    </View>
    <View style={{ flexDirection: 'row' }}>
          <Checkbox
            style={styles.checkbox}
          value={coneslow}
          onValueChange={setconeslow}
        />
        <Checkbox
        style={styles.checkbox}
          value={conesmid}
          onValueChange={setconesmid}
        />
    </View>
    <Text style={styles.subLogoText}>
        Does this team have an auto for when they enter the substation to pick up pieces?
    </Text>
    <View style={{ flexDirection: 'row' }}>
        <Text style={styles.checkbox}>
            Yes
        </Text>
    </View>
    <View style={{ flexDirection: 'row' }}>
          <Checkbox
            style={styles.checkbox}
          value={autosub}
          onValueChange={setautosub}
        />
    </View>
    
</View>
</ScrollView>
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