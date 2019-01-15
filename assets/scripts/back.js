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

// variables for youtube player
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var youtube = "youtube.com/watch";
var twitter = "twitter.com";


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

  var index = snapshot.val().index;
  var message = snapshot.val().message;
  //console.log(snapshot.val().index);
  if (snapshot.val().type === "text") {
    $(".container-jumbo").prepend("<div id = '" + index + "'class='message-div p-2 mb-4 bg-primary text-white animated pulse animate zoomIn'>" + message + "</div>");
  } else if (snapshot.val().type === "youtube") {
    $(".container-jumbo").prepend("<div id = '" + index + "'></div>");
    $(`#${index}`).append("<div id = '" + index + "Player'></div>");
    createYoutube(index + "Player", message)
  } else if (snapshot.val().type === "tweet") {
    $(".container-jumbo").prepend("<div id = '" + index + "'></div>");
    createTweet(index, message);
  }

  //this function starts the display scrolled to the bottom of the page
  $(".container-jumbo").scrollTop($(".container-jumbo")[0].scrollHeight);

});

// get move first message
chatLog.orderByChild("index").limitToFirst(1).on("child_added", function (snapshot) {
  firstMessageRef = database.ref(`chatLog/${snapshot.key}`);
  firstMessageIndex = snapshot.val().index;
});
//write to firebase
function writeFirebase(message) {
  var type;
  // remove &api call
  if (message.includes(youtube)) {
    message = message.split("v=").pop();
    if (message.includes("&")) {
      var messageSplit = message.split("&");
      message = messageSplit[0];
    }
    type = "youtube";
  } else if (message.includes(twitter) && message.includes("status")) {
    message = message.split("status/").pop();
    type = "tweet";
  } else {
    type = "text";
  }

  var messageObject = {
    type: type,
    message: message,
    index: messageCounter,
    name: screenName
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


// this defines a variable to be redefined upon login with the user's name
var screenName = null;

// this handles the sign in through google

$(document).ready(function () {
  
  //creating instance of google provider object
  var provider = new firebase.auth.GoogleAuthProvider();
  
  //add scope
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  
  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    console.log(result);
    // The signed-in user info.
    var user = result.user;
    // ...

    console.log (user);

    //this stores the user's name from google in a variable
    user.displayName = screenName;

  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
  
});


//revome this !!!!!!!!!!!!!!!!!!!!!!
var taskCounter = 0
var testingVariableForDueDate

//this function was used to add cards to the taskbar
 $("#message-submit").on("click", function () {

  var f = "<div class='card task-inner'><div class='card-header cardHeadInner'>TASKDATE<button type='button' class='btn btn-outline-success btn-sm' id='taskClearCOUNTER'> <i class='fas fa-clipboard-check'></i></button></div><div class='card-body' id='taskBodyCOUNTER'>TASKTEXT</div></div>"

  $("#taskBody").append(f);

 });