import { Color } from '../color/Color';
import { useWallpaper } from './useWallpaper';

/**
 * @@@
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
export function useSkin(): ISkin {
    const { colorStats } = useWallpaper();

    const footerTextColor = Color.fromHex('#ccc');

    return {
        normalTextColor: colorStats.mostFrequentColor.negative,
        highlightedTextColor: colorStats.mostFrequentColor.negative.addLightness(
            0.1 /* <- TODO: More manipulation methods */,
        ),
        footerTextColor,

        mainBackground: `linear-gradient(to bottom, ${colorStats.mostFrequentColor.toString()}, ${colorStats.mostFrequentColor.grayscale //.addLightness(-0.1)
            .toString()}),
            url(../../public/patterns/simple/grey.png)`,
        footerBackground: `linear-gradient(to bottom, ${footerTextColor.negative
            .addLightness(-0.2)
            .toString()}, ${footerTextColor.negative.addLightness(-0.3).toString()}),
                url(../../public/patterns/simple/grey.png)`,
    };
}

/**
 * TODO: !!!! Footer always dark BUT dynamic from Wallpaper
 */
