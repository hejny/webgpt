import { Color } from '../Color';
import { colorDistance } from '../internal-utils/colorDistance';
import { IColorTransformer } from './IColorTransformer';

/**
 * Makes color transformer which finds the nearest color from the given list
 *
 * @param colors array of colors to choose from
 */
export function nearest(...colors: Color[]): IColorTransformer {
    return (color: Color) => {
        const distances = colors.map((c) => colorDistance(c, color));
        const minDistance = Math.min(...distances);
        const minIndex = distances.indexOf(minDistance);
        const nearestColor = colors[minIndex];

        console.log(
            `!!! Nearest color from ${color.toHex()} to [${colors
                .map((color) => color.toHex())
                .join(', ')}] is ${nearestColor.toHex()}`,
        );

        return nearestColor;
    };
}
