import chalk from 'chalk';
import moment from 'moment';
import { COLORSTATS_DEFAULT_COMPUTE_IN_SCRIPT } from '../../../config';
import { forPlay } from '../forPlay';
import { getHardcodedWallpapersMetadataFilePaths } from './getHardcodedWallpapersMetadataFilePaths';
import { IHardcodedWallpaperFiles } from './IHardcodedWallpaperFiles';

/**
 * Executes a series of async tasks on hardcoded wallpapers
 *
 *
 * @param {Object} options - The options for executing the tasks.
 * @param {function} options.makeWork - The function that performs the work on each wallpaper file.
 * @param {number} options.parallelWorksCount - The maximum number of parallel works.
 * @param {boolean} options.isShuffled - Determines if the wallpapers should be shuffled before processing.
 * @param {string} options.logBeforeEachWork - The property of the wallpaper files to log before each work.
 * @returns {Promise<void>} - A promise that resolves when all tasks have been completed.
 */
export async function forEachHardcodedWallpaper(options: {
    makeWork(wallpeperFiles: IHardcodedWallpaperFiles): Promise<void>;
    parallelWorksCount: number;
    isShuffled: boolean;
    logBeforeEachWork: keyof IHardcodedWallpaperFiles;
}): Promise<void> {
    const { makeWork, parallelWorksCount, isShuffled, logBeforeEachWork } = options;

    const wallpapersmetadataFilePaths = await getHardcodedWallpapersMetadataFilePaths();

    const stats = {
        total: wallpapersmetadataFilePaths.length,
        done: 0,
        lastTime: moment(),
        startTime: moment(),
    };

    const workingOn = new Set<Promise<void>>();

    if (isShuffled) {
        wallpapersmetadataFilePaths.sort(() => Math.random() - 0.5);
    }

    for (const metadataFilePath of wallpapersmetadataFilePaths) {
        await forPlay();

        const contentFilePath = metadataFilePath.replace(/\.json$/, '.content.md');
        const colorStatsFilePath = metadataFilePath.replace(
            /\.json$/,
            `.${COLORSTATS_DEFAULT_COMPUTE_IN_SCRIPT.version}.colors.yaml`,
        );

        const wallpaperFiles = { metadataFilePath, contentFilePath, colorStatsFilePath };
        console.info(chalk.grey(wallpaperFiles[logBeforeEachWork].split('\\').join('/')));

        const work = /* not await */ makeWork(wallpaperFiles).catch((error) => {
            // TODO: Add timeout error
            // TODO: [4] report all errors ALSO at the end

            console.error(error);
        });
        // [3] const work = forTime(0.0263 * 1000 * 60);
        workingOn.add(work);

        work.then(() => {
            stats.done++;
            workingOn.delete(work);
        });

        if (workingOn.size >= parallelWorksCount) {
            //-----------
            const statsTotalString = `${stats.done}/${stats.total}`;
            const statsPercentString = `${Math.round((stats.done / stats.total) * 100)}%`;

            /*
            TODO: !! [3] Make it work for parallel
            const now = moment();
            const durationOfOne = now.diff(stats.lastTime);
            stats.lastTime = now;
            const statsSpeedString = `${Math.round(((60 * 1000) / durationOfOne) * 10) / 10} img/m`;
            // const elapsedTime = moment().diff(stats.startTime);
            // const estimatedTime = (elapsedTime / stats.done) * (stats.total - stats.done);
            const estimatedTime = durationOfOne * (stats.total - stats.done);
            const statsTimeEstimateString =
                estimatedTime === Infinity ? '' : `${moment.duration(estimatedTime).humanize()} left`;
            */
            const statsString = [
                statsPercentString,
                statsTotalString,
                // [3] statsSpeedString,
                // [3] statsTimeEstimateString,
                `${workingOn.size} running`,
            ].join(' ');

            console.info(chalk.bgGray(statsString));
            //-----------
            await Promise.race(workingOn);
        }
    }

    // Note: And finally waiting for all the remaining ones
    await Promise.all(workingOn);
}
