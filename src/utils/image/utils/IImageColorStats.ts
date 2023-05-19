import { Color } from '../../color/Color';
import { WithTake } from '../../take/interfaces/ITakeChain';
import { IImage } from '../IImage';

export interface IComputeImageColorStats<TVersion extends string> {
    version: TVersion;
    (image: IImage): IImageColorStats<TVersion>;
}

export interface IImageColorStats<TVersion extends string> {
    version: TVersion;
    palette: Array<WithTake<Color>>;
    // TODO: colorSpace:number
    // TODO: scaleRatio:number
}

/**
 * Define an interface for the image color statistics of current colorstats version
 */
export interface IImageColorStatsAdvanced<TVersion extends string>
    extends IImageColorStats<TVersion>,
        IImageColorStatsRegion {
    bottomHalf: IImageColorStatsRegion;
    bottomThird: IImageColorStatsRegion;
    bottomLine: IImageColorStatsRegion;
}

/**
 * Define an interface for the image color statistics for one particular region
 */
export interface IImageColorStatsRegion {
    // TODO: region: IRegion + pixel size
    // TODO: Instead of WithTake<Color> use intefrace IImageColor{count:number, color:WithTake<Color>}

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
}
