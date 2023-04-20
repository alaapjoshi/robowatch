import { React, useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  TextInput,
  Alert,
} from "react-native";

export default function Auto() {
  const [bottomCone, setbottomCone] = useState(0);
  const onPressbottomCone = () => setbottomCone(bottomCone => bottomCone + 1);
  const onPressbottomConedelete = () =>  {
    if (bottomCone <= 0) {}
    else {
    setbottomCone(bottomCone => bottomCone - 1);
  }
  }

  return (
    <>
    <View style={{flexDirection: 'row', paddingBottom: 40, justifyContent: "space-between",alignItems: "center", paddingHorizontal: 20}}> 

    <Text style={{fontSize: 30, marginLeft: 20,}}> 
      Cones 
    </Text>
    <Text style={{fontSize: 30,  marginRight: 20,}}> 
      Cones 
    </Text>
    </View>
    <View style={{flexDirection: 'row', paddingBottom: 40}}> 
    <TouchableOpacity style={styles.button} onPress={onPressbottomConedelete}>
  <Text style={styles.buttonText}>-</Text>
  </TouchableOpacity>
  <Text style={{fontSize: 50, paddingHorizontal: 10}}> 
    {bottomCone}
  </Text>
  <TouchableOpacity style={styles.button} onPress={onPressbottomCone}>
  <Text style={styles.buttonText}>+</Text>
  </TouchableOpacity>
  <Text style={{fontSize: 23, paddingHorizontal: 10}}>
    High
  </Text>
  <TouchableOpacity style={styles.button} onPress={onPressbottomConedelete}>
  <Text style={styles.buttonText}>-</Text>
  </TouchableOpacity>
  <Text style={{fontSize: 50, paddingHorizontal: 10}}> 
    {bottomCone}
  </Text>
  <TouchableOpacity style={styles.button} onPress={onPressbottomCone}>
  <Text style={styles.buttonText}>+</Text>
  </TouchableOpacity>
    </View>


    <View style={{flexDirection: 'row', paddingBottom: 40}}> 
    <TouchableOpacity style={styles.button} onPress={onPressbottomConedelete}>
  <Text style={styles.buttonText}>-</Text>
  </TouchableOpacity>
  <Text style={{fontSize: 50, paddingHorizontal: 10}}> 
    {bottomCone}
  </Text>
  <TouchableOpacity style={styles.button} onPress={onPressbottomCone}>
  <Text style={styles.buttonText}>+</Text>
  </TouchableOpacity>
  <Text style={{fontSize: 30, paddingHorizontal: 10}}>
    Mid   
  </Text>
  <TouchableOpacity style={styles.button} onPress={onPressbottomConedelete}>
  <Text style={styles.buttonText}>-</Text>
  </TouchableOpacity>
  <Text style={{fontSize: 50, paddingHorizontal: 10}}> 
    {bottomCone}
  </Text>
  <TouchableOpacity style={styles.button} onPress={onPressbottomCone}>
  <Text style={styles.buttonText}>+</Text>
  </TouchableOpacity>

    </View>


    <View style={{flexDirection: 'row', paddingBottom: 40}}> 
    <TouchableOpacity style={styles.button} onPress={onPressbottomConedelete}>
  <Text style={styles.buttonText}>-</Text>
  </TouchableOpacity>
  <Text style={{fontSize: 50, paddingHorizontal: 10}}> 
    {bottomCone}
  </Text>
  <TouchableOpacity style={styles.button} onPress={onPressbottomCone}>
  <Text style={styles.buttonText}>+</Text>
  </TouchableOpacity>
  <Text style={{fontSize: 30, paddingHorizontal: 10}}>
    Low
  </Text>
  <TouchableOpacity style={styles.button} onPress={onPressbottomConedelete}>
  <Text style={styles.buttonText}>-</Text>
  </TouchableOpacity>
  <Text style={{fontSize: 50, paddingHorizontal: 10}}> 
    {bottomCone}
  </Text>
  <TouchableOpacity style={styles.button} onPress={onPressbottomCone}>
  <Text style={styles.buttonText}>+</Text>
  </TouchableOpacity>
    </View>
    </>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    backgroundColor: "red",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});