class ShieldPart {
    constructor(x, y, xOff, yOff, pixels) {
        this.x = x + xOff;
        this.y = y + yOff;
        this.xOff = xOff;
        this.yOff = yOff;

        this.width = 24;
        this.height = 24;
        this.health = 4;

        this.pixels = pixels;
    }

    show() {
        fill(0, 255, 0);
        for (let row = 0; row < this.pixels.length; row++) {

            for (let col = 0; col < this.pixels[row].length; col++) {
                if (this.pixels[row][col]) {
                    rect(this.x + col * 4, this.y + row * 4, 4, 4);
                }
            }
        }
    }

    shatter() {
        this.health--;
        if (this.health === 0) {
            this.pixels = [];
        } else {
            let howManyLeft = 0;
            for (let i = 0; i < this.pixels.length; i++) {
                for (let j = 0; j < this.pixels[i].length; j++) {
                    if (this.pixels[i][j]) {
                        howManyLeft++;
                    }
                }
            }

            for (let i = 0; i < min(howManyLeft, 5); i++) {
                let r, c;
                do {
                    r = floor(random(this.pixels.length));
                    c = floor(random(this.pixels[0].length));
                } while (!this.pixels[r][c]);

                this.pixels[r][c] = false;
            }
        }
    }
}