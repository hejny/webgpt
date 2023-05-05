import { IWallpaperComponent } from '../../assets/ai/wallpaper/IWallpaperComponent';
import { Color } from './color/Color';
import { darken } from './color/operators/darken';
import { furthest } from './color/operators/furthest';
import { grayscale } from './color/operators/grayscale';
import { mix } from './color/operators/mix';
import { negative } from './color/operators/negative';

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
export function skinFromWallpaper(Wallpaper: IWallpaperComponent): ISkin {
    const { colorStats } = Wallpaper;

    const highlightedTextColor = colorStats.mostFrequentColor.then(furthest(Color.get('black'), Color.get('white')));
    const normalTextColor = highlightedTextColor.then(mix(0.2, colorStats.mostFrequentColor));

    const mainBackground = `linear-gradient(to bottom, ${colorStats.bottom.mostFrequentColor.toHex()}, ${colorStats.mostFrequentColor /*.bottom <- Not (maybe use top) */
        .then(grayscale)
        .toHex()}),
        url(../../public/patterns/simple/grey.png)`;

    const footerTextColor = colorStats.darkestColor.then(negative);
    const footerBackground = `linear-gradient(to bottom, ${footerTextColor.negative
        .then(darken(0.2))
        .toHex()}, ${footerTextColor.negative.then(darken(0.3)).toHex()}),
                url(../../public/patterns/simple/grey.png)`;

    const skin: ISkin = {
        normalTextColor,
        highlightedTextColor,
        footerTextColor,
        mainBackground,
        footerBackground,
    };

    console.info(
        'skin',
        Object.fromEntries(
            Object.entries(skin).map(([key, value]) => [key, value instanceof Color ? value.toHex() : value]),
        ),
    );

    return skin;
}

/**
 * TODO: Make footer dynamic from Wallpaper
 */
