/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  var KEY ={
    "ENTER": 13,
    "LEFT": 37,
    "RIGHT": 39,
    "UP": 38,
    "DOWN": 40,
  }
  // Declared Variables
  var positionX = 0; // the x-coordinate location
  var positionY = 0; // the y-coordinate location
  var speedX = 0; // the speed for the x-axis
  var speedY = 0; // the speed for the y-axis
  // Game Item Objects


  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp);                           // change 'eventType' to the type of event you want to handle
  
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
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown() {
    respondKeyDown ()// code for when a key is pressed
  }
  function handleKeyUp() {
    respondKeyUp ();// code for when a key is released
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

  function repositionGameItem(){
    positionX += speedX;
    positionY += speedY;
  }

  function redrawGameItem (){
    $("#walker").css("left", positionX);
    $("#walker").css("top", positionY);
  }

  function respondKeyDown (event){
    if(event.which === KEY.ENTER){
      console.log("Enter pressed");
      speedX =0;
      speedY =0;
    } else if(event.which === KEY.DOWN){
      console.log("Down pressed"); 
      speedY = +5;
    } else if(event.which === KEY.LEFT){
      speedX = -5;
      console.log("Left pressed");
    } else if(event.which === KEY.RIGHT){
      speedX = +5;
      console.log("Right pressed");
    } else if(event.which === KEY.UP){
      speedY = -5;
      console.log("Up pressed");
    } else 
    console.log("You pressed the key number " + event.which)
  }

  function respondKeyUp (event){
    if(event.which === KEY.ENTER){
      console.log("Enter released");
      speedX =0;
      speedY =0;
    } else if(event.which === KEY.DOWN){
      console.log("Down released"); 
      speedY = 0;
    } else if(event.which === KEY.LEFT){
      speedX = 0;
      console.log("Left released");
    } else if(event.which === KEY.RIGHT){
      speedX = 0;
      console.log("Right released");
    } else if(event.which === KEY.UP){
      speedY = 0;
      console.log("Up released");
    } else 
    console.log("You released the key number " + event.which)
  }

/*
function update() {	
				moveBoxTo(positionX, positionY);
				positionX = positionX + speedX;
				positionY = positionY + speedY;
				
				if (positionX >= boardWidth-65) {
					speedX = -speedX
				}
				else if (positionX < 0) {
					speedX = -speedX
				}

				if (positionY >= boardHeight-65) {
					speedY = -speedY
				}
				else if (positionY < 0) {
					speedY = -speedY
				}
			};
*/ 
















  
  
}
