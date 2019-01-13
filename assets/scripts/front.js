var shiftOn = false;

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
    }
  });

  $(document).keyup(function(event){
    if(event.keyCode === 16){
    shiftOn = false;
    }
  });


  //add event listener for submit with enter key
  $(document).keyup(function(eventE) {
  

    if (eventE.keyCode === 13 && shiftOn === false) {
      event.preventDefault();

      console.log(eventE.keyCode);
      //if input field is empty give an indicator
      if($("#textInput").val() === ""){
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
    }
  });