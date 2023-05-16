import { COLORS_LIMIT, MOST_FREQUENT_COLORS_DISTANCE_THEASHOLD_RATIO } from '../../../../config';
import { Color } from '../../color/Color';
import { colorDistanceSquared } from '../../color/utils/colorDistance';
import { WithTake } from '../../take/interfaces/ITakeChain';
import { IImage } from '../IImage';

/**
 * @@@
 */
export function computeImageMostFrequentColors(image: IImage): Array<WithTake<Color>> {
    const colorCounts: Map<string, number> = new Map();

    // 1️⃣ Loop through all the pixels in the image and count the number of times each color appears
    for (let x = 0; x < image.width; x++) {
        for (let y = 0; y < image.height; y++) {
            const color = image.getPixel({ x, y });
            const colorString = color.toHex();

            // Increment the count for this color
            const count = (colorCounts.get(colorString) || 0) + 1;
            colorCounts.set(colorString, count);
        }
    }

    // 2️⃣ Sort colors by frequency
    const mostFrequentColors = Array.from(colorCounts.entries())
        .sort((a, b) => b[1] - a[1])
        .map(([colorCode]) => Color.fromHex(colorCode));

    // 3️⃣ Pick colors that has some distance threshold  (compared to all other already picked colors)
    const distanceTheashold =
        colorDistanceSquared(Color.get('black'), Color.get('white')) * MOST_FREQUENT_COLORS_DISTANCE_THEASHOLD_RATIO;
    const uniqueColors: Array<WithTake<Color>> = [];
    for (const color of mostFrequentColors) {
        if (uniqueColors.every((uniqueColor) => colorDistanceSquared(color, uniqueColor) >= distanceTheashold)) {
            uniqueColors.push(color);
        }

        if (uniqueColors.length >= COLORS_LIMIT) {
            break;
        }
    }

    return uniqueColors;
}

/**
 * TODO: !!! Is here correct manipulation with square of distance?
 */
