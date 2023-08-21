import { COLORS_LIMIT, DIFFERENT_COLOR_DISTANCE_THEASHOLD_RATIO } from '../../../../config';
import { forARest } from '../../../components/WorkInProgress/forARest';
import { Color } from '../../color/Color';
import { colorDistanceSquared } from '../../color/utils/colorDistance';
import { WithTake } from '../../take/interfaces/ITakeChain';
import { IImage } from '../IImage';

/**
 * Computes the most frequent colors in an image ⁘
 * 
 * @param image - The image to analyze.
 * @returns A promise that resolves to an array of objects, each containing a color and its frequency.
 */
export async function computeImageMostFrequentColors(
    image: IImage,
): Promise<Array<{ value: WithTake<Color>; count: number } /* <- TODO: [⏲] DRY */>> {
/**
 * The color of the current pixel ⁘
 */
    const colorCounts: Map<string, number> = new Map();

    // 1️⃣ Loop through all the pixels in the image and count the number of times each color appears
    for (let x = 0; x < image.width; x++) {
        for (let y = 0; y < image.height; y++) {
            const color = image.getPixel({ x, y });
/**
 * The hexadecimal representation of the color ⁘
 */
            const colorString = color.toHex();

            // Increment the count for this color
            const count = (colorCounts.get(colorString) || 0) + 1;
            colorCounts.set(colorString, count);

            await forARest();
        }
    }

    // 2️⃣ Sort colors by frequency
    const mostFrequentColors = Array.from(colorCounts.entries())
        .sort((a, b) => b[1] - a[1]) /* <- TODO: [⏳] Make this sort async with await forARest */
        .map(([colorCode]) => Color.fromHex(colorCode));

    // 3️⃣ Pick colors that has some distance threshold  (compared to all other already picked colors)
    //    TODO: This has one flaw which need to be fixed [🦯]
/**
 * The threshold for considering two colors different ⁘
 */
    const distanceTheashold =
        colorDistanceSquared(Color.get('black'), Color.get('white')) * DIFFERENT_COLOR_DISTANCE_THEASHOLD_RATIO;
/**
 * Array of unique colors and their frequencies ⁘
 */
    const uniqueColors: Array<{ value: WithTake<Color>; count: number } /* <- TODO: [⏲] DRY */> = [];
    for (const color of mostFrequentColors) {
        if (uniqueColors.every((uniqueColor) => colorDistanceSquared(color, uniqueColor.value) >= distanceTheashold)) {
            uniqueColors.push({ value: color, count: colorCounts.get(color.toHex())! });
        }

        if (uniqueColors.length >= COLORS_LIMIT) {
            break;
        }

        await forARest();
    }

    return uniqueColors;
}

/**
 * TODO: !! Is here correct manipulation with square of distance?
 */
