/**
 * Checks collisions, collects items, and manages bottle throwing.
 */
class Collision {
    
    /**
     * Periodically checks collisions for the game.
     */
    checkCollision() {
        setInterval(() => {
            this.checkJumpOnChicken();
            this.checkThrowObjects();;
            this.collidingCoins();
            this.collidingBottles();
            this.collidingHealthItems();
            this.checkJumpOnChicken();
            this.checkCollisionBottle();
            this.buyBottle();
            this.checkCollisionBoss();
            this.checkCollisionsChickens();
            this.checkBottleGroundCollision();
        }, 50);
    }


    /**
     * Removes the enemy based on the provided index and type.
     * 
     * @param {Object} enemy - The enemy to be removed.
     * @param {number} index - The index of the enemy in the enemy list.
     */
    removeEnemy(enemy, index) {
        if (this.isConstructorChicken(enemy)) {
            this.removeChicken(enemy);
        } else if (this.isConstructorChicks(enemy)) {
            this.removeChicks(enemy);
        }
        setTimeout(() => this.world.level.enemies.splice(index, 1), 800);
    }


    /**
     * Checks if the given object is an instance of Chicken.
     * 
     * @param {Object} enemy - The object to be checked.
     * @returns {boolean} - True if the object is an instance of Chicken; otherwise, False.
     */
    isConstructorChicken(enemy) {
        return enemy.constructor === Chicken;
    }


    /**
     * Checks if the given object is an instance of Chicks.
     * 
     * @param {Object} enemy - The object to be checked.
     * @returns {boolean} - True if the object is an instance of Chicks; otherwise, False.
     */
    isConstructorChicks(enemy) {
        return enemy.constructor === Chicks;
    }


    /**
     * Checks if the given object is an instance of Endboss.
     * 
     * @param {Object} enemy - The object to be checked.
     * @returns {boolean} - True if the object is an instance of Endboss; otherwise, False.
     */
    isConstructorEndboss(enemy) {
        return enemy.constructor === Endboss;
    }


    /**
     * Removes the given enemy and plays a chicken sound if the game sound is not muted.
     * 
     * @param {Object} enemy - The enemy to be removed.
     */
    removeChicken(enemy) {
        if (!this.world.mute)
            this.world.chicken.chickenSound.play();
        this.world.soundArray.push(this.world.chicken.chickenSound);
        enemy.dead = true;
    }


    /**
     * Removes an enemy and plays the chicken sound.
     * @param {Object} enemy - The enemy to be removed.
     */
    removeChicks(enemy) {
        if (!this.world.mute)
            this.world.chicks.chicksSound.play();
        this.world.soundArray.push(this.world.chicks.chicksSound);
        enemy.dead = true;
    }


    /**
     * Checks if the character is jumping on a chicken, removes the chicken, and makes the character jump if applicable.
     */
    checkJumpOnChicken() {
        this.world.level.enemies.forEach((enemy, index) => {
            if (this.jumpOnChicken(enemy)) {
                this.removeEnemy(enemy, index);
                this.world.character.jump();
            }
        });
    }


    /**
     * Checks if the character is jumping on a chicken.
     * @param {Object} enemy - The enemy object to be checked.
     * @returns {boolean} - Returns true if the character is jumping on a chicken, otherwise false.
     */
    jumpOnChicken(enemy) {
        return (this.isConstructorChicken(enemy) || this.isConstructorChicks(enemy)) &&
            this.world.character.isColliding(enemy) &&
            this.world.character.isAboveGround() &&
            this.world.character.speedY < 0
    }


    /**
     * Handles the end boss's hit or death.
     */
    endbossHitOrDead() {
        this.world.endbossHealthBar.hit();
        this.world.endboss.speed += 5;
        if (this.world.endbossHealthBar.percentage === 0) {
            if (!this.world.mute)
                this.world.endboss.bossDeadSound.play();
            this.world.endboss.animateDead();
            this.world.endboss.speed = 20;
        }
    }


    /**
     * Checks collisions between bottles and enemies in the game and processes the hits.
     */
    checkCollisionBottle() {
        this.world.throwableObjects.forEach((bottle, bottleIndex) => {
            this.world.level.enemies.forEach((enemy, enemyIndex) => {
                if (this.bottleCollidingEnemy(bottle, enemy)) {
                    if (this.isConstructorEndboss(enemy)) {
                        this.bottleHitsEndboss(bottle, bottleIndex);
                    } else {
                        this.bottleHitsEnemy(bottle, enemy, enemyIndex, bottleIndex);
                    }
                }
            });
        });
    }


    /**
     * Checks if a bottle is colliding with an enemy and is not broken.
     * 
     * @param {Object} bottle - The bottle.
     * @param {Object} enemy - The enemy.
     * @returns {boolean} - Indicates whether the bottle is colliding with the enemy and is not broken.
     */
    bottleCollidingEnemy(bottle, enemy) {
        return !bottle.break && bottle.isColliding(enemy) && (this.isConstructorChicks(enemy) || this.isConstructorChicken(enemy) || this.isConstructorEndboss(enemy));
    }


    /**
     * Inflicts damage on an enemy with a bottle and removes it afterward.
     * 
     * @param {Object} bottle - The bottle causing the damage.
     * @param {Object} enemy - The hit enemy.
     * @param {number} enemyIndex - The index of the enemy in the enemy list.
     * @param {number} bottleIndex - The index of the bottle in the throwable objects list.
     */
    bottleHitsEnemy(bottle, enemy, enemyIndex, bottleIndex) {
        bottle.break = true;
        this.removeEnemy(enemy, enemyIndex);
        setTimeout(() => {
            this.world.throwableObjects.splice(bottleIndex, 1);
        }, 500);
        if (!this.world.mute)
            this.world.throwablObject.bottleSplashSound.play();
    }


    /**
     * Simulates the impact of a bottle on the endboss in the game.
     * 
     * @param {Object} bottle - The bottle causing the impact.
     * @param {number} bottleIndex - The index of the bottle in the list of throwable objects.
     */
    bottleHitsEndboss(bottle, bottleIndex) {
        bottle.break = true;
        setTimeout(() => {
            this.world.throwableObjects.splice(bottleIndex, 1);
        }, 500);
        if (!this.world.mute)
            this.world.throwablObject.bottleSplashSound.play();
        this.world.sound.playEndbossHurtSound();
        this.endbossHitOrDead();
        this.world.throwablObject.bottleSplashSound.currentTime = 0;
    }


    /**
     * Checks and collects colliding health items in the current game level.
     */
    collidingHealthItems() {
        for (let i = this.world.level.healthItems.length - 1; i >= 0; i--) {
            if (this.isCollidingHealth(i)) {
                this.collectHealth(i);
            }
        }
    }


    /**
     * Checks if the character is colliding with a health item and has energy below 100.
     * 
     * @param {number} i - The index of the health item in the level.
     * @returns {boolean} - True if collision and energy condition are met, otherwise False.
     */
    isCollidingHealth(i) {
        return this.world.character.isColliding(this.world.level.healthItems[i]) && this.world.character.energy < 100;
    }


    /**
     * Processes the collection of a health item, updates the character status, and plays the sound.
     * 
     * @param {number} i - The index of the health item in the level.
     */
    collectHealth(i) {
        this.world.character.contactWithLifeItem();
        this.world.healthStatusbar.setPercentageByHealthItem(this.world.character.energy);
        this.world.level.healthItems.splice(i, 1);
        this.world.healthItem.healthSound.currentTime = 0;
        if (!this.world.mute)
            this.world.healthItem.healthSound.play();
        this.world.soundArray.push(this.world.healthItem.healthSound);
    }


    /**
     * Checks and processes collisions with salsa bottles in the game, collects bottles, or checks if the bottle storage is full.
     */
    collidingBottles() {
        for (let i = this.world.level.salsaBottles.length - 1; i >= 0; i--) {
            if (this.isCollidingBottle(i)) {
                if (this.world.bottleStock === 5) {
                    this.checkIfBottleStorageFull();
                } else {
                    this.collectBottle(i);
                }
            }
        }
    }


    /**
     * Checks if the bottle at the specified index is colliding with the character.
     * 
     * @param {number} i - The index of the salsa bottle in the level.
     * @returns {boolean} - True if collision is present; otherwise, false.
     */
    isCollidingBottle(i) {
        return this.world.character.isColliding(this.world.level.salsaBottles[i]);
    }


    /**
     * Checks if the bottle storage is full and updates the bottle status bar accordingly.
     */
    checkIfBottleStorageFull() {
        this.world.bottleStock;
        this.world.bottleStatusbar.setBottleValue(this.world.bottleStock);
    }


    /**
     * Increases bottle stock, updates the bottle status bar, and removes a salsa bottle from the level; plays the bottle sound and adds it to the sound array.
     * 
     * @param {number} value - Index of the salsa bottle to be removed.
     */
    collectBottle(value) {
        this.world.bottleStock++;
        this.world.bottleStatusbar.setBottleValue(this.world.bottleStock);
        this.world.level.salsaBottles.splice(value, 1);
        this.world.bottle.bottleSound.currentTime = 0;
        if (!this.world.mute)
            this.world.bottle.bottleSound.play();
        this.world.soundArray.push(this.world.bottle.bottleSound);
    }


    /**
     * Checks collisions with chickens and updates the game accordingly.
     */
    checkCollisionsChickens() {
        this.world.level.enemies.forEach((enemy) => {
            if (this.isCollidingChickens(enemy)) {
                if (!this.world.gamePaused) {
                    if (!this.world.mute)
                        this.world.character.hurtSound.play();
                    this.world.character.hit();
                    this.world.healthStatusbar.setPercentageHealthBar(this.world.character.energy);
                }
            }
        });
    }


    /**
     * Checks if the game character is colliding with an enemy object that is either a Chicken or Chicks instance and is not above the ground.
     * 
     * @param {Object} enemy - The enemy object to be checked.
     * @returns {boolean} - True if collision is present, false otherwise.
     */
    isCollidingChickens(enemy) {
        return this.world.character.isColliding(enemy) && (enemy instanceof Chicken || enemy instanceof Chicks) && !this.world.character.isAboveGround();
    }


    /**
     * Checks collisions with the end boss and inflicts damage to the player if a collision occurs.
     */
    checkCollisionBoss() {
        this.world.level.enemies.forEach(enemy => {
            if (this.isCollidingEndBoss(enemy)) {
                if (!this.world.gamePaused) {
                    if (!this.world.mute) {
                        this.world.character.hurtSound.play();
                    }
                    this.world.character.bigHit();
                    this.world.healthStatusbar.setPercentageHealthBar(this.world.character.energy);
                }
            }
        });
    }


    /**
     * Checks if the character is colliding with the end boss.
     * 
     * @param {Enemy} enemy - The enemy to check for collision.
     * @returns {boolean} - True if colliding with the end boss, otherwise false.
     */
    isCollidingEndBoss(enemy) {
        return this.world.character.isColliding(enemy) && enemy instanceof Endboss;
    }


    /**
     * Checks if the character collides with coins, collects them, and checks for a full coin storage.
     */
    collidingCoins() {
        for (let i = this.world.level.coins.length - 1; i >= 0; i--) {
            if (this.world.character.isColliding(this.world.level.coins[i])) {
                if (this.world.coinStock === 5) {
                    this.checkIfCoinStorageFull();
                } else {
                    this.collectCoin(i);
                }
            }
        }
    }


    /**
     * Checks if the coin storage is full and updates the coin status bar accordingly.
     */
    checkIfCoinStorageFull() {
        this.world.coinStock;
        this.world.coinStatusbar.setCoinValue(this.world.coinStock);
    }


    /**
     * Collects a coin, updates the coin stock, coin status bar, and plays the coin sound.
     * 
     * @param {number} i - The index of the coin to be collected.
     */
    collectCoin(i) {
        this.world.coinStock++;
        this.world.coinStatusbar.setCoinValue(this.world.coinStock);
        this.world.level.coins.splice(i, 1);
        this.world.coins.coinSound.currentTime = 0;
        if (!this.world.mute)
            this.world.coins.coinSound.play();
        this.world.soundArray.push(this.world.coins.coinSound);
    }


    /**
     * Throws a bottle into the game world.
     * 
     * @param {number} currentTime - The current game time.
     */
    throwTheBottle(currentTime) {
        this.bottle = new ThrowableObject(this.world.character.x + 25, this.world.character.y + 80, this.world.character.otherDirection);
        this.world.soundArray.push(this.world.throwablObject.throwSound);
        this.world.throwableObjects.push(this.bottle);
        this.world.lastThrowTime = currentTime;
        this.world.bottleStock--;
        this.world.bottleStatusbar.setBottleValue(this.world.bottleStock);
        if (!this.world.mute)
            this.world.throwablObject.throwSound.play();
    }


    /**
     * Checks if throwing objects is enabled and throws a bottle if all conditions are met.
     */
    checkThrowObjects() {
        if (this.throwingBottle()) {
            this.world.character.standingTimer = 0;
            const currentTime = Date.now();
            if (currentTime - this.world.lastThrowTime >= this.world.throwInterval) {
                if (this.world.bottleStock > 0) {
                    this.throwTheBottle(currentTime);
                }
            }
        }
    }


    /**
     * Returns the key code for the space bar to throw a bottle.
     * 
     * @returns {number} The key code for the space bar.
     */
    throwingBottle() {
        return this.world.keyboard.SPACE;
    }


    /**
     * Buys a bottle if the purchase is possible, updates game values, and plays the purchase sound.
     */
    buyBottle() {
        if (this.checkBuyBottle()) {
            if (!this.world.mute)
                this.world.coins.buySound.play();
            this.world.coinStock--;
            this.world.bottleStock++;
            this.world.bottleStatusbar.setBottleValue(this.world.bottleStock);
            this.world.coinStatusbar.setCoinValue(this.world.coinStock);
            this.world.buyButtonPressed = true;
        } else if (!this.world.keyboard.D) {
            this.world.buyButtonPressed = false;
        }
    }


    /**
     * Checks if a bottle can be bought.
     * 
     * @returns {boolean} - True if the conditions for buying a bottle are met, otherwise false.
     */
    checkBuyBottle() {
        return this.world.keyboard.D && this.world.coinStock > 0 && !this.world.buyButtonPressed && this.world.bottleStock < 5;
    }
    

    /**
     * Checks for collision between bottles and ground, triggering an animation when a bottle reaches the ground.
     */
    checkBottleGroundCollision() {
        this.world.throwableObjects.forEach((bottle, bottleIndex) => {
            if (!bottle.isAboveGround() && !bottle.break) {
                bottle.break = true;
                if (!this.world.mute)
                    this.world.throwablObject.bottleSplashSound.play();
                setTimeout(() => {
                    this.world.throwableObjects.splice(bottleIndex, 1);
                }, 500);
            }
        });
    }
}