/**
 * Class for chicken objects, extending MovableObject. Controls the movement, animation, and actions of the chickens.
 */
class Chicks extends MovableObject {
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];
    IMAGES_DEAD = ['img/3_enemies_chicken/chicken_small/2_dead/dead.png'];
    chicksSound = new Audio('audio/chick_dead.mp3');
    width = 50;
    height = 40;
    y = 385;
    speedY = 25;
    dead = false;
    acceleration = 2.5;
    isJumping = false;
    offset = { top: -5, left: +5, right: +15, bottom: +80 };


    /**
     * Constructor for the Chicken class, initializes the object with images, position, speed, and starts the animation.
     */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = (-3300 * Math.random()) + 2000;
        this.speed = 0.30 + Math.random() * 0.25;
        this.animate();
        this.letChicksJumpAndFall();
    }


    /**
     * Animates the character object by moving it to the left and playing the corresponding animation.
     */
    animate() {
        const walkingInterval = setInterval(() => {
            if (!this.dead) {
                this.moveLeft();
                this.playAnimation(this.IMAGES_WALKING);
            } else {
                clearInterval(walkingInterval);
                this.chicksFall();
                this.chickFallsByDead();
                this.playAnimation(this.IMAGES_DEAD);
            }
        }, 15);
    }



    /**
     * Initiates periodic chicken jumping movements with random parameters.
     */
    letChicksJumpAndFall() {
        let jumpInterval = 200 + Math.random() * 500;
        let jumpHeight = 4 + Math.random() * 10;
        setInterval(() => {
            if (!this.dead) {
                this.chicksJumpAndFall(jumpInterval, jumpHeight);
            }

        }, 1000 / 25);
    }


    /**
     * Updates the position and speed for a jumping character.
     */
    chicksJumping() {
        if (this.speedY >= 0) {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
        } else {
            this.isJumping = false;
        }
    }


    /**
     * Updates the position of "chicks" based on vertical speed and acceleration.
     */
    chicksFall() {
        this.y += this.speedY;
        this.speedY += this.acceleration;
    }


    /**
     * Checks if the object is above a certain height.
     * 
     * @returns {boolean} - True if the object is above the height, otherwise False.
     */
    chicksInAir() {
        return this.y < 385;
    }


    /**
     * Checks the state of chicks and makes them jump, fall, or stay on the ground.
     * 
     * @param {number} jumpInterval - Interval for chicks' jumping.
     * @param {number} jumpHeight - Height of the chicks' jump.
     */
    chicksJumpAndFall(jumpInterval, jumpHeight) {
        if (this.isJumping) {
            this.chicksJumping();
        } else if (this.chicksInAir()) {
            this.chicksFall();
        }
        else {
            this.chicksOnGround(jumpInterval, jumpHeight);
        }
    }


    /**
     * Initializes the chicken with a jump interval and jump height.
     * 
     * @param {number} jumpInterval - The interval before the first jump in milliseconds.
     * @param {number} jumpHeight - The height of the jump.
     */
    chicksOnGround(jumpInterval, jumpHeight) {
        this.y = 385;
        this.speedY = 0;
        setTimeout(() => {
            this.isJumping = true;
            this.speedY = jumpHeight;
        }, jumpInterval);
    }


    /**
     * Sets the vertical position to 385 and vertical speed to 0 for a falling chicken scenario.
     */
    chickFallsByDead() {
        this.y = 385;
        this.speedY = 0;
    }
}