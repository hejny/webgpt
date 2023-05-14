import chalk from 'chalk';
import glob from 'glob-promise';
import moment from 'moment';
import { join } from 'path';
import { isFileExisting } from '../../utils/isFileExisting';
import { forPlay } from '../forPlay';
import { getWallpapersDir } from './getWallpapersDir';
import { IWallpaperFiles } from './IWallpaperFiles';

/**
 * @@@
 */
export async function forEachWallpaper(options: {
    makeWork(wallpeperFiles: IWallpaperFiles): Promise<void>;
    parallel: number;
}): Promise<void> {
    const { makeWork, parallel } = options;

    // TODO: !! DRY Use here getWallpapers
    const wallpapersDir = await getWallpapersDir();
    const wallpapersPaths = await glob(
        join(wallpapersDir, '*.png' /* <- TODO: !!! Use here metadata files */).split('\\').join('/'),
    );

    const stats = {
        total: wallpapersPaths.length,
        done: 0,
        lastTime: moment(),
        startTime: moment(),
    };

    const workingOn = new Set<Promise<void>>();

    for (const wallpaperPath of wallpapersPaths) {
        await forPlay();

        console.info(chalk.grey(`${wallpaperPath.split('\\').join('/')}`));

        const metadataPath = wallpaperPath.replace(/\.png$/, '.json');
        const contentPath = wallpaperPath.replace(/\.png$/, '.content.md');

        if (!(await isFileExisting(metadataPath))) {
            // TODO: Do not crash for all processes JUST [4] report at the end
            throw new Error(`Metadata file does not exist "${metadataPath}"`);
        }

        const work = /* not await */ makeWork({ metadataPath, contentPath });
        // [3] const work = forTime(0.0263 * 1000 * 60);
        workingOn.add(work);

        work.catch(() => {
            // TODO: Add timeout error
            // TODO: [4] report all errors at the end
        }).then(() => {
            stats.done++;
            workingOn.delete(work);
        });

        if (workingOn.size >= parallel) {
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
}
