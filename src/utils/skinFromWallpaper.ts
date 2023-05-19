import { IWallpaper } from '../../src/utils/IWallpaper';
import { Color } from './color/Color';
import { darken } from './color/operators/darken';
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
    footerBackground: string;

    palette: Array<Color>;
}

/**
 * @@@
 */
export function skinFromWallpaper(wallpaper: IWallpaper): ISkin {
    const { colorStats } = wallpaper;

    const mainBackgroundColor = colorStats.palette[0];
    const highlightedTextColor = colorStats.palette[1];

    // TODO: [🥼] !!!! Use ONLY palette colors - SNAP to nearest palette color

    const highlightedTextShaddow = `0 0 30px ${highlightedTextColor.then(negative).toHex()}`;
    const normalTextColor = highlightedTextColor.then(
        /*mixWithColor(0.2, colorStats.mostFrequentColors[0] )*/ withAlpha(0.8),
    ); /* <- TODO: Figure out the best */

    // TODO: !!!! Footer must be always black
    const footerTextColor = Color.fromHex('#ccc');
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
        footerBackground,
        palette: colorStats.palette,
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
 * TODO: [🧠][🥼] !! Remove Skin and USE ONLY palette + put font into css vars
 * TODO: !! Use computeImagePalette OR precumpute in colorstats (v7)
 *       - https://ai.hejny.org/showcase/5cec4e9b-6a09-46d7-be3f-342ad9cf9ed3 (white text)
 * TODO: Make footer dynamic from Wallpaper
 */
