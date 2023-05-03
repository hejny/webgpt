import { Color } from '../../color/Color';
import { WithTake } from '../../take/interfaces/ITakeChain';
import { Image } from '../Image';

/**
 * @@@
 */
export function computeImageLightestColor(image: Image): WithTake<Color> {
    const colors = Array.from(getImageUniqueColors(image));
    colors.sort((a, b) => colorLuminance(b) - colorLuminance(a));
    return colors[0];
}
