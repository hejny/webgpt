import { IWallpaper } from '../../src/utils/IWallpaper';
import { Color } from './color/Color';
import { darken } from './color/operators/darken';
import { textColor } from './color/operators/furthest';
import { grayscale } from './color/operators/grayscale';
import { mix } from './color/operators/mix';
import { negative } from './color/operators/negative';
import { withAlpha } from './color/operators/withAlpha';

/**
 * An interface that defines the properties of a skin ⁘
 *
 * @interface
 */
export interface ISkin {
    normalTextColor: Color;
    highlightedTextColor: Color;
    highlightedTextShaddow: string;
    footerTextColor: Color;
    mainBackground: string;
    footerBackground: string;
}

/**
 * @@@
 */
export function skinFromWallpaper(wallpaper: IWallpaper): ISkin {
    const { colorStats } = wallpaper;

    // TODO: !!! use here a palette
    // TODO: !!!!! vars should be only a palette like --primaty --secondary --tertiary,...
    
    const highlightedTextColor = colorStats.mostSatulightedColors[0].then(textColor);
    const highlightedTextShaddow = `0 0 30px ${highlightedTextColor.then(negative).toHex()}`;
    const normalTextColor = highlightedTextColor.then(mix(0.2, colorStats.mostFrequentColors[0]));

    const mainBackground = `linear-gradient(to bottom, ${colorStats.bottomThird.mostSatulightedColors[0].toHex()}, ${colorStats.bottomThird.mostSatulightedColors[0]
        .then(grayscale)
        .then(withAlpha(0.5))
        .toHex()}),
        url(/patterns/simple/grey.png)`;

    const footerTextColor = colorStats.darkestColor.then(negative);
    const footerBackground = `linear-gradient(to bottom, ${footerTextColor
        .then(negative)
        .then(darken(0.2))
        .toHex()}, ${footerTextColor.then(negative).then(darken(0.3)).toHex()}),
                url(/patterns/simple/grey.png)`;

    const skin: ISkin = {
        normalTextColor,
        highlightedTextColor,
        highlightedTextShaddow,
        footerTextColor,
        mainBackground,
        footerBackground,
    };

    /*/
    console.info(
        'skin',
        Object.fromEntries(
            Object.entries(skin).map(([key, value]) => [key, value instanceof Color ? value.toHex() : value]),
        ),
    );
    /**/

    return skin;
}

/**
 * TODO: !! Use computeImagePalette OR precumpute in colorstats (v7)
 *       - https://ai.hejny.org/showcase/5cec4e9b-6a09-46d7-be3f-342ad9cf9ed3 (white text)
 * TODO: Make footer dynamic from Wallpaper
 */
