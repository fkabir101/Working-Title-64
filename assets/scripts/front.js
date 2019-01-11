//function for the document
$(document).ready(function(){
 
  //this function makes the task button show and hide and show the task div
  $("#taskButton").click(function(){
   console.log("taskButton");
    //true if hidden, false if visable
    var hidden = true;

    if (hidden === false){
    $("task-bar").hide();
    hidden = true;
  }
    if (hidden === true){
    $("task-bar").show();
    hidden = false;
  }
  });

  //this function makes the user button hide and show the users online div
  $("#usersButton").click(function(){
    console.log("usersButton");
     //true if hidden, false if visable
     var hidden = true;
 
     if (hidden === false){
     $("online-users").hide();
     hidden = true;
   }
     if (hidden === true){
     $("online-users").show();
     hidden = false;
   }
   });

}); //curly for $(document).ready(function()