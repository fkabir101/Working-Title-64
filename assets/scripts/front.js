var shiftOn = false;
//function for the document
$(document).ready(function () {

  $(".container-jumbo").html("<h4 class=text-center>" + moment().format("MMM Do YY") + "<h4>");
  //this is to hide the taskbar when the page loads
  $(".task-bar").hide();
  $(".online-users-togg").hide();


  // //this hides the page and displays the login button on page load
  // $(".container-body").hide();


  //this function makes the task button show and hide and show the task div
  $("#taskButton").click(function () {
    // console.log("taskButton ");
    $(".task-bar").toggle();
  });

  //this function makes the user button hide and show the users online div
  $("#usersButton").click(function () {
    // console.log("usersButton");
    $(".online-users-togg").toggle();
  });

}); //curly for $(document).ready(function()
var shiftOn = false;

$("#message-submit").on("click", function () {
  event.preventDefault();
  //if input field is empty give an indicator
  if ($("#textInput").val().length === 0) {
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
    updateScroll();
  }


});

//run only if shift key is held down
$(document).keydown(function (event) {
  if (event.keyCode === 16) {
    shiftOn = true;
  }
});

$(document).keyup(function (event) {
  if (event.keyCode === 16) {
    shiftOn = false;
  }
});


//add event listener for submit with enter key
$(document).keyup(function (eventE) {


  if (eventE.keyCode === 13 && shiftOn === false) {
    event.preventDefault();

    // console.log(eventE.keyCode);
    //if input field is empty give an indicator

    if ($("#textInput").val().length === 1) {
      $("#textInput").val("");
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

// clear task
$("#taskBody").on("click", ".clearTask", function () {
  event.preventDefault();
  var index = $(this).attr("index");
  database.ref(taskRefrence[index]).remove();
  $(`#task${index}`).remove();
  
});

//this function sets the width of the jumbotron so the text does not go off screen
// $(".msg-block").css({
//   width: container - jumbo.width
// })
