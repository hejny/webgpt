import { Promisable } from 'type-fest';
import { IVector, Vector } from 'xyzt';
import { WebgptTaskProgress } from '../../../../components/TaskInProgress/task/WebgptTaskProgress';
import { forARest } from '../../../forARest';
import { take } from '../../../take/take';
import { IComputeColorstatsWork } from '../../IComputeColorstatsWork';
import { IImage } from '../../IImage';
import { colorDownscaleImage } from '../../utils/colorDownscaleImage';
import { computeImageAverageColor } from '../../utils/computeImageAverageColor';
import { computeImageDarkestColor } from '../../utils/computeImageDarkestColor';
import { computeImageLightestColor } from '../../utils/computeImageLightestColor';
import { computeImageMostFrequentColors } from '../../utils/computeImageMostFrequentColors';
import { computeImageMostGroupedColors } from '../../utils/computeImageMostGroupedColors';
import { computeImageMostSatulightedColors } from '../../utils/computeImageMostSatulightedColors';
import {
    IComputeImageColorStats,
    IImageColorStatsAdvanced,
    IImageColorStatsRegion,
} from '../../utils/IImageColorStats';
import { scaleImage } from '../../utils/scaleImage';
import { computeImagePalette15 } from './computeImagePalette15';

/**
 * @@@
 */
export function createColorfulComputeImageColorStats15 /* TODO: <TColorBits extends number, TScale extends number>*/(options: {
    colorBits: number;
    size: IVector;
}): IComputeImageColorStats<string /* TODO: `colorful-${TColorBits}bit-${...}-1`*/> {
    const { colorBits } = options;

    // Check that size has positive integer values
    const size = Vector.fromObject(options.size);
    if (size.x < 1 || size.y < 1 || size.x % 1 !== 0 || size.y % 1 !== 0) {
        throw new Error(`Size must have positive integer values, got ${size.x}x${size.y}`);
    }

    const version = `colorful-${size.x}x${size.y}-${options.colorBits}bit-v15palette` as string;

    const computeWholeImageColorStats = async (image: IImage): Promise<IImageColorStatsRegion> => {
        image = await scaleImage(image, size);
        image = await colorDownscaleImage(image, colorBits);

        await forARest<IComputeColorstatsWork>('computeImageColorStats');

        return {
            // Note: There is a strange type problem when averageColor, lightestColor and darkestColor is not wrapped in take()
            averageColor: take(await computeImageAverageColor(image)),
            lightestColor: take(await computeImageLightestColor(image)),
            darkestColor: take(await computeImageDarkestColor(image)),
            mostFrequentColors: await computeImageMostFrequentColors(image),
            mostSatulightedColors: await computeImageMostSatulightedColors(image),
            mostGroupedColors: await computeImageMostGroupedColors(image),
        };
    };

    const computeImageColorStats = async (
        image: IImage,
        onProgress: (taskProgress: WebgptTaskProgress) => Promisable<void> = () => {},
    ): Promise<IImageColorStatsAdvanced<string>> => {
        await onProgress({
            name: 'colorstats-v15',
            title: 'Color analysis (v15)' /*<- [🧠] Should there be a palette version in title? */,
            isDone: false,
            // TODO: Make it more granular
        });

        const stats = {
            ...(await computeWholeImageColorStats(image)),
            bottomHalf: await computeWholeImageColorStats(
                image.crop(new Vector(0, image.height * (1 / 2)), new Vector(image.width, image.height)),
            ),
            bottomThird: await computeWholeImageColorStats(
                image.crop(new Vector(0, image.height * (2 / 3)), new Vector(image.width, image.height)),
            ),
            bottomLine: await computeWholeImageColorStats(
                image.crop(new Vector(0, image.height - 1), new Vector(image.width, image.height)),
            ),
        } satisfies Omit<IImageColorStatsAdvanced<string>, 'version' | 'palette' | 'paletteCandidates'>;

        const { palette, paletteCandidates } = await computeImagePalette15(stats);

        await onProgress({
            name: 'colorstats-v15',
            isDone: true,
        });

        return { version, palette, paletteCandidates, ...stats };
    };

    computeImageColorStats.version = version;
    computeImageColorStats.preferredSize = size;

    return computeImageColorStats;
}

/**
 * @see https://youtu.be/gMqZR3pqMjg
 * TODO: Report TaskProgress more granularly
 */
