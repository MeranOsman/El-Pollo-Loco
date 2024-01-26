/**
 * Class for the end boss, controls the animations and actions of the end boss.
 */
class Endboss extends MovableObject {
    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];
    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];
    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];
    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];
    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];
    bossHurtSound = new Audio('audio/enboss_hurt.mp3');
    bossFightSound = new Audio('audio/Spazzmatica-Polka.mp3');
    bossDeadSound = new Audio('audio/boss-dead.mp3');
    width = 270;
    height = 400;
    x = 2157;
    y = 55
    speed = 20;
    bossHurt = false;
    bossWalking = false;
    animateInterval;
    offset = { top: 50, left: + 10, right: + 10, bottom: + -10 };


    /**
     * Initializes the images and starts the animation.
     */
    constructor() {
        super().loadImage('img/4_enemie_boss_chicken/1_walk/G4.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
    }


    /**
     * Initiates the animation of the end boss by periodically executing the functions bossMoving and bossWasHit.
     */
    animate() {
        this.loadImage('img/4_enemie_boss_chicken/1_walk/G4.png');
        this.animateInterval = setInterval(() => {
            this.bossMoving();
            this.bossWasHit();
        }, 200);
    }


    /**
     * Moves the end boss to the left, plays the walking animation, and displays alert animation.
     */
    bossMoving() {
        if (this.bossWalking) {
            if (!this.alertInterval) {
                this.alertInterval = setInterval(() => {
                    this.playAnimation(this.IMAGES_ALERT);
                }, 200);
                setTimeout(() => {
                    clearInterval(this.alertInterval);
                    this.alertInterval = null;
                }, 200);
            }
            this.playAnimation(this.IMAGES_WALKING);
            this.moveLeft();
        }
    }


    /**
     * Handles the hit end boss: Stops the animation, plays hurt animation, and resumes the general animation.
     */
    bossWasHit() {
        if (this.bossHurt) {
            clearInterval(this.animateInterval);
            let hurtInterval = setInterval(() => {
                this.playAnimation(this.IMAGES_HURT);
            }, 100);
            setTimeout(() => {
                clearInterval(hurtInterval);
                this.bossHurt = false;
                this.animate();
            }, 500);
        }
    }


    /**
     * Initiates the death animation of the end boss.
     */
    animateDead() {
        clearInterval(this.animateInterval);

            let deathInterval;
            deathInterval = setInterval(() => {
                this.playAnimation(this.IMAGES_DEAD);
            }, 200);
            setTimeout(() => {
                clearInterval(deathInterval);
                this.isDeathAnimationPlaying = false;
            }, 500);
    }
}