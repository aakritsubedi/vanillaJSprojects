import Game from '../scripts/game.js';

let startGame=document.querySelector('.start-game-btn');
let instructions=document.querySelector('.instructions');
let pipe=document.querySelector('.pipe');
startGame.addEventListener('click',gaming);
function gaming(){
    let game = new Game();
    let speed = 2;
    game.startGame(speed);
    game.loadGame();
    startGame.style.left='-250px';
    instructions.style.left='10px';
    pipe.style.bottom='-2px';
    startGame.removeEventListener('click',gaming);
}
