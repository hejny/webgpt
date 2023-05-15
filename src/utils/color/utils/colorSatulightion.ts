import { Color } from '../Color';
import { rgbToHsl } from '../internal-utils/rgbToHsl';

/**
 * Calculates saturation*lightness of the color
 */
export function colorSatulightion(color: Color): number {
    const [hue, saturation, light] = rgbToHsl(color.red, color.green, color.blue);
    return Math.abs(saturation * (1 - (0.5 - light))) * 2;

    // TODO: !!!! Reflect algoritm to descriptions
}
