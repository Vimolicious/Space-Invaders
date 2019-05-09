class Screen {
    constructor(title, subtitle, button) {
        this.title = title;
        this.subtitle = subtitle;
        this.button = new Button(button, width/2 - 100, height/2 - 30 + 200, 200, 60);
    }

    update() {
        this.button.update();
        return this.button.actuated;
    }

    show() {
        this.button.show();
        stroke(8);
        strokeWeight(10);
        fill(0, 255, 0);
        textSize(50);
        textAlign(CENTER, CENTER);
        text(this.title, width/2, height/2);
        noStroke();
        textSize(20);
        text(this.subtitle, width/2, height/2 + 50);
    }
}