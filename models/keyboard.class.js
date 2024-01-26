/**
 * Keyboard control for game actions.
 */
class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false;
    SPACE = false;
    D = false;


    /**
     * Initializes the keyboard control for game actions.
     */
    constructor() {
        this.keysPressTrue();
        this.keysPressFalse();
        this.bindBtsPressStartEvents();
        this.bindBtsPressEndEvents();
    }


    /**
     * Enables key presses and sets the corresponding key attributes to true.
     */
    keysPressTrue() {
        window.addEventListener('keydown', (e) => {
            if (!world.gamePaused) {
                const keyMap = {
                    37: 'LEFT',
                    39: 'RIGHT',
                    40: 'DOWN',
                    38: 'UP',
                    32: 'SPACE',
                    68: 'D'
                };
                this[keyMap[e.keyCode]] = true;
            }
        });
    }


    /**
     * Sets key values to "false" when the key is released.
     */
    keysPressFalse() {
        window.addEventListener('keyup', (e) => {
            if (!world.gamePaused) {
                const keyMap = {
                    37: 'LEFT',
                    39: 'RIGHT',
                    40: 'DOWN',
                    38: 'UP',
                    32: 'SPACE',
                    68: 'D'
                };
                this[keyMap[e.keyCode]] = false;
            }
        });
    }


    /**
     * Binds touch start events for buttons to corresponding in-game actions.
     */
    bindBtsPressStartEvents() {
        document.getElementById('throw-btn').addEventListener('touchstart', () => { if (!world.gamePaused) this.SPACE = true; });
        document.getElementById('buy-btn').addEventListener('touchstart', () => { if (!world.gamePaused) this.D = true; });
        document.getElementById('jump-btn').addEventListener('touchstart', () => { if (!world.gamePaused) this.UP = true; });
        document.getElementById('right-btn').addEventListener('touchstart', () => { if (!world.gamePaused) this.RIGHT = true; });
        document.getElementById('left-btn').addEventListener('touchstart', () => { if (!world.gamePaused) this.LEFT = true; });
    }


    /**
     * Binds touch end events for buttons to corresponding in-game actions.
     */
    bindBtsPressEndEvents() {
        document.getElementById('throw-btn').addEventListener('touchend', () => { if (!world.gamePaused) this.SPACE = false; });
        document.getElementById('buy-btn').addEventListener('touchend', () => { if (!world.gamePaused) this.D = false; });
        document.getElementById('jump-btn').addEventListener('touchend', () => { if (!world.gamePaused) this.UP = false; });
        document.getElementById('right-btn').addEventListener('touchend', () => { if (!world.gamePaused) this.RIGHT = false; });
        document.getElementById('left-btn').addEventListener('touchend', () => { if (!world.gamePaused) this.LEFT = false; });
    }
}