import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Button, Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";


export default function Walker({ navigation }) {

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

  var batteryPercentage = 100;

  var batteryImage = (batteryPercentage) => {
    if (batteryPercentage == 100)  
      batteryImage = require('./../assets/battery100.png');
    else if (batteryPercentage >= 80 && batteryPercentage < 100)  
      batteryImage = require('./../assets/battery80.png');
    else if (batteryPercentage >= 60 && batteryPercentage < 80)  
      batteryImage = require('./../assets/battery60.png'); 
    else if (batteryPercentage >= 40 && batteryPercentage < 60)  
      batteryImage = require('./../assets/battery40.png'); 
    else if (batteryPercentage >= 20 && batteryPercentage < 40)  
      batteryImage = require('./../assets/battery20.png'); 
    else if (batteryPercentage >= 0 && batteryPercentage < 20)  
      batteryImage = require('./../assets/battery-low.png'); 
    else
      batteryImage = require('./../assets/battery-charging.png'); 
    return batteryImage;
  };

  return (
    <View style={[walkerStyles.container, {flexDirection: "column"}]}>
      <View style={walkerStyles.container1}>
        <View style={{ flex: 1, padding: 24 }}>
          {isLoading ? <ActivityIndicator/> : (
            <FlatList
              data={data}
              keyExtractor={({ entry_id }, index) => entry_id}
              renderItem= {({ item }) => (
                batteryPercentage = item.field1,
                <View style={walkerStyles.container1}>
                  <Image 
                    source={batteryImage(batteryPercentage)} 
                    style={walkerStyles.batteryImage}
                  />
                  <Text style={walkerStyles.text}>{batteryPercentage}% remaining</Text>
                </View>
              )}
            />
          )}
        </View>
      </View>
      <View style={walkerStyles.container2}>
        <TouchableOpacity
          style={walkerStyles.diagnosticsButton}
          onPress={() =>
            navigation.navigate("Diagnostics", { text: "Diagnostics" })
          }>
          <View style={[walkerStyles.container, {paddingLeft: 20, flexDirection: "row"}]}>
            <View style={{flex:1}}>
              <Image 
                source={require('./../assets/diagnostics.png')}
                style={walkerStyles.diagnosticsImage}
              />
            </View>
            <View style={{flex:2}}>
              <Text style={walkerStyles.text}>Diagnostics</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

}

const walkerStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container1: {
    flex: 3,
    paddingTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: "black",
    borderTopWidth: 2,
  },
  diagnosticsButton: {
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 24,
  },
  text: {
    fontSize: 30,
  },  
  diagnosticsIcon: {
    color: "black",
  },  
  batteryImage: {
    height: 160,
    width: 360,
    margin: 30,
  },
  diagnosticsImage: {
    height: 80,
    width: 80,
  },
});
