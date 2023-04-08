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
  <View style={styles.container}>
  <View style={styles.center}> 
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Scout')}>
<Text style={styles.buttonText}>Match</Text>
</TouchableOpacity>
<TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Pit')}>
<Text style={styles.buttonText}>Pit</Text>
</TouchableOpacity>
  </View>
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