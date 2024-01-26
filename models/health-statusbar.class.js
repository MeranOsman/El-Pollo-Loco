/**
 * A class representing a health status bar.
 */
class HealthStatusbar extends DrawableObject {
    IMAGES_HEALTH_BAR = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ];
    width = 200;
    height = 60;
    percentage = 100;


    /**
     * Initializes an instance of the class with images loaded and a default health bar of 100%.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_HEALTH_BAR);
        this.setPercentageHealthBar(100);
    }


    /**
     * Sets the percentage of the health bar and updates the corresponding image.
     * 
     * @param {number} percentage - The percentage of health.
     */
    setPercentageHealthBar(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_HEALTH_BAR[this.resolveImageIndex()];
        this.x = 30;
        this.y = 0;
        this.img = this.imageCache[path];
    }


    /**
     * Sets the percentage of the health bar based on a health item.
     * 
     * @param {number} percentage - The percentage of health to be set.
     */
    setPercentageByHealthItem(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_HEALTH_BAR[this.resolveImageIndex()];
        this.x = 30;
        this.y = 0;
        this.img = this.imageCache[path];
    }


    /**
     * Resolves the index of the image path based on the percentage of the health bar.
     * 
     * @returns {number} - The resolved index of the image path.
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
}