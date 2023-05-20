#!/usr/bin/env ts-node

import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import chalk from 'chalk';
import commander from 'commander';
import { readFile, writeFile } from 'fs/promises';
import { join, relative } from 'path';
import spaceTrim from 'spacetrim';
import { forTime } from 'waitasecond';
import { FONTS, OPENAI_API_KEY } from '../../config';
import { extractTitleFromMarkdown } from '../../src/utils/content/extractTitleFromMarkdown';
import { IWallpaperMetadata } from '../../src/utils/IWallpaper';
import { randomItem } from '../../src/utils/randomItem';
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
program.option('--commit', `Autocommit changes`, false);
program.option('--parallel <numbers>', `Run N promises in parallel`, '1');
program.parse(process.argv);
const { commit: isCommited, parallel } = program.opts();

generateWallpapersContent({ isCommited, parallel: parseInt(parallel) })
    .catch((error) => {
        console.error(chalk.bgRed(error.name));
        console.error(error);
        process.exit(1);
    })
    .then(() => {
        process.exit(0);
    });

async function generateWallpapersContent({ isCommited, parallel }: { isCommited: boolean; parallel: number }) {
    console.info(`🧾  Generating wallpapers content`);

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
            if (await isFileExisting(contentPath)) {
                console.info(`⏩ Content file does already exists`);
                return;
            }

            // TODO: !! Maybe parse + pass metadata in IWallpaperFiles
            const metadata = JSON.parse(await readFile(metadataPath, 'utf8')) as IWallpaperMetadata;

            const thread: Array<string> = [];
            let lastMessageId: string | undefined = undefined;
            async function askGpt(message: string, isContinuingConversation: boolean): Promise<string> {
                message = spaceTrim(message);
                thread.push(message);
                try {
                    const gptResponseForContent = await chatGptApi.sendMessage(message, {
                        parentMessageId: isContinuingConversation
                            ? lastMessageId
                            : undefined /* <- Note: This is not an ideal design pattern to magically keep state without passing through the consumer or making isolated classes BUT for this limited (one-consumer) usage its OK */,
                    });

                    lastMessageId = gptResponseForContent.id;

                    thread.push(gptResponseForContent.text);
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

            const contentPrompt = spaceTrim(createContentPromptTemplate().replace('🟦', metadata.prompt));
            let content = await askGpt(contentPrompt, false);

            for (let i = 0; i < 3; i++) {
                const title = extractTitleFromMarkdown(content);

                // TODO: [💵] DRY this checks
                if (title === null) {
                    const fixPropmt = `Content does not have heading, rewrite whole content.`;
                    content = await askGpt(fixPropmt, true);
                    continue;
                }

                if (title?.toLowerCase().includes('wallpaper')) {
                    const fixPropmt = `Heading should not include word "wallpaper". The website should not be about the wallpaper itself, wallpaper is just a related background, rewrite whole content.`;
                    content = await askGpt(fixPropmt, true);
                    continue;
                }

                /*
                Note: Doing this in repair script
                if (title.trim().length > MAX_CHARS_IN_TITLE) {
                    const fixPropmt = `Heading is too long, rewrite whole content.`;
                    content = await askGpt(fixPropmt, true);
                    continue;
                }
                */

                break;
            }

            // TODO: !!! Figure out best strategy to pick font
            /*/
            const fontPrompt = createFontPromptTemplate();
            const font = await askGpt(fontPrompt, true);
            /**/

            /**/
            const font = randomItem([...FONTS]);
            /**/

            await writeFile(
                contentPath,
                spaceTrim(
                    (block) => `

                    <!--font:${font}-->

                    ${block(content)}

                    <!--

                    ${block(thread.join('\n\n\n---\n\n\n'))}

                    -->
      
                `,
                ) + '\n',
                'utf8',
            );

            const usedFontsSize = Object.keys(usedFonts).length;
            usedFonts[font] = usedFonts[font] ?? 0;
            usedFonts[font]++;
            if (usedFontsSize !== usedFonts.size) {
                console.info(
                    `🔤 Using fonts:\n${Object.entries(usedFonts)
                        .map(([font, count]) => `• ${count}x ${font}`)
                        .join('\n')}`,
                );
            }

            console.info(`💾 ${relative(process.cwd(), contentPath).split('\\').join('/')}`);
        },
    });

    if (isCommited) {
        await commit(await getWallpapersDir(), `🧾 Generate wallpapers content`);
    }

    console.info(
        `🔤 Using fonts:\n${Object.entries(usedFonts)
            .map(([font, count]) => `• ${count}x ${font}`)
            .join('\n')}`,
    );

    console.info(`[ Done 🧾  Generating wallpapers content ]`);
}

function createContentPromptTemplate() {
    return randomItem(
        `
            Write me content for website with wallpaper which alt text is:

            "🟦"

            The name/title of the page should not be 1:1 copy of the alt text but rather a real content of the website which is using this wallpaper.

            - Use markdown format 
            - Start with heading
            - Heading should be short and concise
            - The content should look like a real website 
            - The website should not be about the wallpaper, wallpaper is just a related background
            - Heading should be contain work "wallpaper" or "background"
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
    );
}

function createFontPromptTemplate() {
    return spaceTrim(
        (block) =>
            `
                Write me a Google font which is best fitting for the website.

                Pick from the list:
                ${block(
                    [...FONTS]
                        .sort(() => Math.random() - 0.5)
                        .map((fontName) => `- ${fontName}`)
                        .join('\n'),
                )}


                Write just the font name nothing else.

            
            `,
    );
}

/**
 * TODO: [🔎] Write tags/keywords for each website to search through @see https://ibb.co/2Fy7kN4
 * TODO: [🧬] In future multiple text variants for each paragraph
 * TODO: Maybe use getMidjourneyLink from batch-froject-editor
 * TODO: Persistency and uniqueness of the names
 */
