import React, { useState,useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image, Alert } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import {Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;



import AsyncStorage from "@react-native-async-storage/async-storage";

import App2 from './main';
const firebaseConfig = {
  apiKey: "AIzaSyCfmW98iWLhhNtFrjy-3niS_OWPhrQTb5U",
  authDomain: "robowatch-4c113.firebaseapp.com",
  projectId: "robowatch-4c113",
  storageBucket: "robowatch-4c113.appspot.com",
  messagingSenderId: "416751963314",
  appId: "1:416751963314:web:eaae18d08b2da367298dab",
  measurementId: "G-HNHKV87TTL",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [singined, setsingined] = useState(false);
  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("login");
        if (value !== null) {
          return (
            <App2/>
          )
        }
      } catch (e) {
        console.log("umm...");
      }
    };
    getData();
  }, []);

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
    setsingined(true)
    const storeColor = async () => {
      try {
        await AsyncStorage.setItem("login", "true");
      } catch (e) {
        console.log("umm...");
      }
    };
    storeColor()
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("login");
        if (value !== null) {
          setsingined(true)
          }
      } catch (e) {
        console.log("umm...");
      }
    };
    getData();
  }, []);

  if (singined) {
    return (
      <App2/>
    )

  }
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        {/* Include your logo here */}
        <Image
        style={{height: 300, width: windowWidth - 50, marginBottom: 20}}
        source={require("./assets/RoboRaiderVector.png")}
      />
      </View>
      <Text style={styles.title}>Log in to RoboWatch</Text>

      
      <TextInput
        style={styles.input}
        placeholder='Email'
        keyboardType='email-address'
        autoCapitalize='none'
        autoCompleteType='email'
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder='Password'
        autoCapitalize='none'
        autoCompleteType='password'
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    <TouchableOpacity onPress={() =>Alert.alert("Talk to AJ")}>
        <Text style={styles.forgotPassword}>Forgot password?</Text>
    </TouchableOpacity>
      </View>    

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  input: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: "#ff0303",
    textAlign: 'center',
    marginVertical: 32,
  },
  forgotPassword: {
    color: '#1DA1F2',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 10, 
  },
  button: {
    height: 50,
    width: '100%',
    backgroundColor: '#ff0303',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  error: {
    color: '#FF0000',
    marginTop: 10,
  },
});
