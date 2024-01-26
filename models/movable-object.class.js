/**
 * Class for a movable object that inherits from DrawableObject and contains physical properties such as speed, energy, and collisions.
 */
class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    lastHeal = 0;
    offset = { top: 0, left: 0, right: 0, bottom: 0 };


    /**
     * Applies gravity to the movable object by updating the Y-position based on speed and acceleration.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }


    /**
     * Checks if the movable object is colliding with another object.
     * 
     * @param {MovableObject} mo - The other movable object.
     * @returns {boolean} - Returns true if a collision is detected, otherwise false.
     */
    isColliding(mo) {
        return (
            this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
        );
    }


    /**
     * Reduces the energy of the movable object due to a hit and checks if the energy has fallen to zero.
     */
    hit() {
        this.energy -= 1.5;
        if (this.energy <= 0) {
            this.energy = 0;
            this.jumpToEndScreen();
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    /**
     * Inflicts a powerful hit on the movable object, reducing energy.
     */
    bigHit() {
        this.energy -= 8;
        if (this.energy <= 0) {
            this.energy = 0;
            this.jumpToEndScreen();
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    /**
     * Initiates a jump to the end screen.
     */
    jumpToEndScreen() {
        setTimeout(() => {
            this.world.currentScreen = "end";
        }, 400);
    }


    /**
     * Handles contact with a life item by increasing energy.
     */
    contactWithLifeItem() {
        this.energy += 20;
        if (this.energy >= 100) {
            this.energy = 100;
        } else {
            this.lastHeal = new Date().getTime();
        }
    }


    /**
     * Checks if the movable object has been recently
     * 
     * @returns {boolean} - True if the object has been hurt, otherwise false.
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 1;
    }


    /**
     * Checks if the object is currently healing.
     * 
     * @returns {boolean} - True if the object is still in the healing process, otherwise False.
     */
    isHealing() {
        let timePassed = new Date().getTime() - this.lastHeal;
        timePassed = timePassed / 1000;
        return timePassed < 1;
    }


    /**
     * Checks if the movable object is dead.
     * 
     * @returns {boolean} - True if the object is dead, otherwise false.
     */
    isDead() {
        return this.energy === 0;
    }


    /**
     * Checks if the object is above the ground.
     * 
     * @returns {boolean} True if the object is above the ground, otherwise, False.
     */
    isAboveGround() {
        return this.y < 180;
    }


    /**
     * Moves the movable object to the left.
     */
    moveLeft() {
        this.x -= this.speed;
    }


    /**
     * Moves the movable object to the right.
     */
    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
        this.standingTimer = 0;
    }


    /**
     * Plays an animation for the movable object.
     * 
     * @param {string[]} images - An array of paths to the images of the animation.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}