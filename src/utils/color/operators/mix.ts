import { Color } from '../Color';
import { IColorTransformer } from './IColorTransformer';

/**
 * Makes color transformer which returns a mix of two colors based on a ratio
 *
 * @param ratio the ratio of the first color to the second color, from 0 to 1
 * @param additionalColor the second color to mix with the first color
 */
export function mix(ratio: number, additionalColor: Color): IColorTransformer {
    return (baseColor: Color) => {
        const r = Math.round(baseColor.red * (1 - ratio) + additionalColor.red * ratio);
        const g = Math.round(baseColor.green * (1 - ratio) + additionalColor.green * ratio);
        const b = Math.round(baseColor.blue * (1 - ratio) + additionalColor.blue * ratio);
        const a = baseColor.alpha;
        return Color.fromValues(r, g, b, a);
    };
}
