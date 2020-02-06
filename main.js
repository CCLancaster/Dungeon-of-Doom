// ------- global variables -------

// DOM references
let game = document.getElementById("game");
let scoreBoard = document.getElementById("scoreBoard");

// global variables
let score = 0;
let endGame = false;

//setting context to our canvas
let ctx = game.getContext("2d");




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

// -- creating player, door, beam, topLine & hitBox ----
let player = new GameObject(285, 268, "#f5173c", 40, 40);

// console.log("Let's do this!");

// player.render();

let door = new GameObject((Math.random() * 470) + 10, 0, "#ffff33", 70, 10);

// door.render();

let beam = new GameObject(player.x + 3, player.y + 3, "white", 5, 5);

beam.move = function() {
    beam.y -= 10;
};

beam.fired = false;

let topLine = new GameObject(0, 0, "#BADA55", boardWidth, 5);

let hitBox = new GameObject((door.x), (door.y + door.height), "blue", 70, 70);

// hitBox.render();

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

function renderBlocks() {
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
            if (player.x - 10 > 0) {
                player.x -= 10;
            }
            break;
        case(68):
            if (player.x + 10 < (boardWidth - player.width)) {
            player.x += 10;
            }
    }
    player.render();
};

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

//render hitBox
    hitBox.render();

//render remaining blocks
  if (endGame === false) { 
   renderBlocks();
  } else {
        win();   
        renderBlocks();
        clearInterval(runGame);
        endGame = false;
  };
    
//check for collision(s)
    detectHit();
    detectLimit();
    detectObstruction();
    detectSquish();

//check for win
    // checkWin();

//move the "lazer gun"/beam with the player to target for fire (pewPew();)
    if (beam.fired === false) {
        beam.x = player.x + 3;
        beam.y = player.y + 3;
    } else {
        beam.move();
    };

    beam.render();

};

//set interval for game loop setInterval (gameLoop, 75)
// helpful timeloop article: https://isaacsukin.com/news/2015/01/detailed-explanation-javascript-game-loops-and-timing

let runGame = setInterval(gameLoop, 75);

// -----------------------------------

// ---- laser beam event listener ----
document.addEventListener("keydown", pewPewHandler);

function pewPewHandler(e) {
    //creates a small rect or "laser beam" (new GameObject.render)
        //5px x 5px
    var x = e.keyCode;
    if (x == 13) {
        console.log("I've pressed Enter!");
        beam.fired = true;
    };
};

// -----------------------------------

// --------- impendingDoom() & ceilingDrop() ---------
    //moves the topLine down by 20px every 15 seconds (15000 miliseconds)

function ceilingDrop() {
    //topLine moves down topLine.y + 20
    topLine.y += 20;

    //door moves down door.y + 20
    door.y += 20;

    //hitBox moves down hitBox.y + 20
    hitBox.y += 20;

    //alive blocks move down if (rowBlock.alive === true)... + 20
    rowOneBlocks.forEach(function(rowBlock){
        if (rowBlock.alive === true) {
            rowBlock.y += 20;
        }
    });
    rowTwoBlocks.forEach(function(rowBlock) {
        if (rowBlock.alive === true) {
            rowBlock.y += 20;
        }
    });
}

let impendingDoom = setInterval(ceilingDrop, 2000);

// -----------------------------------

// ----------- collision detection(s) -----------

//detect collision between beam & blocks
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
                    beam.fired = false;

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
                    beam.fired = false;

                    //print Kaboom!
                    document.getElementById("commentBoard")
                    .textContent = "Kaboom!";
                }
        }
    });
};

//detect collision between beam & topLine
function detectLimit() {
    if (beam.x < topLine.x + topLine.width
        && beam.x + beam.width > topLine.x
        && beam.y < topLine.y + topLine.height
        && beam.y + beam.height > topLine.y) {
            
            // console.log("Hit me baby one more time!");
            // clearInterval(runGame);
            // clearInterval(impendingDoom);
            //"reset" laser
            beam.fired = false;
    }
};

// detect collision between hitBox & blocks
    //this is to help determine win, so equal it to true/false
function detectObstruction() {
    console.log("detecting obstruction");
    let obstructionOne = true;
    let obstructionTwo = true;
    
    rowOneBlocks.forEach(function(rowBlock){
        if (rowBlock.alive === true) {
            // console.log("checking row one");
            if (rowBlock.x < hitBox.x + hitBox.width
                && rowBlock.x + rowBlock.width > hitBox.x
                && rowBlock.y < hitBox.y + hitBox.height
                && rowBlock.y + rowBlock.height > hitBox.y) {
                    // console.log("is this if statement even actually validating?");
                    // count how many hitboxes this applies to
                    // console.log(this.x);
                    //return false (if "collision", then obstruction to exit exists and game win = false)
                    obstructionOne = false;
                }
            }
            // console.log(obstructionOne);
        });
    rowTwoBlocks.forEach(function(rowBlock){
        if (rowBlock.alive === true) {
            // console.log("checking row two");
            if (rowBlock.x < hitBox.x + hitBox.width
                && rowBlock.x + rowBlock.width > hitBox.x
                && rowBlock.y < hitBox.y + hitBox.height
                && rowBlock.y + rowBlock.height > hitBox.y) {
                    //return false (if "collision", then obstruction to exit exists and game win = false)
                    obstructionTwo = false;
                }
            }
            // console.log(obstructionTwo);
        });
    
    if ((obstructionOne === false) || (obstructionTwo === false)) {
        console.log("No win yet");
    } else { 
        clearInterval(impendingDoom);
        endGame = true;
        // clearInterval(runGame);
        // console.log("win");
    };
  
};


//detect collision between player and blocks AND player and topLine
function detectSquish() {
    let blockSquishOne = false;
    let blockSquishTwo = false;
    let topLineSquish = false;
    rowOneBlocks.forEach(function(rowBlock){
        if (rowBlock.alive === true) {
            if (rowBlock.x < player.x + player.width
                && rowBlock.x + rowBlock.width > player.x
                && rowBlock.y < player.y + player.height
                && rowBlock.y + rowBlock.height > player.y) {
                    console.log("block one squish!");
                    blockSquishOne = true;
                }
            }
        });
    
    rowTwoBlocks.forEach(function(rowBlock){
        if (rowBlock.alive === true) {
            // console.log("checking row two");
            if (rowBlock.x < player.x + player.width
                && rowBlock.x + rowBlock.width > player.x
                && rowBlock.y < player.y + player.height
                && rowBlock.y + rowBlock.height > player.y) {
                    console.log("block two squish!");
                    blockSquishTwo = true;
                }
            }
        });
    if (player.x < topLine.x + topLine.width
        && player.x + player.width > topLine.x
        && player.y < topLine.y + topLine.height
        && player.y + player.height > topLine.y) {
           console.log("topLine squish!");
           topLineSquish = true;
    };

    if (blockSquishOne == true || blockSquishTwo == true || topLineSquish == true) {
        console.log("Squish!!!");
        clearInterval(impendingDoom);
        lose();
    }
};
// -----------------------------------

// -------------- win() --------------
    //move scoreCounter up by one
        //score++;
    //print "Well look at you. You actually survived!"
    function win() {
        score++;
        scoreBoard.textContent = `SCORE: ${score}`;
        document.getElementById("commentBoard").textContent = "Well look at you. You actually survived!";
        // clearInterval(runGame);
    } 
 // -----------------------------------   

// -------------- lose() --------------
    //     print "Hmm this is most unfortunate. Care to die ::ahem:: try again?"
    function lose() {
        // clearInterval(runGame);
        document.getElementById("commentBoard")
                        .textContent = "Hmm this is most unfortunate.";
        renderBlocks();
        clearInterval(runGame);
        endGame = false;
    };
// -----------------------------------



// -------------- TODO ------------------


//stretch: gettingClose()
    //detection happened in check for win
    //print "Almost there! Fire at will"

//stretch: activate start button
    //add "Care to die ::ahem:: try again?" to lose function commentBoard
    //add "Care to tempt fate again?" to win function commentBoard

//stetch: detect collision between player and door
// function detectExit() {
//     if (player.x < door.x + door.width
//         && player.x + player.width > door.x
//         && player.y < door.y + door.height
//         && player.y + player.height > door.y) {
//             //win() 
//     }
// };

    
// ---------------------------------------


// OLD LOGIC
// ---- check for win ----
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
