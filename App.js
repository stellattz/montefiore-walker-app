import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { View } from 'react-native';

import Diagnostics from "./screens/Diagnostics";
import Settings from "./screens/Settings";
import Walker from "./screens/Walker";
import Instructions from "./screens/Instructions";


const RootStack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

const MyTheme = {
  dark: false,
  colors: {
    primary: 'white',
    background: '#FFF7F0',
    card: '#203467',
    text: 'rgb(255, 255, 255, 50)',
  },
  padding: 100,
};

export default function App() {
  const TabsNav = () => (
    <Tabs.Navigator 
      screenOptions={{ headerShown: true, tabBarStyle: {height: 100} }} >
      <Tabs.Screen
        name="Walker"
        component={Walker}
        options={{
          tabBarIcon: ({ size }) => <Ionicons name="stats-chart" size={40} color={"white"} />,
          tabBarStyle: {
            height: 120,
            paddingBottom: 40,
            paddingTop: 10,
          },
          tabBarLabelStyle: {
            fontSize: 20,
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 32,
          },
          headerStyle: {
            height: 120,
          },
        }}
      />
      <Tabs.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ size }) => <Ionicons name="cog" size={40} color={"white"} />,
          tabBarStyle: {
            height: 120,
            paddingBottom: 40,
            paddingTop: 10,
          },
          tabBarLabelStyle: {
            fontSize: 20,
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 32,
          },
          headerStyle: {
            height: 120,
          },
        
        }}
      />
    </Tabs.Navigator>
  );
  
  return (
    <NavigationContainer theme={MyTheme}>
      <RootStack.Navigator>

        <RootStack.Screen
          name="Tabs"
          component={TabsNav}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="Diagnostics"
          component={Diagnostics}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="Instructions"
          component={Instructions}
          options={{ headerShown: false }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
