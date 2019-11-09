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
        this.score=null;
        this.init();
    }
    init(){
        this.road=document.querySelector('.road');
        this.moveAction =this.moveAction.bind(this);
        this.opponents=[];
        this.score=0;
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

            if(this.opponents[i].top >= (screen.height-180)){
                this.opponents[i].destroyOpponent();
                this.opponents.splice(i,1);
                this.score++;
                this.displayScore();
            }
        }
    }
    startGame(speed){
        let time =0;
        this.speed=speed;
        this.gameInterval = setInterval(()=>{
            time += 16.6667;
            this.moveRoad(this.speed);
            this.moveOpponents();
            this.checkCollision();
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
    displayScore(){
        let score=document.querySelector('.scoreboard');
        score.innerHTML='';
        score.innerHTML = "Score "+this.score;
    }
    checkCollision(){
        let ht=175;let wd=150;
        let y1 = parseInt(document.defaultView.getComputedStyle(this.player.player).top);
        //let x1 = parseInt(this.player.carLeftPos);
        for(var i=0;i<this.opponents.length;i++){
            if(this.player.playerLane == this.opponents[i].opponentLane){
                let y2 = parseInt(this.opponents[i].top);
                //let x2 = parseInt(this.opponents[i].carLeftPos);
                if(y1<=(y2+135)){
                    this.gameover(y2);
                }
            }
        }
    }
    gameover(boomPos){
        clearInterval(this.gameInterval);
        document.removeEventListener('keydown',this.moveAction);
        this.addBoom(boomPos);
        this.gameoverScreen();
    }
    addBoom(boomPos){
        let div=document.createElement('div');
        div.style.height='100px';
        div.style.width='125px';
        div.style.position='absolute';
        div.style.top=boomPos+100+'px';
        div.style.left = this.player.carLeftPos+15+'px';
        let img=document.createElement('img');
        img.src='images/boom.png';
        img.style.height='100%';
        img.style.width='100%';
        div.appendChild(img);
        this.road.appendChild(div);
    }
    gameoverScreen(){
        let score=document.querySelector('.scoreboard');
        score.style.right='20%';
        score.style.backgroundColor='#FF3031';
        score.addEventListener('click',()=>{
            location.reload();
        })
    }
}
export default Game;