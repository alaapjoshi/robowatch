import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
//import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const auth = getAuth();

import App2 from './main';
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyCfmW98iWLhhNtFrjy-3niS_OWPhrQTb5U",
  authDomain: "robowatch-4c113.firebaseapp.com",
  projectId: "robowatch-4c113",
  storageBucket: "robowatch-4c113.appspot.com",
  messagingSenderId: "416751963314",
  appId: "1:416751963314:web:eaae18d08b2da367298dab",
  measurementId: "G-HNHKV87TTL",
};


const firebase2 = initializeApp(firebaseConfig);
const App = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    console.log(email)
    console.log(password)
    const a = "a@gmail.com"
    const b = "aaaaaa"

    signInWithEmailAndPassword(auth, a, b)
    .then((userCredential) => {
    const user = userCredential.user;
    console.log("Signed in")
    setLoggedIn(true);

    }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
  };

  if (loggedIn) {
    console.log("Loge in")
    return (
      <Text> Hello </Text>
    );
  }

  return (
    <View style={styles.container}>
      <View>
        {/* Include your logo here */}
        <Image
        style={{height: 300, width: 500}}
        source={require("./assets/RoboRaiderVector.png")}
      />
      </View>
      <Text style={styles.title}>Log in to RoboWatch</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder='Email'
        keyboardType='email-address'
        autoCapitalize='none'
        autoCompleteType='email'
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder='Password'
        secureTextEntry
        autoCapitalize='none'
        autoCompleteType='password'
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log in</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() =>Alert.alert("Talk to AJ")}>
      <Text style={styles.forgotPassword}>Forgot password?</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 32,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E1E8ED',
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    width: '100%',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#FF0303',
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  forgotPassword: {
    color: '#1DA1F2',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default App;
