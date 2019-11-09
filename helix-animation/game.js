import Box from 'box.js';

class Game {

    constructor(container) {
        this.container = container;
        this.boxes = [];

        this.helixWidth = this.boxWidth * 1.5;
    }

    generateBoxes() {
        for (var i = 0; i < 20 / 2; i+=0.5) {
            this.generateColumn(i); 
        }
    }

    generateColumn(val) {
        for (var i = 0; i < 15; i++) {
            var box1 = new Box(this.container,true, i,  val * 15 * 4,val, 15);
            var box2 = new Box(this.container,false,i,  val * 15 * 4,val, 15);
            box1.draw();  
            box2.draw();
            this.boxes.push(box1);
            this.boxes.push(box2);
        }
        
    }

    moveBoxes() {
        setInterval(() => {
            for(var i=0;i<this.boxes.length;i++){
                this.boxes[i].move();
            }
        }, 1000/60);
    }

    
}

export default Game