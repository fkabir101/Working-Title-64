
$(document).ready(function(){

//init firebase
var config = {
  apiKey: "AIzaSyDScvYoCqRZ1ualJJXD17ycRyCl9xs_y6o",
  authDomain: "class-acivities.firebaseapp.com",
  databaseURL: "https://class-acivities.firebaseio.com",
  projectId: "class-acivities",
  storageBucket: "class-acivities.appspot.com",
  messagingSenderId: "951732836718"
};
firebase.initializeApp(config);

//firebase database referemce
database = firebase.database();


//add event listener for form submit
$("#message-submit").on("click", function(){
  
  event.preventDefault();

  //store data from input
  var msg= {
    message: $("#message-input").val().trim()
  };

  console.log(msg);

  //push new message object to database
  database.ref().push(msg);

  //clear out input field
  $("#message-input").val("");
});

//add new message to messages display when new message is added
database.ref().on("child_added", function(snapshot){

  console.log("Message: " + snapshot.val().message);

  //creates new message on page
  $(".messages-display").append("<div class='message-div p-2 mb-4 bg-primary animated pulse'>" + snapshot.val().message + "</div><br>");

});

//add event listener for for submit with enter key
$(document).keyup(function(event) {
  

  if (event.keyCode == 13) {
    event.preventDefault();

    //if input field is empty give an indicator
    if($("#message-input").val() === ""){
      $("#message-input").addClass("border border-danger");
    }
    //run if there is user input
    else{

      $("#message-input").removeClass("border border-danger");

      var msg= {
      message: $("#message-input").val().trim()
      };
  
      console.log(msg);
  
      database.ref().push(msg);
  
  
      $("#message-input").val("");
  
      database.ref().on("child_added", function(snapshot){
  
        console.log("Message: " + snapshot.val().message);
  
        $(".messages-display").append("<div class='message-div p-2 mb-4 bg-primary animated pulse'>" + snapshot.val().message + "</div><br>");
      });
    }
  }
});

});