import { Color } from '../Color';

/**
 * @@@
 */
export function areColorsEqual(color1: Color, color2: Color): boolean {
    return color1.red === color2.red && color1.green === color2.green && color1.blue === color2.blue;
}

/**
 * TODO: !!! For more than 2 colors
 */
