/**
 * Creates a title screen class for a canvas element and invokes the specified function on game start.
 */
class TitleScreen {
    /**
     * Creates an initialization function for a title screen with canvas and a function on game start.
     */
    constructor(canvas, startGameCallback) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.startGameCallback = startGameCallback;
        this.titleImage = new Image();
        this.titleImage.src = 'img/9_intro_outro_screens/start/startscreen_1.png';
        this.titleImage.onload = () => {
            this.render();
        };
    }


    /**
     * Renders the title image on the canvas
     */
    render() {
        this.ctx.drawImage(this.titleImage, 0, 0, this.canvas.width, this.canvas.height);
    }
}