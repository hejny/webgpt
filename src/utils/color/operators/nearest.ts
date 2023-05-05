import { Color } from '../Color';
import { colorDistanceSquared } from '../utils/colorDistance';
import { IColorTransformer } from './IColorTransformer';

/**
 * Makes color transformer which finds the nearest color from the given list
 *
 * @param colors array of colors to choose from
 */
export function nearest(...colors: Color[]): IColorTransformer {
    return (color: Color) => {
        const distances = colors.map((c) => colorDistanceSquared(c, color));
        const minDistance = Math.min(...distances);
        const minIndex = distances.indexOf(minDistance);
        const nearestColor = colors[minIndex];

        return nearestColor;
    };
}
