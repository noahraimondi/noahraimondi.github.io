/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var KEYW ={
    "LEFT": 37,
    "RIGHT": 39,
    "UP": 38,
    "DOWN": 40,
  }
  var KEYA ={
    "LEFT": 65,
    "RIGHT": 68,
    "UP": 87,
    "DOWN": 83,
  }
  
  // Declared Variables
  var walker = {
    positionX: 0,
    positionY: 0,
    speedX: 0,
    speedY: 0,
  }
  var agatha = {
    positionX: 0,
    positionY: 0,
    speedX: 0,
    speedY: 0,
  }

  // Game Item Objects


  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp);                               // change 'eventType' to the type of event you want to handle
  
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem();
    redrawGameItem ();
    limitPosition ();
  }
  
  /* 
  Called in response to events.
  */
  

  function handleKeyDown(event) {
    respondKeyDownW (event);// code for when a key is pressed
    respondKeyDownA (event);
  }
  function handleKeyUp(event) {
    respondKeyUpW (event);// code for when a key is released
    respondKeyUpA (event);
  }
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off(newFrame);
  }

  // position increased based on speed
  function repositionGameItem (){
    walker.positionX += walker.speedX;
    agatha.positionX += agatha.speedX;
    walker.positionY += walker.speedY;
    agatha.positionY += agatha.speedY;
  }
  // 
  function redrawGameItem (){
    $("#walker").css("left", walker.positionX);
    $("#agatha").css("left", agatha.positionX);
    $("#walker").css("top", walker.positionY);
    $("#agatha").css("top", agatha.positionY);
  }

  function limitPosition (){
    if (walker.positionX +50 >= $("#board").width()){
      walker.positionX = $("#board").width()-50;
    } else if (walker.positionX <= 0){
      walker.positionX = 0;
    }
    if (walker.positionY +50 >= $("#board").height()){
      walker.positionY = $("#board").height()-50;
    } else if (walker.positionY <= 0){
      walker.positionY = 0;
    }
    if (agatha.positionX +50 >= $("#board").width()){
      agatha.positionX = $("#board").width()-50;
    } else if (agatha.positionX <= 0){
      agatha.positionX = 0;
    }
    if (agatha.positionY +50 >= $("#board").height()){
      agatha.positionY = $("#board").height() -50;
    } else if (agatha.positionY <= 0){
      agatha.positionY = 0;
    }
  }

   
    
    
    
    
    /* Might go back to this later in the year...
    //function noTouch (){
    
   if (walker.positionX +25 === agatha.positionX || walker.positionY +25 === agatha.positionY){
      if (walker.speedX === -5){
        walker.positionX += 5; 
      } else if (walker.speedX === 5){
        walker.positionX -= 5;
      } else if (agatha.speedX === -5){
        agatha.positionX += 5; 
      } else if (agatha.speedX === 5){
        agatha.positionX -= 5;
      } else if (walker.speedY === -5){
        walker.positionY += 5; 
      } else if (walker.speedY === 5){
        walker.positionY -= 5;
      } else if (agatha.speedY === -5){
        agatha.positionY += 5; 
      } else if (agatha.speedY === 5){
        agatha.positionY -= 5;
      }
    }
  }
  */





// Only of walker
function respondKeyDownW (event){
  if(event.which === KEYW.DOWN){
    console.log("Down pressed"); 
    walker.speedY = +5;
  } else if(event.which === KEYW.LEFT){
    walker.speedX = -5;
    console.log("Left pressed");
  } else if(event.which === KEYW.RIGHT){
    walker.speedX = +5;
    console.log("Right pressed");
  } else if(event.which === KEYW.UP){
    walker.speedY = -5;
    console.log("Up pressed");
  }
}

function respondKeyUpW (event){
  if(event.which === KEYW.DOWN){
    console.log("Down released"); 
    walker.speedY = 0;
  } else if(event.which === KEYW.LEFT){
    walker.speedX = 0;
    console.log("Left released");
  } else if(event.which === KEYW.RIGHT){
    walker.speedX = 0;
    console.log("Right released");
  } else if(event.which === KEYW.UP){
    walker.speedY = 0;
    console.log("Up released");
  }
}

// Only for agatha
function respondKeyDownA (event){
  if(event.which === KEYA.DOWN){
    console.log("Down pressed"); 
    agatha.speedY = +5;
  } else if(event.which === KEYA.LEFT){
    agatha.speedX = -5;
    console.log("Left pressed");
  } else if(event.which === KEYA.RIGHT){
    agatha.speedX = +5;
    console.log("Right pressed");
  } else if(event.which === KEYA.UP){
    agatha.speedY = -5;
    console.log("Up pressed");
  }
}

function respondKeyUpA (event){
  if(event.which === KEYA.DOWN){
    console.log("Down released"); 
    agatha.speedY = 0;
  } else if(event.which === KEYA.LEFT){
    agatha.speedX = 0;
    console.log("Left released");
  } else if(event.which === KEYA.RIGHT){
    agatha.speedX = 0;
    console.log("Right released");
  } else if(event.which === KEYA.UP){
    agatha.speedY = 0;
    console.log("Up released");
  }
}
}
