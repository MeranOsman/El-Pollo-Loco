/**
 * Class for a drawable object.
 */
class DrawableObject {
    width = 100;
    height = 150;
    x = -1200;
    y = 280;
    img;
    imageCache = {};
    currentImage = 0;


    /**
     * Loads an image for the object.
     * 
     * @param {string} path - The path to the image.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    /**
     * Loads a list of images for the object.
     * 
     * @param {Array<string>} array - The list of image paths.
     */
    loadImages(array) {
        array.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


    /**
     * Draws the object on the canvas context.
     * 
     * @param {CanvasRenderingContext2D} ctx - The canvas context.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    /**
     * Draws a frame around the object on the canvas context.
     * 
     * @param {CanvasRenderingContext2D} ctx - The canvas context.
     */
    drawFrame(ctx) {
        ctx.beginPath();
        ctx.stroke();
    }
}