var shiftOn = false;
//function for the document
$(document).ready(function(){

  //this is to hide the taskbar when the page loads
  $(".task-bar").hide();
  $(".online-users-togg").hide();

  //this function makes the task button show and hide and show the task div
  $("#taskButton").click(function(){
   console.log("taskButton ");
    $(".task-bar").toggle();
  });

  //this function makes the user button hide and show the users online div
  $("#usersButton").click(function(){
    console.log("usersButton");
     $(".online-users-togg").toggle();
   });
 //curly for $(document).ready(function()

$("#message-submit").on("click", function () {
  event.preventDefault();

  //if input field is empty give an indicator
  if ($("#textInput").val() === "") {
    $("#textInput").addClass("border border-danger");
  }

  //run if there is user input
  else {

    //remove highlight on message inoput field
    $("#textInput").removeClass("border border-danger");

    var inputField = $("#textInput");
    var message = inputField.val().trim();
    writeFirebase(message);
    //clear out message input field
    $("#textInput").val("");
  }
});

  //run only if shift key is held down
  $(document).keydown(function(event){
    if(event.keyCode === 16){
      shiftOn = true;
      console.log(shiftOn);
    }
  });

  $(document).keyup(function(event){
    if(event.keyCode === 16){
    shiftOn = false;
    console.log(shiftOn);
    }
  });


  //add event listener for submit with enter key
  $(document).keyup(function(eventE) {
  

    if (eventE.keyCode === 13 && shiftOn) {
      event.preventDefault();

      console.log(eventE.keyCode);
      //if input field is empty give an indicator
      if($("#textInput").text() === ""){
        $("#textInput").addClass("border border-danger");
        console.log(shiftOn);
      }
      
      //run if there is user input
      else {

        //remove highlight on message inoput field
        console.log(shiftOn);
        $("#textInput").removeClass("border border-danger");
    
        var inputField = $("#textInput");
        var message = inputField.val().trim();
        writeFirebase(message);
        //clear out message input field
        $("#textInput").val("");
      }
    }
  });

});