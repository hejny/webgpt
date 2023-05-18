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

    await forEachWallpaper({
        isShuffled: false,
        parallelWorksCount: parallel,
        logBeforeEachWork: 'contentPath',
        async makeWork({ metadataPath, contentPath }) {
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

            let content = await readFile(contentPath, 'utf-8');
            const originalContent = content;
            let title = extractTitleFromMarkdown(content);

            let font = content.match(/<!--font:(?<font>.*)-->/)?.groups?.font;
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

            if (title && title.trim().length > MAX_CHARS_IN_TITLE) {
                const titleSummary = await askGpt(`
                    Summarize: ${title}
                `);

                if (titleSummary.trim().length <= MAX_CHARS_IN_TITLE) {
                    content = content.replace(title, titleSummary);
                } else {
                    console.warn(
                        chalk.bgYellow(` ⚠️  Title is too long after the summarization`) +
                            chalk.yellow(`title:${title}\ntitleSummary:${titleSummary}`),
                    );
                }
            }

            if (content !== originalContent) {
                console.info(chalk.green(` 🩹  Repair the file`));
                await writeFile(contentPath, content, 'utf-8');
            }
        },
    });

    if (isCommited) {
        await commit(await getWallpapersDir(), `🧾🩹 Repair wallpapers content`);
    }

    console.info(
        `🔤 Using fonts:\n${Object.entries(usedFonts)
            .map(([font, count]) => `• ${count}x ${font}`)
            .join('\n')}`,
    );

    console.info(`[ Done 🧾🩹  Repairing wallpapers content ]`);
}

/**
 * TODO: Do we want multiple levels of titles like in "The Witcher 3: Wild Hunt" should done like "# The Witcher 3 \n\n ## Wild Hunt"
 */
