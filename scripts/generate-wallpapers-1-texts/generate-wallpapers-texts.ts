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
import { IWallpaperMetadata, IWallpaperTexts } from '../../assets/ai/wallpaper/IWallpaperComponent';
import { OPENAI_API_KEY } from '../../config';
import { commit } from '../utils/autocommit/commit';
import { isWorkingTreeClean } from '../utils/autocommit/isWorkingTreeClean';
import { forPlay } from '../utils/forPlay';
import { isFileExisting } from '../utils/isFileExisting';

// TODO: !! forEachWallpaper+forEachWallpaperInParallel Extract to common utils
// TODO: !! forEachWallpaper+forEachWallpaperInParallel Use in every wallpaper script
// TODO: !! forEachWallpaper+forEachWallpaperInParallel New wallpaper structure

interface IWallpaperFiles {
    metadataPath: string;
    // TODO: colorStatsPath: string;
    textsPath: string;
}

function getWallpapersDir() {
    return join(process.cwd(), 'assets', 'ai', 'wallpaper', 'gallery');
}

async function forEachWallpaper(callback: (wallpeperFiles: IWallpaperFiles) => Promise<void>): Promise<void> {
    const wallpapersDir = getWallpapersDir();
    const wallpapersPaths = await glob(
        join(wallpapersDir, '*.png' /* <- TODO: !!! Use here metadata files */).split('\\').join('/'),
    );

    const stats = {
        total: wallpapersPaths.length,
        done: -1,
        lastTime: moment(),
        startTime: moment(),
    };
    for (const wallpaperPath of wallpapersPaths) {
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
        const textsPath = wallpaperPath.replace(/\.png$/, '.texts.json');

        if (await isFileExisting(textsPath)) {
            console.info(`⏩ Texts file does already exists`);
            continue;
        }

        if (!(await isFileExisting(metadataPath))) {
            throw new Error(`Metadata file does not exist "${metadataPath}"`);
        }
    }
}

// TODO: async function forEachWallpaperInParallel(callback:(wallpeperFiles: IWallpaperFiles)=>Promise<void>): Promise<void>{}

if (process.cwd() !== join(__dirname, '../..')) {
    console.error(chalk.red(`CWD must be root of the project`));
    process.exit(1);
}

const program = new commander.Command();
program.option('--commit', `Autocommit changes`);
program.option('--parallel', `Run in multiple promises in parallel`);
program.parse(process.argv);
const { commit: isCommited, parallel: isParallel } = program.opts();

generateWallpapersTexts({ isCommited, isParallel })
    .catch((error) => {
        console.error(chalk.bgRed(error.name));
        console.error(error);
        process.exit(1);
    })
    .then(() => {
        process.exit(0);
    });

async function generateWallpapersTexts({ isCommited, isParallel }: { isCommited: boolean; isParallel: boolean }) {
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

    await forEachWallpaper(async ({ metadataPath, textsPath }) => {
        const metadata = JSON.parse(await readFile(metadataPath, 'utf8')) as IWallpaperMetadata;

        let lastMessageId: string | undefined = undefined;
        async function askGpt(message: string, isContinuingConversation: boolean): Promise<string> {
            try {
                const gptResponseForContent = await chatGptApi.sendMessage(spaceTrim(message), {
                    parentMessageId: isContinuingConversation
                        ? lastMessageId
                        : undefined /* <- Note: [5] This is not an ideal design pattern to magically keep state without passing through the consumer or making isolated classes BUT for this limited (one-consumer) usage its OK */,
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

        const texts = { title: '', content: '' } satisfies IWallpaperTexts;

        /**/
        const title = spaceTrim(
            (block) => `

                Write me short (max 3 words) title for website with main wallpaper that is:

                "${block(metadata.prompt)}"

                The title should not be 1:1 copy of the prompt but rather a short description of the website which is using this wallpaper.
            
            `,
        );
        texts.title = await askGpt(title, false);
        /**/

        /**/
        const content = spaceTrim(`

            Write me some content for this website in markdown format.
            The content should be a short description of the website which is using this wallpaper.

            - You can include UTF-8 emojis
            - You can use formatting like **bold** or _italic_
            - Do not describe the wallpaper itself, but rather the website which is using it.
            - Do not start with any title - title will be included automatically
            - Do not include links
            - Do not include images
        
        `);
        texts.content = await askGpt(content, true);
        /**/

        await writeFile(textsPath, JSON.stringify({ ...texts, prompts: { title, content } }, null, 4) + '\n', 'utf8');
        console.info(`💾 ${relative(process.cwd(), textsPath).split('\\').join('/')}`);
    });

    if (isCommited) {
        await commit(getWallpapersDir(), `🧾 Generate wallpapers texts`);
    }

    console.info(`[ Done 🧾  Generating wallpapers texts ]`);
}

/**
 * TODO: Maybe use getMidjourneyLink from batch-froject-editor
 * TODO: Persistency and uniqueness of the names
 */
