/**
 * The class "BottleStatusbar" represents a status bar for bottles with images for various fill levels.
 */
class BottleStatusbar extends DrawableObject {
    IMAGES_BOTTLE_BAR = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png'
    ];
    width = 200;
    height = 60;


    /**
     * Constructor for the class. Loads images for bottle bar and sets the bottle value to 0.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_BOTTLE_BAR);
        this.setBottleValue(0);
    }


    /**
     * Sets the value of the bottle and updates the position and image accordingly.
     * 
     * @param {number} bottleStock - The stock of the bottle.
     */
    setBottleValue(bottleStock) {
        let path = this.IMAGES_BOTTLE_BAR[this.resolveImageIndex(bottleStock)];
        this.x = 30;
        this.y = 100;
        this.img = this.imageCache[path];
    }


    /**
     * Determines the image index based on the bottle stock.
     * 
     * @param {number} bottleStock - The bottle stock.
     * @returns {number} - The associated image index.
     */
    resolveImageIndex(bottleStock) {
        if (bottleStock === 5) {
            return 5;
        } else if (bottleStock === 4) {
            return 4;
        } else if (bottleStock === 3) {
            return 3;
        } else if (bottleStock === 2) {
            return 2;
        } else if (bottleStock === 1) {
            return 1;
        } else {
            return 0;
        }
    }
}
