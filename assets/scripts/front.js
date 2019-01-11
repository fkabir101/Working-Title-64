//function for the document
$(document).ready(function(){

  //this is to hide the taskbar when the page loads
  $(".task-bar").hide();
  // $(".online-users-togg").hide();

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

}); //curly for $(document).ready(function()