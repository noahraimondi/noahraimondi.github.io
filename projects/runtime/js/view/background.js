var background = function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        /* Error Checking - DO NOT DELETE */
        if(!app) {
            throw new Error("Invalid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }
        
        // useful variables
        var canvasWidth = app.canvas.width;
        var canvasHeight = app.canvas.height;
        var groundY = ground.y;
        
        // container which will be returned
        var background;
        
        // ANIMATION VARIABLES HERE:
        var tree;
        var buildings = [];
        var bulidIt;
        // called at the start of game and whenever the page is resized
        // add objects for display in background. draws each image added to the background once
        function render() {
            background.removeAllChildren();

            // TODO: 2 - Part 2
            // this fills the background with a obnoxious yellow
            // you should modify this to suit your game
            var backgroundFill = draw.rect(canvasWidth,groundY,'#87969B'); //cREATES A VARIABLE CALLED BCKGROUND FILL a solid color that installs a rectangle that acts as the background
            background.addChild(backgroundFill); //Add the background to the canvas
            
            // TODO: 3 - Add a moon and starfield
            
            for (var i = 0; i <= 135; i++) { //The loops function for the code
            var circle = draw.circle(1,'white','yellow',2);
            circle.x = canvasWidth*Math.random(); // give random x
            circle.y = groundY*Math.random();// give random y
            background.addChild(circle);  //Add circles to background
            }          

            var moon = draw.bitmap('img/moon.png');
            moon.x = canvasWidth -200;// holds the x value
            moon.y = groundY -435;// holds the x value
            moon.scaleX = 0.1125;///Change the x scale of the moon
            moon.scaleY = 0.1125;// change the y scale of the moon
            background.addChild(moon); // adds moon to background

            //Bottom five for the building blocks for the city
            for (var i = 0; i <= 17; i++) { //The loops function for the code
                var blue = draw.bitmap('img/buildingpartBlue.png');
                blue.x = canvasWidth*Math.random(); // give random x
                blue.y = groundY -283.75;// holds the x value
                background.addChild(blue);  //Add circles to background
                blue.velocityX =-1
                } 

            for (var i = 0; i <= 5; i++) { //The loops function for the code
                var red = draw.bitmap('img/buildingpartRed.png');
                red.x = canvasWidth*Math.random(); // give random x
                red.y = groundY -226.2;// holds the x value
                background.addChild(red);  //Add circles to background
                } 

            for (var i = 0; i <= 12; i++) { //The loops function for the code
                var yellow = draw.bitmap('img/bulidingpartYellow.png');
                yellow.x = canvasWidth*Math.random(); // give random x
                yellow.y = groundY -195.75;// holds the x value
                background.addChild(yellow);  //Add circles to background
                } 

            for (var i = 0; i <= 18; i++) { //The loops function for the code
                var purple = draw.bitmap('img/buildingpartPurple.png');
                purple.x = canvasWidth*Math.random(); // give random x
                purple.y = groundY -120.75;// holds the x value
                background.addChild(purple);  //Add circles to background
                } 

            for (var i = 0; i <= 9; i++) { //The loops function for the code
                var brown = draw.bitmap('img/buildingpartBrown.png');
                brown.x = canvasWidth*Math.random(); // give random x
                brown.y = groundY -73.75;// holds the x value
                background.addChild(brown);  //Add circles to background
                }         
         
            // TODO 5: Part 1 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
            //  for(var i = 0; i < 5; i++) {
            //      var buildingHeights = [300, 250, 320, 290, 400]; // Declaired variable, buliding, holds each height
            //      var colors = ['LightBlue', 'grey', 'LightGrey', 'white', 'DarkGrey'];
            //      var building = draw.rect(75,buildingHeights[i], colors[i],colors[i],1); // deeclares variable to store buliding
            //      building.x = 200*i; // Adds 200 pixels to x value to the buliding each time the game is run
            //      building.y = groundY-buildingHeights[i];//sets the building y posituion by subtract the height of the buliding from ground y
            //      background.addChild(building);// Adds the building to the background
            //      buildings.push(building);//pushing informstion to the buliding array and store it asan index and store it as an inde
            //  }
            
            // TODO 4: Part 1 - Add a tree
           // tree = draw.bitmap('img/tree.png');
            //tree.x = canvasWidth - 500;
            //tree.y = groundY - 425;
            //tree.scaleY = 2
            //background.addChild(tree);
            
        } // end of render function - DO NOT DELETE
        
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            
            
            // TODO 4: Part 2 - Move the tree!
            //tree.x = tree.x - 10; // Takes current of value x and take 1 pixel 60/second to move the tree to the left
            // if the tree is less than -200 pixels then reasign canvasWidth to the trees x position
            //if(tree.x < -200) {//This is what makes the tree  move from thhe left side to the right side 
             //   tree.x = canvasWidth;   
           // }
            
            // TODO 5: Part 2 - Parallax
           // for (var i = 0; i < buildings.length; i++){
             //   buildings[i].x = buildings[i].x -1;
               // if (buildings[i].x < -75 ){
                 //   buildings[i].x = canvasWidth; 
               // }
            //}
        
            

        } // end of update function - DO NOT DELETE
        
        
        
        /* Make a createjs Container for the background and let it know about the render and upate functions*/
        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        /* make the background able to respond to resizing and timer updates*/
        app.addResizeable(background);
        app.addUpdateable(background);
        
        /* render and return the background */
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}
