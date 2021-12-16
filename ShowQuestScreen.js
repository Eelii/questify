import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable, Alert, Vibration } from 'react-native';
import { pushNewQuestDoer, getDbConfigs } from './DatabaseHandler';
import{ getDatabase, push, ref, onValue } from "firebase/database";
import { Heading, Button} from '@shoutem/ui';


export default function ShowQuestScreen({ route, navigation }){

    const quest = route.params.quest;
    const user = route.params.user;
    const [userState, setUserState] = useState({});
    const [userQuestIds, setUserQuestIds] = useState([]);
    const dbConfigs = getDbConfigs();
    const usersDb = ref(dbConfigs.database, "questify/users");
    const questsDb = ref(dbConfigs.database, "questify/quests");
    const [questActive, setQuestActive] = useState(false);

    useEffect(()=>{
        setQuestActive(false);
        setUserQuestIds([]);
        onValue(usersDb, (snapshot) => {
            const data = snapshot.val();
            const userIds = Object.keys(data);
            userIds.map((userId)=>{
                if (data[userId].username == user.username){
                    if(data[userId].currentQuests != undefined){
                        setUserQuestIds(Object.values(data[userId].currentQuests))
                    }
                }
            })
            userQuestIds.map((q)=>{console.log(q)}) 
        })
        onValue(questsDb, (snapshot)=>{
            const data = snapshot.val();
            const questIds = Object.keys(data);
            questIds.map((questId)=>{

                if(data[questId].questName == quest.questName && data[questId].username == quest.username){
                    if (userQuestIds.includes(questId)){setQuestActive(true)}
                }
            })
        })
    },[])
    
    function renderStartQuestButton(difficulty){
 
        if (questActive == true){
            return(
            <View style={{alignItems:"center", justifyContent:"center", width: "100%", marginTop: 50}}> 
                <Heading>Quest active</Heading>
            </View>)
        }
        else{
            return(
                <Button 
                        styleName="right-icon"
                        style={{padding: 5, marginTop:30, height: 100, backgroundColor: difficultyToColor(difficulty)}} 
                        onPress={()=>{
                            Vibration.vibrate(10);
                            var pushed = pushNewQuestDoer(quest, user.username)
                            if (questActive){
                                Alert.alert("This Quest is already active.")
                            }
                            if (pushed){
                                setTimeout(navigation.goBack,
                                    1500
                                )
                                Alert.alert("Quest activated!")
                            }
                            else{Alert.alert("Quest already active")}
                            }}>
                        <Text>Start Quest!</Text>
                </Button>
            )
        }
    }

    function renderQuestCompletionConditions(){
        if (quest.compCond != undefined){
            const conditionsList = quest.compCond.map((condition => <Text style={styles.completionConditionsText}>- {condition}</Text>));
            return(<View>
                <View style={{alignItems:"center"}}>
                    <Text style={{color: "black", fontSize:25}}>Completion conditions</Text>
                </View>
                {conditionsList}
                </View>)
        }
    }

    
    return( 
    <View style={styles.mainContainer}> 

        <View style={styles.contentContainer}>
            <View style={{backgroundColor: difficultyToColor(quest.difficulty), alignItems: "center", width: "100%"}}>
                <Text style={styles.questNameText}>{route.params.quest.questName}</Text>
                <Text>From {quest.username}</Text>
            </View>
            <View style={styles.completionConditionsView}>
                {renderQuestCompletionConditions()}
            </View> 
            <View style={{backgroundColor: difficultyToColor(quest.difficulty), height:3, width:"100%", marginTop: 15, marginBottom: 15}}/>
            <View style={styles.questEndDateView}>
                <Text style={{color:"black", fontSize:20}}>Ending at {quest.date.hour}:{quest.date.minute} o'clock in {quest.date.day}th of {quest.date.month} {quest.date.year}</Text>
            </View>
                {renderStartQuestButton(quest.difficulty)}
        </View>     
        
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
    mainContainer: {
     flex: 1
    },
    contentContainer: {
      flex: 1,
      backgroundColor: 'white',
    },
    completionConditionsView:{
        backgroundColor: "white",
    },
    completionConditionsText:{
        color: "gray",
        fontSize: 18
    },
    questNameText:{
        color: "black",
        fontSize: 50
    },
    questEndDateView:{
        backgroundColor: "white",
    },
   startQuestButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 50,
        paddingHorizontal: 32,
        borderRadius: 50,
        elevation: 5,
        top: 40,
        backgroundColor: 'orange',
   },
   startQuestText:{
        fontSize: 25,
        lineHeight: 25,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
   }
});
