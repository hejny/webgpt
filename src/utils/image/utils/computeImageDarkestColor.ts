import { Color } from '../../color/Color';
import { colorLuminance } from '../../color/utils/colorLuminance';
import type { WithTake } from '../../take/interfaces/ITakeChain';
import type { IImage } from '../IImage';
import { getImageUniqueColors } from './getImageUniqueColors';

/**
 * Computes the darkest color of an image
 *
 *
 * @param {IImage} image - The image object to compute the darkest color from
 * @returns {Promise<WithTake<Color>>} A promise that resolves to the darkest color of the image
 */
export async function computeImageDarkestColor(image: IImage): Promise<WithTake<Color>> {
    const colors = Array.from(await getImageUniqueColors(image));
    colors.sort(
        (a, b) => colorLuminance(a) - colorLuminance(b),
    ) /* <- TODO: [⏳] Make this sort async with await forARest */;
    return colors[0]!;
}
