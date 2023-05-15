import { Color } from '../Color';
import { colorLuminance } from './colorLuminance';
import { colorSaturation } from './colorSaturation';

/**
 * Calculates saturation*lightness of the color
 */
export function colorSatulightion(color: Color): number {
    //const [hue, saturation, light] = rgbToHsl(color.red, color.green, color.blue);

    return colorSaturation(color) * colorLuminance(color);

    // TODO: !!!! Reflect algoritm to descriptions
}
