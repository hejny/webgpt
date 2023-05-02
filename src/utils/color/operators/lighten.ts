import clamp from 'lodash/clamp'; /* <- TODO: Do we need here a lodash for just one thing?! */
import { Color } from '../Color';
import { hslToRgb } from '../internal-utils/hslToRgb';
import { rgbToHsl } from '../internal-utils/rgbToHsl';
import { IColorTransformer } from './IColorTransformer';

/**
 * Makes color transformer which lighten the given color
 *
 * @param amount from 0 to 1
 */
export function lighten(amount: number): IColorTransformer {
    return ({ red, green, blue, alpha }: Color) => {
        // tslint:disable-next-line:prefer-const
        let [h, s, l] = rgbToHsl(red, green, blue);
        l += amount;
        l = clamp(l, 0, 1);
        const [r, g, b] = hslToRgb(h, s, l);

        return Color.fromValues(r, g, b, alpha);
    };
}

/**
 * TODO: Maybe implement by mix+hsl
 */
