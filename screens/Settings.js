import React from "react";
import { StyleSheet, Button, Text, TouchableOpacity, View } from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";


export default function Settings({ navigation }) {

  return (
    <View style={settingsStyles.container}>
      <Text style={settingsStyles.text}>Connect to a new walker</Text>
      <TouchableOpacity
        style={settingsStyles.button}
      >
        <Ionicons name="add-circle" style={settingsStyles.plusIcon} size={300}/>
      </TouchableOpacity>
    </View>
  );

}

const settingsStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: "center",
    backgroundColor: 'rgba(52, 52, 52, 0)',
    padding: 15,
  },
  text: {
    fontSize: 30,
  },  
  plusIcon: {
    color: 'green',
  },  
});
