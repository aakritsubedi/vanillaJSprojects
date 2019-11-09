function randomNo(lower,upper) {
    let randNo = Math.floor(Math.random() * (upper-lower + 1 ) + lower);
    return randNo;
}
class Car{
    constructor(road){
        this.playerCar = null;
        this.opponentCar = null;
        this.player=null;
        this.road=null;
        this.playerLane=null;
        this.carLeftPos=null;
        this.init(road);
    }
    init(road){
        this.playerCar=['Audi.png','Black_viper.png','Car.png'];
        this.opponentCar=['Ambulance.png','Audi.png','Car.png','Mini_truck.png','Mini_van.png','Police.png','taxi.png','truck.png'];
        this.road=road;
    }
    findCarLeftPostion(){
        if(this.playerLane ==1){
            this.carLeftPos= this.playerLane * 110;
        }
        else if(this.playerLane ==2){
            this.carLeftPos= this.playerLane * 135;
        }
        else{
            this.carLeftPos= this.playerLane * 145;
        }
    }
    addPlayer(){
        this.playerLane=randomNo(1,3);
        let car = document.createElement('div');
        let path ='images/'+this.playerCar[randomNo(0,2)];
        // car.style.backgroundColor='green';
        car.style.backgroundImage='url('+path+')';
        car.style.height = '175px';
        car.style.width = '150px';
        car.style.position = 'absolute';
        car.style.backgroundRepeat='no-repeat';
        car.style.backgroundSize='contain';
        car.style.backgroundPosition='center';
        car.style.bottom='0px';
        car.style.transition='ease 2s';
        this.findCarLeftPostion();
        car.style.left=this.carLeftPos+'px';
        this.player=this.road.appendChild(car);

    }
    moveLeft(){
        this.player.style.transform='rotate(-25deg)';
        if(this.playerLane != 1){
            this.playerLane -= 1;
        }
        setTimeout(()=>{
            this.player.style.transform='rotate(0deg)';
        },500);
        this.updatePosition();
    }
    moveRight(){
        this.player.style.transform='rotate(25deg)';
        if(this.playerLane != 3){
            this.playerLane += 1;
        }
        setTimeout(()=>{
            this.player.style.transform='rotate(0deg)';
        },500);
        this.updatePosition();
    }
    updatePosition(){
        this.findCarLeftPostion();
        this.player.style.left=this.carLeftPos+'px';
    }
    
}
export default Car;