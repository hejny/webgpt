import { Color } from '../../color/Color';
import { colorSaturation } from '../../color/utils/colorSaturation';
import { WithTake } from '../../take/interfaces/ITakeChain';
import { IImage } from '../IImage';
import { getImageUniqueColors } from './getImageUniqueColors';

/**
 * @@@
 */
export function computeImageMostSaturatedColor(image: IImage): WithTake<Color> {
    const colors = Array.from(getImageUniqueColors(image));
    colors.sort((a, b) => colorSaturation(b) - colorSaturation(a));
    return colors[0];
}
