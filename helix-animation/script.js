import Game from '/game.js';

var playground = document.querySelector('.playground');
var game = new Game(playground,0.10);
game.generateBoxes();
game.moveBoxes();