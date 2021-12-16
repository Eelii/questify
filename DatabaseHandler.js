import{ initializeApp } from "firebase/app";
import{ getDatabase, push, ref, onValue, update } from "firebase/database";


const firebaseConfig = {

    apiKey: "AIzaSyDKrUcvDnZYSBDKijdWN20qFjYidw1m88E",
  
    authDomain: "quest-e7b97.firebaseapp.com",

    databaseURL: "https://quest-e7b97-default-rtdb.europe-west1.firebasedatabase.app/",
  
    projectId: "quest-e7b97",
  
    storageBucket: "quest-e7b97.appspot.com",
  
    messagingSenderId: "776816605569",
  
    appId: "1:776816605569:web:2216a9c969066200361080"
  
  };
  
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const usersDb = ref(database, "questify/users");
const questsDb = ref(database, "questify/quests");
const passwordsDb = ref(database, "questify/passwords");


export function getFirebaseConfig(){
  return firebaseConfig
}
export function getQuestsDb(){
  return questsDb
}


export function getDbConfigs(){
  return({app:app, database:database, config:firebaseConfig})
}

export function getUsers(){

    var usersData;
    onValue(usersDb, (snapshot) => {
      usersData = snapshot.val();
    });
    return usersData
}

export function getUser(username){

  var usersData = getUsers()
  onValue(usersDb, (snapshot) => {
    usersData = snapshot.val();
  });
  if (usersData != undefined){
    for (let i = 0; i < usersData.length; i++) {
        if (usersData[i] != undefined){
          if(usersData[i].username == username){
            return usersData[i]
          }
        }
    }
  }
  return false
}

export function getUsernames(){

    var usersData;
    var usernamesData = [];
    onValue(usersDb, (snapshot) => {
      usersData = snapshot.val();
    });
    if (usersData != undefined){
        for (let i = 0; i < Object.keys(usersData).length; i++) {
            if ((Object.keys(usersData))[i] != undefined){
                var userId = (Object.keys(usersData))[i]
                usernamesData.push(usersData[userId].username)

            }
        }
    }
    return usernamesData
}


//------------------ PASSWORDS -----------------------
export function getPasswords(){
    const passwordsDb = ref(database, "questify/passwords");
    var passwordsData;
    onValue(passwordsDb, (snapshot) => {
      passwordsData = snapshot.val();
    });
    return passwordsData
}

// ----------------- QUESTS ---------------------------
export function getQuests() {
  const questsDb = ref(database, "questify/quests");
  var questsData;
  onValue(questsDb, (snapshot) => {
    questsData = snapshot.val();
  });
  return questsData
}

export function pushQuest(quest){
  var questGiver = quest.username;
  var newUserQuestPointBalance;
  var questGiverDbId;
  var userKeys;
  
  // Updating user's Quest Points every time they add a new Quest.
  var usersData = getUsers()
  onValue(usersDb, (snapshot) => {
    usersData = snapshot.val();
    userKeys = Object.keys(usersData)
  });
  if (usersData != undefined){
    for (let i = 0; i < userKeys.length; i++) {
        if (usersData[userKeys[i]] != undefined){
          if(usersData[userKeys[i]].username == questGiver){
            questGiverDbId = userKeys[i];
            newUserQuestPointBalance = usersData[userKeys[i]].questPoints-quest.payout;
          }
        }
    }
  }
  var tmpUserDb = ref(database, `questify/users/${questGiverDbId}`);
  update(tmpUserDb, {questPoints:newUserQuestPointBalance});
  // Pushing the new Quest to DB after finding the user´s DB ID and updating their Quest Points.
  push(questsDb, quest);
}

export function pushNewUser(username, password, firstName, lastName){

  // TODO: Save password as a hash in production!
  var user = {
    username:username,
    password:password,
    firstName:firstName,
    lastName:lastName,
    questPoints:100,
    experiencePoints:0
  }
  push(usersDb,user);
}

export function pushNewQuestDoer(quest, username){
  const questsDb = ref(database, "questify/quests");
  const usersDb = ref(database, "questify/users");
  var questsData;
  var questId;
  onValue(questsDb, (snapshot) => {
    questsData = snapshot.val();
    //console.log(questsData)
    var questIds = Object.keys(questsData);
    questIds.map((mappedQuestId)=>{
      if (questsData[mappedQuestId].questName == quest.questName && questsData[mappedQuestId].username == quest.username){
        questId = mappedQuestId;
      }
    })
  });

  var usersData;
  var userId;
  onValue(usersDb, (snapshot) => {
    usersData = snapshot.val();
    var userIds = Object.keys(usersData);
    userIds.map((mappedUserId)=>{
      if (usersData[mappedUserId].username == username){
        userId = mappedUserId
      }
    })
  });

  const userQuestsDb = ref(database, `questify/users/${userId}/currentQuests`)
  var userQuestsData;
  var questIdInDatabase = false;
  onValue(userQuestsDb, (snapshot) => {
    userQuestsData = snapshot.val();
    if (userQuestsData != undefined){ 
      var userQuestsIds = Object.keys(userQuestsData);
      userQuestsIds.map((mappedUserQuestId)=>{
        if(userQuestsData[mappedUserQuestId] == questId){
          questIdInDatabase = true
        }
      })
    }
  })
  if (questIdInDatabase == false){
    push(userQuestsDb, questId);
    return true
  }
  return false
}

// -------------- DB --------------------

export function getDb(){
  const db = ref(database, "questify");
  var dbData;
  onValue(db, (snapshot) =>{
    dbData = snapshot.val()
  });
  return dbData
}