#!/usr/bin/env ts-node

import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import chalk from 'chalk';
import commander from 'commander';
import { readFile, writeFile } from 'fs/promises';
import glob from 'glob-promise';
import moment from 'moment';
import { dirname, join, relative } from 'path';
import spaceTrim from 'spacetrim';
import { IWallpaperMetadata, IWallpaperTexts } from '../../assets/ai/wallpaper/IWallpaperComponent';
import { OPENAI_API_KEY } from '../../config';
import { commit } from '../utils/autocommit/commit';
import { isWorkingTreeClean } from '../utils/autocommit/isWorkingTreeClean';
import { forPlay } from '../utils/forPlay';
import { isFileExisting } from '../utils/isFileExisting';

if (process.cwd() !== join(__dirname, '../..')) {
    console.error(chalk.red(`CWD must be root of the project`));
    process.exit(1);
}

const program = new commander.Command();
program.option('--commit', `Autocommit changes`);
program.parse(process.argv);
const { commit: isCommited } = program.opts();

generateWallpapersTexts({ isCommited })
    .catch((error) => {
        console.error(chalk.bgRed(error.name));
        console.error(error);
        process.exit(1);
    })
    .then(() => {
        process.exit(0);
    });

async function generateWallpapersTexts({ isCommited }: { isCommited: boolean }) {
    console.info(`🧾  Generating wallpapers texts`);

    if (isCommited && !(await isWorkingTreeClean(process.cwd()))) {
        throw new Error(`Working tree is not clean`);
    }

    /**/
    const importDynamic = new Function('modulePath', 'return import(modulePath)');
    const { ChatGPTAPI } = await importDynamic('chatgpt');
    const chatGptApi = new ChatGPTAPI({
        apiKey: OPENAI_API_KEY!,
        completionParams: {
            temperature: 0.5,
            top_p: 0.8,
        },
    });
    /**/

    const wallpapersDir = join(process.cwd(), 'assets', 'ai', 'wallpaper', 'gallery');
    const wallpapersPaths = await glob(
        join(wallpapersDir, '*.png' /* <- TODO: Maybe do not hardcode PNGs */).split('\\').join('/'),
    );

    const stats = {
        total: wallpapersPaths.length,
        done: -1,
        startTime: moment(),
    };
    for (const wallpaperPath of wallpapersPaths) {
        await forPlay();

        stats.done++;
        const statsTotalString = `${stats.done}/${stats.total}`;
        const statsPercentString = `${Math.round((stats.done / wallpapersPaths.length) * 100)}%`;
        const elapsedTime = moment().diff(stats.startTime);
        const estimatedTime = (elapsedTime / stats.done) * (stats.total - stats.done);
        const statsTimeEstimateString =
            estimatedTime === Infinity ? '' : `${moment.duration(estimatedTime).humanize()} left`;
        const statsString = `${statsPercentString} ${statsTotalString} ${statsTimeEstimateString}`;

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

        const metadata = JSON.parse(await readFile(metadataPath, 'utf8')) as IWallpaperMetadata;

        const texts = { title: '', content: '' } satisfies IWallpaperTexts;

        /**/
        const gptResponseForTitle = await chatGptApi.sendMessage(
            spaceTrim(
                (block) => `

                    Write me short (max 3 words) title for website with main wallpaper that is:

                    "${block(metadata.prompt)}"
                
                `,
            ),
        );
        texts.title = gptResponseForTitle.text;
        /**/

        /**/
        const gptResponseForContent = await chatGptApi.sendMessage(
            spaceTrim(
                (block) => `

                    Write me some content for this website in markdown format.
                
                `,
            ),
            { parentMessageId: gptResponseForTitle.id },
        );
        texts.content = gptResponseForContent.text;
        /**/

        await writeFile(textsPath, JSON.stringify(texts, null, 4) + '\n', 'utf8');
        console.info(`💾 ${relative(process.cwd(), textsPath).split('\\').join('/')}`);
    }

    if (isCommited) {
        await commit(dirname(wallpapersDir), `🧾  Generate wallpapers texts`);
    }

    console.info(`[ Done 🧾  Generating wallpapers texts ]`);
}

/**
 * TODO: Maybe use getMidjourneyLink from batch-froject-editor
 * TODO: Persistency and uniqueness of the names
 */
