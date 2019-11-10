function randomNo(lower,upper) {
    let randNo = Math.floor(Math.random() * (upper-lower + 1 ) + lower);
    return randNo;
}
class Opponents{
    constructor(road,speed){
        this.opponentCar = null;
        this.road=null;
        this.opponentLane=null;
        this.carLeftPos=null;
        this.opponent=null;
        this.speed=null;
        this.top=null;
        this.init(road,speed);
    }
    init(road,speed){
        this.opponentCar=['Ambulance.png','Audi.png','Car.png','Mini_truck.png','Mini_van.png','Police.png','taxi.png','truck.png'];
        this.top=-150;
        this.speed= (speed>10) ? speed/3:1.5;
        this.road=road;
        this.createOpponent();
    }
    findCarLeftPostion(){
        if(this.opponentLane ==1){
            this.carLeftPos= this.opponentLane * 110;
        }
        else if(this.opponentLane ==2){
            this.carLeftPos= this.opponentLane * 135;
        }
        else{
            this.carLeftPos= this.opponentLane * 145;
        }
    }
    createOpponent(){
        this.opponentLane=randomNo(1,3);
        let car = document.createElement('div');
        let path ='images/'+this.opponentCar[randomNo(0,7)];
        car.style.transform='rotate(180deg)';
        car.style.backgroundImage='url('+path+')';
        // car.style.backgroundColor='green';
        car.style.height = '175px';
        car.style.width = '150px';
        car.style.position = 'absolute';
        car.style.backgroundRepeat='no-repeat';
        car.style.backgroundSize='contain';
        car.style.backgroundPosition='center';
        car.style.top='-150px';
        this.findCarLeftPostion();
        car.style.left=this.carLeftPos+'px';
        this.opponent=this.road.appendChild(car);
    }
    moveDown(){
        this.top += this.speed;
        this.opponent.style.top = this.top+'px';
    }
    destroyOpponent(){
        this.opponent.parentElement.removeChild(this.opponent);
        console.log('destroyed');
    }
    makeFire(){
        let path ='images/fire.gif';
        this.opponent.style.transform='rotate(0deg)';
        this.opponent.style.backgroundImage='url('+path+')';
        setTimeout(()=>{
            this.destroyOpponent();
        },200);
    }
}
export default Opponents;