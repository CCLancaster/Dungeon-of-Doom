// ------- global variables -------

// DOM references
let game = document.getElementById("game");
let scoreBoard = document.getElementById("scoreBoard");
let score = 0;

// console.log(game);

//setting context to our canvas
let ctx = game.getContext("2d");

//show score
scoreBoard.textContent = `SCORE: ${score}`;

// console.log(ctx);

// find canvas width and height (will use this for game loop later)
    //this value will also be necessary to figure out where the screen limits are for object placement (aka console.log the values and do the math)
game.setAttribute("width", getComputedStyle(game)["width"]);
game.setAttribute("height", getComputedStyle(game)["height"]);

let boardWidth = game.width;
let boardHeight = game.height;


// console.log(getComputedStyle(game)["width"]);
// console.log(getComputedStyle(game)["height"]);
// -----------------------------------

// ----- creating the GameOjects -----
let GameObject = function(x, y, color, width, height) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.width = width;
    this.height = height;
    this.alive = true;
    this.render = function() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    };
};
// -----------------------------------

// -- creating player, door & beam ----
let player = new GameObject(285, 268, "#f5173c", 40, 40);

// console.log("Let's do this!");

player.render();

let door = new GameObject((Math.random() * 470) + 10, 0, "#ffff33", 70, 10);

door.render();

let beam = new GameObject(player.x, player.y, "white", 5, 5);

let topLine = new GameObject(0, 0, "#BADA55", boardWidth, 5);


// -----------------------------------

// -------- creating blocks ----------
//make a block array
let rowOneBlocks = [];
let rowTwoBlocks = [];

//for loop to push new Game Object
for (let i = 0; i < 6; i++) {
    rowOneBlocks.push(new GameObject((Math.random() * 550) + 10, 10, "#7718d8", 50, 50));
};

for (let i = 0; i < 5; i++) {
    rowTwoBlocks.push(new GameObject((Math.random() * 550) + 10, 60, "#7718d8", 50, 50));
    };

// console.log(rowOneBlocks);
// console.log(rowTwoBlocks);

//for loop to render block[i]
for (let i=0; i < 6; i++) {
    rowOneBlocks[i].render();
};

for (let i = 0; i < 5; i++) {
    rowTwoBlocks[i].render();
};
// -----------------------------------

// ------ adding player movement ------

//add event listener to key strokes A & D (use "keydown")
document.addEventListener("keydown", movementHandler);

//if A is pressed (KeyCode), move the player left
    // left changes player -= on x axis
    //if KeyCode of e === A, change player x to decrement
//if D is pressed (KeyCode), move the player right
    // right chnges player += on x axis
    // if KeyCode of e === D, change player x to increase
function movementHandler(e) {
    // console.log(player)
    switch (e.keyCode) {
        case(65):
            player.x -= 10;
            break;
        case(68):
            player.x += 10;
    }

    player.render();
};

//TODO: add restriction to movement so player can't go off screen

// -----------------------------------

// ----------- game loop -------------

let gameLoop = function () {

// console.log("I'm looping!");

//clear board
    ctx.clearRect(0, 0, game.width, game.height);

//render topLine
    topLine.render();

//render player 
    player.render();

//render door
    door.render();

//render remaining blocks
    rowOneBlocks.forEach(function(rowBlock){
        if (rowBlock.alive === true) {
            rowBlock.render();
            // console.log(rowBlock);
        }
    });
    rowTwoBlocks.forEach(function(rowBlock) {
        if (rowBlock.alive === true) {
            rowBlock.render();
            // console.log(rowBlock);
        }
    });
//check for win
    //requires collision detection
    
//check for collision(s)
    detectHit();
    detectLimit();

//move the "lazer gun"/beam with the player to target for fire (pewPew();)
    beam.x = player.x;
    beam.render();
};

//set interval for game loop setInterval (gameLoop, 75)
// helpful timeloop article: https://isaacsukin.com/news/2015/01/detailed-explanation-javascript-game-loops-and-timing

let runGame = setInterval(gameLoop, 75);

// -----------------------------------

// ---- laser beam event listener ----
document.addEventListener("keydown", pewPewHandler);

var myInterval;
function pewPewHandler(e) {
    //creates a small rect or "laser beam" (new GameObject.render)
        //5px x 5px
    var x = e.keyCode;
    if (x == 13) {
        console.log("I've pressed Enter!");
    
        beam.render();
        
        // moves small rect up 10px/500 mili
            // beam.y -= 10
        function beamMove() {
                beam.y -= 10;
        };
            
        myInterval = setInterval(beamMove, 100);
    };
    //detect collision with box or topLine (if else)
        //when collision, stop interval
        //check for win()
};

// -----------------------------------

// ------- collision detection(s) -------

//check for collision between beam and blocks
        // check four conditions:
            //smallest point of beam (beam.x) < largest point of my blocks (rowBlock.x + rowBlock.width)
            //largest point of beam (beam.x + beam.width) > smallest point of rowBlock (rowBlock.x)
            // topmost part of beam (beam.y) < greatest version of the rowBlock (rowBlock.y + rowBlock.height)
            // beam.y + beam.height > rowBlock.y
function detectHit() {
    rowOneBlocks.forEach(function(rowBlock){
        if (rowBlock.alive === true) {
            if (beam.x < rowBlock.x + rowBlock.width
                && beam.x + beam.width > rowBlock.x
                && beam.y < rowBlock.y + rowBlock.height
                && beam.y + beam.height > rowBlock.y) {
                    //change that block from alive to dead (alive = false)
                    rowBlock.alive = false;

                    //"reset" laser
                    clearInterval(myInterval);
                    beam.y = player.y;

                    //print Kaboom!
                    document.getElementById("commentBoard")
                    .textContent = "Kaboom!";
                }
        }
    });
    rowTwoBlocks.forEach(function(rowBlock){
        if (rowBlock.alive === true) {
            if (beam.x < rowBlock.x + rowBlock.width
                && beam.x + beam.width > rowBlock.x
                && beam.y < rowBlock.y + rowBlock.height
                && beam.y + beam.height > rowBlock.y) {
                    rowBlock.alive = false;

                    //"reset" laser
                    clearInterval(myInterval);
                    beam.y = player.y;

                    //print Kaboom!
                    document.getElementById("commentBoard")
                    .textContent = "Kaboom!";
                }
        }
    });
};

//check collision between laser beam and topLine
function detectLimit() {
    if (beam.x < topLine.x + topLine.width
        && beam.x + beam.width > topLine.x
        && beam.y < topLine.y + topLine.height
        && beam.y + beam.height > topLine.y) {
            //"reset" laser
            clearInterval(myInterval);
            beam.y = player.y;
    }
};

//detect collision between player and blocks AND player and topLine
// function detectSquish() {
//     if (player.x < rowBlock.x + rowBlock.width
//         && player.x + player.width > rowBlock.x
//         && player.y < rowBlock.y + rowBlock.height
//         && player.y + player.height > rowBlock.y) {
//            //lose()
//     }
//     else (player.x < topLine.x + topLine.width
//         && player.x + player.width > topLine.x
//         && player.y < topLine.y + topLine.height
//         && player.y + player.height > topLine.y) {
//            //lose()
//     };
// };


// -----------------------------------

// ---- check for win ----
    //grab hitBox (array?)
    //compare to see if any blocks are in the hitBox
        //if YES
            //check if player has collided with blocks || topLine
                //if YES
                    //lose ()
                //if NO
                    //check if gettingClose (if one block left)
                    //nothing...gameLoop should continue to run 
        //if NO
            //win()

        

// -----------------------------------


// -------------- TODO ------------------

// ---- win() ----
    //move scoreCounter up by one
        //score++;
    //print "Well look at you. You actually survived! Care to tempt fate again?"

// ---- lose() ----
    //print "Hmm this is most unfortunate. Care to die ::ahem:: try again?"
    //activate start button

// ---- gettingClose() ----
    //detection happened in check for win()
    //print "Almost there! Fire at will"

//TODO: hitBox

//TODO: impendingDoom() that moves the topLine down by 20px every 15 seconds (15000 miliseconds)
    
// -----------------------------------