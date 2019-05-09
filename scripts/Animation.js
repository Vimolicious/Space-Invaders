class Animation {
    constructor(imgs) {
        this.imgs = imgs;
        this.scale = 1;
    }

    show(x, y, indx) {
        this.imgs[indx].show(x, y, this.scale);
    }

    get width() {
        return this.imgs[0].width * this.scale;
    }
}