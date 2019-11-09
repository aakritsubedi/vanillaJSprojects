function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
class Box {

    constructor(container,isTop, row, x, y, helixWidth) {
        this.container = container;
        this.isTop = isTop;
        this.color = getRandomColor();
        this.row = row;
        this.width = 15;
        this.height = 15;
        this.x = x;
        this.y = y;
        this.helixWidth = helixWidth;

        this.container.style.position = 'relative';
        this.element = document.createElement('div');
        this.element.style.position = 'absolute';
        this.element.style.background = this.color;
        
        this.factor = y;
        this.amplitude = this.helixWidth * 2.5;
    }

    draw() {
        this.element.style.height = this.height + 'px';
        this.element.style.width = this.width + 'px';
        this.element.style.top = this.y + 'px';
        this.element.style.left = this.x + 'px';
        this.element.style.borderRadius = "50%";
        this.container.appendChild(this.element);
    }

    update() {
        this.first = Math.sin(this.factor) * this.amplitude;
        this.element.style.top = this.row * this.height + ((this.isTop) ? this.first : ((this.helixWidth - this.height) - this.first)) + 'px';
        
        var val = Math.cos(this.factor - this.row / 5);
        var val2 = Math.sin(this.factor - this.row / 5);
        var temp = 0;
        if (!this.isTop) {
            temp = val;
            val = val2;
            val2 = val;
        }
        this.element.style.transform = `scale(${(val > 0) ? (val) : (val2 / 5)})`;
    }

    move() {
        this.factor += 0.05;
        this.update();
    }
}
export default Box;