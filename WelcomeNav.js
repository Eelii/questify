import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer} from "@react-navigation/native";
import { initializeApp } from "firebase/app";
import{ getDatabase, push, ref, onValue } from "firebase/database";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator} from "@react-navigation/stack";
import HomeNav from "./HomeNav";
import { getUsernames, getPasswords } from "./DatabaseHandler";
import RegisterScreen from "./RegisterScreen";
import LoginScreen from './LoginScreen';




const firebaseConfig = {

  apiKey: "AIzaSyDKrUcvDnZYSBDKijdWN20qFjYidw1m88E",

  authDomain: "quest-e7b97.firebaseapp.com",

  databaseURL: "https://quest-e7b97-default-rtdb.europe-west1.firebasedatabase.app/",

  projectId: "quest-e7b97",

  storageBucket: "quest-e7b97.appspot.com",

  messagingSenderId: "776816605569",

  appId: "1:776816605569:web:2216a9c969066200361080"

};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);


const Stack = createStackNavigator();


export default function WelcomeNav() {

  /*[username, setUsername] = useState("admin");
  [password, setPassword] = useState("admin");
  [usernames, setUsernames] = useState([]);
  [passwords, setPasswords] = useState([]);*/


  /*useEffect(() => {
    /*const saveItem= () =>{
      push(ref(database, 'users/'), {'username':"hello", 'password':"helloooo"});
    }
    console.log("User saved");
    
    setPasswords(getPasswords());
    setUsernames(getUsernames());

  },[])

  useEffect(() => {
    console.log("USERNAMES:")
    console.log(usernames)
    console.log("PASSWORDS:")
    console.log(passwords)
  },[usernames, passwords])*/

  return (
      <Stack.Navigator initialRouteName="Login">      
        <Stack.Screen name="Login" component={LoginScreen} options={{ header: () => null }}  /> 
        <Stack.Screen name="Register" component={RegisterScreen} options={{}} />
        <Stack.Screen name="HomeNav" component={HomeNav} options={{ header: () => null }} />
      </Stack.Navigator>   
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