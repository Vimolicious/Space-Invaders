class Grid {
    constructor(x, y, width) {
        this.x = floor(x);
        this.y = floor(y);
        this.width = width;

        this.aliens;
        this.direction;
        this.speed;
        this.vertSpeed = floor((height * 6 / 8 - (300 + this.y)) / 5);

        this.start();

        this.startCounter = 3;

        this.lasers = [];

        this.updateSpeed = 15;
    }

    start() {
        this.aliens = [];
        this.fillUp();
        this.direction = 1;
        this.speed = 10;
        this.downCounter = 0;

        this.startCounter = 3;

        this.updateSpeed = 15;
    }

    update(player, shields) {
        if (this.startCounter > 0) {
            if (frameCount % 15 === 0) {
                this.startCounter--;
            }
        } else if (this.aliens.length > 0) {
            for (let r = this.aliens.length - 1; r >= 0; r--) {
                for (let c = this.aliens[r].length - 1; c >= 0; c--) {
                    if (this.aliens[r][c].dTime === 0) {
                        this.aliens[r].splice(c, 1);
                    }
                }

                if (this.aliens[r].length === 0) {
                    this.aliens.splice(r, 1);
                }
            }

            if (frameCount % this.updateSpeed === 0) {
                let greatestX = this.aliens[this.aliens.length - 1]
                    [this.aliens[this.aliens.length - 1].length - 1].x;
                let smallestX = this.aliens[0][0].x;

                for (let row of this.aliens) {
                    for (let alien of row) {
                        greatestX = max(greatestX, alien.x + alien.width);
                        smallestX = min(smallestX, alien.x);
                    }
                }

                if (this.downCounter === 0 && (greatestX + this.speed * this.direction >= width || smallestX + this.speed * this.direction <= 0)) {
                    this.direction *= -1;
                    this.moveAll(0, floor(this.vertSpeed));
                    this.downCounter++;

                    this.updateSpeed--;
                } else {
                    this.moveAll(this.speed * this.direction, 0);
                    this.downCounter = 0;
                }
            }

            if (random() <= 0.01) {
                let col = floor(random(this.aliens.length));
                let bottomAlien = this.aliens[col]
                    [this.aliens[col].length - 1];

                this.lasers.push(new AlienLaser(bottomAlien.x + bottomAlien.width / 2, bottomAlien.y + 32, floor(random(2))));
                aLaserSound.play();
            }

            for (let l = this.lasers.length - 1; l >= 0; l--) {
                this.lasers[l].update();

                if (this.lasers[l].hits(player)) {
                    this.lasers = [];
                    return true;
                }

                for (let s of shields) {
                    for (let p of s.parts) {
                        if (p.health > 0 && this.lasers[l] && this.lasers[l].hits(p)) {
                            p.shatter();
                            this.lasers.splice(l, 1);
                        }
                    }
                }

                if (this.lasers[l] && this.lasers[l].y > height) {
                    this.lasers.splice(l, 1);
                }
            }
        }

        return false;
    }

    moveAll(x, y) {
        for (let row of this.aliens) {
            for (let alien of row) {
                alien.y += y;
                alien.update(x);
            }
        }
    }

    show() {
        if (this.startCounter < 3) {
            for (let col of this.aliens) {
                for (let row = col.length - 1; row >= 0; row--) {
                    let alien = col[row];
                    if (alien.dTime !== 0 || frameCount % this.updateSpeed === 0) {
                        if (row > 2)
                            alien.show();
                        else if (row >= 1 && this.startCounter <= 1) {
                            alien.show();
                        } else if (row === 0 && this.startCounter === 0) {
                            alien.show();
                        }
                    }
                }
            }

            for (let l of this.lasers) {
                l.show();
            }
        }
    }

    fillUp() {
        this.aliens = [];
        this.lasers = [];
        for (let j = 0; j < 11; j++) {
            this.aliens.push([]);
            let varient = 0;
            for (let i = 0; i < varients.length * 2 - 1; i++) {
                this.aliens[j].push(new Alien(this.x + (varients[varient].width) * j + j * (this.width - varients[varient].width * 11) / 10,
                    this.y + i * 60,
                    varients[varient],
                    varient === 0 ? 40 : varient === 1 ? 20 : 10));
                if (i % 2 === 0) {
                    varient++;
                }

            }
        }
    }

    gameOver() {
        let biggestY = 0;
        for (let col of this.aliens) {
            for (let row of col) {
                biggestY = max(biggestY, row.y + row.height);
            }
        }

        if (biggestY > 675) {
            return true;
        }

        return false;
    }

    isEmpty() {
        return this.aliens.length === 0;
    }
}