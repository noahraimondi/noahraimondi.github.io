/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  const FRAME_RATE = 60;
  const FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  
  const KEY = {
    W: 87,
    A: 65,
    S: 83,
    D: 68,
    C: 38,
    F: 12,
    L: 37,
    R: 39,
  }

  const BOARDWIDTH = $("#board").width()
  const BOARDHEIGHT = $("#board").height()
  // Game Item Objects
  function GameItem (x, y, speedX, speedY, id){
    var item = {
      xPos: x,
      yPos: y,
      speX: speedX,
      speY: speedY,
      hei: $(id).height(),
      wid: $(id).width(),
      id : id,
    }
    return item
  }

  var paddleL = GameItem(10, 200, 0, 0, "#paddle1")
  var paddleR = GameItem(BOARDWIDTH -$("#paddle1").width() -10, 200, 0, 0, "#paddle2")
  var ball = GameItem(BOARDWIDTH/2, BOARDHEIGHT/2, (Math.random() > 0.5 ? -5: 5), (Math.random() > 0.5 ? -5: 5), "#ball" )



  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp);
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    drawItem(paddleL)
    drawItem(paddleR)
    drawItem(ball)

    updateItem(paddleL)
    updateItem(paddleR)
    updateItem(ball)
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event){

  }
  function handleKeyUp(event){
  }
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  function drawItem(itm){
    $(itm.id).css("top", itm.y)
    $(itm.id).css("left", itm.x)
  }

  function updateItem (itm){
    itm.x = itm.x + itm.speX
    itm.y = itm.y + itm.speY
  }
  /*
  var upL = KEY.W
  function KeyResponse (event, keyUp, keyDown, posUp, posDown, speed){
    //paddleL.yPos
    (event.which === keyUp) ? posUp += speed: (event.which === keyDown) ? posDown -= speed : console.log("Nada")
  }
  */

  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}


/*
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


*/
var upL = KEY.W
function KeyResponse (event, keyUp, keyDown, posUp, posDown, speed){
  //paddleL.yPos
  (event.which === keyUp) ? posUp += speed: (event.which === keyDown) ? posDown -= speed : console.log("Nada")
}





/* function that checks the bounderies of the walls for the ball
    ball doen't bounce but it awards a point to the other player
    ball resests in the middle
  function thatll check bounderies for paddle
  function for player score
  function score display
  function for winner instance
  function for play again button after winner is deterimened
  do Collide function for when two objects have collided
  KEY objects for the respective keys
  function for change in ball speed when the paddle is hit
  function to handle the result of the ball hitting the paddle
    ball direction change
    ball speed increase
*/