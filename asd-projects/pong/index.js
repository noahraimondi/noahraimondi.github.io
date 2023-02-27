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
    S: 83,
    C: 38,
    F: 40,
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

  var paddleL = GameItem(37, 200, 0, 0, "#paddle1")
  var paddleR = GameItem(BOARDWIDTH -$("#paddle2").width() -37, 200, 0, 0, "#paddle2")
  var ball = GameItem(BOARDWIDTH/2, BOARDHEIGHT/2, (Math.random() > 0.5 ? -5: 5), (Math.random() > 0.5 ? -5: 5), "#ball" )



  // one-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp);
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  
  PaddleBorder(paddleL, ball)// Sets up the paddle as a solid object for the ball to bounce off of
  PaddleBorder(paddleR, ball)

  SetYBorder(ball)
  
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
    KeyResponse(event, KEY.S, KEY.W, paddleL, 3.5)
    KeyResponse(event, KEY.F, KEY.C, paddleR, 5)
  }

  function handleKeyUp(event){
    //KeyResponse(event, KEY.S, KEY.W, paddleL, 0)
  }
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  

  function updateItem (itm){//Updates current position of the inputted factor
    itm.xPos = itm.xPos + itm.speX
    itm.yPos = itm.yPos + itm.speY
  }

  function drawItem(itm){ //Displays current position of the inputted factor
      $(itm.id).css("top", itm.yPos)
      $(itm.id).css("left", itm.xPos)
  }
  
  function KeyResponse (event, key1, key2, spe1, speed){ //Allows the inputted factor to move
    (event.which === key1) ? spe1.speY += speed: (event.which === key2) ? spe1.speY -= speed: spe1.speY = 0;
  }

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }

  /*
  function limitPosition (){
    if (walker.positionX +50 >= $("#board").width()){
      walker.positionX = $("#board").width()-$("#walker").left();
    } else if (walker.positionX <= 0){
      walker.positionX = 0;
    }
    if (walker.positionY +50 >= $("#board").height()){
      walker.positionY = $("#board").height()-50;
    } else if (walker.positionY <= 0){
      walker.positionY = 0;
    }
  }
  */

  function PaddleBorder (key1, key2){ //Reverses the speed of x when x hits y
    (key2.wid >= key1.xPos) ? key2.speX = -key2.speX :
    (key2.yPos >= key1.hei) ? key2.speY = -key2.speY : key2.speY =key2.speY
    (key2.wid >= key1.xPos) ? key2.speX = -key2.speX :
    (key2.xPos >= key1.wid) ? key2.speY = -key2.speY : key2.speY =key2.speY
  }

  function SetBorderY (key1){
    (key1.hei >= $("#board").height()) ? key1.speY = -key1.speY :
                      (key1.yPos <= 0) ? key1.speY = -key1.speY : key1.speY = key1.speY
  }

  function SetYBorder (key){
    if (key.posY === 0) {
      key.speY = -key.speY
    }
    if (key.hei === BOARDHEIGHT) {
      key.speY = -key.speY
    }
    /*
    if (positionX >= BOARDWIDTH-65) {
      speedX = -speedX
    }
    else if (positionX < 0) {
      speedX = -speedX
    }

    if ((square1.rightX > square2.leftX) && (square1.leftX < square2.rightX) &&
        (square1.topY < square2.bottomY) && (square1.bottomY > square2.topY)){
      return true;
    } else {
      return false
    }
    */
  }



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