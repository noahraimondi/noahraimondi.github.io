var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            "name": "Robot Romp",
            "number": 1, 
            "speed": -3,
            "gameItems": [
                { "type": "sawblade", "x": 400, "y": groundY - 110},
                { "type": "sawblade", "x": 600, "y": groundY - 110},
                { "type": "sawblade", "x": 900, "y": groundY - 110},

                { "type": "enemy", "x": 700, "y": groundY - 20},
                { "type": "enemy", "x": 800, "y": groundY - 20},
                { "type": "enemy", "x": 900, "y": groundY - 20},

                { "type": "reward", "x": 650, "y": groundY - 20},
                { "type": "reward", "x": 750, "y": groundY - 20},
                { "type": "reward", "x": 850, "y": groundY - 20},
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE

        function createSawBlade(x,y){
            var hitZoneSize = 25; // size of hit zone
            var damageFromObstacle = 10;//   setting how much damage the object will inflict
            var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);//make the object it self
            
            sawBladeHitZone.x = x; //The x value o hit zone
            sawBladeHitZone.y = y;// y value of hit zone
            game.addGameItem(sawBladeHitZone); //adds the hit zone to the game.
            
            var obstacleImage = draw.bitmap('img/sawblade.png');//draws the image and stored it in the objewcts variable//adds the image to the hit zone
            sawBladeHitZone.addChild(obstacleImage);
            obstacleImage.x = -24.75; // lines up x value of  image 
            obstacleImage.y = -25;//lines up y value of image
            sawBladeHitZone.rotationalVelocity = 500000;
        }

        function createEnemy(x, y) {
            var enemy = game.createGameItem('enemy',25);// create the enemy game item and stores it in the variable enemy
            var redSquare = draw.rect(50,50,'red');//draws a red red square and stores it in the the var redSquare
            redSquare.x = -25;// align the square on
            redSquare.y = -25;
            enemy.addChild(redSquare);

            enemy.x = x;
            enemy.y = y;
            game.addGameItem(enemy);

            enemy.velocityX = -1;//move enemy to the left
            enemy.rotationalVelocity = 100;// rotates the enemy

            //this function detects if enemy colides with halle bot and it hit the decreases health
            enemy.onPlayerCollision = function() {
                console.log('The enemy has hit Halle');
                game.changeIntegrity(-25)
                enemy.fadeOut();
            };

            // detects if the projectile has collided with projectile and if is true then it will shrink and die.
            enemy.onProjectileCollision = function() {
                game.increaseScore(50)
                enemy.fadeOut();
            }
        }

        function createReward(x, y) {
            var reward = game.createGameItem('reward',25);// create the enemy game item and stores it in the variable enemy
            var blueSquare = draw.rect(50,50,'blue');//draws a red red square and stores it in the the var blueSquare
            blueSquare.x = -25;// align the square on
            blueSquare.y = -25;
            reward.addChild(blueSquare);

            reward.x = x;
            reward.y = y;
            game.addGameItem(reward);

            reward.velocityX = -1;//move reward to the left
            reward.rotationalVelocity = 100;// rotates the reward

            //this function detects if reward colides with halle bot and it hit the decreases health
            reward.onPlayerCollision = function() {
                console.log('The reward has hit Halle');
                game.changeIntegrity(+25)
                reward.fadeOut();
                game.increaseScore(50)
            };
        }


            for(var i = 0; i <  levelData.gameItems.length; i++){
                var gameItem = levelData.gameItems[i];

                if (gameItem.type === "sawblade"){
                    createSawBlade(gameItem.x, gameItem.y)
                }

                if (gameItem.type === "enemy"){
                    createEnemy(gameItem.x, gameItem.y)

                if (gameItem.type === "reward"){
                    createReward(gameItem.x, gameItem.y)
               }
            }

        // DO NOT EDIT CODE BELOW HERE
    }
    };
}
// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}