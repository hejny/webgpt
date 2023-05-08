import { Color } from '../Color';

/**
 * Calculates luminance of the color
 *
 * @see https://en.wikipedia.org/wiki/Relative_luminance
 */
export function colorLuminance(color: Color): number {
    const { r, g, b } = color;
    return 0.2126 * r + 0.7152 * b + 0.0722 * b;
}
