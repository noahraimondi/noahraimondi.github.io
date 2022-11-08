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
  var positionWX = 0; // the x-coordinate location
  var positionWY = 0; // the y-coordinate location
  var speedWX = 0; // the speed for the x-axis
  var speedWY = 0; // the speed for the y-axis
  var positionAX = 0;
  var positionAY = 0;
  var speedAX = 0;
  var speedAY = 0;
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
    noTouch ();
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
    positionWX += speedWX;
    positionAX += speedAX;
    positionWY += speedWY;
    positionAY += speedAY;
  }
  // 
  function redrawGameItem (){
    $("#walker").css("left", positionWX);
    $("#agatha").css("left", positionAX);
    $("#walker").css("top", positionWY);
    $("#agatha").css("top", positionAY);
  }

  function limitPosition (){
    if (positionWX >= 390){
      positionWX = 390;
    } else if (positionWX <= 0){
      positionWX = 0;
    }
    if (positionWY >= 390){
      positionWY = 390;
    } else if (positionWY <= 0){
      positionWY = 0;
    }
    if (positionAX >= 390){
      positionAX = 390;
    } else if (positionAX <= 0){
      positionAX = 0;
    }
    if (positionAY >= 390){
      positionAY = 390;
    } else if (positionAY <= 0){
      positionAY = 0;
    }
  }

  function noTouch (){
    if (positionWX = positionAX){
      if (positionWX === -5){
        positionWX -= 10; 
      } else if (positionWX === 5){
        positionWX += 10;
      } else if (positionAX === -5){
        positionAX -= 10; 
      } else if (positionAX === 5){
        positionAX += 10;
      }
    }
    if (positionWY = positionAY){
      if (positionWY === -5){
        positionWY -= 10; 
      } else if (positionWY=== 5){
        positionWY += 10;
      } else if (positionAY === -5){
        positionAY -= 10; 
      } else if (positionAY === 5){
        positionAY += 10;
      }
    }
  }

  // Only of walker
  function respondKeyDownW (event){
    if(event.which === KEYW.DOWN){
      console.log("Down pressed"); 
      speedWY = +5;
    } else if(event.which === KEYW.LEFT){
      speedWX = -5;
      console.log("Left pressed");
    } else if(event.which === KEYW.RIGHT){
      speedWX = +5;
      console.log("Right pressed");
    } else if(event.which === KEYW.UP){
      speedWY = -5;
      console.log("Up pressed");
    }
  }
  
  function respondKeyUpW (event){
    if(event.which === KEYW.DOWN){
      console.log("Down released"); 
      speedWY = 0;
    } else if(event.which === KEYW.LEFT){
      speedWX = 0;
      console.log("Left released");
    } else if(event.which === KEYW.RIGHT){
      speedWX = 0;
      console.log("Right released");
    } else if(event.which === KEYW.UP){
      speedWY = 0;
      console.log("Up released");
    }
  }

// Only for agatha
function respondKeyDownA (event){
  if(event.which === KEYA.DOWN){
    console.log("Down pressed"); 
    speedAY = +5;
  } else if(event.which === KEYA.LEFT){
    speedAX = -5;
    console.log("Left pressed");
  } else if(event.which === KEYA.RIGHT){
    speedAX = +5;
    console.log("Right pressed");
  } else if(event.which === KEYA.UP){
    speedAY = -5;
    console.log("Up pressed");
  }
}

function respondKeyUpA (event){
  if(event.which === KEYA.DOWN){
    console.log("Down released"); 
    speedAY = 0;
  } else if(event.which === KEYA.LEFT){
    speedAX = 0;
    console.log("Left released");
  } else if(event.which === KEYA.RIGHT){
    speedAX = 0;
    console.log("Right released");
  } else if(event.which === KEYA.UP){
    speedAY = 0;
    console.log("Up released");
  }
}













  

















  
}
