import { Color } from '../../color/Color';
import { WithTake } from '../../take/interfaces/ITakeChain';
import { IImage } from '../IImage';

export interface IComputeImageColorStats<TVersion extends string> {
    version: TVersion;
    (image: IImage): IImageColorStats<TVersion>;
}

export interface IImageColorStats<TVersion extends string> {
    version: TVersion;
    palette: Array<{ value: WithTake<Color>; note: number } /* <- TODO: [⏲] Do we want here count*/>;

    /**
     * The average color of the image as a Color object
     */
    averageColor: WithTake<Color>;

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
    lightestColor: WithTake<Color> /* <- TODO: Also expose count and maybe make simmilar list as mostXxxColors + [🎍] some util for counting colors */;

    /**
     * The darkest color of the image as a Color object
     */
    darkestColor: WithTake<Color> /* <- TODO: Also expose count and maybe make simmilar list as mostXxxColors + [🎍] some util for counting colors */;

    /**
     * The most saturation*luminance colors of the image with different hue as a Color object
     */
    mostSatulightedColors: Array<{ value: WithTake<Color>; count: number } /* <- TODO: [⏲] DRY */>;

    /**
     * The most frequent color of the image as a Color object
     */
    mostFrequentColors: Array<{ value: WithTake<Color>; count: number } /* <- TODO: [⏲] DRY */>;

    /**
     * The most grouped color of the image as a Color object
     */
    mostGroupedColors: Array<{ value: WithTake<Color>; count: number } /* <- TODO: [⏲] DRY */>;
}
