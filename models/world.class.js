/**
 * The World class represents the game world
 */
class World {
    collision = new Collision();
    chicken = new Chicken();
    chicks = new Chicks();
    throwablObject = new ThrowableObject();
    bottle = new Bottle();
    coinStatusbar = new CoinsStatusbar();
    healthStatusbar = new HealthStatusbar();
    bottleStatusbar = new BottleStatusbar();
    endbossHealthBar = new EndbossHealthBar();
    changeButtons = new ChangeButtons();
    character = new Character();
    sound = new Sound();
    coins = new Coins();
    healthItem = new HealthItems();
    endboss = level1.enemies.find(e => e instanceof Endboss);
    level = level1;
    keyboard;
    titleScreen;
    gameMusic = new Audio('audio/Game-Music.mp3');
    introSound = new Audio('audio/Del-Rio-Bravo.mp3');
    gameWinSound = new Audio('audio/win.mp3');
    gameOverSound = new Audio('audio/Move_Forward.mp3');
    startButton = document.getElementById('start-button');
    menuButton = document.getElementById('menu');
    restartButton = document.getElementById('restart-button');
    fullScreenLogo = document.getElementById('full-size-logo');
    mobileControls = document.getElementById('mobile-controls');
    soundIcon = document.getElementById('sound-icon');
    soundArray = [];
    mute = false;
    gamePaused = true;
    win = false;
    canvas;
    ctx;
    cameraX = 0;
    currentScreen = "title";
    homeMenu = false;
    menuShown = false;
    throwableObjects = [];
    lastThrowTime = 0;
    bottleStock = 0;
    coinStock = 0;
    throwInterval = 1500;


    /**
     * Constructor of the World class, initializes the game world.
     * 
     * @param {HTMLCanvasElement} canvas - The canvas element on which the game is rendered.
     * @param {Object} keyboard - The keyboard object for control.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.draw();
        this.setWorld();
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.initialCharacterX = this.character.x;
        this.initialEndbossX = this.endboss.x;
        this.newImages();
        this.btnFunction();
        this.sound.makeSoundLoop();
    }


    /**
     * Function assigns event listeners for various buttons to perform corresponding actions.
     */
    btnFunction() {
        this.startButton.addEventListener('click', () => this.restartGame());
        this.menuButton.addEventListener('click', () => { this.menuShown = true; this.showMenu(); });
        this.restartButton.addEventListener('click', () => { this.menuShown = false; this.restartGame(); });
        this.soundIcon.addEventListener('click', () => this.sound.switchSoundIcon());
    }


    /**
     * Loads new images.
     */
    newImages() {
        this.titleScreen = new TitleScreen(this.canvas, this.startGame.bind(this));
        this.gameOverImg = new Image();
        this.gameOverImg.src = 'img/9_intro_outro_screens/game_over/game over.png';
        this.gameWinImg = new Image();
        this.gameWinImg.src = 'img/other_img/win.png';
    }


    /**
     * Displays the main menu.
     */
    showMenu() {
        this.gameOverSound.pause();
        this.gameWinSound.pause();
        this.titleScreen = new TitleScreen(this.canvas, this.startGame.bind(this));
        this.clearAllIntervals();
        this.changeButtons.changeButtonsTitle();
        this.introSound.currentTime = 0;
        this.sound.startMusicMenu();
        clearInterval(this.character.sleepInterval);
    }


    /**
     * Starts the game, sets specific properties, and initiates the gameplay.
     */
    startGame() {
        this.character.standingTimer = 0;
        this.character.otherDirection = false;
        setTimeout(() => {
            this.character.speed = 5.5;
            this.startButton.classList.remove('d-flex');
            this.startButton.classList.add('d-none');
            this.gamePaused = false;
            this.homeMenu = false;
            this.sound.startMusic();
            this.draw();
            this.setWorld();
            this.run();
        }, 200);
    }


    /**
     * Restarts the game by clearing all intervals, resetting game properties, starting animations, and initiating the game.
     */
    restartGame() {
        this.clearAllIntervals();
        this.resetGameProperties();
        this.character.animate();
        this.runAnimate();
        this.endboss.animate();
        this.character.applyGravity();
        this.resetStatusbars();
        this.changeButtons.changeButtonsOnRestartGame();
        this.startGame();
    }


    /**
     * Executes the animation logic for all clouds in the game world.
     */
    runAnimate() {
        this.level.clouds.forEach((cloud) => {
            cloud.animate();
        });
    }


    /**
     * Resets the status bars to their default images.
     */
    resetStatusbars() {
        this.healthStatusbar.loadImage('img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png');
        this.coinStatusbar.loadImage('img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png');
        this.bottleStatusbar.loadImage('img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png');
        this.endbossHealthBar.loadImage('img/7_statusbars/2_statusbar_endboss/orange/orange100.png');
    }


    /**
     * Clears all active intervals.
     */
    clearAllIntervals() {
        for (let i = 1; i < 999999; i++) window.clearInterval(i);
    }


    /**
     * Establishes the connection between the World class and other classes to access the game world.
     */
    setWorld() {
        this.character.world = this;
        this.collision.world = this;
        this.changeButtons.world = this;
        this.sound.world = this;
        this.level.world = this;
    }


    /**
     * Resets the game properties to restart the game.
     */
    resetGameProperties() {
        this.resetEnemies();
        this.currentScreen = 'title';
        this.character.energy = 100;
        this.endbossHealthBar.percentage = 100;
        this.endbossHealthBar.isVisible = false;
        this.character.x = this.initialCharacterX;
        this.endboss.x = this.initialEndbossX;
        this.endboss.bossWalking = false;
        this.bottleStock = 0;
        this.bottleStatusbar.bottle = 0;
        this.coinStock = 0;
        this.win = false;
        this.homeMenu = true;
        this.level.addObjects();
    }


    /**
     * Removes all instances of specific enemy types and items from the Level class.
     */
    resetEnemies() {
        this.level.healthItems = this.level.healthItems.filter(e => !(e instanceof HealthItems));
        this.level.enemies = this.level.enemies.filter(e => !(e instanceof Chicken));
        this.level.enemies = this.level.enemies.filter(e => !(e instanceof Chicks));
        this.level.coins = this.level.coins.filter(e => !(e instanceof Coins));
        this.level.salsaBottles = this.level.salsaBottles.filter(e => !(e instanceof Bottle));
    }


    /**
     * The run function controls the game flow, checks the game status, collisions, and the appearance of the end boss.
     */
    run() {
        this.sound.checkIfGamePaused();
        this.collision.checkCollision();
        this.collisionTimerHit = setInterval(() => {
            if (this.endbossComing()) {
                this.endbossComes();
                if (!this.mute) {
                    this.gameMusic.pause();
                    this.endboss.bossFightSound.play();
                    this.soundArray.push(this.endboss.bossFightSound);
                } else {
                    this.endboss.bossFightSound.currentTime = 0;
                    this.endboss.bossFightSound.pause();
                }
            }
        }, 150);
    }


    /**
     * Checks if the end boss is entering the screen area.
     * 
     * @returns {boolean} - True if the end boss is coming; otherwise false.
     */
    endbossComing() {
        return !this.gamePaused && -1657 > this.cameraX;
    }


    /**
     * Activates the end boss and makes the end boss health bar visible.
     */
    endbossComes() {
        this.endbossHealthBar.isVisible = true;
        this.endboss.bossWalking = true;
    }


    /**
     * The drawGame function renders the game by drawing the background, movable objects, the character, and the status bars.
     */
    drawGame() {
        this.titleScreen.render();
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.translate(this.cameraX, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addAllMovableObjects();
        this.ctx.translate(-this.cameraX, 0);
        this.drawCharacter();
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }


    /**
     * Draws the character on the canvas, considering the camera position and status bars.
     */
    drawCharacter() {
        this.ctx.save();
        this.ctx.translate(this.cameraX, 0);
        this.ctx.translate(-this.cameraX, 0);
        this.addAllBars();
        this.ctx.translate(-this.cameraX, 0);
        this.ctx.translate(this.cameraX, 0);
        this.ctx.translate(this.cameraX, 0);
        this.addToMap(this.character);
        this.ctx.translate(-this.cameraX, 0);
        this.ctx.restore();
    }


    /**
     * Adds all movable objects to the world map.
     */
    addAllMovableObjects() {
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.healthItems);
        this.addObjectsToMap(this.level.salsaBottles);
    }


    /**
     * Adds all status bars of the game world to the canvas.
     */
    addAllBars() {
        this.addToMap(this.healthStatusbar);
        this.addToMap(this.coinStatusbar);
        this.addToMap(this.bottleStatusbar);
        if (this.endbossHealthBar.isVisible === true) {
            this.addToMap(this.endbossHealthBar);
        }
    }


    /**
     * The draw function renders the game screen based on the current state of the game.
     */
    draw() {
        if (this.gamePaused) {
            return;
        } else {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.translate(this.cameraX, 0);
            if (this.currentScreen === "title") {
                this.drawGame();
                this.homeMenu = true;
            } else if (this.currentScreen === "end") {
                this.renderEndScreen();
                this.homeMenu = true;
            }
        }
    }


    /**
     * Adds a list of game objects to the canvas of the world.
     * 
     * @param {Array} objects - The list of game objects to be added to the canvas.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    };


    /**
     * Adds a movable object to the canvas and flips it if it is facing the other direction.
     * 
     * @param {MovableObject} mo - The movable object to be drawn.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    };


    /**
     * Flips a movable object horizontally on the canvas.
     * 
     * @param {MovableObject} mo - The movable object to be flipped.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    /**
     * Resets a previously flipped movable object to its original orientation.
     * 
     * @param {MovableObject} mo - The movable object to be reset.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }


    /**
     * Renders the end screen with appropriate buttons and pauses the game.
     */
    renderEndScreen() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.changeButtons.changeButtonsEndscreen();
        this.gamePaused = true;
        this.gameMusic.currentTime = 0;
        this.endboss.bossFightSound.currentTime = 0;
        this.endboss.speed = 20;
        this.sound.pauseSound();
        this.disableKeys();
        if (!this.mute)
            this.sound.checkGameStatusMusic();
        this.renderImage();
    }


    /**
     * Disables specific keys on the keyboard.
     */
    disableKeys() {
        this.keyboard.LEFT = false;
        this.keyboard.RIGHT = false;
        this.keyboard.UP = false;
        this.keyboard.DOWN = false;
        this.keyboard.SPACE = false;
        this.keyboard.D = false;
    }


    /**
     * The renderImage function renders either the win image or the game over image based on the game status.
     */
    renderImage() {
        if (this.win) {
            this.renderWinImage();
        } else {
            this.renderGameOverImage();
        }
    }


    /**
     * Renders the game over image on the canvas.
     */
    renderGameOverImage() {
        const gameOverImgX = (this.canvas.width - this.gameOverImg.width * 0.5) / 2;
        const gameOverImgY = (this.canvas.height - this.gameOverImg.height * 0.5) / 1;

        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.drawImage(
            this.gameOverImg,
            gameOverImgX,
            gameOverImgY,
            this.gameOverImg.width * 0.5,
            this.gameOverImg.height * 0.5
        );
    }


    /**
     * Renders the win image on the canvas.
     */
    renderWinImage() {
        const gameWinImgX = (this.canvas.width - this.gameWinImg.width * 0.2) / 2;
        const gameWinImgY = (this.canvas.height - this.gameWinImg.height * 0.2) / 3;

        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.translate(gameWinImgX + this.gameWinImg.width * 0.2 / 2, gameWinImgY + this.gameWinImg.height * 0.2 / 2);
        this.ctx.drawImage(
            this.gameWinImg,
            -this.gameWinImg.width * 0.2 / 2,
            -this.gameWinImg.height * 0.2 / 2,
            this.gameWinImg.width * 0.2,
            this.gameWinImg.height * 0.2
        );
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
}