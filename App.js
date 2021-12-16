import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WelcomeNav from "./WelcomeNav";
import HomeNav from './HomeNav';
import { NavigationContainer } from '@react-navigation/native';



export default function App() {
  
  return (
    <NavigationContainer>
    <WelcomeNav>
      <HomeNav></HomeNav>
    </WelcomeNav>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
