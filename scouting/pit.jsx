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

export default function pit() {
    return (

    <View style={styles.center}>
    <Text>
        where can this team place cubes?


    </Text>
    <Text>
        where can this team place cones
        {/* 
        eg low mid high
        */}
    </Text>
    <Text>
        where can this team pick up cubes
        {/* 
        eg station or ground
        */}
    </Text>
    <Text>
        where can this team pick up cones
    </Text>
    <Text>
        can this team autobalance
    </Text>
    <Text>
        how many pieces does their auto do
    </Text>
    <Text>
        can this team auto align to gamepieces
    </Text>
    <Text>
        can this team auto align to april tags or reflective tape?
    </Text>
    <Text>
        does this team have an auto for when they enter the substation to pick up pieces?
    </Text>
    
</View>
    )

}
const styles = StyleSheet.create({
    center: {
      alignItems: 'center',
      justifyContent: 'center',

    }
  });