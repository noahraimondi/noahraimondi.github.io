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
    B: 32,
  }

  const BOARDWIDTH = $("#board").width()
  const BOARDHEIGHT = $("#board").height()
  // Game Item Objects

  //var spam = Math.random() > 0.5 ? -3 : 3

    /*
  function spam (event){
    if (event.which === KEY.B){
      Math.random() > 0.5 ? -3 : 3
    } else{
      0
    }
  }
  */

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
    item.rPos = item.xPos + $(id).width()
    item.bPos = item.yPos + $(id).height()
    return item
  }

  var paddleL = GameItem(37, 200, 0, 0, "#paddle1")
  var paddleR = GameItem(BOARDWIDTH -$("#paddle2").width() -37, 200, 0, 0, "#paddle2")
  var ball = GameItem(BOARDWIDTH/2, BOARDHEIGHT/2, Math.random() > 0.5 ? -3 : 3, Math.random() > 0.5 ? -3 : 3, "#ball" )

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
    //Renders the object
    drawItem(paddleL)
    drawItem(paddleR)
    drawItem(ball)
    //Updates the position based on speed
    updateItem(paddleL)
    updateItem(paddleR)
    updateItem(ball)

    ballBorder(ball)
    
    paddle()
  }
  
  /* 
  Called in response to events.
  */
 
  function handleKeyDown(event){
    KeyResponse(event, KEY.S, KEY.W, paddleL, 3.5)
    KeyResponse(event, KEY.F, KEY.C, paddleR, 3.5)
    ballStart(event, KEY.B)
    ballStart (event, KEY.B)
  }

  function handleKeyUp(event){// Not used due to how the code is set
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

  function ballStart (event, key){
    if (event.which === key){
      key.speY = Math.random() > 0.5 ? -3 : 3;
      key.speX = (Math.random() > 0.5) ? -3 : 3;
    }
  }

  function paddle (){
    if (doCollideX(paddleL, ball)){
      ball.speX = -ball.speX
      ballChange(0.5)
      console.log("hit")
    }
    if (doCollideX(paddleR, ball)){
      ball.speX = -ball.speX
      ballChange(0.5)
    }
  }

  function doCollideX (obj1, obj2){ 
    obj1.leftX = obj1.xPos;
    obj1.topY = obj1.yPos;
    obj1.rightX = obj1.xPos +$(obj1.id).width();
    obj1.bottomY = obj1.yPos +$(obj1.id).height();
  
    obj2.leftX = obj2.xPos;
    obj2.topY = obj2.yPos;
    obj2.rightX = obj2.xPos +$(obj2.id).width();
    obj2.bottomY = obj2.yPos +$(obj2.id).height();
  
    if ((obj1.rightX > obj2.leftX) && (obj1.leftX < obj2.rightX) &&
        (obj1.topY < obj2.bottomY) && (obj1.bottomY > obj2.topY)){
      return true;
    } else {
      return false
    }  
  }

  function ballChange(speed){
    if ((ball.speX * -1) > 0){
      ball.speX += -speed
    } else{
      ball.speX += speed
    }
    
    if ((ball.speY * -1) > 0){
      ball.speY += -speed
    } else{
      ball.speY += speed
    }
  }




  function PaddleBorder (key1, key2){ //Reverses the speed of x when x hits y
    if (key1.yPos == key2.yPos -12) {
      key1.speY = -key1.speY
    }
    if (key1.yPos -12 == key2.yPos) {
      key1.speY = -key1.speY
    }
  }

  function ballBorder (key){
    if (key.yPos == 0) {
      key.speY = -key.speY
    }
    if (key.yPos == BOARDHEIGHT) {
      key.speY = -key.speY
    }
    if (key.xPos == 0) {
      key.speX = -key.speX
    }
    if (key.xPos == BOARDWIDTH) {
      key.speX = -key.speX
    }
  }

  function endGame() {
    // stop the interval timer
    clearInterval(interval);
    // turn off event handlers
    $(document).off();
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