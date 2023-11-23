#!/usr/bin/env ts-node

import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

import chalk from 'chalk';
import commander from 'commander';
import { readFile, rm } from 'fs/promises';
import { join } from 'path';
import { FONTS } from '../../config';
import { extractTitleFromContent } from '../../src/utils/content/extractTitleFromContent';
import { removeContentComments } from '../../src/utils/content/removeContentComments';
import { commit } from '../utils/autocommit/commit';
import { isWorkingTreeClean } from '../utils/autocommit/isWorkingTreeClean';
import { forEachHardcodedWallpaper } from '../utils/hardcoded-wallpaper/forEachHardcodedWallpaper';
import { getHardcodedWallpapersDir } from '../utils/hardcoded-wallpaper/getHardcodedWallpapersDir';

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

    await forEachHardcodedWallpaper({
        isShuffled: false,
        parallelWorksCount: parallel,
        logBeforeEachWork: 'contentFilePath',
        async makeWork({ metadataFilePath, contentFilePath }) {
            let content = await readFile(contentFilePath, 'utf-8');
            const font =
                content.match(/<!--font:(?<font>.*)-->/)?.groups
                    ?.font; /* <- TODO: There can be more fonts in document */
            content = removeContentComments(content);
            const title = extractTitleFromContent(content);

            // TODO: [💵] DRY this checks
            if (title === null) {
                rm(contentFilePath);
                console.info(chalk.red(`🗑 Removing file because of missing title `));
                return;
            }

            for (const bannedWord of ['wallpaper', 'background', 'welcome', 'desktop']) {
                if (title?.toLowerCase().includes(bannedWord)) {
                    await rm(contentFilePath);
                    console.info(chalk.red(`🗑 Removing file because it contains "${bannedWord}" in title\n"${title}"`));
                    return;
                }
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
                await rm(contentFilePath);
                console.info(chalk.red(`🗑 Removing file because it has no structure`));
                return;
            }

            if (!font || !FONTS.map(({ fontFamily }) => fontFamily).includes(font)) {
                await rm(contentFilePath);
                console.info(chalk.red(`🗑 Removing file because it font is not in the allowed font list "${title}"`));
                return;
            }
        },
    });

    if (isCommited) {
        await commit(await getHardcodedWallpapersDir(), `🧾🗑 Remove wallpapers content`);
    }

    console.info(`[ Done 🧾🗑  Removing wallpapers content ]`);
}

/**
 * TODO: Do we want multiple levels of titles like in "The Witcher 3: Wild Hunt" should done like "# The Witcher 3 \n\n ## Wild Hunt"
 */
