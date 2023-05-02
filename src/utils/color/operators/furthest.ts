import { Color } from '../Color';
import { IColorTransformer } from './IColorTransformer';
import { nearest } from './nearest';
import { negative } from './negative';

/**
 * Makes color transformer which finds the furthest color from the given list
 *
 * @param colors array of colors to choose from
 */

export function furthest(...colors: Color[]): IColorTransformer {
    return nearest(...colors.map(negative));
}
