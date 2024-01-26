/**
 * A class providing functions for managing sound effects and background music in the game.
 */
class Sound {
    world;


    /**
     * Starts the background music and pauses other sounds if not muted, and updates the volume icon.
     */
    startMusic() {
        if (!this.world.mute) {
            this.world.gameMusic.play();
            this.world.gameOverSound.pause();
            this.world.gameWinSound.pause();
            this.world.introSound.pause();
            this.world.soundIcon.src = 'img/other_img/volume.png';
        }
    }


    /**
     * Starts the menu music if not muted.
     */
    startMusicMenu() {
        if (!this.world.mute)
            this.world.introSound.play();
        if (this.iconVolume())
            this.world.introSound.play();
    }


    /**
     * Checks if the volume icon contains the image for enabled sound.
     */
    iconVolume() {
        return this.world.soundIcon.src.includes('img/other_img/volume.png');
    }


    /**
     * Changes the volume icon, mutes the sound, and pauses all sounds, including music and effects.
     */
    changeIconAndPauseMusic() {
        this.world.mute = true;
        this.world.character.sleepSound.pause();
        if (this.world.gamePaused) {
            this.world.introSound.pause();
            this.world.gameWinSound.pause();
            this.world.gameOverSound.pause();
            this.world.character.sleepSound.pause();
        } else {
            this.world.gameMusic.pause();
        }
        this.world.soundIcon.src = 'img/other_img/mute_Icon.png';
    }


    /**
     * Checks if the game is paused.
     */
    checkIfGamePaused() {
        if (this.world.gamePaused)
            return;
    }


    /**
     * Switches the sound icon and starts or pauses the music based on the current state.
     */
    switchSoundIcon() {
        if (this.iconMute()) {
            this.world.mute = false;
            this.changeIconAndPlayMusic();
        } else {
            this.changeIconAndPauseMusic();
        }
    }


    /**
     * Checks if the mute icon is displayed.
     */
    iconMute() {
        return this.world.soundIcon.src.includes('img/other_img/mute_Icon.png');
    }


    /**
     * Changes the icon and plays music based on whether the game is paused or not.
     */
    changeIconAndPlayMusic() {
        if (this.world.gamePaused) {
            this.world.introSound.play();
        } else {
            this.world.gameMusic.play();
        }
        this.world.soundIcon.src = 'img/other_img/volume.png';
    }


    /**
     * Enables loop for specific sounds.
     */
    makeSoundLoop() {
        this.world.introSound.loop = true;
        this.world.gameMusic.loop = true;
        this.world.endboss.bossFightSound.loop = true;
    }


    /**
     * Stops all sounds when losing the game and plays the game over sound.
     */
    stopSoundsWhenLosing() {
        this.world.character.speed = 0;
        this.world.gameOverSound.currentTime = 0;
        this.world.gameOverSound.play();
        clearInterval(this.world.character.sleepInterval);
    }


    /**
     * Stops all sounds when winning the game and plays the game win sound.
     */
    stopSoundsWhenWinning() {
        this.world.character.speed = 0;
        this.world.gameWinSound.currentTime = 6;
        this.world.gameWinSound.volume = 0.2;
        this.world.gameWinSound.play();
        clearInterval(this.world.character.sleepInterval);
    }


    /**
     * Pauses all sounds in the SoundArray collection.
     */
    muteAll() {
        this.world.soundArray.forEach(sound => sound.pause());
    }


    /**
     * Checks the game status, mutes all sounds, plays the losing sound on loss, or the winning sound on victory.
     */
    checkGameStatusMusic() {
        if (!this.world.win) {
            this.muteAll();
            this.stopSoundsWhenLosing();
        } else {
            this.muteAll();
            this.stopSoundsWhenWinning();
        }
    }


    /**
     * Pauses all game sounds
     */
    pauseSound() {
        this.world.gameMusic.pause();
        this.world.character.hurtSound.pause();
        this.world.chicken.chickenSound.pause();
        this.world.chicks.chicksSound.pause();
        this.world.character.jumpSound.pause();
        this.world.endboss.bossHurtSound.pause();
        this.world.bottle.bottleSound.pause();
        this.world.coins.coinSound.pause();
        this.world.endboss.bossFightSound.pause();
        this.world.character.sleepSound.play();
    }


    /**
     * Plays the sound effect for the end boss damage
     */
    playEndbossHurtSound() {
        this.world.endboss.bossHurt = true;
        if (!this.world.mute) {
            this.world.endboss.bossHurtSound.currentTime = 0;
            this.world.endboss.bossHurtSound.play();
            this.world.soundArray.push(this.world.endboss.bossHurtSound);
        }
    }
}