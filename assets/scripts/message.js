var config = {
  apiKey: "AIzaSyDScvYoCqRZ1ualJJXD17ycRyCl9xs_y6o",
  authDomain: "class-acivities.firebaseapp.com",
  databaseURL: "https://class-acivities.firebaseio.com",
  projectId: "class-acivities",
  storageBucket: "class-acivities.appspot.com",
  messagingSenderId: "951732836718"
};
firebase.initializeApp(config);

database = firebase.database();

var msg = "";

$("#message-submit").on("click", function(){
  
  msg = $("#message-input").val().trim();


  database.ref().set({
    message: msg
  });


  $("#message-input").val("");
});

database.ref().on("value", function(snapshot){

  console.log("Message: " + snapshot.val().message);

  $(".messages-display").append("<div class='message-div d-inline-flex p-2 mb-4 bg-primary text-white'>" + snapshot.val().message + "</div><br>");

});

