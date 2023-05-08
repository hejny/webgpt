import { Color } from '../../color/Color';
import { WithTake } from '../../take/interfaces/ITakeChain';

/**
 * Define an interface for the image color statistics
 */
export interface IImageColorStats extends IImageColorStatsRegion {
    //center: IImageColorStatsPart;
    //top: IImageColorStatsPart;
    //left: IImageColorStatsPart;
    //right: IImageColorStatsPart;
    bottom: IImageColorStatsRegion;
    //topLeft: IImageColorStatsPart;
    //topRight: IImageColorStatsPart;
    //bottomLeft: IImageColorStatsPart;
    //bottomRight: IImageColorStatsPart;
}

/**
 * Define an interface for the image color statistics for one particular region
 */
export interface IImageColorStatsRegion {
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

    /**
     * The most frequent color of the image as a Color object
     */
    mostFrequentColor: WithTake<Color>;

    /**
     * The most saturated color of the image as a Color object
     */
    mostSaturatedColor: WithTake<Color>;

    /**
     * The most isolated color of the image as a Color object
     */
    // NOT used - too slow> mostIsolatedColor: WithTake<Color>;

    /**
     * The most grouped color of the image as a Color object
     */
    mostGroupedColor: WithTake<Color>;
}
