import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer} from "@react-navigation/native";
import { createStackNavigator} from "@react-navigation/stack";
import HomeScreen from './HomeScreen';
import AddQuestScreen from './AddQuestScreen';
import CurrentQuestsScreen from './CurrentQuestsScreen';
import ShowQuestScreen from './ShowQuestScreen';
import AddQuestMapScreen from './AddQuestMapScreen';




const Stack = createStackNavigator();


export default function HomeScreenNav() {
  const [userMarker, setUserMarker] = useState({})
  const [questLocationConfirmed, setQuestLocationConfirmed] = useState(false)
  


  return (
      <NavigationContainer independent={true}>
        <Stack.Navigator>      
            <Stack.Screen name="Home" component={HomeScreen} options={{ header: () => null }} initialParams={{user:user}}  /> 
            <Stack.Screen 
                name="Add Quest" 
                component={AddQuestScreen}
                options={{headerStyle:{backgroundColor:"darkorange"},headerStatusBarHeight:20}}
                initialParams={{userMarker:userMarker, questLocationConfirmed:questLocationConfirmed, setQuestLocationConfirmed:setQuestLocationConfirmed}}
            /> 
            <Stack.Screen 
                name="Add quest map" 
                component={AddQuestMapScreen} 
                options={{headerStyle:{backgroundColor:"orange"},headerStatusBarHeight:20, headerTitle:"Add Quest location"}} 
                initialParams={{userMarker:userMarker, questLocationConfirmed:questLocationConfirmed, setQuestLocationConfirmed:setQuestLocationConfirmed}}  
            /> 
            <Stack.Screen name="Current Quests" component={CurrentQuestsScreen} options={{headerStatusBarHeight:20}}/>
            <Stack.Screen name="Show Quest" component={ShowQuestScreen} options={{headerStatusBarHeight:20}}/>
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