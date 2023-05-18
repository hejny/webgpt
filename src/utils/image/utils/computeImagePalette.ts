import { COLORS_LIMIT, DIFFERENT_COLOR_DISTANCE_THEASHOLD_RATIO } from '../../../../config';
import { Color } from '../../color/Color';
import { textColor } from '../../color/operators/furthest';
import { areColorsEqual } from '../../color/utils/areColorsEqual';
import { colorDistanceSquared } from '../../color/utils/colorDistance';
import { WithTake } from '../../take/interfaces/ITakeChain';
import { IImageColorStats } from './IImageColorStats';

export function computeImagePalette(colorStats: Omit<IImageColorStats, 'version' | 'palette'>): Array<WithTake<Color>> {
    // 1️⃣ Compute the all palette candidates

    const paletteCandidates: Array<WithTake<Color>> = [];

    for (const regionStats of [
        colorStats.bottomHalf,
        colorStats.bottomThird,
        colorStats,
        colorStats.bottomLine /* TODO: Combinations */,
    ]) {
        // TODO: Share [9]

        for (const mostFrequentColor of regionStats.mostFrequentColors) {
            paletteCandidates.push(mostFrequentColor);
        }
        for (const mostSatulightedColor of regionStats.mostSatulightedColors) {
            paletteCandidates.push(mostSatulightedColor);
        }
        for (const mostFrequentColor of regionStats.mostFrequentColors) {
            paletteCandidates.push(mostFrequentColor);
        }
        regionStats.averageColor;
        for (const mostFrequentColor of regionStats.mostGroupedColors) {
            paletteCandidates.push(mostFrequentColor);
        }
        paletteCandidates.push(regionStats.darkestColor);
        paletteCandidates.push(regionStats.lightestColor);
    }

    // TODO: [3]

    // 2️⃣ Pick best primary color
    let primaryColor: WithTake<Color> | null = null;

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

    // 2️⃣⛙ Make sortedPaletteCandidates
    const secondaryColor = primaryColor.then(textColor);
    const sortedPaletteCandidates = [
        primaryColor,
        secondaryColor,
        ...paletteCandidates.filter((color) => color !== primaryColor),
    ];

    // 3️⃣ Pick colors that has some distance threshold (compared to all other already picked colors)
    //    TODO: This has one flaw which need to be fixed [🦯]
    const distanceTheashold =
        colorDistanceSquared(Color.get('black'), Color.get('white')) * DIFFERENT_COLOR_DISTANCE_THEASHOLD_RATIO;
    const palette: Array<WithTake<Color>> = [];
    for (const paletteCandidate of sortedPaletteCandidates) {
        // TODO: !! Make in this distance hue more relevant
        if (palette.every((uniqueColor) => colorDistanceSquared(paletteCandidate, uniqueColor) >= distanceTheashold)) {
            palette.push(paletteCandidate);
        }

        if (palette.length >= COLORS_LIMIT) {
            break;
        }
    }

    // TODO: [3]

    return palette;
}

/**
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
