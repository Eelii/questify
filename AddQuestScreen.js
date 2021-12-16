import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView, Alert} from 'react-native';
import RadioButtonRN from 'radio-buttons-react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Slider} from '@miblanchard/react-native-slider';
import { pushQuest } from './DatabaseHandler';
import * as Location from'expo-location';
import { Button} from '@shoutem/ui';



export default function AddQuestScreen({ route, navigation }) {


    [payout, setPayout] = useState(0);
    [questName, setQuestName] = useState("");
    [questCompletionConditions, setQuestCompletionConditions] = useState(["INITIAL"]);
    [questCompletionConditionText, setQuestCompletionConditionText] = useState("");
    [difficulty, setDifficulty] = useState("");
    [userQuestPoints, setUserQuestPoints] = useState("");
    const [maxpayout, setMaxpayout] = useState(0);
    const [currentLocation, setCurrentLocation] = useState(null);
    const userMarker = route.params.userMarker;
    
    const conditionTextInputRef = React.useRef();

    // Datetime picker -----------------------------------

    var oldDate = new Date();
    var newDate = new Date();
    newDate.setTime(oldDate.getTime() + (30 * 60 * 1000));
    const [date, setDate] = useState(new Date(newDate));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const endDateTime = selectedDate || date;
        setShow(Platform.OS === 'ios');
        console.log(date.getDate())
        setDate(endDateTime)
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
        setDate(date)
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    //----------------------------------------------

    useEffect(()=>{
        setQuestCompletionConditions([]);

        (async() => {
            let  {status} = await Location.requestForegroundPermissionsAsync();
            if  (status !== 'granted') {
                Alert.alert('No permission to get location')
                return;}
            let location = await Location.getCurrentPositionAsync({});
            setCurrentLocation(location);
        })();
        setMaxpayout(route.params.user.questPoints);
    }, [])

    const difficultyData = [
        {
          label: "easy"
         },
         {
          label: "medium"
         },
         {
         label: "hard"
         }
        ];

    // 
    
    function renderQuestCompletionConditions(){
        const listItems = questCompletionConditions.map((condition => <Text style={{fontSize: 18}}>- {condition}</Text>));
        return(<View>{listItems}</View>)
    }

    function renderQuestNameLine(){
        if(questName != ""){
            return(<View style={{backgroundColor:"greenyellow", height:10, width:"100%", marginTop: 20}}></View>)
        }
        else{
            return(<View style={{backgroundColor:"peru", height:10, width:"100%", marginTop: 20}}></View>)
        }

    }

    function renderQuestConditionsLine(){
        if(questCompletionConditions.length > 0){
            return(<View style={{backgroundColor:"greenyellow", height:10, width:"100%", marginTop: 20}}></View>)
        }
        else{
            return(<View style={{backgroundColor:"peru", height:10, width:"100%", marginTop: 20}}></View>)
        }
    }

    function renderQuestDifficultyLine(){
        if(difficulty != ""){
            return(<View style={{backgroundColor:"greenyellow", height:10, width:"100%", marginTop: 20}}></View>)
        }
        else{
            return(<View style={{backgroundColor:"peru", height:10, width:"100%", marginTop: 20}}></View>)
        }
    }

    function renderQuestPayoutLine(){
        if(payout > 0){
            return(<View style={{backgroundColor:"greenyellow", height:10, width:"100%", marginTop: 20}}></View>)
        }
        else{
            return(<View style={{backgroundColor:"peru", height:10, width:"100%", marginTop: 20}}></View>)
        }
    }

    function renderQuestDateTimeLine(){
        if(date != newDate){
            return(<View style={{backgroundColor:"greenyellow", height:10, width:"100%", marginTop: 20}}></View>)
        }
        else{
            return(<View style={{backgroundColor:"peru", height:10, width:"100%", marginTop: 20}}></View>)
        }
    }
    
    function renderQuestLocationLine(){
        if(Object.values(userMarker).length > 0){

            return(<View style={{backgroundColor:"greenyellow", height:10, width:"100%", marginTop: 20}}></View>)
        }
        else{
            return(<View style={{backgroundColor:"peru", height:10, width:"100%", marginTop: 20}}></View>)
        }
    }

    function renderAddQuestText(){
        if (questName != "" && questCompletionConditions.length > 0 && difficulty != "" && payout > 0 && date != newDate && Object.values(userMarker).length > 0){
            return <Text style={{fontSize:30, color:"greenyellow"}}>Add Quest</Text>
        }
        else{
            return <Text style={{fontSize:30, color:"peru"}}>Add Quest</Text>
        }
    }

    return(
        <ScrollView style={styles.scrollView}>
        <View style={styles.mainContainer}>

            <View style={{justifyContent:"center", alignItems:"center"}}>
                <Text style={{fontSize:20}}>Quest name</Text>
                <Text style={{fontSize:23, marginTop:10}}>{questName}</Text>
                <TextInput placeholder="Input your quest name" onChangeText={name=>{setQuestName(name)}} style={styles.textBox}></TextInput>
            </View>

            {renderQuestNameLine()}

            <View style={{justifyContent:"center", alignItems:"center"}}>
            <Text style={{fontSize:20}}>Completion conditions:</Text>

            {renderQuestCompletionConditions()}
            
            <TextInput placeholder="Input completion condition" onChangeText={value=>{setQuestCompletionConditionText(value)}}  ref={conditionTextInputRef} style={styles.textBox}></TextInput>
            </View>
            <Button title="Add completion condition" onPress={()=>{
                    setQuestCompletionConditions([...questCompletionConditions,questCompletionConditionText]);
                    conditionTextInputRef.current.clear()
                }} styleName="right-icon" style={{padding: 5, margin:5, height: 50}}>
                <Text>Add completion condition</Text>
            </Button>

            {renderQuestConditionsLine()}

            <Text style={{fontSize:20}}>Choose Quest difficulty:</Text>
            <RadioButtonRN
                data={difficultyData}
                selectedBtn={(button) => setDifficulty(button["label"])}
                style={{flexDirection:"column"}}
                boxStyle={{backgroundColor:"yellow"}}
                animationTypes={["pulse","shake"]}
            />

            {renderQuestDifficultyLine()}

            <Text style={styles.payoutText}>Payout: {payout} Quest Points</Text>
            <Slider
                    value={payout}
                    maximumValue={maxpayout}
                    minimumValue={0}
                    step={1}
                    onValueChange={(value) => {setPayout(value);}}
            />

            {renderQuestPayoutLine()}

        <View style={styles.timeframeView}>
        <Text style={{fontSize:20}}>Ending at {date.getHours()}:{date.getMinutes()} o'clock in {date.getDate()}th of {getMonthStr(date.getMonth())} {date.getFullYear()}</Text>
         
                <Button onPress={showDatepicker} title="Show date picker" styleName="right-icon" style={{padding: 5, margin:5, height: 40, width: 200}}>
                    <Text>Choose Quest end date</Text>
                </Button>
        
                <Button onPress={showTimepicker} title="Show time picker!" styleName="right-icon" style={{padding: 5, margin:5, height: 40, width: 200}}>
                    <Text>Choose Quest end time</Text>
                </Button>
   
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                    />
                )}
                
            </View>

            {renderQuestDateTimeLine()}

            <Button title="Add location" onPress={()=>{navigation.navigate("Add quest map", { currentLocation:currentLocation})}} styleName="right-icon" style={{padding: 5, margin:5, height: 100}}>
                    <Text style={{fontSize:25}}>Add Quest location</Text>
            </Button>

            {renderQuestLocationLine()}

            <Button title="Add quest" onPress={()=>{
                
                var dateObj = {
                    day: date.getDate(),
                    month: getMonthStr(date.getMonth()),
                    year: date.getFullYear(),
                    hour: date.getHours(),
                    minutes: date.getMinutes()
                    }
                var markerVar = userMarker;
                if (Object.keys(markerVar)!="latlng"){
                        markerVar = {latlng:{latitude:currentLocation.coords.latitude, longitude:currentLocation.coords.longitude}}
                    }
                var quest = {
                    questName:questName, 
                    payout:payout, 
                    compCond:questCompletionConditions, 
                    difficulty:difficulty,
                    date:dateObj,
                    marker:markerVar,
                    username:user.username
                }
                var alertFlag = false
                Object.keys(quest).map(function(key, index) {
                    if (quest[key] == undefined || quest[key] == "" || quest[key].length == 0){
                        if (key != "compCond" && alertFlag != true){
                            Alert.alert(`Please fill all the fields.`)
                            alertFlag = true
                        }   
                    } 
                  });
                if (alertFlag == false){
                    pushQuest(quest);
                    setTimeout(navigation.goBack,
                        1500
                    )
                   Alert.alert("Quest added! Returning to home screen.");
                }
            }}
            styleName="right-icon" style={{padding: 5, margin:5, height: 100}}>
                {renderAddQuestText()}
            </Button>
        </View>
        </ScrollView>
    )
}


function getMonthStr(monthNum){
    let b;
    monthNum = monthNum+1
    switch(monthNum){
        
        case 1: b = "January";
            break;
        case 2: b = "February";
            break;
        case 3: b = "March";
            break;
        case 4: b = "April";
            break;
        case 5: b = "May";
            break;
        case 6: b = "June"; 
            break;
        case 7: b = "July";
            break;
        case 8: b = "August";
            break;
        case 9: b = "September";
            break;
        case 10: b = "October";
            break;
        case 11: b = "November";
            break;
        case 12: b = "December";
            break;
        }
        return b
}

const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: 'orange',
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
        flex:4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textBox: {
        marginTop: 20,
        height: 40,
        width: 200,
        borderRadius: 10,
        backgroundColor: "white",
    },
    loginButton: {
        marginTop: 1000,
        borderRadius: 100
    },
    payoutText: {
        fontSize: 20
    },

    timeframeView:{
        flex: 3,
    },

    timeFrameTimeButton:{
        width: "100px",
        color:"yellow",
        backgroundColor:"orange"
    },
    timeFrameDateButton:{
        height:"100px"
    },
    scrollView: {
        backgroundColor: 'pink',
        marginHorizontal: 0,
    },
    condition: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    }
    
    
});
