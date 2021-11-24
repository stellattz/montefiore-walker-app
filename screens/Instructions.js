import React, { useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";


export default function Instructions({ route, navigation }) {
  const { title, text } = route.params;
  useEffect(() => navigation.setOptions({ title }), [title]);
  return (
    <View style={[instructionsStyles.container, {flexDirection: "column"}]}>
      <View style={instructionsStyles.container1}>
        <TouchableOpacity
          style={instructionsStyles.backButton}
          onPress={() =>
            navigation.navigate("Walker", { text: "Walker" })
          }>
          <Ionicons name="arrow-back-outline" style={instructionsStyles.backIcon} size={48}/>
        </TouchableOpacity>
      </View>
      <View style={instructionsStyles.container2}>
          <Text style={instructionsStyles.titleText}>Instructions</Text> 
          <View style={{ padding: 40 }}>
            <Text style={instructionsStyles.text}>THIS IS THE INSTRUCTION AFDKLJFD KADJ LAKFSDFFLJ</Text> 
          </View>
      </View>
    </View>
  );
}

const instructionsStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container1: {
    flex: 1,
    alignItems: 'baseline',
    paddingLeft: 40,
    paddingTop: 60,
    justifyContent: 'center',
  },
  container2: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  backButton: {
    alignItems: "center",
    backgroundColor: '#203467',
    paddingVertical: 8,
    paddingHorizontal: 24,

  },
  backIcon: {
    color: 'white',
  },  
  titleText: {
    fontSize: 40,
    fontWeight: 'bold',
  },  
  text: {
    fontSize: 24,
  }, 
});
