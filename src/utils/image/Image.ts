import { IVector, Vector } from 'xyzt';
import { Color } from '../color/Color';

/**
 * @@@
 */
export class Image {
    /**
     * @@@
     */
    public readonly size: Vector;

    /**
     * A private property to store the pixels as a 2D array of Color objects
     */
    private pixels: Color[][];

    /**
     * A constructor that takes the size of the image and optionally an initial color
     * @param size The size of the image as an IVector object
     * @param color The initial color of the image (default: transparent black)
     */
    constructor(size: IVector, defaultColor: Color = Color.fromHex('#00000000')) {
        this.size = Vector.fromObject(size);

        // Initialize the pixels array with the given color or transparent black
        this.pixels = [];
        for (let i = 0; i < this.size.y; i++) {
            this.pixels[i] = [];
            for (let j = 0; j < this.size.x; j++) {
                this.pixels[i][j] = defaultColor;
            }
        }
    }

    /**
     * A method to get the color of a pixel at a given position
     * @param position The position of the pixel as an IVector object
     * @returns The color of the pixel as a Color object
     */
    public getPixel(position: IVector): Color {
        // Check if the position is valid
        if (
            (position.x || 0) >= 0 &&
            (position.x || 0) < this.size.x &&
            (position.y || 0) >= 0 &&
            (position.y || 0) < this.size.y
        ) {
            // Return the color of the pixel
            return this.pixels[position.y || 0][position.x || 0];
        } else {
            // Throw an error if the position is out of bounds
            throw new Error(`Invalid pixel position (${position.x || 0}, ${position.y || 0})`);
        }
    }

    /**
     * A method to set the color of a pixel at a given position
     * @param position The position of the pixel as an IVector object
     * @param color The color to set the pixel to as a Color object
     */
    public setPixel(position: IVector, color: Color): void {
        // Check if the position is valid
        if (
            (position.x || 0) >= 0 &&
            (position.x || 0) < this.size.x &&
            (position.y || 0) >= 0 &&
            (position.y || 0) < this.size.y
        ) {
            // Set the color of the pixel
            this.pixels[position.y || 0][position.x || 0] = color;
        } else {
            // Throw an error if the position is out of bounds
            throw new Error(`Invalid pixel position (${position.x || 0}, ${position.y || 0})`);
        }
    }
}
