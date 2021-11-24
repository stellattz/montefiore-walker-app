import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";


export default function Diagnostics({ route, navigation }) {

  var isSensorTLWorking = false;
  var isSensorTRWorking = false;
  var isSensorBLWorking = false;
  var isSensorBRWorking = false;

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);


   const getWalkerData = async () => {
     try {
      const response = await fetch('https://api.thingspeak.com/channels/1571940/feeds.json?api_key=AYW2U26CUOJ39BPV&results=1');
      const json = await response.json();
      setData(json.feeds);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setInterval(() => getWalkerData(), 1000);
  }, []);

  const { title, text } = route.params;
  useEffect(() => navigation.setOptions({ title }), [title]);
  return (
    <View style={[diagnosticsStyles.container, {flexDirection: "column"}]}>
      <View style={diagnosticsStyles.container1}>
        <TouchableOpacity
          style={diagnosticsStyles.backButton}
          onPress={() =>
            navigation.navigate("Walker", { text: "Walker" })
          }>
          <Ionicons name="arrow-back-outline" style={diagnosticsStyles.backIcon} size={48}/>
        </TouchableOpacity>
      </View>
      <View style={diagnosticsStyles.container2}>
        <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? <ActivityIndicator/> : (
        <FlatList
          data={data}
          keyExtractor={({ entry_id }, index) => entry_id}
          renderItem={({ item }) => (
            isSensorTLWorking = item.field2 == 1 ? "Working" : "Not Working",
            isSensorTRWorking = item.field3 == 1 ? "Working" : "Not Working",
            isSensorBLWorking = item.field4 == 1 ? "Working" : "Not Working",
            isSensorBRWorking = item.field5 == 1 ? "Working" : "Not Working",
            
            <View>
              <View style={{ marginBottom: 40 }}>
                <Text style={diagnosticsStyles.text}>Push the button to calibrate.</Text>
              </View>
              <View>
                <Text style={diagnosticsStyles.titleText}>Sensor Status</Text> 
              </View>
              <Text style={diagnosticsStyles.text1}>Sensor Top Left: </Text>
              <Text style={diagnosticsStyles.text}>{isSensorTLWorking} </Text>
              <Text> </Text>
              <Text style={diagnosticsStyles.text1}>Sensor Top Right: </Text>
              <Text style={diagnosticsStyles.text}>{isSensorTRWorking}</Text>
              <Text> </Text>
              <Text style={diagnosticsStyles.text1}>Sensor Bottom Left: </Text>
              <Text style={diagnosticsStyles.text}>{isSensorBLWorking}</Text>
              <Text> </Text>
              <Text style={diagnosticsStyles.text1}>Sensor Bottom Right: </Text>
              <Text style={diagnosticsStyles.text}>{isSensorBRWorking}</Text>
            </View>
          )}
        />
      )}
    </View>
      </View>
    </View>
  );
}

const diagnosticsStyles = StyleSheet.create({
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
    paddingHorizontal: 40,
    paddingBottom: 40,
    alignItems: 'flex-start',
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
    fontSize: 30,
    fontWeight: 'bold',
  }, 
  text: {
    fontSize: 30,
  },  
  text1: {
    fontSize: 30,
    fontStyle: 'italic',
    textDecorationLine: 'underline',
  }, 
});
