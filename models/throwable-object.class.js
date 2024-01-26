/**
 * Creates a ThrowableObject representing a throwable bottle.
 */
class ThrowableObject extends MovableObject {
    IMAGE_BOTTLE_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
    IMAGE_BOTTLE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];
    bottleSplashSound = new Audio('audio/splash.mp3');
    throwSound = new Audio('audio/throw.mp3');
    width = 75;
    height = 75;
    world;
    speedY = 30;
    speedX = 20;
    break = false;
    offset = { top: + 40, left: + 40, right: + 20, bottom: + 40 };


    /**
     * Initializes a new ThrowableObject at the specified coordinates
     * 
     * @param {number} x - The x-position of the object.
     * @param {number} y - The y-position of the object.
     * @param {boolean} direction - The direction of the throw.
     */
    constructor(x, y, direction) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGE_BOTTLE_ROTATION);
        this.loadImages(this.IMAGE_BOTTLE_SPLASH);
        this.x = x;
        this.y = y;
        this.throw(direction);
    }


    /**
     * Initiates the throw of the bottle in the specified direction.
     * 
     * @param {boolean} direction - The direction of the throw.
     */
    throw(direction) {
        this.speedY = 30;
        this.applyGravity();
        let moveInterval = setInterval(() => {
            this.move(direction);
            if (this.break) {
                clearInterval(moveInterval);
            }
        }, 75);
        setInterval(this.rotate.bind(this), 50);
    }


    /**
     * Checks if the ThrowableObject is above the ground.
     * 
     * @returns {boolean} - Returns true if the object is above the ground, otherwise false.
     */
    isAboveGround() {
        return this.y < 356;
    }


    /**
     * Moves the ThrowableObject in the specified direction.
     * 
     * @param {boolean} direction - The direction of the throw.
     */
    move(direction) {
        if (direction) {
            this.x -= this.speedX;
        } else {
            this.x += this.speedX;
        }
    }


    /**
     * Rotates the bottle and plays the corresponding animation based on the bottle's state.
     */
    rotate() {
        if (this.break) {
            this.acceleration = 0;
            this.speedY = 0;
            this.speedX = 0;
            this.playAnimation(this.IMAGE_BOTTLE_SPLASH);
        } else {
            this.playAnimation(this.IMAGE_BOTTLE_ROTATION);
        }
    }
}