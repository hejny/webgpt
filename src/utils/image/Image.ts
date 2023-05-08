import { IVector, Vector } from 'xyzt';
import { Color } from '../color/Color';
import { WithTake } from '../take/interfaces/ITakeChain';
import { take } from '../take/take';
import { IImage } from './IImage';
import { checkSizeValue } from './internal-utils/checkSizeValue';

/**
 * A class that represents an image with a size and an array of pixels ⁘
 */
export class Image implements IImage {
    /**
     * @@@
     */
    public readonly size: Vector;

    /**
     * A private property to store the pixels as a 2D array of Color objects
     */
    private pixels: WithTake<Color>[][];

    /**
     * A constructor that takes the size of the image and optionally an initial color
     * @param size The size of the image as an IVector object
     * @param color The initial color of the image (default: transparent black)
     */
    constructor(size: IVector, defaultColor: WithTake<Color> = Color.fromHex('#00000000')) {
        this.size = Vector.fromObject(size);

        checkSizeValue('width', this.size.x);
        checkSizeValue('height', this.size.y);

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
     * A getter for the width of the image
     */
    public get width(): number {
        return this.size.x;
    }

    /**
     * A getter for the height of the image
     */
    public get height(): number {
        return this.size.y;
    }

    /**
     * A method to get the color of a pixel at a given position
     * @param position The position of the pixel as an IVector object
     * @returns The color of the pixel as a Color object
     */
    public getPixel(position: IVector): WithTake<Color> {
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
            this.pixels[position.y || 0][position.x || 0] = take(color);
        } else {
            // Throw an error if the position is out of bounds
            throw new Error(`Invalid pixel position (${position.x || 0}, ${position.y || 0})`);
        }
    }

    /**
     * A method to crop the image
     *
     * @param point1 top left corner
     * @param point2 bottom right corner
     */
    public crop(point1: IVector, point2: IVector): Image {
        const topLeft = Vector.fromObject(point1).map((value) => Math.round(value));
        const bottomRight = Vector.fromObject(point2).map((value) => Math.round(value));

        const newImage = new Image(bottomRight.subtract(topLeft));

        for (let x = topLeft.x; x < bottomRight.x; x++) {
            for (let y = topLeft.y; y < bottomRight.y; y++) {
                newImage.setPixel({ x: x - topLeft.x, y: y - topLeft.y }, this.getPixel({ x, y }));
            }
        }

        return newImage;
    }

    /**
     * @@@
     */
    public map(callback: (color: Color) => Color): Image {
        const newImage = new Image(this.size);

        for (let x = 0; x < this.size.x; x++) {
            for (let y = 0; y < this.size.y; y++) {
                newImage.setPixel({ x, y }, callback(this.getPixel({ x, y })));
            }
        }

        return newImage;
    }
}
