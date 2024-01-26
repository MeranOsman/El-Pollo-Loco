/**
 * Creates a status bar class for coins.
 */
class CoinsStatusbar extends DrawableObject {
    IMAGES_COIN_BAR = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ];
    width = 200;
    height = 60;


    /**
     * Loads images for coin bar and sets coin value to 0.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_COIN_BAR);
        this.setCoinValue(0);
    }


    /**
     * Sets the coin value based on the coin stock and updates the coin bar image.
     * 
     * @param {number} coinStock - The coin stock determining the index for the image.
     */

    setCoinValue(coinStock) {
        let path = this.IMAGES_COIN_BAR[this.resolveImageIndex(coinStock)];
        this.x = 30;
        this.y = 50;
        this.img = this.imageCache[path];
    }


    /**
     * Determines the image index based on the coin stock.
     * 
     * @param {number} coinStock - The coin stock.
     * @returns {number} - The image index.
     */
    resolveImageIndex(coinStock) {
        if (coinStock === 5) {
            return 5;
        } else if (coinStock === 4) {
            return 4;
        } else if (coinStock === 3) {
            return 3;
        } else if (coinStock === 2) {
            return 2;
        } else if (coinStock === 1) {
            return 1;
        } else {
            return 0;
        }
    }
}