/**
 * Class for the end boss health bar.
 */
class EndbossHealthBar extends DrawableObject {
    ENDBOSS_HEALTHBAR = [
        'img/7_statusbars/2_statusbar_endboss/green/green0.png',
        'img/7_statusbars/2_statusbar_endboss/green/green20.png',
        'img/7_statusbars/2_statusbar_endboss/green/green40.png',
        'img/7_statusbars/2_statusbar_endboss/green/green60.png',
        'img/7_statusbars/2_statusbar_endboss/green/green80.png',
        'img/7_statusbars/2_statusbar_endboss/green/green100.png'
    ];
    width = 200;
    height = 60;
    x = 490;
    y = 40;
    percentage = 100;
    isVisible = false;


    /**
     * Loads the image of the health bar and initializes the status bar images.
     */
    constructor() {
        super().loadImage('img/7_statusbars/2_statusbar_endboss/orange/orange100.png');
        this.loadImages(this.ENDBOSS_HEALTHBAR);
        this.setPercentageHealthBar(this.percentage);
    }


    /**
     * Sets the percentage of the health bar.
     * 
     * @param {number} percentage - The new percentage of the health bar.
     */
    setPercentageHealthBar(percentage) {
        this.percentage = percentage;
        let path = this.ENDBOSS_HEALTHBAR[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }


    /**
     * Resolves the index of the image based on the percentage.
     * 
     * @returns {number} - The index of the image.
     */
    resolveImageIndex() {
        if (this.percentage === 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }


    /**
     * Handles the hit on the health bar.
     */
    hit() {
        if (this.whenHitComesTooQuickly())
            return;
        this.percentage -= 20;
        if (this.endbossDead()) {
            setTimeout(() => this.gameWon(), 1000);
            setTimeout(() => this.percentage = 100, 500);
        } else
            this.lastHit = new Date().getTime();
        this.setPercentageHealthBar(this.percentage);
    }


    /**
     * Checks if hits are coming too quickly.
     * 
     * @returns {boolean} - Indicates whether hits are coming too quickly.
     */
    whenHitComesTooQuickly() {
        return this.lastHit && (new Date().getTime() - this.lastHit) < 1000;
    }


    /**
     * Checks if the end boss is dead.
     * 
     * @returns {boolean} - Indicates whether the end boss is dead.
     */
    endbossDead() {
        return this.percentage == 0;
    }


    /**
     * Called when the game is won.
     */
    gameWon() {
        world.win = true;
        world.currentScreen = "end";
    }
}