/**
 * Creates a HealthItems object that inherits from the DrawableObject class.
 */
class HealthItems extends DrawableObject {
    IMAGE_HEALTH = ['img/7_statusbars/3_icons/icon_health.png'];
    healthSound = new Audio('audio/health_sound.mp3');
    width = 60;
    height = 60;
    offset = { top: +5, left: +25, right: +25, bottom: +100 };


    /**
     * Loads the health icon image, sets the position randomly, and defines the movement speed.
     */
    constructor() {
        super().loadImage('img/7_statusbars/3_icons/icon_health.png');
        this.x = (-3300 * Math.random()) + 1800;
        this.y = 30 + Math.random() * 150;
        this.speed = 0.15 + Math.random() * 0.25;
    }
}