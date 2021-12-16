import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';


import { Title, NavigationBar, ImageBackground } from '@shoutem/ui';
import { LinearGradient } from 'expo-linear-gradient';


export default function MeScreen({ route, navigation }) {
    const user = route.params.user;
    const [quotes, setQuotes] = useState([]);

    useEffect(()=>{
        fetch("https://type.fit/api/quotes")
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            setQuotes(data);
        });
    },[])

    function getAuthor(author){
        if(author != null){
            return author
        }
        else{return "unknown"}
    }
    function renderQuote(){

        if (quotes.length > 0){
            const rand = Math.floor(Math.random() * quotes.length)
            return(
                <View style={styles.quoteView}>
                    <Text style={{textAlign:"center", fontWeight: '500', fontStyle: 'italic', fontSize:25}}>{quotes[rand].text}</Text>
                    <Text style={{textAlign:"right", fontSize:15}}>~{getAuthor(quotes[rand].author)}</Text>
                </View>
            )
        }
    }
    return(
   
        <View style={styles.mainContainer}>
            <ImageBackground source={{uri: 'https://i0.wp.com/thebroadsideonline.com/wp-content/uploads/2021/02/Music-Events_Dancing-QP_v4.png?ssl=1'}} style={{ width: 375, height: 300 }}>
              <NavigationBar centerComponent={<Text style={styles.textGlowing}>Way to go!</Text>}/>
            </ImageBackground>
        <View style={styles.contentContainer}></View>
            <LinearGradient colors={['rgba(0,0,0,0.8)', 'transparent']} style={styles.bannerUpBackground}/>
        
            {renderQuote()}
            <View style={styles.questPointsView}>
                <Text style={{textAlign:"center", fontSize: 20}}>You currently have <Text style={styles.questPoints}>{user.questPoints}</Text> quest points.</Text>
            </View>

            <View style={styles.experiencePointsView}>
                <Text style={{textAlign:"center", fontSize: 20}}>You have gained <Text style={styles.experiencePoints}>{user.experiencePoints}</Text> experince points.</Text>
            </View>
        

        </View>


    )
}

const styles = StyleSheet.create({
    mainContainer: {
      backgroundColor: 'white',
    },
    contentContainer: {
      flex: 1,
      backgroundColor: 'white',
      justifyContent: "center",
      alignContent: "center"
    },
    questPointsView:{
      justifyContent: "center",
      alignContent: "center",
    },
    experiencePointsView:{
      justifyContent: "center",
      alignContent: "center"
    },
    quoteView:{
        justifyContent: "center",
        alignContent: "center"
    },
    questPoints: {
        color: "orange"
    },
    experiencePoints:{
        color: "orange"
    },
      bannerUpBackground: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 300,
      },
      textGlowing: {
        color:"orange",
        textShadowColor: 'rgba(0, 200, 200, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 15,
        zIndex: 100
      }
});