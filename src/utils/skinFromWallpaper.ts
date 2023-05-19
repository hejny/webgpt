import { IWallpaper } from '../../src/utils/IWallpaper';
import { Color } from './color/Color';
import { darken } from './color/operators/darken';
import { grayscale } from './color/operators/grayscale';
import { mixWithColor } from './color/operators/mixWithColor';
import { negative } from './color/operators/negative';
import { withAlpha } from './color/operators/withAlpha';

/**
 * !!!!!! Remove Skin and USE ONLY palette + put font into css vars
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

    palette: Array<Color>;
}

/**
 * @@@
 */
export function skinFromWallpaper(wallpaper: IWallpaper): ISkin {
    const { colorStats } = wallpaper;

    const mainBackgroundColor = colorStats.palette[0];
    const highlightedTextColor = colorStats.palette[1];

    // TODO: !!!! Use ONLY palette colors - SNAP to nearest palette color

    const highlightedTextShaddow = `0 0 30px ${highlightedTextColor.then(negative).toHex()}`;
    const normalTextColor = highlightedTextColor.then(mixWithColor(0.2, colorStats.mostFrequentColors[0]));

    const mainBackground = `linear-gradient(to bottom, ${mainBackgroundColor.toHex()}, ${mainBackgroundColor
        .then(grayscale)
        .then(withAlpha(0.5))
        .toHex()}),
        url(/patterns/simple/grey.png)`;

    // TODO: !!!! Footer always black
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
 * TODO: !! Use computeImagePalette OR precumpute in colorstats (v7)
 *       - https://ai.hejny.org/showcase/5cec4e9b-6a09-46d7-be3f-342ad9cf9ed3 (white text)
 * TODO: Make footer dynamic from Wallpaper
 */
