/**
 * Class for a movable chicken, inheriting from MovableObject.
 */
class Chicken extends MovableObject {
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    IMAGES_DEAD = ['img/3_enemies_chicken/chicken_normal/2_dead/dead.png'];
    chickenSound = new Audio('audio/chicken_dead.mp3');
    width = 75;
    height = 70;
    y = 357;
    dead = false;
    offset = { top: 0, left: +10, right: +10, bottom: +10 };


    /**
     * Constructor for the chicken object: loads images, sets position and speed, starts animation.
     */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = (-3300 * Math.random()) + 2000;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
    }


    /**
     * Animates the object by continuously moving left and displaying the corresponding animation.
     */
    animate() {
        const walkingInterval = setInterval(() => {
            if (!this.dead) {
                this.moveLeft();
                this.playAnimation(this.IMAGES_WALKING);
            } else {
                clearInterval(walkingInterval);
                this.playAnimation(this.IMAGES_DEAD);
            }
        }, 5);
    }
}