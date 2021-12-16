import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer} from "@react-navigation/native";
import { initializeApp } from "firebase/app";
import{ getDatabase, push, ref, onValue } from "firebase/database";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator} from "@react-navigation/stack";

import { getUsernames, getPasswords } from "./DatabaseHandler";
import RegisterScreen from "./RegisterScreen";
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import AddQuestScreen from './AddQuestScreen';
import AddQuestMapScreen from './AddQuestMapScreen';




const Stack = createStackNavigator();




export default function QuestScreenNav(route, navigation) {

const [userMarker, setUserMarker] = useState({})
const [questLocationConfirmed, setQuestLocationConfirmed] = useState(false)

  useEffect(()=>{
    console.log(`QuestScreenNav, questLocationConfirmed: ${questLocationConfirmed}`)
    console.log(`QuestScreenNav, userMarker: ${userMarker}`)
    
  }, [])


  return (
      <NavigationContainer independent={true}>
        <Stack.Navigator>      
            <Stack.Screen 
                name="Add quest" 
                component={AddQuestScreen}
                options={{headerStyle:{backgroundColor:"orange"},headerStatusBarHeight:20}}
                initialParams={{userMarker:userMarker, questLocationConfirmed:questLocationConfirmed, setQuestLocationConfirmed:setQuestLocationConfirmed}}
            /> 
            <Stack.Screen 
                name="Add quest map" 
                component={AddQuestMapScreen} 
                options={{headerStyle:{backgroundColor:"orange"},headerStatusBarHeight:20, headerTitle:"Add Quest location"}} 
                initialParams={{userMarker:userMarker, questLocationConfirmed:questLocationConfirmed, setQuestLocationConfirmed:setQuestLocationConfirmed}}  
            /> 
        </Stack.Navigator> 
      </NavigationContainer>  
    );

}

const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: 'red',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });