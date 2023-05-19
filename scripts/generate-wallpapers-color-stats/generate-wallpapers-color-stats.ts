#!/usr/bin/env ts-node

import chalk from 'chalk';
import commander from 'commander';
import { readFile, writeFile } from 'fs/promises';
import { join, relative } from 'path';
import { forImmediate } from 'waitasecond';
import YAML from 'yaml';
import { COLORSTATS_DEFAULT_COMPUTE } from '../../config';
import { createImageInNode } from '../../src/utils/image/createImageInNode';
import { computeImageColorStats } from '../../src/utils/image/utils/10-createColorfulComputeImageColorStats';
import { IWallpaperMetadata } from '../../src/utils/IWallpaper';
import { TakeChain } from '../../src/utils/take/classes/TakeChain';
import { commit } from '../utils/autocommit/commit';
import { isWorkingTreeClean } from '../utils/autocommit/isWorkingTreeClean';
import { isFileExisting } from '../utils/isFileExisting';
import { forEachWallpaper } from '../utils/wallpaper/forEachWallpaper';
import { getWallpapersDir } from '../utils/wallpaper/getWallpapersDir';

if (process.cwd() !== join(__dirname, '../..')) {
    console.error(chalk.red(`CWD must be root of the project`));
    process.exit(1);
}

const program = new commander.Command();
program.option('--commit', `Autocommit changes`);
program.option('--shuffle', `Randomize wallpapers order`);
// TODO: Probbably tell why to not use --parallel in colors
program.option('--parallel <numbers>', `Run N promises in parallel`, '1');
program.parse(process.argv);

// TODO:> program.option('--random', ``);
// TODO:> program.option('--reverse', ``);
program.parse(process.argv);
const { commit: isCommited, shuffle: isShuffled } = program.opts();

generateWallpapersColorStats({ isCommited, isShuffled })
    .catch((error) => {
        console.error(chalk.bgRed(error.name));
        console.error(error);
        process.exit(1);
    })
    .then(() => {
        process.exit(0);
    });

async function generateWallpapersColorStats({ isCommited, isShuffled }: { isCommited: boolean; isShuffled: boolean }) {
    console.info(`🎨  Generating wallpapers color-stats`);

    if (isCommited && !(await isWorkingTreeClean(process.cwd()))) {
        throw new Error(`Working tree is not clean`);
    }

    await forEachWallpaper({
        isShuffled,
        parallelWorksCount: 1,
        logBeforeEachWork: 'colorStatsPath',
        async makeWork({ metadataPath, colorStatsPath }) {
            if (await isFileExisting(colorStatsPath)) {
                const { version } = YAML.parse(await readFile(colorStatsPath, 'utf8'));

                if (version === COLORSTATS_DEFAULT_COMPUTE.version) {
                    console.info(`⏩ Color stats file has already been computed with same version`);
                    return;
                }
            }

            // Note: Making a lock file to prevent multiple processes to compute the same color stats
            await writeFile(
                colorStatsPath,
                YAML.stringify({
                    version: COLORSTATS_DEFAULT_COMPUTE.version,
                    note: 'This is just a lock before real color stats are made - if you see this the process is still running or it crashed.',
                })
                    .split('"')
                    .join("'") /* <- TODO: Can the replace be done directly in YAML.stringify options? */,
                'utf8',
            );

            // TODO: Pass the imageSrc directly through the forEachWallpaper
            const metadata = JSON.parse(await readFile(metadataPath, 'utf8')) as IWallpaperMetadata;
            const colorStats = computeImageColorStats(
                await createImageInNode(metadata!.image_paths![0 /* <- TODO: Detect different than 1 item */]),
            );

            // TODO: !! Break also createImageInNode, computeImageColorStats and its subfunctions into forImmediate chunks
            await forImmediate();

            await writeFile(
                colorStatsPath,
                YAML.stringify(
                    // TODO: More efficient way then JSON.stringify+JSON.parse
                    JSON.parse(
                        JSON.stringify(colorStats, (key, value) => {
                            if (value instanceof TakeChain) {
                                return value.value.toHex();
                            } else {
                                return value;
                            }
                        }),
                    ),
                    { indent: 4 },
                )
                    .split('"')
                    .join("'") /* <- TODO: Can the replace be done directly in YAML.stringify options? */,
                'utf8',
            );
            console.info(`💾 ${relative(process.cwd(), colorStatsPath).split('\\').join('/')}`);
        },
    });

    if (isCommited) {
        await commit(
            await getWallpapersDir(),
            `🎨 Generate wallpapers color-stats version ${COLORSTATS_DEFAULT_COMPUTE.version}`,
        );
    }

    console.info(`[ Done 🎨  Generating wallpapers color-stats ]`);
}

/**
 * TODO: Maybe use getMidjourneyLink from batch-froject-editor
 * TODO: Persistency and uniqueness of the names
 */
