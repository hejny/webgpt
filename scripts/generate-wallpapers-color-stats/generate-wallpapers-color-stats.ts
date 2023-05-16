#!/usr/bin/env ts-node

import chalk from 'chalk';
import commander from 'commander';
import { readFile, writeFile } from 'fs/promises';
import { join, relative } from 'path';
import YAML from 'yaml';
import { createImageInNode } from '../../src/utils/image/createImageInNode';
import { computeImageColorStats } from '../../src/utils/image/utils/0-computeImageColorStats';
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
        async makeWork({ metadataPath, colorStatsPath }) {
            if (await isFileExisting(colorStatsPath)) {
                console.info(`⏩ Color stats file does already exists`);
                // TODO: !!! Instead of this Detect if already computed with same version - if yes, skip if no immediatelly make lock with just version
            }

            // TODO: Pass the imageSrc directly through the forEachWallpaper
            const metadata = JSON.parse(await readFile(metadataPath, 'utf8')) as IWallpaperMetadata;
            const colorStats = computeImageColorStats(
                await createImageInNode(metadata!.image_paths![0 /* <- TODO: Detect different than 1 item */]),
            );

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
        await commit(await getWallpapersDir(), `🎨 Generate wallpapers color-stats`);
    }

    console.info(`[ Done 🎨  Generating wallpapers color-stats ]`);
}

/**
 * TODO: Maybe use getMidjourneyLink from batch-froject-editor
 * TODO: Persistency and uniqueness of the names
 */
