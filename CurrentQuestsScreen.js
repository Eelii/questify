import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Pressable, Vibration, FlatList } from 'react-native';
import { getDbConfigs } from './DatabaseHandler';
import{ ref, onValue } from "firebase/database";
import { LinearGradient } from 'expo-linear-gradient';


export default function CurrentQuestsScreen({ route, navigation }){

    const user = route.params.user;
    const [userQuests, setUserQuests] = useState([]);
    const [userQuestIds, setUserQuestIds] = useState([]);
    const dbConfigs = getDbConfigs();
    const usersDb = ref(dbConfigs.database, "questify/users");
    const questsDb = ref(dbConfigs.database, "questify/quests");


    
    useEffect(()=>{

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
        
        return ()=>{}
    },[])

    

    useEffect(()=>{
        if (userQuests.length == 0){
        onValue(questsDb, (snapshot)=>{
            const data = snapshot.val();
            const questIds = Object.keys(data);

            questIds.map((questId)=>{
                    userQuestIds.map((userQuestId)=>{
                        if (questId == userQuestId){
                            var questToAdd = data[questId]
                            questToAdd.id = questId
                            setUserQuests(userQuests=>[...userQuests, questToAdd]);
                        }
                    })
            })
        })
        }
        return ()=>{}
    }, )

    const Item = ({ title }) => (
        <View style={styles.item}>
            <Text style={styles.title}>{title}</Text>
        </View>
    );

    const renderItem = ({ item }) => (
        <LinearGradient
                colors={['rgba(0,200,0,0.8)', 'transparent']}
                style={styles.bannerUpBackground}>
            <Pressable onPress={()=>{
                Vibration.vibrate(10);
                navigation.navigate("Show Quest", {quest:item, user:user}
                )}}>
                <Item title={item.questName} />
                <Text style={{color: difficultyToColor(item.difficulty)}}>Difficulty: {item.difficulty}</Text>
            </Pressable>
        </LinearGradient>
        
    );

    function renderFlatlist(){
        return(
        <FlatList
            data={userQuests}
            renderItem={renderItem}
            keyExtractor={item => item.id}
        />)
    }
    

    return( 
    <View style={styles.mainContainer}>      
        {renderFlatlist()}
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
      flex: 1,
      backgroundColor: 'yellow',
    },
    item: {
        
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
      },
      title: {
        fontSize: 32,
    },
});