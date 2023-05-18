import {
    COLORS_LIMIT,
    MOST_SATULIGHTED_COLORS_HUE_TRERESHOLD_DEGREES,
    MOST_SATULIGHTED_COLORS_SATULIGHTION_THEASHOLD_RATIO,
} from '../../../../config';
import { Color } from '../../color/Color';
import { colorHueDistance } from '../../color/utils/colorHueDistance';
import { colorSatulightion } from '../../color/utils/colorSatulightion';
import { WithTake } from '../../take/interfaces/ITakeChain';
import { IImage } from '../IImage';
import { getImageUniqueColors } from './getImageUniqueColors';

/**
 * @@@
 */
export function computeImageMostSatulightedColors(image: IImage): Array<WithTake<Color>> {
    // 1️⃣ Sort colors by saturation*lightness
    const colors = Array.from(getImageUniqueColors(image));
    colors.sort((a, b) => colorSatulightion(b) - colorSatulightion(a));

    // 2️⃣ Drop colors with low saturation (compared to the most saturated color)
    const requiredSatulightion = colorSatulightion(colors[0]) * MOST_SATULIGHTED_COLORS_SATULIGHTION_THEASHOLD_RATIO;
    const saturatedColors = colors.filter((color) => colorSatulightion(color) >= requiredSatulightion);

    // 3️⃣ Pick colors with different hue (compared to all other already picked colors)
    // !!!! Pokud některé barvy vylučují respektive vždy beru tu první a ty ostatní blízké zahazuji než narazím na nějakou další no tak tohle by mělo fungovat tím způsobem že se všechny příbuzné barvy seskupí do jednoho clusteru a ten se vážení zprůměruje na základě četnosti – tím pádem například pokud je hodně odstínů šedé a nejčastější je ten nejsvětlejší tak výsledná barva nebude pouze ta nejsvětlejší ale někde uprostřed více světla
    const uniqueColors: Array<WithTake<Color>> = [];
    for (const color of saturatedColors) {
        if (
            uniqueColors.every(
                (uniqueColor) => colorHueDistance(color, uniqueColor) >= MOST_SATULIGHTED_COLORS_HUE_TRERESHOLD_DEGREES,
            )
        ) {
            uniqueColors.push(color);
        }

        if (uniqueColors.length >= COLORS_LIMIT) {
            break;
        }
    }

    return uniqueColors;
}

/**
 * TODO: Write unit tests
 */
