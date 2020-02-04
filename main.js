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


// creating the player and objects
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

// let player = {
//     x: 285,
//     y: 268,
//     color: "#f5173c",
//     width: 40,
//     height: 40,
//     render: function() {
//         ctx.fillStyle = this.color;
//         ctx.fillRect(this.x, this.y, this.width, this.height);
//     }
// }

// player.render();