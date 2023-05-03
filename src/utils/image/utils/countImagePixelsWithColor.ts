import { Color } from '../../color/Color';
import { colorDistance } from '../../color/utils/colorDistance';
import { Image } from '../Image';

/**
 * @@@
 */

export function countImagePixelsWithColor(image: Image, color: Color, tolerance: number): number {
    let count = 0;
    for (let x = 0; x < image.width; x++) {
        for (let y = 0; y < image.height; y++) {
            const pixelColor = image.getPixel({ x, y });

            if (colorDistance(count, pixelColor) <= tolerance) {
                count++;
            }
        }
    }
    return count;
}
