class Game {
    constructor() {
        this.score = 0;
        this.grid = new Grid(floor((width - 800) / 2), 150, 700);
        this.player = new Player(218, height * 7 / 8);

        this.round = 0;

        this.saucer = new Saucer(random() > 0.5 ? -saucerSprite.width : width, 100);

        this.shields = [
            new Shield(200, height * 6 / 8),
            new Shield(width / 2 - 48, height * 6 / 8),
            new Shield(width - 296, height * 6 / 8)
        ]

        this.gameOver = false;

        this.song = songs[0];

        this.musicPaused = false;
    }

    update() {
        if (this.player.dTime === 0) {
            if (!this.song.isPlaying() && this.grid.startCounter === 0) {
                if (!this.musicPaused) {
                    this.song = songs[floor(random() * songs.length)];
                }
                this.song.play();
            }

            if (this.grid.update(this.player, this.shields)) {
                this.player.dTime = 100;
                this.player.lives--;

                this.song.pause();
                this.musicPaused = true;

                pExplosion.rate(1);
                pExplosion.play();
            }

            if (this.grid.isEmpty()) {
                this.grid.start();
                this.round++;
                if (this.player.lives < 5) {
                    this.player.lives++;
                }
            }
        }

        if (this.round != 0 || this.grid.startCounter === 0) {
            this.player.update(this.grid.aliens, this.shields, this.saucer);
            this.score += this.player.earnings;
        }

        if (this.player.dTime === 0 && (this.round != 0 || this.grid.startCounter === 0)) {
            if (random() < 0.001) {
                this.saucer.go();
            }

            this.saucer.update();
        }

        this.gameOver = (this.player.lives === 0 || this.grid.gameOver()) && this.player.dTime === 0;

        if (this.gameOver) {
            this.song.stop();
            this.song = songs[floor(random() * songs.length)];
        }
        return this.gameOver;
    }

    show() {
        if (!this.gameOver) {
            noStroke();
            this.grid.show();
            this.player.show();

            for (let s of this.shields) {
                s.show();
            }

            fill(0, 255, 0);
            textSize(30)
            textAlign(LEFT, BOTTOM);
            text(`Score: ${this.score}`, 40, 50);

            text("Lives: ", 800, 50);
            for (let i = 0; i < this.player.lives - 1; i++) {
                playerSprite.show(1000 + i * (playerSprite.width + 30), 10);
            }

            this.saucer.show();
        }
    }

    reset() {
        this.score = 0;
        this.grid = new Grid(floor((width - 800) / 2), 150, 700);
        this.player = new Player(218, height * 7 / 8);

        this.round = 0;

        this.shields = [
            new Shield(200, height * 6 / 8),
            new Shield(width / 2 - 48, height * 6 / 8),
            new Shield(width - 296, height * 6 / 8)
        ]

        this.gameOver = false;

        this.saucer = new Saucer(random() > 0.5 ? -saucerSprite.width : width, 100);
    }

}