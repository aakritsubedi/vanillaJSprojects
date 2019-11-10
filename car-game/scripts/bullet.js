class Bullet{
    constructor(road,pos,lane){
        this.bullet=null;
        this.road=null;
        this.pos=null;
        this.lane=null;
        this.bottomVal=null;
        this.init(road,pos,lane);
    }
    init(road,pos,lane){
        this.road=road;
        this.pos=pos;
        this.lane=lane
        this.bottomVal=50;
        this.createBullet();
    }
    createBullet(){
        let div=document.createElement('div');
        div.style.backgroundImage = 'url(\'images/bullet.png\')';
        div.style.transform = 'rotate(-90deg)';
        div.style.backgroundRepeat='no-repeat';
        div.style.backgroundSize='contain';
        div.style.backgroundPosition='center';
        div.style.height='100px';
        div.style.width='75px';
        div.style.position='absolute';
        div.style.left=this.pos+40+'px';
        div.style.bottom=this.bottomVal+'px';
        this.bullet=this.road.appendChild(div);
    }
    moveUp(){
        this.bottomVal += 2;
        this.bullet.style.bottom = this.bottomVal+'px';
    }
    destroyBullet(){
        this.bullet.parentElement.removeChild(this.bullet);
        console.log('destroyedBullet');
    }
}
export default Bullet;