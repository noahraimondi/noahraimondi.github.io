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
  function GameItem (x, y, speedX, speedY, id){//Sets up
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
  // Variables
  var paddleL = GameItem(37, 200, 0, 0, "#paddle1")
  var paddleR = GameItem(BOARDWIDTH -$("#paddle2").width() -37, 200, 0, 0, "#paddle2")
  var ball = GameItem(BOARDWIDTH/2, BOARDHEIGHT/2, Math.random() > 0.5 ? -3 : 3, Math.random() > 0.5 ? -3 : 3, "#ball")
  var scoreL = 0
  var scoreR = 0

  // One-time setup
  let interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  //$(document).on('keyup', handleKeyUp);// Not Used
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
      //Renders the object and its motion
    itemAction(ball)
    itemAction(paddleL)
    itemAction(paddleR)
      //Prevents the ball from going through the paddle
    paddle()
      //Prevents the objects from passing the y-axis walls
    setBoundaryY(ball, "ball")
    setBoundaryY(paddleL, "paddle")
    setBoundaryY(paddleR, "paddle")
      //Updates the score counter for the players
    scoreSystem()
      //What happens when a player gets to the needed points
    endCondition()
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event){//Responds too any key that is pushed
    //KeyResponse(event, KEY.S, KEY.W, paddleL, 3.5)
    //KeyResponse(event, KEY.F, KEY.C, paddleR, 3.5)
    if (event.which === KEY.W){
      paddleL.speY = -5; 
    }
    if (event.which === KEY.S){
      paddleL.speY = 5;
    };
    if (event.which === KEY.C){
      paddleR.speY = -5;
    }
    if (event.which === KEY.F){
      paddleR.speY = 5;
    }
  }
  //function handleKeyUp(event){}// Not used due to how the code is set
  
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  ///// Item Position Setup /////
  function itemAction (itm){// Simplifies repetitive code
    updateItem(itm)
    drawItem(itm)
  }
  function updateItem (itm){//Updates current position of the inputted factor
    itm.xPos = itm.xPos + itm.speX
    itm.yPos = itm.yPos + itm.speY
  }
  function drawItem(itm){ //Displays current position of the inputted factor
      $(itm.id).css("top", itm.yPos)
      $(itm.id).css("left", itm.xPos)
  }

  ///// Key Press Setup /////
  function KeyResponse (event, key1, key2, spe1, speed){ //Allows the inputted factor to move
    (event.which === key1) ? spe1.speY += speed: (event.which === key2) ? spe1.speY -= speed: spe1.speY = 0;
    /*
    (event.which === KEY.S) ? paddleL.speY += 1: 
    (event.which === KEY.W) ? paddleL.speY -= 1: paddleL.speY = 0;
    (event.which === KEY.F) ? paddleR.speY += 1: 
    (event.which === KEY.C) ? paddleR.speY -= 1: paddleR.speY = 0;
    */
  }
  




















  ///// Speed Collision Setup /////
  function paddle (){//Sets up the paddle to reflect the ball when hit
    if (doCollide(paddleL, ball)){
      ball.speX = -ball.speX
      ballChange(0.5)
    }
    if (doCollide(paddleR, ball)){
      ball.speX = -ball.speX
      ballChange(0.5)
    }
  }
  function doCollide  (obj1, obj2){//Returns true or false if obj1 has or hasn't intersected obj2
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
  function ballChange(speed){// adds speed based around whether the speed is negative or positive
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
  function setBoundaryY (obj, key){//Determines how the object reacts to the top and bottom walls
    obj.topY = obj.yPos;
    obj.bottomY = obj.yPos + $(obj.id).height();
    
    if (key == "paddle"){//Made to stop at the wall
      if (obj.topY < 0){
        obj.speY = 0
        obj.yPos = 0
      }
      if (obj.bottomY > BOARDHEIGHT){
        obj.speY = 0
        obj.yPos =  BOARDHEIGHT - obj.hei
      }
    }
    if (key == "ball"){//Made to reverse the speed of the object
      if (obj.topY < 0){
        obj.speY = -obj.speY
      }
      if (obj.bottomY > BOARDHEIGHT){
        obj.speY = -obj.speY
      }
    }
  }

  ///// Point System Setup /////
  function scoreSystem (){//Reduces repetitive code
    scoreSet()
    scoreDraw()
  }
  function scoreSet (){//Sets up how points are scored
    ball.leftX = ball.xPos;
    ball.rightX = ball.xPos + $(ball.id).width();
    if (ball.leftX < 0){
      if (scoreL !== 0){
        scoreL -= 1
      }
      scoreR = scoreR + 2
      afterScore();
    } else if (ball.rightX > BOARDWIDTH){
      if (scoreR !== 0){
        scoreR -= 1
      }
      scoreL = scoreL + 2
      afterScore();
    }
  }
  function scoreDraw (){//Updates the scoring text
    $("#score1").text("Player 1:" + scoreL)
    $("#score2").text("Player 2:" + scoreR)
  }
  function afterScore (){//Resests the position of the ball
    ball.speX = Math.random() > 0.5 ? -3 : 3
    ball.speY = Math.random() > 0.5 ? -3 : 3
    ball.xPos = BOARDWIDTH/2
    ball.yPos = BOARDHEIGHT/2
  }

  ///// End The Game /////
  function endCondition (){//What is needed to win
    if (scoreL == 30){
      winEvent("1")
    }
    if (scoreR == 30){
      winEvent("2")
    }
  }
  function winEvent (num){//Effect of winning the game
    $("#end").text("Player " + num + " Wins!!!")
    endGame()
  }
 function endGame (){//Ends the game
    // stop the interval timer
    clearInterval(interval);
    // turn off event handlers
    $(document).off();
  }
}