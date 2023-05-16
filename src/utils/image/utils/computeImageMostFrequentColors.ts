import { COLORS_LIMIT } from '../../../../config';
import { Color } from '../../color/Color';
import { WithTake } from '../../take/interfaces/ITakeChain';
import { IImage } from '../IImage';

/**
 * @@@
 */
export function computeImageMostFrequentColors(image: IImage): Array<WithTake<Color>> {
    const colorCounts: Map<string, number> = new Map();

    // Loop through all the pixels in the image
    for (let x = 0; x < image.width; x++) {
        for (let y = 0; y < image.height; y++) {
            const color = image.getPixel({ x, y });
            const colorString = color.toHex();

            // Increment the count for this color
            const count = (colorCounts.get(colorString) || 0) + 1;
            colorCounts.set(colorString, count);
        }
    }

    return Array.from(colorCounts.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, COLORS_LIMIT)
        .map(([colorCode]) => Color.fromHex(colorCode));
}
