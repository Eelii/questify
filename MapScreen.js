import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Animated } from 'react-native';
import{ initializeApp } from "firebase/app";
import{ getDatabase, push, ref, onValue } from "firebase/database";
import MapView, { Marker} from "react-native-maps";
import { getFirebaseConfig } from "./DatabaseHandler"

export default function MapScreen({ route, navigation }){

    const [userMarker, setUserMarker] = useState({latlng:{latitude:0, longitude:0}})
    const [quests, setQuests] = useState([]);
    const dropdownAnim = useRef(new Animated.Value(0)).current;
    const user = route.params.user;
    
    const firebaseConfig = getFirebaseConfig();

    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
    const questsDb = ref(database, "questify/quests");

    useEffect(()=>{
        onValue(questsDb, (snapshot) => {
            const data = snapshot.val();
            setQuests(Object.values(data));
        })

        return ()=>{}
    }, []);

    return(
        <View style={styles.mainContainer}>
           
            <MapView   
                initialRegion={{latitude:60.200692, longitude:24.934302, latitudeDelta:0.0322, longitudeDelta:0.0221,}}
                style={{ height:"100%", width:"100%" }}
                onPress={(e)=>{
                    setUserMarker({latlng: e.nativeEvent.coordinate});
                }}
                >
                {
                    quests.map((quest, index) => (
                        <Marker
                            key={index}
                            coordinate={{
                            latitude: quest.marker.latlng.latitude,
                            longitude: quest.marker.latlng.longitude,
                            }}
                            title={quest.questName}
                            description={quest.username}
                            pinColor={difficultyToColor(quest.difficulty)}
                            onPress={()=>{
                                navigation.navigate("Show quest", {quest:quest, user:user})
                            }}
                        />)
                )}
            </MapView>
        </View>
    )

}


function difficultyToColor(difficulty){
    switch(difficulty){
        case "easy":
            return "green"
        case "medium":
            return "orange"
        case "hard":
            return "red"
    }
}

const styles = StyleSheet.create({
    customHeader: {
        height: "10%",
        width: "100%"
    },
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