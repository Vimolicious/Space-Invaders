class Laser {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.yVel = 0;
    }

    hits(target) {
        let inX = (this.x >= target.x && this.x <= target.x + target.width);
        let inY = (this.y >= target.y && this.y <= target.y + target.height);
        return inX && inY;
    }
    
    update() {
        this.y += this.yVel
    }

    show() {
        fill(255);
        rect(this.x, this.y, this.width, this.height);
    }
}

class AlienLaser extends Laser{
    constructor(x, y, varient) {
        super(x, y, 10, varient === 1 ? 30 : 40);
        this.varient = varient;
        this.frame = 0;

        this.yVel = 10;
    }

    show() {
        if (this.varient === 1) {
            wiggle.show(this.x, this.y, this.frame);
        } else {
            switchBack.show(this.x, this.y, this.frame);
        }
        this.frame++;
        this.frame %= 2;
    }
}