import { IWallpaper } from '../../assets/ai/wallpaper/IWallpaper';
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
    footerTextColor: Color;
    mainBackground: string;
    footerBackground: string;
}

/**
 * @@@
 */
export function skinFromWallpaper(wallpaper: IWallpaper): ISkin {
    const { colorStats } = wallpaper;

    const highlightedTextColor = colorStats.mostFrequentColor.then(textColor);
    const normalTextColor = highlightedTextColor.then(mix(0.2, colorStats.mostFrequentColor));

    const mainBackground = `linear-gradient(to bottom, ${colorStats.bottom.mostSaturatedColor
        .then(withAlpha(1))
        .toHex()}, ${colorStats.bottom.mostSaturatedColor.then(grayscale).then(withAlpha(0.5)).toHex()}),
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
 * TODO: !!!! Light mode
 *       - https://ai.hejny.org/showcase/5cec4e9b-6a09-46d7-be3f-342ad9cf9ed3 (white text)
 * TODO: Make footer dynamic from Wallpaper
 */
