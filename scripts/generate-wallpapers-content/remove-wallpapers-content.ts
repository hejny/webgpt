#!/usr/bin/env ts-node
import chalk from 'chalk';
import commander from 'commander';
import { readFile, rm } from 'fs/promises';
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

removeWallpapersContent({ isCommited, parallel: parseInt(parallel) })
    .catch((error) => {
        console.error(chalk.bgRed(error.name));
        console.error(error);
        process.exit(1);
    })
    .then(() => {
        process.exit(0);
    });

async function removeWallpapersContent({ isCommited, parallel }: { isCommited: boolean; parallel: number }) {
    console.info(`🧾🗑  Removing wallpapers content`);

    // TODO: Use isParallel

    if (isCommited && !(await isWorkingTreeClean(process.cwd()))) {
        throw new Error(`Working tree is not clean`);
    }


    await forEachWallpaper({
        isShuffled: false,
        parallelWorksCount: parallel,
        logBeforeEachWork: 'contentPath',
        async makeWork({ metadataPath, contentPath }) {
            const content = await readFile(contentPath, 'utf-8');
            const title = extractTitleFromMarkdown(content);

            // TODO: [💵] DRY this checks
            if (title === null) {
                rm(contentPath);
                console.info(chalk.red(`🗑 Removing file because of missing title `));
                return;
            }

            if (title?.toLowerCase().includes('wallpaper')) {
                rm(contentPath);
                console.info(chalk.red(`🗑 Removing file because it contains "wallpaper" in title\n"${title}"`));
                return;
            }

            if (
                !(
                    /\#\#/.test(content) ||
                    /\`\`\`/.test(content) ||
                    /\*\*/.test(content) ||
                    /\_/.test(content) ||
                    /^-\s+/m.test(content)
                )
            ) {
                rm(contentPath);
                console.info(chalk.red(`🗑 Removing file because it has no structure`));
                return;
            }

            const font = content.match(/<!--font:(?<font>.*)-->/)?.groups?.font;
            if (!font || !FONTS.includes(font)) {
                // TODO: Try to fix the font
                rm(contentPath);
                console.info(chalk.red(`🗑 Removing file because it font is not in the allowed font list "${title}"`));
                return;
            }
        },
    });

    if (isCommited) {
        await commit(await getWallpapersDir(), `🧾🗑 Remove wallpapers content`);
    }

    console.info(`[ Done 🧾🗑  Removeing wallpapers content ]`);
}

/**
 * TODO: Do we want multiple levels of titles like in "The Witcher 3: Wild Hunt" should done like "# The Witcher 3 \n\n ## Wild Hunt"
 */
