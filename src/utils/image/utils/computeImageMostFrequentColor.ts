import { Color } from '../../color/Color';
import { WithTake } from '../../take/interfaces/ITakeChain';
import { IImage } from '../IImage';

/**
 * @@@
 */
export function computeImageMostFrequentColor(image: IImage): WithTake<Color> {
    const colorCounts: Map<string, number> = new Map();
    let mostFrequentColor: WithTake<Color> | null = null;
    let maxCount = 0;

    // Loop through all the pixels in the image
    for (let x = 0; x < image.width; x++) {
        for (let y = 0; y < image.height; y++) {
            const color = image.getPixel({ x, y });
            const colorString = color.toString();

            // Increment the count for this color
            const count = (colorCounts.get(colorString) || 0) + 1;
            colorCounts.set(colorString, count);

            // Check if this color is now the most frequent
            if (count > maxCount) {
                maxCount = count;
                mostFrequentColor = color;
            }
        }
    }

    if (mostFrequentColor === null) {
        throw new Error('Image has no pixels');
    }

    return mostFrequentColor;
}
