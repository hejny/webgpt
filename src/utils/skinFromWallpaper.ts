import { IWallpaper } from '../../src/utils/IWallpaper';
import { Color } from './color/Color';
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

    const highlightedTextShaddow = `0 0 30px ${colorStats.palette[0].toHex()}`;
    const normalTextColor = highlightedTextColor.then(
        /*mixWithColor(0.2, colorStats.mostFrequentColors[0] )*/ withAlpha(0.8),
    ); /* <- TODO: Figure out the best */

    // TODO: !!!! Footer must be always black
    const footerTextColor = colorStats.palette[3];
    const footerBackground = `linear-gradient(to bottom, rgba(var(--palette-4-triplet),0.05), rgba(var(--palette-2-triplet),0.1)),url(/patterns/simple/stripes-black.png)`;

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
