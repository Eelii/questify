import React, { useState, useEffect } from 'react';
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MeScreen from './MeScreen';
import HomeScreenNav from './HomeScreenNav';
import MapScreenStack from './MapScreenStack';


const Tab = createBottomTabNavigator();

export default function HomeNav({ route, navigation }){
 
    const screenOptions = ({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
            let iconName;
        
            if (route.name === 'Home') {
            iconName = 'md-home'; 
            } 
            else if (route.name === 'Map') {
                iconName = 'md-map';
            }
            else if (route.name === 'Me') {
                iconName = 'md-body-outline';
            }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      });

    return( 
    <Tab.Navigator independent={true} screenOptions={screenOptions}>      
        <Tab.Screen name="Home" component={HomeScreenNav} options={{ header: () => null }} initialParams={{user:user}} /> 
        <Tab.Screen name="Map" component={MapScreenStack} options={{ header: () => null}} />
        <Tab.Screen name="Me" component={MeScreen} options={{ header: () => null }} initialParams={{user:user}} /> 
    </Tab.Navigator>   
    )
}