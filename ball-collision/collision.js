var BOXHEIGHT = 530;
var BOXWIDTH = 80;//percentage value,here 80% of total window size
var FRAME_LIMIT = 1000;
var FPS = 200;
var FRAME_RATE = FRAME_LIMIT/FPS;
var COLOR_RED = ['#E44236','#B83227','#D63031','#AE1438','#E83350','#AE1438'];
var COLOR_YELLOW = ['#EEC213','#F5C469','#F4C724','#F0DF87','#DFAF2B','#FFF222'];
var COLOR_GREEN= ['#2ecc72','#6AB04A','#badc57','#45CE30','#7CEC9F','#019031'];

function randomNo(lower,upper) {
    let randNo = Math.floor(Math.random() * (upper-lower + 1 ) + lower);
    return randNo;
}

class Ball{
    constructor(parentEle){
        this.parentEle=parentEle;


        this.dx = null;
        this.dy = null;
        this.mass=randomNo(1,1.2);
        this.radius = this.mass == 1 ? 16 : 30;
        this.ball=null;
        this.left=null;
        this.top=null;
        

        this.boxWidth=null;
    }
    create(){
        this.ball = document.createElement('div')
        this.ball.style.background = '#DAE0E2';
        this.ball.style.height = this.radius+'px';
        this.ball.style.width = this.radius+'px';
        this.ball.style.borderRadius = '50%';
        this.ball.style.border='4px dashed black';
        this.ball.style.position = 'absolute';
        this.top = this.ball.style.top=randomNo(10,(BOXHEIGHT-2*this.radius))+'px';
        this.top = parseInt(this.top);
        this.left = this.ball.style.left=randomNo(20,(this.boxWidth-2*this.radius))+'px';
        this.left = parseInt(this.left);
        this.ball.style.textAlign='center';
        
        this.parentEle.appendChild(this.ball);
    }
    direction(){
        console.log(this.mass);
        this.dx = 1*this.mass;
        this.dy = 1*this.mass;
    }
    reverseX(ball){
        this.dx *=-1;
    }
    reverseY(ball){
        this.dy *=-1;
    } 
    update(){
        this.ball.style.left = this.left + 'px';
        this.ball.style.top = this.top + 'px';   
    }
    move(){
        this.left = parseInt(this.left) + this.dx;
        this.top = parseInt(this.top) + this.dy;
        this.update();
    }
    changeStyle(border,color){
        this.ball.style.border='4px';
        this.ball.style.borderStyle = border;
        
        if(color == 'red'){
            this.ball.style.background = `${COLOR_RED[randomNo(0,6)]}`;
            this.ball.style.borderColor = `${COLOR_GREEN[randomNo(0,6)]}`;
        }
        else{
            this.ball.style.background = `${COLOR_GREEN[randomNo(0,6)]}`;
            this.ball.style.borderColor = `${COLOR_RED[randomNo(0,6)]}`;
        }
    }
    checkBorderCollisionX(){
        //console.log(this.boxWidth);
        if((this.left <= 0 ) || (this.left+(2*this.radius))>=(this.boxWidth+this.radius)){
            this.changeStyle('double','red');
            return true;
        }
        return false;
        
    }
    checkBorderCollisionY(){
        if((this.top <= 0 ) || (this.top+(2*this.radius))>=(BOXHEIGHT+this.radius)){
            this.changeStyle('solid','green');
            return true;
        }
        return false;
    }
    changeToGreen(ball){
        this.ball.style.background = `${COLOR_GREEN[randomNo(0,6)]}`;
    }
}

class Game{
    constructor(container,no){
        this.container = null;
        this.balls = [];
        this.noOfBall=no;
        this.createBox(container);
    }
    createBox(){
        this.container = container;
        var box = document.createElement('div');
        box.style.height = BOXHEIGHT+'px';
        box.style.width = (BOXWIDTH/100 * window.innerWidth)+'px';
        box.style.margin = '15px auto';
        box.style.borderLeft = '5px solid red';
        box.style.borderRight = '5px solid red';
        box.style.borderTop = '5px solid yellow';
        box.style.borderBottom = '5px solid yellow';
        box.style.position = 'relative';
        box.style.backgroundImage = 'url(\'sunset.jpg\')';
        this.container.appendChild(box);
        
        this.createBall();
    }//creates the borderBox
    createBall(){
        for(var i=0;i<this.noOfBall;i++){
            var ball = new Ball(this.container.children[1]); //BOX
            ball.boxWidth = (BOXWIDTH/100 * window.innerWidth);
            ball.create();
            ball.direction();
            this.balls.push(ball);
            //this.collision();
        }
    }

    twoBallCollision(firstBall,secondBall){

        let sumOfradius = (firstBall.radius +secondBall.radius)/2;
        let x1 = firstBall.left + (firstBall.radius/2);
        let y1 = firstBall.top + (firstBall.radius/2);
        let x2 = secondBall.left + (secondBall.radius/2);
        let y2 = secondBall.top + (secondBall.radius/2);
        //pythagorus theorem 
        let distance = Math.sqrt(Math.pow((x1-x2),2) + Math.pow((y1-y2),2));

    
        if(distance <= sumOfradius){
            firstBall.changeToGreen(secondBall);
            return true;
        }
        return false;
    }

    allCollision(){
            for(var i=0; i <(this.balls.length); i++){
                for(var j=1; j<(this.balls.length);j++){
                    if(i != j){
                        if(this.twoBallCollision(this.balls[i],this.balls[j])){
                            this.balls[i].reverseX(this.balls[j]);
                            this.balls[i].reverseY(this.balls[j]);
                        }
                    }
                }
    
            }
    }

    
    moveBalls(){
        let that=this;
        setInterval(function(){
            //console.log(that.balls);
            for(var i = 0; i < that.noOfBall; i++) {
                if(that.balls[i].checkBorderCollisionX()){
                    that.balls[i].reverseX();
                }
                if(that.balls[i].checkBorderCollisionY()){
                    that.balls[i].reverseY();
                }
                that.balls[i].move();
            }  
            that.allCollision();
        }, FRAME_RATE);
    }
}
var container = document.getElementById('container');
var game= new Game(container,20);
game.moveBalls();