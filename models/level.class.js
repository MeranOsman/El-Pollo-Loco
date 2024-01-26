/**
 * Class for a game level.
 */
class Level {
    enemies;
    clouds;
    backgroundObjects;
    salsaBottles;
    coins;
    healthStatusbar;
    bottleStatusbar;
    endbossHealthBar;
    healthItems;
    levelEndX = 2157;
    world;


    /**
     * Constructor for the Level class, allowing initialization of enemies, background objects, clouds, salsa bottles, coins, and health items.
     * 
     * @param {Array} enemies - The enemies in the level.
     * @param {Array} backgroundObjects - The background objects in the level.
     * @param {Array} clouds - The clouds in the level.
     * @param {Array} salsaBottles - The salsa bottles in the level.
     * @param {Array} coins - The coins in the level.
     * @param {Array} healthItems - The health items in the level.
     */
    constructor(enemies, backgroundObjects, clouds, salsaBottles, coins, healthItems) {
        this.enemies = enemies;
        this.backgroundObjects = backgroundObjects;
        this.clouds = clouds;
        this.salsaBottles = salsaBottles;
        this.coins = coins;
        this.healthItems = healthItems;
    };


    /**
     * Adds various game elements to the level.
     */
    addObjects() {
        this.addBottles();
        this.addChicken();
        this.addChicks();
        this.addCoins();
        this.addhealthItems();
    }


    /**
     * Adds salsa bottles to the level.
     */
    addBottles() {
        for (let i = 0; i < 6; i++) {
            const bottle = new Bottle();
            this.salsaBottles.push(bottle);
        }
    }

    
    /**
     * Adds coins to the level.
     */
    addCoins() {
        for (let i = 0; i < 8; i++) {
            const coin = new Coins();
            this.coins.push(coin);
        }
    }


    /**
     * Adds chicken enemies to the level.
     */
    addChicken() {
        for (let i = 0; i < 9; i++) {
            let chicken = new Chicken();
            this.enemies.push(chicken);
        }
    }


    /**
     * Adds chicks enemies to the level.
     */
    addChicks() {
        for (let i = 0; i < 8; i++) {
            let chicks = new Chicks();
            this.enemies.push(chicks);
        }
    }


    /**
     * Adds health items to the level.
     */
    addhealthItems() {
        for (let i = 0; i < 5; i++) {
            let healthItems = new HealthItems();
            this.healthItems.push(healthItems);
        }
    }
}
