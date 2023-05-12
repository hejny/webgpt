#!/usr/bin/env ts-node

import chalk from 'chalk';
import commander from 'commander';
import { readFile, writeFile } from 'fs/promises';
import glob from 'glob-promise';
import moment from 'moment';
import { dirname, join, relative } from 'path';
import { IWallpaperMetadata } from '../../assets/ai/wallpaper/IWallpaperComponent';
import { createImageInNode } from '../../src/utils/image/createImageInNode';
import { computeImageColorStats } from '../../src/utils/image/utils/0-computeImageColorStats';
import { TakeChain } from '../../src/utils/take/classes/TakeChain';
import { commit } from '../utils/autocommit/commit';
import { isWorkingTreeClean } from '../utils/autocommit/isWorkingTreeClean';
import { forPlay } from '../utils/forPlay';
import { isFileExisting } from '../utils/isFileExisting';
import { prettify } from '../utils/prettify';

if (process.cwd() !== join(__dirname, '../..')) {
    console.error(chalk.red(`CWD must be root of the project`));
    process.exit(1);
}

const program = new commander.Command();
program.option('--commit', `Autocommit changes`);
program.parse(process.argv);
const { commit: isCommited } = program.opts();

generateWallpapersColorStats({ isCommited })
    .catch((error) => {
        console.error(chalk.bgRed(error.name));
        console.error(error);
        process.exit(1);
    })
    .then(() => {
        process.exit(0);
    });

async function generateWallpapersColorStats({ isCommited }: { isCommited: boolean }) {
    console.info(`🎨  Generating wallpapers color-stats`);

    if (isCommited && !(await isWorkingTreeClean(process.cwd()))) {
        throw new Error(`Working tree is not clean`);
    }

    const wallpapersDir = join(process.cwd(), 'assets', 'ai', 'wallpaper', 'gallery');
    const wallpapersPaths = await glob(
        join(wallpapersDir, '*.png' /* <- TODO: !!! Use here metadata files */).split('\\').join('/'),
    );

    const stats = {
        total: wallpapersPaths.length,
        done: -1,
        lastTime: moment(),
        startTime: moment(),
    };
    for (const wallpaperPath of wallpapersPaths /*.reverse(<- TODO:  Make popper paralelization from this)*/) {
        // Note: We can not make this parallel because of [5]
        await forPlay();

        // TODO: [🥼] Make just one util for stats
        stats.done++;
        const statsTotalString = `${stats.done}/${stats.total}`;
        const statsPercentString = `${Math.round((stats.done / stats.total) * 100)}%`;
        const now = moment();
        const durationOfOne = now.diff(stats.lastTime);
        stats.lastTime = now;
        const statsSpeedString = `${Math.round(((60 * 1000) / durationOfOne) * 10) / 10} img/m`;
        // const elapsedTime = moment().diff(stats.startTime);
        // const estimatedTime = (elapsedTime / stats.done) * (stats.total - stats.done);
        const estimatedTime = durationOfOne * (stats.total - stats.done);
        const statsTimeEstimateString =
            estimatedTime === Infinity ? '' : `${moment.duration(estimatedTime).humanize()} left`;

        const statsString = `${statsPercentString} ${statsTotalString} ${statsSpeedString} ${statsTimeEstimateString}`;

        console.info(chalk.bgGray(statsString) + ' ' + chalk.grey(`${wallpaperPath.split('\\').join('/')}`));

        const metadataPath = wallpaperPath.replace(/\.png$/, '.json');
        const colorStatsPath = wallpaperPath.replace(/\.png$/, '.colors.json');

        if (await isFileExisting(colorStatsPath)) {
            console.info(`⏩ Color stats file does already exists`);
            // !!! continue;
        }

        if (!(await isFileExisting(metadataPath))) {
            throw new Error(`Metadata file does not exist "${metadataPath}"`);
        }

        const metadata = JSON.parse(await readFile(metadataPath, 'utf8')) as IWallpaperMetadata;
        const colorStats = computeImageColorStats(
            await createImageInNode(
                metadata!.image_paths![0 /* <- TODO: Detect different than 1 item */],
            ) /* <- TODO: Create from url */,
        );

        await writeFile(
            colorStatsPath,
            await prettify(
                JSON.stringify(colorStats, (key, value) => {
                    if (value instanceof TakeChain) {
                        return value.value.toHex();
                    } else {
                        return value;
                    }
                }),
                'json',
            ),
            'utf8',
        );
        console.info(`💾 ${relative(process.cwd(), colorStatsPath).split('\\').join('/')}`);
    }

    if (isCommited) {
        await commit(dirname(wallpapersDir), `🎨 Generate wallpapers color-stats`);
    }

    console.info(`[ Done 🎨  Generating wallpapers color-stats ]`);
}

/**
 * TODO: Maybe use getMidjourneyLink from batch-froject-editor
 * TODO: Persistency and uniqueness of the names
 */
