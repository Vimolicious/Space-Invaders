class Saucer {
    constructor(x, y) {
        this.img = saucerSprite;
        this.x = x;
        this.y = y;

        this.moving = false;
        this.direction = this.x > width ? -1 : 1;

        this.dCount = 0;

        this.val = 0;
    }

    update() {
        if (this.dCount > 0) {
            this.dCount--;

            if (this.dCount === 0) {
                if (this.direction === 1) {
                    this.x = width;
                } else {
                    this.x = 0 - this.img.width;
                }
        
            }
        } else {
            if (this.moving) {
                this.x += 5 * this.direction;
                if (this.x > width || this.x + this.img.width < 0) {
                    this.moving = false;
                    this.direction *= -1;
                }
            }
        }
    }

    show() {
        if (this.dCount > 0) {
            textAlign(LEFT, TOP);
            textSize(20);
            fill(255);
            text(this.val, this.x, this.y);
        } else if (0 < this.x + this.img.width && this.x < width) {
            saucerSprite.show(this.x, this.y);
        }
    }

    destroy() {
        this.val = floor(random(3, 6)) * 50;
        this.dCount = 100;
        this.moving = false;

        this.direction *= -1;
    }

    go() {
        if (!this.moving) {
            this.moving = true;
        }
    }

    get width() {
        return this.img.width;
    }

    get height() {
        return this.img.height;
    }
}