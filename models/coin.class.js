/**
 * Creates a Coins class that inherits from DrawableObject and represents animated coins.
 */
class Coins extends DrawableObject {
    IMAGES_COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];
    coinSound = new Audio('audio/coin-pickup.mp3');
    buySound = new Audio('audio/buy.mp3');
    height = 130;
    width = 130;
    offset = { top: -10, left: 60, right: 60, bottom: 120 };


    /**
     * Loads coin images, sets random position, and initiates animation.
     */
    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COIN);
        this.x = (-3300 * Math.random()) + 1800;
        this.y = 30 + Math.random() * 150;
        this.animate();
    }


    /**
     * Animates the playback of images at regular intervals.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 1000 / 2);
    }


    /**
     * Plays an animation by selecting the image based on the current index from the given array of image paths.
     * 
     * @param {string[]} images - The array of image paths.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}
