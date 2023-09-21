import { Color } from '../Color';
import type { IColorTransformer } from './IColorTransformer';

/**
 * Makes color transformer which sets alpha chanell to given color
 *
 * @param alpha number from 0 (transparent) to 1 (opaque)
 */
export function withAlpha(alpha: number): IColorTransformer {
    return ({ red, green, blue }: Color) => {
        return Color.fromValues(red, green, blue, Math.round(alpha * 255));
    };
}
