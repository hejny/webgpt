import {
    COLORS_LIMIT,
    DIFFERENT_COLOR_HUE_THEASHOLD_DEGREES,
    MOST_SATULIGHTED_COLORS_SATULIGHTION_THEASHOLD_RATIO,
} from '../../../../config';
import { Color } from '../../color/Color';
import { areColorsEqual } from '../../color/utils/areColorsEqual';
import { colorHueDistance } from '../../color/utils/colorHueDistance';
import { colorSatulightion } from '../../color/utils/colorSatulightion';
import { WithTake } from '../../take/interfaces/ITakeChain';
import { IImage } from '../IImage';
import { forARest } from './forARest';
import { getImageUniqueColors } from './getImageUniqueColors';

/**
 * @@@
 */
export async function computeImageMostSatulightedColors(
    image: IImage,
): Promise<Array<{ value: WithTake<Color>; count: number } /* <- TODO: [⏲] DRY */>> {
    // 1️⃣ Sort colors by saturation*lightness
    const colors = Array.from(await getImageUniqueColors(image));
    colors.sort(
        (a, b) => colorSatulightion(b) - colorSatulightion(a),
    ); /* <- TODO: [⏳] Make this sort async with await forARest */

    // 2️⃣ Drop colors with low saturation (compared to the most saturated color)
    const requiredSatulightion = colorSatulightion(colors[0]) * MOST_SATULIGHTED_COLORS_SATULIGHTION_THEASHOLD_RATIO;
    const saturatedColors = colors.filter((color) => colorSatulightion(color) >= requiredSatulightion);

    // 3️⃣ Pick colors with different hue (compared to all other already picked colors)
    //    TODO: This has one flaw which need to be fixed [🦯]
    const uniqueColors: Array<{ value: WithTake<Color>; count: number } /* <- TODO: [⏲] DRY */> = [];
    for (const color of saturatedColors) {
        if (
            uniqueColors.every(
                (uniqueColor) => colorHueDistance(color, uniqueColor.value) >= DIFFERENT_COLOR_HUE_THEASHOLD_DEGREES,
            )
        ) {
            // TODO: [🎍] Make some DRY util for counting colors
            let count = 0;
            for (let x = 0; x < image.width; x++) {
                for (let y = 0; y < image.height; y++) {
                    if (areColorsEqual(image.getPixel({ x, y }), color)) {
                        count++;
                    }

                    await forARest();
                }
            }

            uniqueColors.push({ value: color, count });
        }

        if (uniqueColors.length >= COLORS_LIMIT) {
            break;
        }

        await forARest();
    }

    return uniqueColors;
}

/**
 * TODO: Write unit tests
 */
