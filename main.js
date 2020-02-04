// global variables

// DOM references
let game = document.getElementById("game");

console.log(game);

//setting context to our canvas
let ctx = game.getContext("2d");

console.log(ctx);

// find canvas width and height
game.setAttribute("width", getComputedStyle(game)["width"]);
game.setAttribute("height", getComputedStyle(game)["height"]);

console.log(getComputedStyle(game)["width"]);
console.log(getComputedStyle(game)["height"]);


// ---- creating the player and door ----
let GameObject = function(x, y, color, width, height) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.width = width;
    this.height = height;
    this.render = function() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    };
};

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
