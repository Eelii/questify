import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Vibration} from 'react-native';
import { Title, NavigationBar, ImageBackground, Button } from '@shoutem/ui';
import { LinearGradient } from 'expo-linear-gradient';
import { initializeApp } from "firebase/app";
import { getDatabase, push, ref, onValue, update } from "firebase/database";
import { getFirebaseConfig } from './DatabaseHandler';

export default function HomeScreen({ route, navigation }) {

    const firebaseConfig = getFirebaseConfig();
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
    const usersDb = ref(database, "questify/users");

    const [loggedUser, setLoggedUser] = useState(undefined);
   

    var usersData;
    useEffect(()=>{
        onValue(usersDb, (snapshot) => {
            usersData = snapshot.val();
            if (usersData != undefined){
                var usersDataKeys = Object.keys(usersData);
                for (let i = 0; i < usersDataKeys.length; i++) {
                    if (usersData[usersDataKeys[i]] != undefined){
                      if(usersData[usersDataKeys[i]].username == user.username){
                        setLoggedUser(usersData[usersDataKeys[i]])
                      }
                    }
                }
            }
        });

        
        return () => {
            usersData = undefined
          }
    }, [])


    return(
        <View style={styles.mainContainer}>
            <View style={styles.contentContainer}>
            <ImageBackground source={{uri: 'https://wallpapercave.com/wp/wp3209923.jpg'}} style={{ width: 375, height: 100 }}>
            </ImageBackground>
        
                <View style={styles.helloView}>
                <LinearGradient
                colors={['rgba(255,100,0,0.8)', 'transparent']}
                style={styles.bannerUp}>
            
                    <Text style={styles.helloText}>Hello {user.firstName} {user.lastName}!</Text>

                    <Button 
                        title="Add a new Quest" 
                        onPress={() => {
                            Vibration.vibrate(10);
                            navigation.navigate("Add Quest", {user:loggedUser})
                        }} 
                        styleName="right-icon" style={{padding: 5, margin:5, height: 100}}>
                        <Text style={{fontSize:30}}>Add a new Quest</Text>
                    </Button>

                    <Button title="Show current Quests" 
                        onPress={()=> {
                            Vibration.vibrate(10);
                            navigation.navigate("Current Quests", {user:loggedUser})
                            }} 
                        styleName="right-icon" style={{padding: 5, margin:5, height: 100}}>
                        <Text style={{fontSize:30}}>Show my current Quests</Text>
                    </Button>

                </LinearGradient>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    contentContainer: {
      flex: 1,
      backgroundColor: 'red',
    },
    mainContainer: {
        backgroundColor: "yellow",
        color: "red",
        flex: 1
    },
    bannerUp: {
        backgroundColor: "yellow",
        flex:1,
        color: "yellow",
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginView: {
        backgroundColor: "blue",
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textBox: {
        marginTop: 20,
        height: 40,
        width: 200,
        borderRadius: 10,
        backgroundColor: "red",
    },
    loginButton: {
        marginTop: 1000,
        borderRadius: 100
    },
    helloText: {
        fontSize: 30
    },
    helloView: {
        flex: 3
    },

});