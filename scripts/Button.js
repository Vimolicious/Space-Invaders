class Button {
    constructor(label, x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.label = label;

        this.pressing = false;

        this.bg = color(10, 200, 30);

        this.actuated = false;
    }

    update() {
        let inX = mouseX >= this.x && mouseX <= this.x + this.width;
        let inY = mouseY >= this.y && mouseY <= this.y + this.height;
        if (!this.pressing && mouseIsPressed && inX && inY) {
            this.pressing = true;
            this.bg = color(10, 170, 30);
        } else if (!mouseIsPressed && this.pressing && inX && inY) {
            this.actuated = true;
            this.pressing = false;
        } else if (!mouseIsPressed){
            this.pressing = false;
            this.actuated = false;
            this.bg = color(10, 200, 30);
        }
    }

    show() {
        fill(this.bg);
        rect(this.x, this.y, this.width, this.height);
        textAlign(CENTER, CENTER);
        fill(255);
        textSize(20);
        text(this.label, this.x + this.width/2, this.y + this.height/2);
    }


}