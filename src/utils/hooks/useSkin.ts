import { Color } from '../color/Color';
import { darken } from '../color/operators/darken';
import { furthest } from '../color/operators/furthest';
import { mix } from '../color/operators/mix';
import { useWallpaper } from './useWallpaper';

/**
 * An interface that defines the properties of a skin ⁘
 *
 * @interface
 */
export interface ISkin {
    normalTextColor: Color;
    highlightedTextColor: Color;
    footerTextColor: Color;
    mainBackground: string;
    footerBackground: string;
}

/**
 * A function that returns a skin based on the wallpaper color statistics ⁘
 *
 * @returns {ISkin} The skin object.
 */
export function useSkin(): ISkin {
    const {
        colorStats: { mostFrequentColor },
    } = useWallpaper();

    const highlightedTextColor = mostFrequentColor.then(furthest(Color.get('black'), Color.get('white')));
    const normalTextColor = highlightedTextColor.then(mix(0.2, mostFrequentColor));
    const footerTextColor = Color.fromHex('#ccc');

    return {
        normalTextColor,
        highlightedTextColor,
        footerTextColor,

        mainBackground: `linear-gradient(to bottom, ${mostFrequentColor.toString()}, ${mostFrequentColor.grayscale //.addLightness(-0.1)
            .toString()}),
            url(../../public/patterns/simple/grey.png)`,
        footerBackground: `linear-gradient(to bottom, ${footerTextColor.negative
            .then(darken(0.2))
            .toString()}, ${footerTextColor.negative.then(darken(-0.3)).toString()}),
                url(../../public/patterns/simple/grey.png)`,
    };
}

/**
 * TODO: Make footer dynamic from Wallpaper
 */
