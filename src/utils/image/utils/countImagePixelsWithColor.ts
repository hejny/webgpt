import { Color } from '../../color/Color';
import { colorDistanceSquared } from '../../color/utils/colorDistance';
import { IImage } from '../IImage';

/**
 * @@@
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
