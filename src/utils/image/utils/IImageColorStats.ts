import { Color } from '../../color/Color';
import { WithTake } from '../../take/interfaces/ITakeChain';

/**
 * Define an interface for the image color statistics
 */
export interface IImageColorStats extends IImageColorStatsRegion {
    version: number;
    // TODO: colorSpace:number

    bottomHalf: IImageColorStatsRegion;
    bottomThird: IImageColorStatsRegion;
    bottomLine: IImageColorStatsRegion;
}

/**
 * Define an interface for the image color statistics for one particular region
 */
export interface IImageColorStatsRegion {
    // TODO: region: IRegion + pixel size

    /**
     * The average color of the image as a Color object
     */
    averageColor: WithTake<Color>;

    /**
     * The lightest color of the image as a Color object
     */
    lightestColor: WithTake<Color>;

    /**
     * The darkest color of the image as a Color object
     */
    darkestColor: WithTake<Color>;

    /**
     * The most saturation*luminance colors of the image with different hue as a Color object
     */
    mostSatulightedColors: Array<WithTake<Color>>;

    /**
     * The most frequent color of the image as a Color object
     */
    mostFrequentColors: Array<WithTake<Color>>;

    /**
     * The most grouped color of the image as a Color object
     */
    mostGroupedColors: Array<WithTake<Color>>;

    /**
     * Colors that are nearest and furthest from white
     */
    minmaxWhite: [WithTake<Color>, WithTake<Color>];

    /**
     * Colors that are nearest and furthest from red
     */
    minmaxRed: [WithTake<Color>, WithTake<Color>];

    /**
     * Colors that are nearest and furthest from green
     */
    minmaxGreen: [WithTake<Color>, WithTake<Color>];

    /**
     * Colors that are nearest and furthest from blue
     */
    minmaxBlue: [WithTake<Color>, WithTake<Color>];
}

/**
 * TODO: !! MinMax as interface as {min: Color, max: Color}
 */
