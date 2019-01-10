//Firebase Initializing
var config = {
  apiKey: "AIzaSyAtV5oSDfkqynEAiy_-TfbcF85v9Fw3SSU",
  authDomain: "working-title-64.firebaseapp.com",
  databaseURL: "https://working-title-64.firebaseio.com",
  projectId: "working-title-64",
  storageBucket: "",
  messagingSenderId: "968103234065"
};
firebase.initializeApp(config);

// Declare variables
database = firebase.database();
chatLog = firebase.database().ref("chatLog");
var messageCounter = 0;

// Run on load to get message counter
database.ref().once("value", function(snapshot) {
  // Check to see if message counter exists
  if(snapshot.child("messageCounter").exists()){
    messageCounter = snapshot.val().messageCounter;
  }
    console.log("Counter "+ messageCounter);
    for(var i =0; i < 4; i++){
      writeFirebase();
    }

});

// get last message typed
chatLog.orderByChild("index").limitToLast(1).on("child_added", function(snapshot) {
  console.log(snapshot.val().index);
});

//write to firebase
function writeFirebase(){
  var messageObject = {
    message : "Hi",
    index : messageCounter
  }
  messageCounter++;
  database.ref("chatLog").push(messageObject);
  database.ref().child("messageCounter").set(messageCounter);
}
