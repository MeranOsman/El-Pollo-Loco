/**
 * The Character class represents a playable character with various animations and actions.
 */
class Character extends MovableObject {
    IMAGES_LONG_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];
    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];
    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];
    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
        'img/2_character_pepe/4_hurt/H-43.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];
    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];
    jumpSound = new Audio('audio/jump.mp3');
    sleepSound = new Audio('audio/sleep.mp3');
    walkingSound = new Audio('audio/walking.mp3');
    hurtSound = new Audio('audio/hurt.mp3');
    dieSound = new Audio('audio/die.mp3');
    height = 250;
    width = 100;
    x = -1900;
    y = 180;
    speed = 5.5;
    standingTimer = 0;
    sleepInterval;
    world;
    offset = { top: 5, left: 5, right: 5, bottom: 5 };


    /**
     * Constructor for the character class. Loads static and animated images and applies gravity.
     */
    constructor() {
        super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.applyGravity();
        this.animate();
    }


    /**
     * Sets the vertical speed to 30 to make a character jump.
     */
    characterJumps() {
        this.speedY = 30;
    }


    /**
     * Animates movements, images, and initiates falling asleep soon.
     */
    animate() {
        this.animateMovement();
        this.animateImages();
        this.fallsAsleepSoon();
    }


    /**
     * Animates the movement of the character by calling the moveCharacter function every 1/60 seconds.
     */
    animateMovement() {
        setInterval(() => this.moveCharacter(), 1000 / 60);
    }


    /**
     * Initiates an interval to check if falling asleep soon by incrementing the standing timer.
     */
    fallsAsleepSoon() {
        this.sleepInterval = setInterval(() => {
            this.standingTimer += 1;
        }, 1000);
    }


    /**
     * Moves the character based on game conditions and updates the camera position.
     */
    moveCharacter() {
        if (this.world.homeMenu) {
            this.number++;
            if (this.canMoveRight())
                this.moveRight();
            if (this.canMoveLeft())
                this.moveLeft();
            if (this.canJump())
                this.jump();
            this.world.cameraX = -this.x + 100;
        }
    }


    /**
     * Checks if the character can move to the right.
     * 
     * @returns {boolean} - True if the right arrow key is pressed and the character is still within the level's end, otherwise false.
     */
    canMoveRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.levelEndX;
    }


    /**
     * Checks if the character can move to the left.
     * 
     * @returns {boolean} - True if the left arrow key is pressed and the character is still within the level's end, otherwise false.
     */
    canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > -2100;
    }


    /**
     * Moves the object to the left and sets additional properties.
     */
    moveLeft() {
        super.moveLeft();
        this.otherDirection = true;
        this.standingTimer = 0;
    }


    /**
     * Checks if the character can jump.
     * 
     * @returns {boolean} - Returns true if the jump key is pressed and the character is not above the ground, otherwise false.
     */
    canJump() {
        return world.keyboard.UP && !this.isAboveGround();
    }


    /**
     * Executes a jump of the game character and plays the jump sound.
     */
    jump() {
        if (this.world.homeMenu) {
            this.characterJumps();

            if (!this.world.mute)
                this.jumpSound.play();
            this.walkingSound.pause();
        }
    }


    /**
     * Initiates the animation of images by repeatedly calling the playCharacter function at an interval.
     */
    animateImages() {
        setInterval(() => this.playCharacter(), 104.45);
    }


    /**
     * Executes the character's action based on its current state.
     */
    playCharacter() {
        this.characterIdle();
        if (this.isDead()) {
            this.deadResult();
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
            this.standingTimer = 0;
        } else if (this.isAboveGround()) {
            this.jumpAnimation();
        } else {
            this.characterMoving();
        }
    }


    /**
     * Plays the death animation, plays the death sound if not muted, sets energy to 10, and resets the standing timer.
     */
    deadResult() {
        this.playAnimation(this.IMAGES_DEAD);
        if (!this.world.mute)
            this.dieSound.play();
        this.energy = 10;
        this.standingTimer = 0;
    }


    /**
     * Checks if the character is moving and initiates the walking animation sequence.
     */
    characterMoving() {
        if (this.isJumping)
            this.isJumping = false;
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(this.IMAGES_WALKING);
            if (!this.world.mute && this.world.homeMenu) {
                this.walkingSound.play();
                this.standingTimer = 0;
            }
        }
    }


    /**
     * Initiates the jump animation and resets the standing timer.
     */
    jumpAnimation() {
        this.standingTimer = 0;
        this.playAnimation(this.IMAGES_JUMPING);
        this.isJumping = true;
    }


    /**
     * Performs the appropriate action based on the character's idle time.
     */
    characterIdle() {
        if (this.standingTimer < 3.5) {
            this.idleResult();
        } else {
            this.playAnimation(this.IMAGES_LONG_IDLE);
            if (!this.world.mute && this.world.homeMenu) {
                this.sleepSound.play();
            }
        }
    }


    /**
     * Initiates the idle animation
     */
    idleResult() {
        this.playAnimation(this.IMAGES_IDLE);
        this.sleepSound.currentTime = 0;
        this.sleepSound.pause();
        this.walkingSound.pause();
    }
}