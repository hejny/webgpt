import { Color } from '../Color';

/**
 * Color transformer which returns a grayscale version of the color
 */
export function grayscale(color: Color): Color {
    const average = (color.red + color.green + color.blue) / 3;
    const r = Math.round(average);
    const g = Math.round(average);
    const b = Math.round(average);
    return Color.fromValues(r, g, b, color.alpha);
}
