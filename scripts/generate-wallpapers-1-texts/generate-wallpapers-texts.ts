#!/usr/bin/env ts-node

import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import chalk from 'chalk';
import commander from 'commander';
import { readFile, writeFile } from 'fs/promises';
import glob from 'glob-promise';
import moment from 'moment';
import { join, relative } from 'path';
import spaceTrim from 'spacetrim';
import { forTime } from 'waitasecond';
import { IWallpaperMetadata } from '../../assets/ai/wallpaper/IWallpaperComponent';
import { OPENAI_API_KEY } from '../../config';
import { commit } from '../utils/autocommit/commit';
import { isWorkingTreeClean } from '../utils/autocommit/isWorkingTreeClean';
import { forPlay } from '../utils/forPlay';
import { isFileExisting } from '../utils/isFileExisting';
import { randomItem } from '../utils/randomItem';

// TODO: !! forEachWallpaper+forEachWallpaperInParallel Extract to common utils
// TODO: !! forEachWallpaper+forEachWallpaperInParallel Use in every wallpaper script
// TODO: !! forEachWallpaper+forEachWallpaperInParallel New wallpaper structure

interface IWallpaperFiles {
    // !!! metadataFilePath, contentFilePath,...

    metadataPath: string;
    // TODO: colorStatsPath: string;
    contentPath: string;
}

function getWallpapersDir() {
    return join(process.cwd(), 'assets', 'ai', 'wallpaper', 'gallery');
}

async function forEachWallpaper(options: {
    makeWork(wallpeperFiles: IWallpaperFiles): Promise<void>;
    parallel: number;
}): Promise<void> {
    const { makeWork, parallel } = options;

    const wallpapersDir = getWallpapersDir();
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

// TODO: async function forEachWallpaperInParallel(callback:(wallpeperFiles: IWallpaperFiles)=>Promise<void>): Promise<void>{}

if (process.cwd() !== join(__dirname, '../..')) {
    console.error(chalk.red(`CWD must be root of the project`));
    process.exit(1);
}

const program = new commander.Command();
program.option('--commit', `Autocommit changes`, false);
program.option('--parallel <numbers>', `Run N promises in parallel`, '1');
program.parse(process.argv);
const { commit: isCommited, parallel } = program.opts();

// TODO: !! Rename to generateWallpapersContent
generateWallpapersTexts({ isCommited, parallel: parseInt(parallel) })
    .catch((error) => {
        console.error(chalk.bgRed(error.name));
        console.error(error);
        process.exit(1);
    })
    .then(() => {
        process.exit(0);
    });

async function generateWallpapersTexts({ isCommited, parallel }: { isCommited: boolean; parallel: number }) {
    console.info(`🧾  Generating wallpapers texts`);

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

    await forEachWallpaper({
        parallel,
        async makeWork({ metadataPath, contentPath }) {
            if (await isFileExisting(contentPath)) {
                console.info(`⏩ Content file does already exists`);
                return;
            }

            // TODO: !! Maybe parse + pass metadata in IWallpaperFiles
            const metadata = JSON.parse(await readFile(metadataPath, 'utf8')) as IWallpaperMetadata;

            let lastMessageId: string | undefined = undefined;
            async function askGpt(message: string, isContinuingConversation: boolean): Promise<string> {
                try {
                    const gptResponseForContent = await chatGptApi.sendMessage(spaceTrim(message), {
                        parentMessageId: isContinuingConversation
                            ? lastMessageId
                            : undefined /* <- Note: This is not an ideal design pattern to magically keep state without passing through the consumer or making isolated classes BUT for this limited (one-consumer) usage its OK */,
                    });

                    lastMessageId = gptResponseForContent.id;
                    return gptResponseForContent.text;
                } catch (error) {
                    if (!(error instanceof ChatGPTError)) {
                        throw error;
                    }

                    console.warn(`⚠️  ${(error as Error).message}`);
                    console.warn(`💤  Retrying in 1 minute`);

                    await forTime(1000 * 60);

                    return askGpt(message, isContinuingConversation);
                }
            }

            // const texts = { title: '', content: '' } satisfies IWallpaperTexts;

            /**/
            const contentPrompt = spaceTrim(randomPromptTemplate().replace('🟦', metadata.prompt));
            const content = await askGpt(contentPrompt, false);
            /**/

            const font = await askGpt(
                'Write me a Google font which is best fitting for the website. Write just the font name nothing else.',
                true,
            );

            await writeFile(
                contentPath,
                spaceTrim(
                    (block) => `

                    <!--
                    ${block(contentPrompt)}
                    -->

                    <!--font:${font}-->

                    ${block(content)}
      
                `,
                ) + '\n',
                'utf8',
            );
            console.info(`💾 ${relative(process.cwd(), contentPath).split('\\').join('/')}`);
        },
    });

    if (isCommited) {
        await commit(getWallpapersDir(), `🧾 Generate wallpapers texts`);
    }

    console.info(`[ Done 🧾  Generating wallpapers texts ]`);
}

function randomPromptTemplate() {
    return randomItem(
        `
            Write me markdown content of website with wallpaper:

            "🟦"

            The header of the page should not be copy of the text but rather a real content of the website which is using this wallpaper.

            - Feel free to use structure like headings, bullets, numbering, blockquotes, paragraphs, horizontal lines, etc.
            - You can use formatting like bold or _italic_
            - You can include UTF-8 emojis
            - Links should be only #hash anchors (and you can refer to the document itself)
            - Do not include images
        `,
        `
            Write me content for website with wallpaper which alt text is:

            "🟦"

            The name/title of the page should not be 1:1 copy of the alt text but rather a real content of the website which is using this wallpaper.

            - Use markdown format 
            - Start with the heading
            - The content should look like a real website 
            - Include real sections like references, contact, user stories, etc. use things relevant to the page purpose.
            - Feel free to use structure like headings, bullets, numbering, blockquotes, paragraphs, horizontal lines, etc.
            - You can use formatting like bold or _italic_
            - You can include UTF-8 emojis
            - Links should be only #hash anchors (and you can refer to the document itself)
            - Do not include images
        `,
        `
            Write me markdown content of website with wallpaper:

            "🟦"

            The header of the page should not be copy of the text but rather a real content of the website which is using this wallpaper.
        `,
        `
            Write me content for website with wallpaper "🟦"
        `,
    );
}

/**
 * TODO: Maybe use getMidjourneyLink from batch-froject-editor
 * TODO: Persistency and uniqueness of the names
 */
