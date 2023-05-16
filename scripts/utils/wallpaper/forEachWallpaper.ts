import chalk from 'chalk';
import moment from 'moment';
import { forPlay } from '../forPlay';
import { getWallpapersMetadataPaths } from './getWallpapersMetadataPaths';
import { IWallpaperFiles } from './IWallpaperFiles';

/**
 * @@@
 */
export async function forEachWallpaper(options: {
    makeWork(wallpeperFiles: IWallpaperFiles): Promise<void>;
    parallelWorksCount: number;
    isShuffled: boolean;
}): Promise<void> {
    const { makeWork, parallelWorksCount, isShuffled } = options;

    const wallpapersMetadataPaths = await getWallpapersMetadataPaths();

    const stats = {
        total: wallpapersMetadataPaths.length,
        done: 0,
        lastTime: moment(),
        startTime: moment(),
    };

    const workingOn = new Set<Promise<void>>();

    if (isShuffled) {
        wallpapersMetadataPaths.sort(() => Math.random() - 0.5);
    }

    for (const metadataPath of wallpapersMetadataPaths) {
        await forPlay();

        console.info(chalk.grey(`${metadataPath.split('\\').join('/')}`));

        const contentPath = metadataPath.replace(/\.json$/, '.content.md');
        const colorStatsPath = metadataPath.replace(/\.json$/, '.colors.yaml');

        const work = /* not await */ makeWork({ metadataPath, contentPath, colorStatsPath });
        // [3] const work = forTime(0.0263 * 1000 * 60);
        workingOn.add(work);

        work.catch(() => {
            // TODO: Add timeout error
            // TODO: [4] report all errors at the end
        }).then(() => {
            stats.done++;
            workingOn.delete(work);
        });

        if (workingOn.size >= parallelWorksCount) {
            //-----------
            // [🥼] This is the place
            const statsTotalString = `${stats.done}/${stats.total}`;
            const statsPercentString = `${Math.round((stats.done / stats.total) * 100)}%`;
            const now = moment();

            /*
            TODO: !! [3] Make it work for parallel
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
