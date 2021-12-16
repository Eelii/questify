import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Pressable, Vibration } from 'react-native';
import{ initializeApp } from "firebase/app";
import{ getDatabase, ref, onValue } from "firebase/database";
import { getPasswords, getFirebaseConfig } from './DatabaseHandler';
import { LinearGradient } from 'expo-linear-gradient';


export default function LoginScreen({ route, navigation }){

    const [username, setUsername] = useState("");
    const [users, setUsers] = useState({});
    const [usernames, setUsernames] = useState([]);
    [password, setPassword] = useState("");
    [passwordMessage, setPasswordMessage] = useState("Please log in");
    [passwordsDbData, setPasswordsDbData] = useState(undefined);
    [user, setUser] = useState({});


    // --------------- FIREBASE --------------------------------

    const firebaseConfig = getFirebaseConfig()

    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
    const questsDb = ref(database, "questify/quests");
    const usersDb = ref(database, "questify/users");

    // -----------------------------------------------------------

    function LoginButton(props) {
        const { onPress, title = 'Log in' } = props;
        return (
          <Pressable style={styles.loginButton} onPress={onPress}>
            <Text style={styles.loginText}>{title}</Text>
          </Pressable>
        );
    }

    function RegisterButton(props) {
        const { onPress, title = 'Register' } = props;
        return (
          <Pressable style={styles.registerButton} onPress={onPress}>
            <Text style={styles.registerText}>{title}</Text>
          </Pressable>
        );
    }

    function renderPasswordMessage(){
        return(<Text style={{fontSize:15}}>{passwordMessage}</Text>)
    }


    useEffect(()=>{
        setPasswordsDbData(getPasswords());

        onValue(usersDb, (snapshot) => {
            const data = snapshot.val();
            setUsers(Object.values(data));

            for (let i = 0; i < Object.keys(data).length; i++) {
                if ((Object.keys(data))[i] != undefined){
                    var userId = (Object.keys(data))[i]
                    var tmpUsername = data[userId].username;
                    setUsernames(...usernames, tmpUsername)
    
                }
            }
        })

    }, [])

    return(
        <View style={styles.mainContainer}>
            <View style={styles.bannerUp}>
            <LinearGradient
                colors={['rgba(0,200,100,0.8)', 'transparent']}
                style={styles.bannerUpBackground}
            />
                <Text style={{fontSize:45}}>Questify</Text>
            </View>

            <View style={styles.loginView}>
                <Text>{renderPasswordMessage()}</Text>
                <TextInput onChangeText={(text) => setUsername(text)} style={styles.textBox} placeholder="Username"></TextInput>
                <TextInput onChangeText={(text) => setPassword(text)} secureTextEntry={true} placeholder="Password" style={styles.textBox} ></TextInput>
                <LoginButton 
                    title="Log in" 
                    onPress={() =>{ 
                        Vibration.vibrate(10);
                        if (users){
                            for(let i = 0; i < Object.keys(users).length; i++){
                                var tmpUser = users[Object.keys(users)[i]]
                                    if (tmpUser.username && tmpUser.password){
                                        if(tmpUser.username==username && tmpUser.password == password){
                                            setUser(tmpUser);
                                            navigation.navigate("HomeNav", {user:user});
                                        }
                                        else{setPasswordMessage("Invalid password");}
                                    }
                                }
                            } 
                        }
                    }
                    />
                <RegisterButton title="Register" onPress={() => {
                    Vibration.vibrate(10);
                    navigation.navigate("Register")}}
                />
            </View>
        </View>
        
        )
}


const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: 'red',
    },
    bannerUp: {
        backgroundColor: "yellow",
        flex:1,
        color: "yellow",
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginView: {
        backgroundColor: "orange",
        flex:4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textBox: {
        marginTop: 20,
        textAlign: "center",
        height: 40,
        width: 200,
        borderRadius: 10,
        backgroundColor: "white",
    },
    loginButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 32,
        borderRadius: 50,
        elevation: 5,
        marginTop: 40,
        backgroundColor: 'gold',
        
      },
    loginText: {
        fontSize: 25,
        lineHeight: 25,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'rgba(0,200,0,0.8)',
      },
    registerButton: {
        backgroundColor: "black",
        top: 100,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 32,
        borderRadius: 50,
        elevation: 5,
        top: 40,
        backgroundColor: 'gold',
      
        
      },
    registerText: {
        fontSize: 25,
        lineHeight: 25,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: "rgba(0,200,0,0.8)",
    },
    bannerUpBackground: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 300,
      },
});


