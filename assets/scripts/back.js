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
var maxMessageCount = 10;
var firstMessageRef;
var firstMessageIndex;

var youtube = "youtube.com/watch";


// Run on load to get message counter
database.ref().once("value", function (snapshot) {
  // Check to see if message counter exists
  if (snapshot.child("messageCounter").exists()) {
    messageCounter = snapshot.val().messageCounter;
  }
  // writeFirebase("https://www.youtube.com/watch?v=dz2o_bVkgPA");
  // for (var i = 0; i < 15; i++) {
  //   writeFirebase(String(i));
  // }
  // console.log("Counter " + messageCounter);

});

// get last message typed
chatLog.orderByChild("index").on("child_added", function (snapshot) {
  //console.log(snapshot.val().index);
  $(".container-jumbo").append("<div id = '"+snapshot.val().index +"'class='message-div p-2 mb-4 bg-primary text-white animated pulse'><div>" + snapshot.val().message + "</div>");
});

// get move first message
chatLog.orderByChild("index").limitToFirst(1).on("child_added", function (snapshot) {
  firstMessageRef = database.ref(`chatLog/${snapshot.key}`);
  firstMessageIndex = snapshot.val().index;
});
//write to firebase
function writeFirebase(message) {
  var type;
  if (message.includes("youtube.com/watch")) {
    message = message.split("v=").pop();
    console.log(message);
    type = "youtube";
  } else {
    type = "text";
  }

  var messageObject = {
    type: type,
    message: message,
    index: messageCounter
  }
  messageCounter++;

  //Remove messages
  if (messageCounter > maxMessageCount) {
    $(`#${firstMessageIndex}`).remove();
    firstMessageRef.remove();
  }
  // Push Variables to Firebase
  database.ref("chatLog").push(messageObject);
  database.ref().child("messageCounter").set(messageCounter);
}