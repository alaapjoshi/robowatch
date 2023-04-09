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
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import pit from './pit';
import scouting from './scouting';

export default function navigatescout( {navigation } ) {
  const Stack = createNativeStackNavigator();
    return (
  <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="move">
      <Stack.Screen name="move" component={move} />

        <Stack.Screen name="Pit" component={pit} />
        <Stack.Screen name="Scout" component={scouting} />
      </Stack.Navigator>
      </NavigationContainer>
    )
}
function move( {navigation} ) {
  return(
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
  <Text style={{ fontSize: 40, fontWeight: 'bold', color: '#ff0303', marginBottom: 40 }}>Select Scouting Type:</Text>
  <TouchableOpacity style={{ backgroundColor: '#ff0303', padding: 20, borderRadius: 10, marginBottom: 40 }} onPress={() => navigation.navigate('Pit')}>
    <Text style={{ fontSize: 18, color: '#FFFFFF' }}>Pit Scouting</Text>
  </TouchableOpacity>
  <TouchableOpacity style={{ backgroundColor: '#ff0303', padding: 20, borderRadius: 10 }} onPress={() => navigation.navigate('Scout')}>
    <Text style={{ fontSize: 18, color: '#FFFFFF' }}>Match Scouting</Text>
  </TouchableOpacity>
</View>

  )

}
const styles = StyleSheet.create({
    container: {
      flex: 4,
      marginTop: '50%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      fontSize: 30,
      height: 150,
    },
  button: {
    backgroundColor: '#ff0303',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    width: '50%',
    paddingBottom: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  });