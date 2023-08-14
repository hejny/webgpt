import { Color } from '../../color/Color';
import { colorLuminance } from '../../color/utils/colorLuminance';
import { WithTake } from '../../take/interfaces/ITakeChain';
import { IImage } from '../IImage';
import { getImageUniqueColors } from './getImageUniqueColors';

/**
 * @@@
 */
export async function computeImageLightestColor(
    image: IImage,
): Promise<WithTake<Color> /* <- TODO: Return some meaningfull range */> {
    const colors = Array.from(await getImageUniqueColors(image));
    colors.sort(
        (a, b) => colorLuminance(b) - colorLuminance(a),
    ) /* <- TODO: [⏳] Make this sort async with await forARest */;
    return colors[0]!;
}
