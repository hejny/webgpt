#!/usr/bin/env ts-node

import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import chalk from 'chalk';
import commander from 'commander';
import { readFile, rm } from 'fs/promises';
import { join, relative } from 'path';
import { extractTitleFromMarkdown } from '../../src/utils/content/extractTitleFromMarkdown';
import { commit } from '../utils/autocommit/commit';
import { isWorkingTreeClean } from '../utils/autocommit/isWorkingTreeClean';
import { forEachWallpaper } from '../utils/wallpaper/forEachWallpaper';
import { getWallpapersDir } from '../utils/wallpaper/getWallpapersDir';

if (process.cwd() !== join(__dirname, '../..')) {
    console.error(chalk.red(`CWD must be root of the project`));
    process.exit(1);
}

const program = new commander.Command();
program.option('--commit', `Autocommit changes`, false);
program.option('--parallel <numbers>', `Run N promises in parallel`, '1');
program.parse(process.argv);
const { commit: isCommited, parallel } = program.opts();

postprocessWallpapersContent({ isCommited, parallel: parseInt(parallel) })
    .catch((error) => {
        console.error(chalk.bgRed(error.name));
        console.error(error);
        process.exit(1);
    })
    .then(() => {
        process.exit(0);
    });

async function postprocessWallpapersContent({ isCommited, parallel }: { isCommited: boolean; parallel: number }) {
    console.info(`🧾  Postprocessing wallpapers texts`);

    // TODO: Use isParallel

    if (isCommited && !(await isWorkingTreeClean(process.cwd()))) {
        throw new Error(`Working tree is not clean`);
    }

    const usedFonts = new Set<string>();

    await forEachWallpaper({
        isShuffled: false,
        parallelWorksCount: parallel,
        async makeWork({ metadataPath, contentPath }) {
            // TODO: !! Require at least some structure
            // TODO: !! Cleanup font and if cannnot be recognized then remove i
            // TODO: !! Multiple levels of titles like in "The Witcher 3: Wild Hunt" should done like "# The Witcher 3 \n\n ## Wild Hunt"

            const content = await readFile(contentPath, 'utf-8');
            const title = extractTitleFromMarkdown(content);

            // TODO: [💵] DRY this checks 
            if (title === null) {
                rm(contentPath);
                console.info(`🗑 ${relative(process.cwd(), contentPath).split('\\').join('/')}`);
                console.info(`🗑 Removing file because of missing title `);
                return;
            }

            if (title?.toLowerCase().includes('wallpaper')) {
                rm(contentPath);
                console.info(`🗑 ${relative(process.cwd(), contentPath).split('\\').join('/')}`);
                console.info(`🗑 Removing file because it contains wallpaper in title\n"${title}"`);
                return;
            }
        },
    });

    if (isCommited) {
        await commit(await getWallpapersDir(), `🧾 Postprocess wallpapers texts`);
    }

    console.info(`🔤 Using fonts: ${Array.from(usedFonts).join(', ')}`);

    console.info(`[ Done 🧾  Postprocessing wallpapers texts ]`);
}
