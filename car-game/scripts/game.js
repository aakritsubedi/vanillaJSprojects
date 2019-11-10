import Car from '../scripts/car.js';
import Opponents from '../scripts/opponent.js';
import Bullet from '../scripts/bullet.js';
const CAR_AUDIO = new Audio();
class Game{
    constructor(){
        this.road=null;
        this.gameInterval=null;
        this.top=null;
        this.player=null;
        this.speed=null;
        this.opponents=null;
        this.score=null;
        this.bullets=null;
        this.minSpeed=null;
        this.init();
    }
    init(){
        this.road=document.querySelector('.road');
        this.moveAction =this.moveAction.bind(this);
        this.opponents=[];
        this.bullets=[];
        this.score=0;
        this.top=0;
        this.minSpeed=2;
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
        this.opponents.push(new Opponents(this.road,this.minSpeed));
        //this.opponents.push(new Opponents(this.road));
    }
    moveOpponents(){
        //console.log("No. of Opponents: "+this.opponents.length);
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
    moveBullet(){
        for(let i=0;i<this.bullets.length;i++){
            this.bullets[i].moveUp();

            if(this.bullets[i].bottomVal >= (screen.height-175)){
                this.bullets[i].destroyBullet();
                this.bullets.splice(i,1);
                this.score=this.score-0.25;
                this.displayScore();
            }
        }  
    }
    playSound(type){
        
        if(type == 'horn'){
            CAR_AUDIO.src = 'audio/horn.mp3';
        }
        else if(type == 'bump'){
            CAR_AUDIO.src = 'audio/bump.mp3';
        }
        else if(type == 'brake'){
            CAR_AUDIO.src = 'audio/brake.wav';
        }
        else if(type == 'running'){
            CAR_AUDIO.src = 'audio/car_running.mp3';            
        }
        else if(type == 'attack'){
            CAR_AUDIO.src = 'audio/attack.mp3';            
        }
        else if(type == 'fire'){
            CAR_AUDIO.src = 'audio/fire.mp3';
        }
        CAR_AUDIO.play();
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
                this.playSound('running');
            }
        }
        else if(e.key == 'ArrowDown' || e.key == 's'){
            if(this.speed > this.minSpeed){
                this.speed -= 1;
                this.playSound('brake');                
            }
        }
        else if(e.key == ' ' || e.key == 'f'){
           this.fireBullet(); 
           this.playSound('fire')
        }
        else if(e.key == 'Enter' ){
            this.playSound('horn');
        }

    }
    fireBullet(){
        if(this.bullets.length < 5){
            let road= this.road;
            let pos = this.player.carLeftPos;
            let lane = this.player.playerLane;
            this.bullets.push(new Bullet(road,pos,lane));
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
    checkCollisionWithBullet(){
        let ht=100;let wd=75;
        let y1=[];//oppPos
        for(let j=0;j<this.opponents.length;j++){
            let info = {
                lane: this.opponents[j].opponentLane,
                top: parseInt(this.opponents[j].top)
            }
            y1.push(info);
        }
        for(var i=0;i<this.bullets.length;i++){
            let y2 = parseInt(document.defaultView.getComputedStyle(this.bullets[i].bullet).top);
            for(let k=0;k<y1.length;k++){
                if(this.bullets[i].lane==y1[k]['lane']){
                    if(y2<=(y1[k]['top']+135)){
                        this.killOpponent(k);
                        this.removeBulletAfterCollision(i);
                    }
                }
            }
        }
    }
    killOpponent(oppNo){
        this.playSound('attack');
        this.opponents[oppNo].makeFire();
        this.opponents.splice(oppNo,1);
        this.score=this.score+2;
        this.displayScore();
        //console.log("No. of Opponents: after killing "+this.opponents.length);
    }
    removeBulletAfterCollision(bullNo){
        this.bullets[bullNo].destroyBullet();
        this.bullets.splice(bullNo,1);
    }
    gameover(boomPos){
        this.playSound('bump')
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
    startGame(speed){
        let time =0;
        let levelTime =0;
        this.speed=speed;
        this.gameInterval = setInterval(()=>{
            time += 16.6667;
            levelTime +=16.6667;
            this.moveRoad(this.speed);
            this.moveOpponents();
            this.moveBullet();
            this.checkCollision();
            this.checkCollisionWithBullet();
            if(time >= 2100){
                this.addOpponents();
                time=0;
            }
            if(levelTime >= 2500){
                this.speed += 0.8;
                this.minSpeed = this.speed;
                levelTime=0;
            }
        },1000/60);
    }
}
export default Game;