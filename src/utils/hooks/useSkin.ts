import { Color } from '../color/Color';
import { darken } from '../color/operators/darken';
import { furthest } from '../color/operators/furthest';
import { grayscale } from '../color/operators/grayscale';
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

    const mainBackground = `linear-gradient(to bottom, ${mostFrequentColor.toHex()}, ${mostFrequentColor
        .then(grayscale)
        .toHex()}),
        url(../../public/patterns/simple/grey.png)`;

    const footerTextColor = Color.fromHex('#ccc');
    const footerBackground = `linear-gradient(to bottom, ${footerTextColor.negative
        .then(darken(0.2))
        .toHex()}, ${footerTextColor.negative.then(darken(0.3)).toHex()}),
                url(../../public/patterns/simple/grey.png)`;

    console.log({
        mostFrequentColor: mostFrequentColor.toHex(),
        highlightedTextColor: highlightedTextColor.toHex(),
        normalTextColor: normalTextColor.toHex(),
        mainBackground,
    });

    return {
        normalTextColor,
        highlightedTextColor,
        footerTextColor,
        mainBackground,
        footerBackground,
    };
}

/**
 * TODO: Make footer dynamic from Wallpaper
 */
