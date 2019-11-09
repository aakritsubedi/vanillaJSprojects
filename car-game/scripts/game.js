import Car from '../scripts/car.js';
import Opponents from '../scripts/opponent.js'
class Game{
    constructor(){
        this.road=null;
        this.gameInterval=null;
        this.top=null;
        this.player=null;
        this.speed=null;
        this.opponents=null;
        this.init();
    }
    init(){
        this.road=document.querySelector('.road');
        this.moveAction =this.moveAction.bind(this);
        this.opponents=[];
        this.top=0;
    }
    moveRoad(speed){
        this.road.style.backgroundPositionY =`${this.top+=speed}px`;
        if(this.top>=2555){
            this.top=0;
        }
    }
    addEvents(){
        document.addEventListener('keydown',this.moveAction);
    }
    loadGame(){
        this.player = new Car(this.road);
        this.player.addPlayer();
        this.addEvents();
        this.addOpponents();
        
    }
    addOpponents(){
        this.opponents.push(new Opponents(this.road));
        //this.opponents.push(new Opponents(this.road));
    }
    moveOpponents(){
        for(let i=0;i<this.opponents.length;i++){
            this.opponents[i].moveDown();
        }
    }
    startGame(speed){
        let time =0;
        this.speed=speed;
        this.gameInterval = setInterval(()=>{
            time += 16.6667;
            this.moveRoad(this.speed);
            this.moveOpponents();
            if(time >= 4000){
                this.addOpponents();
                time=0;
            }
        },1000/60);
    }
    moveAction(e){
        if(e.key == 'ArrowLeft' || e.key == 'a'){
            this.player.moveLeft();
        }
        else if(e.key == 'ArrowRight' || e.key == 'd'){
            this.player.moveRight();
        }
        else if(e.key == 'ArrowUp' || e.key == 'w'){
            if(this.speed < 50){
                this.speed += 1;
            }
        }
        else if(e.key == 'ArrowDown' || e.key == 's'){
            if(this.speed > 2){
                this.speed -= 1;
            }
        }
    }
}
export default Game;