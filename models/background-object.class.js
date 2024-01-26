/**
 * Creates an instance of the BackgroundObject class, inheriting from MovableObject.
 */
class BackgroundObject extends MovableObject {
    width = 720;
    height = 480;
    y = 0;


    /**
     * Initializes a object with a specific image resource and sets the initial position.
     * 
     * @param {string} imagePath - The path to the object's image.
     * @param {number} x - The X position of the object.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
    }
}