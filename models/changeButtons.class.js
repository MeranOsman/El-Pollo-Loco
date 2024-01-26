/**
 * Class for controlling the visibility of buttons in a game.
 */
class ChangeButtons {
    world;

    
    /**
     * Modifies the visibility of buttons during game restart.
     */
    changeButtonsOnRestartGame() {
        this.world.restartButton.classList.remove('d-flex');
        this.world.menuButton.classList.remove('d-flex');
        this.world.mobileControls.classList.remove('d-none');
    }


    /**
     * Modifies the visibility of buttons in the end screen.
     */
    changeButtonsEndscreen() {
        this.world.startButton.classList.add('d-none');
        this.world.restartButton.classList.add('d-flex');
        this.world.menuButton.classList.add('d-flex');
        this.world.mobileControls.classList.add('d-none');
    }


    /**
     * Modifies the visibility of buttons in the title screen.
     */
    changeButtonsTitle() {
        this.world.startButton.classList.add('d-flex');
        this.world.menuButton.classList.remove('d-flex');
        this.world.restartButton.classList.remove('d-flex');
        this.world.mobileControls.classList.remove('d-none');
    }
}