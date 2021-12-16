import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button, Vibration } from 'react-native';

import MapView, { Marker} from "react-native-maps";

export default function AddQuestMapScreen({ route, navigation }){

    [userMarker, setUserMarker] = useState({latlng:{latitude:0,longitude:0}})
    const questLocationConfirmed = route.params.questLocationConfirmed;
    const setQuestLocationConfirmed = route.params.setQuestLocationConfirmed;
    const currentLocation = route.params.currentLocation;

    useEffect(()=>{
        setQuestLocationConfirmed(false);
    },[])
    
    return(
        <View style={styles.mainContainer}>
            <MapView   
                initialRegion={{latitude:currentLocation.coords.latitude, longitude:currentLocation.coords.longitude, latitudeDelta:0.0322, longitudeDelta:0.0221,}}
                style={{alignSelf:"stretch", height:"90%"}}
                onPress={(e)=>{setUserMarker({latlng: e.nativeEvent.coordinate});
                }}
                >
                <Marker coordinate={{latitude:userMarker.latlng.latitude, longitude:userMarker.latlng.longitude}} pinColor="white"/>
                <Marker coordinate={{latitude:currentLocation.coords.latitude, longitude:currentLocation.coords.longitude}} pinColor="cyan" title="You are here" isPreselected="true"/>
            </MapView>

            <View style={{height:"10%", width:"100%", backgroundColor:"orange"}}>
                <Button title="Add Quest location" 
                    onPress={()=>{
                        Vibration.vibrate(10);
                        setQuestLocationConfirmed(true)
                        navigation.navigate("Add Quest", {userMarker:userMarker, questLocationConfirmed:questLocationConfirmed, setQuestLocationConfirmed:setQuestLocationConfirmed})
                    }}
                    style={{width:"100%", height: "100%"}}>
                </Button> 
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    textBox: {
        marginTop: 20,
        height: 40,
        width: 200,
        borderRadius: 10,
        backgroundColor: "white"
    },
    loginButton: {
        marginTop: 40
    }
});