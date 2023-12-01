import { Promisable } from 'type-fest';
import { Vector } from 'xyzt';
import { WebgptTaskProgress } from '../../../components/TaskInProgress/task/WebgptTaskProgress';
import { Color } from '../../color/Color';
import type { WithTake } from '../../take/interfaces/ITakeChain';
import { IImage } from '../IImage';

/*
TODO: Use or remove
interface IComputeImageColorStatsProgress {
    readonly total: number_integer;
    readonly done: number_integer;
    readonly percent: number_percent;
}
*/

export interface IComputeImageColorStats<TVersion extends string> {
    readonly version: TVersion;
    readonly preferredSize: Vector;
    (image: IImage, onProgress?: (taskProgress: WebgptTaskProgress) => Promisable<void>): Promise<
        IImageColorStats<TVersion>
    >;
}

export interface IImageColorStats<TVersion extends string> {
    readonly version: TVersion;
    readonly palette: Array<{ value: WithTake<Color>; note: string } /* <- TODO: [⏲] Do we want here count*/>;

    /**
     * The average color of the image as a Color object
     */
    readonly averageColor: WithTake<Color>;

    // TODO: colorSpace:number
    // TODO: scaleRatio:number
}

/**
 * Define an interface for the image color statistics of current colorstats version
 */
export interface IImageColorStatsAdvanced<TVersion extends string>
    extends IImageColorStats<TVersion>,
        IImageColorStatsRegion {
    readonly paletteCandidates: Array<{ value: WithTake<Color>; note: string } /* <- TODO: [⏲] Do we want here count*/>;

    readonly bottomHalf: IImageColorStatsRegion;
    readonly bottomThird: IImageColorStatsRegion;
    readonly bottomLine: IImageColorStatsRegion;
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
    readonly averageColor: WithTake<Color>;

    /**
     * The lightest color of the image as a Color object
     */
    readonly lightestColor: WithTake<Color> /* <- TODO: Also expose count and maybe make simmilar list as mostXxxColors + [🎍] some util for counting colors */;

    /**
     * The darkest color of the image as a Color object
     */
    readonly darkestColor: WithTake<Color> /* <- TODO: Also expose count and maybe make simmilar list as mostXxxColors + [🎍] some util for counting colors */;

    /**
     * The most saturation*luminance colors of the image with different hue as a Color object
     */
    readonly mostSatulightedColors: Array<{ value: WithTake<Color>; count: number } /* <- TODO: [⏲] DRY */>;

    /**
     * The most frequent color of the image as a Color object
     */
    readonly mostFrequentColors: Array<{ value: WithTake<Color>; count: number } /* <- TODO: [⏲] DRY */>;

    /**
     * The most grouped color of the image as a Color object
     */
    readonly mostGroupedColors: Array<{ value: WithTake<Color>; count: number } /* <- TODO: [⏲] DRY */>;
}
