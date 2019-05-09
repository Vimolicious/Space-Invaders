class Sprite {
    constructor(img, sx, sy, swidth, sheight) {
        this.img = img;
        this.sx = sx;
        this.sy = sy;
        this.swidth = swidth;
        this.sheight = sheight;
    }

    show(x, y, scale) {
        if (!scale) {
            scale = 1;
        }
        image(this.img, x, y, this.swidth*scale, this.sheight*scale, this.sx, this.sy, this.swidth, this.sheight);
    }

    get width() {
        return this.swidth;
    }

    get height() {
        return this.sheight;
    }
}