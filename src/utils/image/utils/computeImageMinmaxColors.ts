import { Color } from '../../color/Color';
import { colorDistanceSquared } from '../../color/utils/colorDistance';
import { WithTake } from '../../take/interfaces/ITakeChain';
import { IImage } from '../IImage';
import { getImageUniqueColors } from './getImageUniqueColors';

/**
 * @@@
 */

export function computeImageMinmaxColors(
    image: IImage,
    color: Color,
): [WithTake<Color>, WithTake<Color>] /* <- TODO: Return some meaningfull range */ {
    const colors = Array.from(getImageUniqueColors(image));
    colors.sort((a, b) => colorDistanceSquared(color, a) - colorDistanceSquared(color, b));
    return [colors[0], colors[colors.length - 1] /* <- TODO: !!!!!!!!!!!!!!! Use .at(0) .at(-1) */];
}
