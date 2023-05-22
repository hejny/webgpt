import {
    COLORS_LIMIT,
    DIFFERENT_COLOR_DISTANCE_THEASHOLD_RATIO,
    DIFFERENT_COLOR_HUE_THEASHOLD_DEGREES,
} from '../../../../config';
import { Color } from '../../color/Color';
import { textColor } from '../../color/operators/furthest';
import { areColorsEqual } from '../../color/utils/areColorsEqual';
import { colorDistanceSquared } from '../../color/utils/colorDistance';
import { colorHueDistance } from '../../color/utils/colorHueDistance';
import { WithTake } from '../../take/interfaces/ITakeChain';
import { IImageColorStatsAdvanced } from './IImageColorStats';

let totalCount = 0;
let pickByMostFrequentColorCount = 0;

export function computeImagePalette12(
    colorStats: Omit<IImageColorStatsAdvanced<string>, 'version' | 'palette'>,
): Array<WithTake<Color>> {
    let primaryColor: WithTake<Color> | null = null;

    totalCount++;

    // 0️⃣ Check that there is some most occuring color towards the bottom of the image
    if (
        // [🥎]
        areColorsEqual(colorStats.mostFrequentColors[0], colorStats.bottomHalf.mostFrequentColors[0]) &&
        areColorsEqual(colorStats.mostFrequentColors[0], colorStats.bottomThird.mostFrequentColors[0]) &&
        areColorsEqual(colorStats.mostFrequentColors[0], colorStats.bottomLine.mostFrequentColors[0])
    ) {
        pickByMostFrequentColorCount++;
        console.log(` !!! Picking primary as the most frequent one (${pickByMostFrequentColorCount}/${totalCount}))`);
        primaryColor = colorStats.bottomHalf.mostFrequentColors[0];
    }

    // 1️⃣ Compute the all palette candidates
    const paletteCandidates: Array<WithTake<Color>> = [];

    for (const regionStats of [
        colorStats.bottomHalf,
        colorStats.bottomThird,
        colorStats,
        colorStats.bottomLine /* TODO: Combinations */,
    ]) {
        // TODO: !! Here also get in account the color count

        for (const mostSatulightedColor of regionStats.mostSatulightedColors) {
            paletteCandidates.push(mostSatulightedColor);
        }
        for (const mostGroupedColor of regionStats.mostGroupedColors) {
            paletteCandidates.push(mostGroupedColor);
        }
        for (const mostFrequentColor of regionStats.mostFrequentColors) {
            paletteCandidates.push(mostFrequentColor);
        }
        // regionStats.averageColor;

        paletteCandidates.push(regionStats.darkestColor);
        paletteCandidates.push(regionStats.lightestColor);
    }

    if (!primaryColor) {
        // 2️⃣ Pick best primary color
        // 2️⃣🅰 Pick the first color from paletteCandidates which is dark enough to white text on it
        for (const paletteCandidate of paletteCandidates) {
            if (areColorsEqual(paletteCandidate.then(textColor), Color.get('white'))) {
                primaryColor = paletteCandidate;
                break;
            }
        }

        // 2️⃣🅱 Pick just the first color from paletteCandidates
        if (!primaryColor) {
            primaryColor = paletteCandidates[0];
        }
    }

    // 2️⃣🅲 Get the secondary color
    const secondaryColor = primaryColor.then(textColor);

    // 3️⃣ Pick colors that has some distance+hue threshold (compared to all other already picked colors)
    //    TODO: This has one flaw which need to be fixed [🦯]
    const distanceTheashold =
        colorDistanceSquared(Color.get('black'), Color.get('white')) * DIFFERENT_COLOR_DISTANCE_THEASHOLD_RATIO;
    const palette: Array<WithTake<Color>> = [primaryColor, secondaryColor];
    for (const paletteCandidate of paletteCandidates.filter(
        (color) => color !== primaryColor && color !== secondaryColor,
    )) {
        // TODO: !! Make in this distance hue more relevant
        if (
            palette.every((uniqueColor) => colorDistanceSquared(paletteCandidate, uniqueColor) >= distanceTheashold) &&
            palette.every(
                (uniqueColor) =>
                    colorHueDistance(paletteCandidate, uniqueColor) >= DIFFERENT_COLOR_HUE_THEASHOLD_DEGREES,
            )
        ) {
            palette.push(paletteCandidate);
        }

        if (palette.length >= COLORS_LIMIT) {
            break;
        }
    }

    // TODO: [3]

    // 4️⃣ Sort the palette so primary and secondary color are first and then the rest is sorted as
    //    every color is the most different previous one
    palette.sort((colorA, colorB) => {
        if (colorA === primaryColor) {
            return -1;
        }
        if (colorB === primaryColor) {
            return 1;
        }
        if (colorA === secondaryColor) {
            return -1;
        }
        if (colorB === secondaryColor) {
            return 1;
        }

        const distanceA = palette

            .filter((color) => color !== colorA)
            .map((color) => colorDistanceSquared(colorA, color))
            .reduce((sum, distance) => sum + distance, 0);
        const distanceB = palette
            .filter((color) => color !== colorB)
            .map((color) => colorDistanceSquared(colorB, color))
            .reduce((sum, distance) => sum + distance, 0);

        return distanceA - distanceB;
    });

    return palette;
}

/**
 * TODO: Match also the last with the first color and if not matching then add last color to the palette at the end as a "separator"
 * TODO: [🧠] Should be white/black text color hardcoded as second color in palette? (NOW IT IS as secondaryColor)
 * TODO: !!! Is here correct manipulation with square of distance?
 * TODO: [3] Check that there is some miminal number of colors in palette
 *
 *
 * TODO: !! [🦯] Pokud některé barvy vylučují respektive vždy beru tu první a ty ostatní blízké zahazuji
 * než narazím na nějakou další no tak tohle by mělo fungovat tím způsobem že se všechny příbuzné barvy seskupí do jednoho clusteru
 * a ten se vážení zprůměruje na základě četnosti – tím pádem například pokud je hodně odstínů šedé a nejčastější je ten nejsvětlejš
 * tak výsledná barva nebude pouze ta nejsvětlejší ale někde uprostřed více světla
 */
