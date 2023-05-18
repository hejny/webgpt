#!/usr/bin/env ts-node

import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import chalk from 'chalk';
import commander from 'commander';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { FONTS } from '../../config';
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

repairWallpapersContent({ isCommited, parallel: parseInt(parallel) })
    .catch((error) => {
        console.error(chalk.bgRed(error.name));
        console.error(error);
        process.exit(1);
    })
    .then(() => {
        process.exit(0);
    });

async function repairWallpapersContent({ isCommited, parallel }: { isCommited: boolean; parallel: number }) {
    console.info(`🧾🩹  Repairing wallpapers texts`);

    // TODO: Use isParallel

    if (isCommited && !(await isWorkingTreeClean(process.cwd()))) {
        throw new Error(`Working tree is not clean`);
    }

    const usedFonts = new Set<string>();

    await forEachWallpaper({
        isShuffled: false,
        parallelWorksCount: parallel,
        logBeforeEachWork: 'contentPath',
        async makeWork({ metadataPath, contentPath }) {
            let content = await readFile(contentPath, 'utf-8');
            let title = extractTitleFromMarkdown(content);

            const font = content.match(/<!--font:(?<font>.*)-->/)?.groups?.font;
            if (font && !FONTS.includes(font)) {
                const existingFont = FONTS.find((existingFont) => font.includes(existingFont));

                if (existingFont) {
                    console.info(chalk.green(` 🩹  Repair the file`));
                    content = content.replace(font, existingFont);
                    await writeFile(contentPath, content, 'utf-8');
                }
            }

            // TODO: !!! Shorten the text
        },
    });

    if (isCommited) {
        await commit(await getWallpapersDir(), `🧾🩹 Repair wallpapers texts`);
    }

    console.info(`🔤 Using fonts: ${Array.from(usedFonts).join(', ')}`);

    console.info(`[ Done 🧾🩹  Repairing wallpapers texts ]`);
}

/**
 * TODO: Do we want multiple levels of titles like in "The Witcher 3: Wild Hunt" should done like "# The Witcher 3 \n\n ## Wild Hunt"
 */
