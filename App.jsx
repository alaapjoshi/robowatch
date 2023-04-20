import React, { useState,useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';


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
    console.log('asd')
    setsingined(true)
            /*
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setsingined(user.uid)
        const storeColor = async (value) => {
          try {
            await AsyncStorage.setItem("login", user.uid);
          } catch (e) {
            console.log("umm...");
          }
        };
        storeColor()
        
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      });
      */
  };

  if (singined) {
    return (
    <App2/>
    )
  }
  else {
  return (
    <View style={styles.container}>
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}
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
  button: {
    height: 50,
    width: '100%',
    backgroundColor: '#0077FF',
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
