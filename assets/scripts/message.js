
var shiftOn = false;

$(document).ready(function(){

  //init firebase
  var config = {
    apiKey: "AIzaSyDScvYoCqRZ1ualJJXD17ycRyCl9xs_y6o",
    uthDomain: "class-acivities.firebaseapp.com",
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

      //if input field is empty give an indicator
      if($("#message-input").val() === ""){
        $("#message-input").addClass("border border-danger");
      }
      
      //run if there is user input
      else{

        //remove highlight on message inoput field
        $("#message-input").removeClass("border border-danger");

        //store message in a variable
        var msg= {
          message: $("#message-input").val().trim()
        };
  
        console.log(msg);


        //push msg into database
        database.ref().push(msg);
  
        //clear out message input field
        $("#message-input").val("");
      }

  });


  //run only if shift key is held down
  $(document).keydown(function(event){
    if(event.keyCode === 16){
      shiftOn = true;
      console.log(event.keyCode);
      console.log(shiftOn);
    }
  });

  $(document).keyup(function(event){
    if(event.keyCode === 16){
    shiftOn = false;
    console.log(event.keyCode);
    console.log(shiftOn);
    }
  });


  //add event listener for submit with enter key
  $(document).keyup(function(eventE) {
  

    if (eventE.keyCode === 13 && shiftOn) {
      event.preventDefault();

      console.log(eventE.keyCode);
      //if input field is empty give an indicator
      if($("#message-input").val() === ""){
        $("#message-input").addClass("border border-danger");
      }
      
      //run if there is user input
      else{

        //remove highlight on message inoput field
        $("#message-input").removeClass("border border-danger");

        //store message in a variable
        var msg= {
          message: $("#message-input").val().trim()
        };
  
        console.log(msg);


        //push msg into database
        database.ref().push(msg);
  
        //clear out message input field
        $("#message-input").val("");
      }
    }
  });
    

  //creates new message on page when new message is added
  database.ref().on("child_added", function(snapshot){
  
    console.log("Message: " + snapshot.val().message);

    $(".messages-display").append("<div class='message-div p-2 mb-4 bg-primary text-white animated pulse'>" + snapshot.val().message + "</div><br>");
  });

});