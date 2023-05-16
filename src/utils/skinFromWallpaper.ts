import { IWallpaper } from '../../src/utils/IWallpaper';
import { Color } from './color/Color';
import { darken } from './color/operators/darken';
import { textColor } from './color/operators/furthest';
import { grayscale } from './color/operators/grayscale';
import { mixWithColor } from './color/operators/mixWithColor';
import { negative } from './color/operators/negative';
import { withAlpha } from './color/operators/withAlpha';
import { areColorsEqual } from './color/utils/areColorsEqual';
import { IImageColorStats } from './image/utils/IImageColorStats';
import { WithTake } from './take/interfaces/ITakeChain';

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

    // TODO: Maybe !! use here a palette
    // TODO: Maybe !! vars should be only a palette like --primaty --secondary --tertiary,...

    for (const primaryColor of generatePrimaryColorCandidates(colorStats)) {
        // 1️⃣ Figure out the main background color - take the most frequent color from the bottom third of the image
        const mainBackgroundColor = primaryColor;

        const highlightedTextColor = mainBackgroundColor.then(textColor);

        if (!areColorsEqual(highlightedTextColor, Color.get('white'))) {
            // TODO: We want to have white text on dark background - so this is not a good candidate
            continue;
        }

        const highlightedTextShaddow = `0 0 30px ${highlightedTextColor.then(negative).toHex()}`;
        const normalTextColor = highlightedTextColor.then(mixWithColor(0.2, colorStats.mostFrequentColors[0]));

        const mainBackground = `linear-gradient(to bottom, ${mainBackgroundColor.toHex()}, ${mainBackgroundColor
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

    // Note: This should never happen because we have [🏴] a fallbacks for every case
    throw new Error('No skin found');
}

function* generatePrimaryColorCandidates(colorStats: IImageColorStats): IterableIterator<WithTake<Color>> {
    for (const regionStats of [
        colorStats.bottomHalf,
        colorStats.bottomThird,
        colorStats,
        colorStats.bottomLine /* TODO: Combinations */,
    ]) {
        for (const mostFrequentColor of regionStats.mostFrequentColors) {
            yield mostFrequentColor;
        }
        for (const mostFrequentColor of regionStats.mostSatulightedColors) {
            yield mostFrequentColor;
        }
        regionStats.averageColor;
        for (const mostFrequentColor of regionStats.mostGroupedColors) {
            yield mostFrequentColor;
        }
        regionStats.darkestColor;
        regionStats.lightestColor;
    }

    // [🏴] Note: At last resort, use black and white fallbacks
    yield Color.get('black');
    yield Color.get('white');
}

/**
 * TODO: !! Use computeImagePalette OR precumpute in colorstats (v7)
 *       - https://ai.hejny.org/showcase/5cec4e9b-6a09-46d7-be3f-342ad9cf9ed3 (white text)
 * TODO: Make footer dynamic from Wallpaper
 */
