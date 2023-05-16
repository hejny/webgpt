import { Color } from '../../color/Color';
import { colorSatulightion } from '../../color/utils/colorSatulightion';
import { WithTake } from '../../take/interfaces/ITakeChain';
import { IImage } from '../IImage';
import { getImageUniqueColors } from './getImageUniqueColors';

// !!! To config
const MOST_SATULIGHTED_COLORS_LIMIT = 10;
const MOST_SATULIGHTED_COLORS_SATURATION_DROPOFF_TRERESHOLD = 0.62;
const MOST_SATULIGHTED_COLORS_HUE_TRERESHOLD = (15 / 180) * Math.PI;

/**
 * @@@
 */
export function computeImageMostSatulightedColors(image: IImage): Array<WithTake<Color>> {
    // 1️⃣ Sort colors by saturation*lightness
    const colors = Array.from(getImageUniqueColors(image));
    colors.sort((a, b) => colorSatulightion(b) - colorSatulightion(a));

    // 2️⃣ Drop colors with low saturation (compared to the most saturated color)

    // 3️⃣ Pick more colors with different hue (compared to all other already picked colors)
    /*
    for(const color of colors){
        // TODO: !!!
    }
    */

    return colors;
}

/**
 * TODO: !!! This is not working properly for very dark colors
 * TODO: Write unit tests
 */
