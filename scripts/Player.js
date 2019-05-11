class Player {
    constructor(x, y) {
        this.oX = x;
        this.oY = y;
        this.x = floor(x);
        this.y = floor(y);

        this.frame = 0;

        this.width = playerSprite.swidth;
        this.height = playerSprite.sheight;

        this.laser = new Laser(this.x + 28, this.y + 16, 4, 15);
        this.shootable = true;
        this.score = 0;

        this.lives = 4;

        this.dTime = 0;
    }

    show() {
        if (this.dTime > 0) {
            playerDAnimation.show(this.x, this.y, this.frame);
            if (frameCount % 5 === 0) {
                this.frame++;
                this.frame %= 2;
            }
        } else {
            this.laser.show();
            tint(255);
            playerSprite.show(this.x, this.y, 1);
        }
    }

    update(aliens, shields, saucer) {
        if (this.dTime > 0) {
            this.dTime--;
            if (this.dTime === 0) {
                this.reset();
            }
        } else {
            if (keyIsDown(RIGHT_ARROW) && this.x + 60 < width - 10) {
                this.x += 10;
            } else if (keyIsDown(LEFT_ARROW) && this.x > 10) {
                this.x -= 10;
            }
            this.laser.update();

            if (!this.shootable) {
                for (let a = 0; a < aliens.length; a++) {
                    let row = aliens[a];
                    for (let i = 0; i < row.length; i++) {
                        if (this.laser.hits(row[i])) {
                            this.score += aliens[a][i].score;

                            row[i].explode();
                            aExplosion.play();

                            this.resetLaser();
                        }
                    }
                }


                for (let s of shields) {
                    for (let p of s.parts) {
                        if (p.health !== 0 && this.laser.hits(p)) {
                            p.shatter();
                            this.resetLaser();
                        }
                    }
                }

                if (this.laser.hits(saucer) && saucer.dCount === 0) {
                    saucer.destroy();
                    pExplosion.rate(3);
                    pExplosion.play();
                    this.score += saucer.val;
                    this.resetLaser();
                }

                if (this.laser.y <= -this.laser.height) {
                    this.resetLaser();
                }
            } else {
                this.laser.x = this.x + 28;
            }
        }
    }

    resetLaser() {
        this.laser.yVel = 0;
        this.shootable = true;
        this.laser.x = this.x + 28;
        this.laser.y = this.y + 16;
    }

    shoot() {
        if (this.dTime === 0 && this.shootable) {
            this.laser.yVel = -20;
            this.shootable = false;
            laserSound.play();
        }
    }

    reset() {
        this.x = this.oX;
        this.y = this.oY;

        this.laser.x = this.x + 28;
        this.laser.y = this.y + 16;
        this.laser.yVel = 0;
        this.shootable = true;

        this.score = 0;
    }

    get earnings() {
        let tmp = this.score;
        this.score = 0;
        return tmp;
    }
}