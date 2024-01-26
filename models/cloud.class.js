/**
 * Class for a moving clouds, extending MovableObject.
 */
class Cloud extends MovableObject {
    width = 500;
    height = 250;
    y = 20;


    /**
     * Constructor for an object that loads an image from the specified path and starts an animation.
     * @param {string} imagePath - The path to the image to be loaded.
     * @param {number} x - The horizontal position of the object.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.speed = 0.2;
        this.animate();
    }


    /**
     * Animates leftward movement and checks boundaries at a rate of 60 frames per second.
     */

    animate() {
        setInterval(() => {
            this.moveLeft();
            this.checkBounds();
        }, 1000 / 60);
    }


    /**
     * Checks the bounds of the position and updates the X-coordinate if necessary.
     */
    checkBounds() {
        if (this.x + this.width < -719 * 7) {
            this.x = this.x + 719 * 10;
        }
    }
}