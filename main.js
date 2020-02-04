// global variables

// DOM references
let game = document.getElementById("game");

console.log(game);

//setting context to our canvas
let ctx = game.getContext("2d");

console.log(ctx);

// find canvas width and height (will use this for game loop later)
    //this value will also be necessary to figure out where the screen limits are (aka console.log the values)
game.setAttribute("width", getComputedStyle(game)["width"]);
game.setAttribute("height", getComputedStyle(game)["height"]);

console.log(getComputedStyle(game)["width"]);
console.log(getComputedStyle(game)["height"]);


// ---- creating the GameOjects ----
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

// ---- creating player and door ----
let player = new GameObject(285, 268, "#f5173c", 40, 40);

console.log("Let's do this!");

player.render();

let door = new GameObject((Math.random() * 470) + 10, 0, "#ffff33", 70, 10);

door.render();

// ---- creating blocks ----
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

console.log(rowOneBlocks);
console.log(rowTwoBlocks);

//for loop to render block[i]
for (let i=0; i < 6; i++) {
    rowOneBlocks[i].render();
};

for (let i = 0; i < 5; i++) {
    rowTwoBlocks[i].render();
};

// ---- adding player movement ----

//add event listener to key strokes A & D (use "keydown")
document.addEventListener("keydown", movementHandler);

//if A is pressed (KeyCode), move the player left
    // left changes player -= on x axis
    //if KeyCode of e === A, change player x to decrement
//if D is pressed (KeyCode), move the player right
    // right chnges player += on x axis
    // if KeyCode of e === D, change player x to increase
function movementHandler(e) {
    console.log(player)
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


// ---- game loop ----

let gameLoop = function () {

console.log("I'm looping!");

//clear board
    ctx.clearRect(0, 0, game.width, game.height);

//render player 
    player.render();

//render door
    door.render();

//render remaining blocks
    rowOneBlocks.forEach(function(rowBlock){
        if (rowBlock.alive === true) {
            rowBlock.render();
            console.log(rowBlock);
        }
    });
    rowTwoBlocks.forEach(function(rowBlock) {
        if (rowBlock.alive === true) {
            rowBlock.render();
            console.log(rowBlock);
        }
    });
//check for win
    //requires collision detection

//TODO: collision detection

//check for collision

};

//set interval for game loop setInterval (gameLoop, 75)
// helpful timeloop article: https://isaacsukin.com/news/2015/01/detailed-explanation-javascript-game-loops-and-timing

let runGame = setInterval(gameLoop, 75);


// ---- laser beam event listener ----
document.addEventListener("keydown", pewPewHandler);
function pewPewHandler(e) {
    //creates a small rect or "laser beam" (new GameObject.render)
        //5px x 5px
    //moves small rect up 10px/500 mili
        // beam.y -= 10
    //detect collision with box or topLine (if else)
        //when collision, stop interval
        //check for win()
}


// ---- collision detection ----

// ---- check for win ----
    //grab hitBox (array?)
    //compare to see if any blocks are in the hitBox
        //if YES
            //check if player has collided with blocks || topLine
                //if YES
                    //lose ()
                //if NO
                    //nothing...gameLoop should continue to run 
        //if NO
            //win()

        


// ---- win() ----
    //move scoreCounter up by one

//TODO: lose() 
            //print "Hmm this is most unfortunate. Care to die ::ahem:: try again?"
            //activate start button
//TODO: scoreCounter().value to print on screen
//TODO: gettingClose()that prints "Almost there!" when only one block left
//TODO: hitBox
//TODO: commentBoard
//TODO: topLine
// ---- start button ----
    //TODO: gameInit()
    
