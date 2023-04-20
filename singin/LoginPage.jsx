import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
const auth = getAuth();


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    if (email && password) {
      setLoggedIn(true);
    }
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    const user = userCredential.user;
    }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
  };

  if (loggedIn) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Welcome, {email}!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        {/* Include your logo here */}
        <Image
        source={"RoboRaiderVector.png"}
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
  logoContainer: {
    // Add styling for logo container here
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

export default LoginPage;
