import { IColorTransformer } from './IColorTransformer';
import { lighten } from './lighten';

/**
 * Makes color transformer which darker the given color
 *
 * @param amount from 0 to 1
 */
export function darken(amount: number): IColorTransformer {
    return lighten(-amount);
}
