import { Color } from '../../color/Color';
import { colorSatulightion } from '../../color/utils/colorSatulightion';
import { WithTake } from '../../take/interfaces/ITakeChain';
import { IImage } from '../IImage';
import { getImageUniqueColors } from './getImageUniqueColors';

const MOST_SATULIGHTED_COLORS_LIMIT = 10;
const MOST_SATULIGHTED_COLORS_HUE_TRERESHOLD = 15;

/**
 * @@@
 */
export function computeImageMostSatulightedColors(image: IImage): Array<WithTake<Color>> {
    const colors = Array.from(getImageUniqueColors(image));
    colors.sort((a, b) => colorSatulightion(b) - colorSatulightion(a));

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
