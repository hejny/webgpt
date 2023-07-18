import { Color } from '../../color/Color';
import { colorLuminance } from '../../color/utils/colorLuminance';
import { WithTake } from '../../take/interfaces/ITakeChain';
import { IImage } from '../IImage';
import { getImageUniqueColors } from './getImageUniqueColors';

/**
 * @@@
 */
export async function computeImageDarkestColor(image: IImage): Promise<WithTake<Color>> {
    const colors = Array.from(getImageUniqueColors(image));
    colors.sort((a, b) => colorLuminance(a) - colorLuminance(b));
    return colors[0];
}
