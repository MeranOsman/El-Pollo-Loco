/**
 * Class for bottle, inheriting from DrawableObject.
 */
class Bottle extends DrawableObject {
    BOTTLE_IMAGE = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];
    bottleSound = new Audio('audio/glass.mp3');
    width = 75;
    height = 75;
    x;
    y = 356;
    offset = { top: + 55, left: + 60, right: + 45, bottom: + 55 };


    /**
     * Constructor for the salsa bottle instance. Loads the image and initializes the position.
     */
    constructor() {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.BOTTLE_IMAGE);
        this.x = (-3300 * Math.random()) + 1800;
        this.animate();
    }


    /**
     * Initiates an animation that updates the bottle image.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.BOTTLE_IMAGE);
        }, 1000 / 2);
    }


    /**
     * Plays an animation by selecting the next image from the provided array.
     * @param {string[]} images - The array of image paths to be used for the animation.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}