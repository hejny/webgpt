#!/usr/bin/env ts-node

import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

import { promptTemplatePipelineStringToJson } from '@promptbook/core';
import chalk from 'chalk';
import commander from 'commander';
import { readFile, writeFile } from 'fs/promises';
import glob from 'glob-promise';
import { join } from 'path';
import { commit } from '../utils/autocommit/commit';
import { isWorkingTreeClean } from '../utils/autocommit/isWorkingTreeClean';

if (process.cwd() !== join(__dirname, '../..')) {
    console.error(chalk.red(`CWD must be root of the project`));
    process.exit(1);
}

const PTBK_SAMPLES_DIR = join(process.cwd(), 'src/ai/text-to-text/prompt-templates/lib/samples');

const program = new commander.Command();
program.option('--commit', `Autocommit changes`, false);
program.parse(process.argv);
const { commit: isCommited } = program.opts();

generateSampleJsons({ isCommited })
    .catch((error) => {
        console.error(chalk.bgRed(error.name));
        console.error(error);
        process.exit(1);
    })
    .then(() => {
        process.exit(0);
    });

async function generateSampleJsons({ isCommited }: { isCommited: boolean }) {
    console.info(`🏭🌠  Generate JSONs from PTP samples`);

    if (isCommited && !(await isWorkingTreeClean(process.cwd()))) {
        throw new Error(`Working tree is not clean`);
    }

    for (const ptbkMarkdownFilePath of await glob(join(PTBK_SAMPLES_DIR, '*.ptbk.md').split('\\').join('/'))) {
        console.info(`🌠  Generating JSON from ${ptbkMarkdownFilePath}`);
        const ptbkMarkdown = await readFile(ptbkMarkdownFilePath, 'utf-8');

        try {
            const ptbkJson = promptTemplatePipelineStringToJson(ptbkMarkdown as any /* <- TODO: Remove any */);
            const ptbkJsonFilePath = ptbkMarkdownFilePath.replace(/\.ptbk\.md$/, '.ptbk.json');
            await writeFile(ptbkJsonFilePath, JSON.stringify(ptbkJson, null, 4) + '\n');
        } catch (error) {
            if (!(error instanceof Error)) {
                throw error;
            }

            console.info(chalk.bgGray('========================='));
            console.info(chalk.red(`Error in ${ptbkMarkdownFilePath}`));
            console.error(chalk.bgRed(error.name));
            console.error(error);
            console.info(chalk.bgGray('========================='));
        }
    }

    if (isCommited) {
        await commit(PTBK_SAMPLES_DIR, `🌠 Generate JSONs from PTP samples`);
    }

    console.info(`[ Done 🧾🗑  Removing wallpapers content ]`);
}

/**
 * TODO: Do we want multiple levels of titles like in "The Witcher 3: Wild Hunt" should done like "# The Witcher 3 \n\n ## Wild Hunt"
 */
