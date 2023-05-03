import { Color } from '../../color/Color';
import { colorLuminance } from '../../color/utils/colorLuminance';
import { WithTake } from '../../take/interfaces/ITakeChain';
import { Image } from '../Image';
import { getImageUniqueColors } from './getImageUniqueColors';

/**
 * @@@
 */
export function computeImageDarkestColor(image: Image): WithTake<Color> {
    const colors = Array.from(getImageUniqueColors(image));
    colors.sort((a, b) => colorLuminance(a) - colorLuminance(b));
    return colors[0];
}
