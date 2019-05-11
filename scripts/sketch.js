if (window.innerWidth < 1000) {
	document.getElementById("game-wrapper").innerHTML = "Sorry, your screen is too small";
	document.getElementById("game-wrapper").className = "small";
} else {

	// Game variable
	var g;

	// Sprites
	var playerSprite, saucerSprite, laserSheet, pD1, pD2, explosion;
	// var a1_1, a1_2, a2_1, a2_2, a3_1, a3_2, ;
	var aSheet;
	var playerDAnimation;

	// Laser spites
	var wiggle, switchBack;

	// Types of aliens
	var varients;

	// Font face
	var font;

	// Boolean indicators
	var started, gameOver, insertedCoin;

	// Button screens
	var startScreen, gameOverScreen;
	var insertButton;

	// Sound effects
	var laserSound, pExplosion, aExplosion, aLaserSound;
	var songs;

	function preload() {
		playerSprite = loadImage("assets/img/player.png");
		laserSheet = loadImage("assets/img/lasers.png");
		saucerSprite = loadImage("assets/img/saucer.png");

		a1_1 = loadImage("assets/img/a1_1.png");
		a1_2 = loadImage("assets/img/a1_2.png");
		a2_1 = loadImage("assets/img/a2_1.png");
		a2_2 = loadImage("assets/img/a2_2.png");
		a3_1 = loadImage("assets/img/a3_1.png");
		a3_2 = loadImage("assets/img/a3_2.png");

		pD1 = loadImage("assets/img/dPlayer-frame1.png");
		pD2 = loadImage("assets/img/dPlayer-frame2.png");
		explosion = loadImage("assets/img/explosion.png");

		font = loadFont('assets/fonts/PressStart2P-Regular.ttf');

		laserSound = loadSound("assets/audio/blaster.mp3");
		aLaserSound = loadSound("assets/audio/alienBlaster.mp3");

		aExplosion = loadSound("assets/audio/alienExplosion.mp3");
		pExplosion = loadSound("assets/audio/playerExplosion.mp3");

		songs = [loadSound("assets/audio/FCD.mp3"), loadSound("assets/audio/SA.mp3"), loadSound("assets/audio/UP.mp3")];

		aLaserSound.amp(2);
		aExplosion.amp(10);
	}

	function setup() {
		const c = createCanvas(1500, 800);
		c.parent('game-wrapper');


		explosion = new Sprite(explosion, 0, 0, 48, 40);

		pD1 = new Sprite(pD1, 0, 0, 60, 32);
		pD2 = new Sprite(pD2, 0, 0, 60, 32);

		playerDAnimation = new Animation([pD1, pD2]);

		varients = [
			new Animation([new Sprite(a1_1, 0, 0, 32, 32), new Sprite(a1_2, 0, 0, 32, 32)]),
			new Animation([new Sprite(a2_1, 0, 0, 44, 32), new Sprite(a2_2, 0, 0, 44, 32)]),
			new Animation([new Sprite(a3_1, 0, 0, 48, 32), new Sprite(a3_2, 0, 0, 48, 32)])
		];

		wiggle = new Animation([
			new Sprite(laserSheet, 12, 0, 12, 21), new Sprite(laserSheet, 37, 0, 12, 21)
		]);

		switchBack = new Animation([
			new Sprite(laserSheet, 0, 0, 12, 21), new Sprite(laserSheet, 25, 0, 12, 21)
		]);

		playerSprite = new Sprite(playerSprite, 0, 0, playerSprite.width, playerSprite.height);
		saucerSprite = new Sprite(saucerSprite, 0, 0, saucerSprite.width, saucerSprite.height);

		startScreen = new Screen("Space Invaders", "", "Start");
		gameOverScreen = new Screen("Game Over", "", "Restart");

		insertButton = new Button("Insert Coin", width/2-150, height/2-50, 300, 100);

		started = false;
		gameOver = false;
		insertedCoin = false;


		g = new Game();
	}

	function draw() {
		textFont(font);
		textAlign(LEFT);

		background(0);

		if (!insertedCoin) {
			insertButton.show();
			insertButton.update();

			if (insertButton.actuated) {
				insertedCoin = true;
				songs[0].play();
			}
		} else {
			if (gameOver) {
				if (gameOverScreen.update()) {
					gameOver = false;
					started = true;
					g.reset();
				}
				gameOverScreen.show();
			} else if (started) {
				if (g.update()) {
					gameOver = true;
					started = false;
					gameOverScreen.subtitle = `Score: ${g.score}`;
				}
				g.show();

				fill(0, 255, 10);
				rect(0, height - 3, width, 3);
			} else {
				if (!songs[0].isPlaying()) {
					songs[0].play();
				}

				if (startScreen.update()) {
					started = true;
					songs[0].stop();
				}
				startScreen.show();

				fill(255);
				textSize(10);
				textAlign(LEFT);
				text("Music courtesy of 8 Bit Universe", 10, 10);
			}
		}
	}

	function keyPressed() {
		if (keyCode === UP_ARROW) {
			g.player.shoot();
		}
	}
}
