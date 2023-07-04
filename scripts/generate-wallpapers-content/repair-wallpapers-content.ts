#!/usr/bin/env ts-node

import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import chalk from 'chalk';
import commander from 'commander';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import spaceTrim from 'spacetrim';
import { forTime } from 'waitasecond';
import { FONTS, MAX_CHARS_IN_TITLE, OPENAI_API_KEY } from '../../config';
import { extractTitleFromContent } from '../../src/utils/content/extractTitleFromContent';
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
program.option('--repair-fonts', `Fix fonts`, false);
program.option('--repair-title', `Fix title lenght`, false);
program.option('--parallel <numbers>', `Run N promises in parallel`, '1');
program.parse(process.argv);
const { commit: isCommited, repairFonts, repairTitle, parallel } = program.opts();

repairWallpapersContent({
    isCommited,
    isRepairingFonts: repairFonts,
    isRepairingTitle: repairTitle,
    parallel: parseInt(parallel),
})
    .catch((error) => {
        console.error(chalk.bgRed(error.name));
        console.error(error);
        process.exit(1);
    })
    .then(() => {
        process.exit(0);
    });

async function repairWallpapersContent({
    isCommited,
    isRepairingFonts,
    isRepairingTitle,
    parallel,
}: {
    isCommited: boolean;
    isRepairingFonts: boolean;
    isRepairingTitle: boolean;
    parallel: number;
}) {
    console.info(`🧾🩹  Repairing wallpapers content`);

    // TODO: Use isParallel

    if (isCommited && !(await isWorkingTreeClean(process.cwd()))) {
        throw new Error(`Working tree is not clean`);
    }

    const importDynamic = new Function('modulePath', 'return import(modulePath)');
    const { ChatGPTAPI, ChatGPTError } = await importDynamic('chatgpt');
    const chatGptApi = new ChatGPTAPI({
        apiKey: OPENAI_API_KEY!,
        completionParams: {
            temperature: 0.5,
            top_p: 0.8,
        },
    });

    const usedFonts: Record<string, number> = {};

    await forEachHardcodedWallpaper({
        isShuffled: false,
        parallelWorksCount: parallel,
        logBeforeEachWork: 'contentFilePath',
        async makeWork({ metadataFilePath: metadataFilePath, contentFilePath }) {
            async function askGpt(message: string): Promise<string> {
                message = spaceTrim(message);

                try {
                    const gptResponseForContent = await chatGptApi.sendMessage(message);
                    return gptResponseForContent.text;
                } catch (error) {
                    if (!(error instanceof ChatGPTError)) {
                        throw error;
                    }

                    console.warn(`⚠️  ${(error as Error).message}`);
                    console.warn(`💤  Retrying in 1 minute`);

                    await forTime(1000 * 60);

                    return askGpt(message);
                }
            }

            let content = await readFile(contentFilePath, 'utf-8');
            const originalContent = content;
            let title = extractTitleFromContent(content);

            if (isRepairingFonts) {
                let font =
                    content.match(/<!--font:(?<font>.*)-->/)?.groups
                        ?.font; /* <- TODO: There can be more fonts in document */
                if (font && !FONTS.includes(font)) {
                    const existingFont = FONTS.find((existingFont) => font!.includes(existingFont));

                    if (existingFont) {
                        content = content.replace(font, existingFont);
                        font = existingFont;
                    }
                }

                font = font ?? 'Unknown';
                usedFonts[font] = usedFonts[font] ?? 0;
                usedFonts[font]++;
            }

            if (isRepairingTitle) {
                if (title && title.trim().length > MAX_CHARS_IN_TITLE) {
                    let titleShort = await askGpt(`
                        Make following title shorter:
                        - Use as few characters as possible
                        - Use maximum 3 words
                        - If needed, create new words
                        
                        Example:
                        Working with modern tools in space => Space tools
                        Ocean Vibes: Bringing the Calming Energy of the Ocean to You => Ocean Vibes
                        Futuristic City for Creatives => Futuristic City
                        Elevate Your Tech Website with AI Buzzwords => Aibuzz
                        Space Odyssey: Explore the Wonders of the Universe => Space Odyssey
                        Tech & Design for Better Future => Tech & Design
                        Exploring the Unknown: Ainautes in High-Tech Suits => Ainautes
                        Discover the Wonders of the Universe with Our Telescope Backgrounds => Telescope

                        Your work:
                        ${title} =>
                    `);
                    // TODO: !! Search if titleShort contains words like "title" or "short" and if so, ask again

                    // Note: Remove the quotes from titleShort
                    titleShort = titleShort.replace(/^"(.*)"$/, '$1');

                    // Note: Remove the dot from the end of the titleShort
                    titleShort = titleShort.replace(/\.$/, '');

                    if (titleShort.trim().length < title.trim().length) {
                        content = content.replace(title, titleShort);
                    }

                    if (titleShort.trim().length > MAX_CHARS_IN_TITLE) {
                        console.warn(
                            chalk.bgYellow(` ⚠️  Title is too long after the summarization`) +
                                chalk.yellow(`\n title:${title}\n titleShort:${titleShort}`),
                        );
                    }
                }
            }

            if (content !== originalContent) {
                console.info(chalk.green(` 🩹  Repair the file`));
                await writeFile(contentFilePath, content, 'utf-8');
            }
        },
    });

    if (isCommited) {
        await commit(
            await getHardcodedWallpapersDir(),
            `🧾🩹 Repair wallpapers ${[isRepairingFonts && 'fonts', isRepairingTitle && 'titles']
                .filter((part) => part)
                .join(' and ')}`,
        );
    }

    if (isRepairingFonts) {
        console.info(
            `🔤 Using fonts:\n${Object.entries(usedFonts)
                .map(([font, count]) => `• ${count}x ${font}`)
                .join('\n')}`,
        );
    }

    console.info(`[ Done 🧾🩹  Repairing wallpapers content ]`);
}

/**
 * TODO: !! --add-wbr task + add it to the terminals + do not count <wbr> as a character + <wbr> vs <wbr/>
 * TODO: Do we want multiple levels of titles like in "The Witcher 3: Wild Hunt" should done like "# The Witcher 3 \n\n ## Wild Hunt"
 */
