import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer} from "@react-navigation/native";
import { createStackNavigator} from "@react-navigation/stack";
import MapScreen from './MapScreen';
import ShowQuestScreen from './ShowQuestScreen';

const Stack = createStackNavigator();

export default function HomeScreenNav() {
  

  return (
      <NavigationContainer independent={true}>
        <Stack.Navigator>      
            <Stack.Screen name="Map" component={MapScreen} options={{ header: () => null }} initialParams={{user:user}}  /> 
            <Stack.Screen name="Show quest" component={ShowQuestScreen} options={{headerStatusBarHeight:20}}/> 
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