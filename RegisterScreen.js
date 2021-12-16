import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Alert, Pressable, Vibration} from 'react-native';
import { getUsernames, pushNewUser } from './DatabaseHandler';

export default function RegisterScreen({ route, navigation }){
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRe, setPasswordRe] = useState("");
    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const userPasswordInput = useState("");
    const [usernames, setUsernames] = useState(undefined);

    useEffect(()=>{
        setUsernames(getUsernames());
    }, [])


    function RegisterButton(props) {
        const { onPress, title = 'Register' } = props;
        return (
          <Pressable style={styles.registerButton} onPress={onPress}>
            <Text style={styles.registerText}>{title}</Text>
          </Pressable>
        );
    }

    return(
    <View style={styles.mainContainer}>
        <TextInput onChangeText={(text) => setFirstName(text)} style={[styles.textBox]} placeholder="First name"></TextInput>
        <TextInput onChangeText={(text) => setLastName(text)} style={styles.textBox} placeholder="Last name"></TextInput>
        <TextInput onChangeText={(text) => setUsername(text)} style={styles.textBox} placeholder="Username"></TextInput>
        <TextInput onChangeText={(text) => setPassword(text)} secureTextEntry={true} placeholder="Password" style={styles.textBox} ></TextInput>
        <TextInput onChangeText={(text) => setPasswordRe(text)} secureTextEntry={true} placeholder="Re-type password" style={styles.textBox} ></TextInput>
        <RegisterButton 
            title="Register" 
            onPress={() =>{ 
                        Vibration.vibrate(10);
                        if (password != passwordRe){
                            Alert.alert("Passwords don't match.")
                        }
                        else if (usernames.includes(username)){
                            Alert.alert("Sorry, that username is already taken.")
                        }
                        else if (password == "" || passwordRe == ""){
                            Alert.alert("Please fill both password fields.")
                        }
                        else if (username == ""){
                            Alert.alert("Give an username to register.")
                        }
                        else if (lastName == ""){
                            Alert.alert("Give a last name to register.")
                        }
                        else if (firstName == ""){
                            Alert.alert("Give a first name to register.")
                        }
                        else{
                            setTimeout(navigation.goBack,
                                1500
                            )
                            pushNewUser(username, password, firstName, lastName)
                            Alert.alert("Registration successful!");
                        }
                    }}
                    color="orange"/>

    </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: 'orange',
      alignItems:"center"
    },
    bannerUp: {
        backgroundColor: "yellow",
        flex:1,
        color: "yellow",
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
    registerButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 50,
        paddingHorizontal: 32,
        borderRadius: 50,
        elevation: 5,
        top: 40,
        backgroundColor: 'yellowgreen',
        
      },
    registerText: {
        fontSize: 25,
        lineHeight: 25,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
});