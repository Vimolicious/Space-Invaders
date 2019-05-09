class Alien {
    constructor(x, y, varient, score) {
        this.x = x;
        this.y = y;
        this.animation = varient;
        this.score = score;

        this.dTime = -1;

        this.currentVarient = floor(random(2));
    }

    update(move) {
        this.x += move;

        if (this.dTime > 0) {
            this.dTime--;
        }

        this.currentVarient += this.currentVarient === 0 ? 1 : -1;
    }

    show() {
        if (this.dTime >= 0) {
            explosion.show(this.x, this.y);
        } else {
            this.animation.show(this.x, this.y, this.currentVarient);
        }
    }

    explode() {
        if (this.dTime === -1) {
            this.dTime = 1;
        }
    }

    get width() {
        return this.animation.imgs[0].swidth;
    }

    get height() {
        return this.animation.imgs[0].sheight;
    }
}