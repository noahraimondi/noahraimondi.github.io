(function (window) {
    'use strict';
    window.opspark = window.opspark || {};
    window.opspark.collectable = window.opspark.collectable || {};
    let cannon = window.opspark.cannon;
    
    /**
     * init: Initialize all cannons.
     *
     * GOAL: Add at least 3 cannons to make your level challenging. 
     * 
     * Use the createCannon Function to create cannons for the level. 
     * 
     * createCannon() takes these arguments:
     *      
     *      createCannon(type, position, delay);
     * 
     *      type: "top", "bottom", "left", or "right"
     *      position: The position of the cannon along whichever side
     *          - the x coordinate for "top" and "bottom" cannons
     *          - the y coordinate for "left" and "right" cannons the cannon is placed on
     *      delay: OPTIONAL the number of milliseconds to wait before firing the first projectile
     */ 
    function init(game) {
        let createCannon = cannon.create;
        ////////////////////////////////////////////////////////////////////////
        // ALL YOUR CODE GOES BELOW HERE ///////////////////////////////////////
        
        createCannon("top", 10, 1000);
        createCannon("top", 870);
        createCannon("top", 872.5);
        createCannon("top", 875);
        createCannon("top", 877.5);
        createCannon("top", 880);
        createCannon("top", 882.5);
        createCannon("top", 885);
        createCannon("top", 887.5);
        createCannon("top", 890);
        createCannon("top", 892.5);
        createCannon("top", 895);
        createCannon("top", 897.5);
        createCannon("top", 900);
        createCannon("bottom", 300);
        createCannon("right", 100, 1000);
        createCannon("right", 100, 2000);
        
        // ALL YOUR CODE GOES ABOVE HERE ///////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////
    };
    cannon.init = init;
})(window);
