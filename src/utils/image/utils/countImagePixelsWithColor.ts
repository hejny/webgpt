import { Color } from '../../color/Color';
import { colorDistanceSquared } from '../../color/utils/colorDistance';
import { IImage } from '../IImage';

/**
 * @@@
 */

/**
 * Counts the number of pixels in an image that have a specified color within a given tolerance ⁘
 * 
 * @param {IImage} image - The image to analyze.
 * @param {Color} color - The color to search for.
 * @param {number} tolerance - The tolerance level for color similarity.
 * @returns {number} - The number of pixels that match the specified color.
 */
export function countImagePixelsWithColor(image: IImage, color: Color, tolerance: number): number {
    const toleranceSquared = tolerance * tolerance;
    let count = 0;
    for (let x = 0; x < image.width; x++) {
        for (let y = 0; y < image.height; y++) {
            const pixelColor = image.getPixel({ x, y });

            if (colorDistanceSquared(color, pixelColor) <= toleranceSquared) {
                count++;
            }
        }
    }
    return count;
}
