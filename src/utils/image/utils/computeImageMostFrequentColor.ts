import { Color } from '../../color/Color';
import { WithTake } from '../../take/interfaces/ITakeChain';
import { Image } from '../Image';

/**
 * @@@
 */
export function computeImageMostFrequentColor(image: Image): WithTake<Color> {
    // TODO: !!! Implement this function and write jsdoc annotation
    return Color.get('black');
}
