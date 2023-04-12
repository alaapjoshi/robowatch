import {React, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Dev({ navigation }) {
    function clearAllData() {
        AsyncStorage.getAllKeys()
            .then(keys => AsyncStorage.multiRemove(keys))
            .then(() => alert('Data Cleared'));
    }
    return (
    <>
    <Text style={styles.item}>
        Please only touch these settings if you know what you are doing
    </Text>
    <Button onPress={clearAllData}title="Clear Async Storage">
    </Button>
    </>
    )

}

const styles = StyleSheet.create({
    item: {
      alignItems: 'center',
      justifyContent: "center"
    },
  });