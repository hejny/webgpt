import { Color } from '../../color/Color';
import { colorHueDistance } from '../../color/utils/colorHueDistance';
import { colorSatulightion } from '../../color/utils/colorSatulightion';
import { WithTake } from '../../take/interfaces/ITakeChain';
import { IImage } from '../IImage';
import { getImageUniqueColors } from './getImageUniqueColors';

// !!! To config
const MOST_SATULIGHTED_COLORS_LIMIT = 10;
const MOST_SATULIGHTED_COLORS_SATULIGHTION_TRERESHOLD_RATIO = 0.5;
const MOST_SATULIGHTED_COLORS_HUE_TRERESHOLD_DEGREES = 30;

/**
 * @@@
 */
export function computeImageMostSatulightedColors(image: IImage): Array<WithTake<Color>> {
    // 1️⃣ Sort colors by saturation*lightness
    const colors = Array.from(getImageUniqueColors(image));
    colors.sort((a, b) => colorSatulightion(b) - colorSatulightion(a));

    // 2️⃣ Drop colors with low saturation (compared to the most saturated color)
    const requiredSatulightion = colorSatulightion(colors[0]) * MOST_SATULIGHTED_COLORS_SATULIGHTION_TRERESHOLD_RATIO;
    const saturatedColors = colors.filter((color) => colorSatulightion(color) >= requiredSatulightion);

    // 3️⃣ Pick more colors with different hue (compared to all other already picked colors)
    const uniqueColors: Array<WithTake<Color>> = [];
    for (const color of saturatedColors) {
        if (
            uniqueColors.every(
                (uniqueColor) => colorHueDistance(color, uniqueColor) >= MOST_SATULIGHTED_COLORS_HUE_TRERESHOLD_DEGREES,
            )
        ) {
            uniqueColors.push(color);
        }

        if (uniqueColors.length >= MOST_SATULIGHTED_COLORS_LIMIT) {
            break;
        }
    }

    return uniqueColors;
}

/**
 * TODO: Write unit tests
 */
