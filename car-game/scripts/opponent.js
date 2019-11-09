function randomNo(lower,upper) {
    let randNo = Math.floor(Math.random() * (upper-lower + 1 ) + lower);
    return randNo;
}
class Opponents{
    constructor(road){
        this.opponentCar = null;
        this.road=null;
        this.opponentLane=null;
        this.carLeftPos=null;
        this.opponent=null;
        this.top=null;
        this.init(road);
    }
    init(road){
        this.opponentCar=['Ambulance.png','Audi.png','Car.png','Mini_truck.png','Mini_van.png','Police.png','taxi.png','truck.png'];
        this.top=0;
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
        let path ='images/'+this.opponentCar[randomNo(0,2)];
        car.style.transform='rotate(180deg)';
        car.style.backgroundImage='url('+path+')';
        car.style.height = '175px';
        car.style.width = '150px';
        car.style.position = 'absolute';
        car.style.backgroundRepeat='no-repeat';
        car.style.backgroundSize='contain';
        car.style.backgroundPosition='center';
        car.style.top='0px';
        this.findCarLeftPostion();
        car.style.left=this.carLeftPos+'px';
        this.opponent=this.road.appendChild(car);
    }
    moveDown(){
        this.top += 1.3;
        this.opponent.style.top = this.top+'px';
    }
}
export default Opponents;