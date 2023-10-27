#!/usr/bin/env ts-node

import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

import chalk from 'chalk';
import commander from 'commander';
import { readFile, writeFile } from 'fs/promises';
import glob from 'glob-promise';
import { join } from 'path';
import { promptTemplatePipelineStringToJson } from '../../src/ai/text-to-text/prompt-templates/lib/src/conversion/promptTemplatePipelineStringToJson';
import { commit } from '../utils/autocommit/commit';
import { isWorkingTreeClean } from '../utils/autocommit/isWorkingTreeClean';

if (process.cwd() !== join(__dirname, '../..')) {
    console.error(chalk.red(`CWD must be root of the project`));
    process.exit(1);
}

const PTP_SAMPLES_DIR = join(process.cwd(), 'src/ai/text-to-text/prompt-templates/lib/samples');

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

    for (const ptpMarkdownFilePath of await glob(join(PTP_SAMPLES_DIR, '*.ptp.md').split('\\').join('/'))) {
        console.info(`🌠  Generating JSON from ${ptpMarkdownFilePath}`);
        const ptpMarkdown = await readFile(ptpMarkdownFilePath, 'utf-8');

        try {
            const ptpJson = promptTemplatePipelineStringToJson(ptpMarkdown as any /* <- TODO: Remove any */);
            const ptpJsonFilePath = ptpMarkdownFilePath.replace(/\.ptp\.md$/, '.ptp.json');
            await writeFile(ptpJsonFilePath, JSON.stringify(ptpJson, null, 4) + '\n');
        } catch (error) {
            if (!(error instanceof Error)) {
                throw error;
            }

            console.info(chalk.bgGray('========================='));
            console.info(chalk.red(`Error in ${ptpMarkdownFilePath}`));
            console.error(chalk.bgRed(error.name));
            console.error(error);
            console.info(chalk.bgGray('========================='));
        }
    }

    if (isCommited) {
        await commit(PTP_SAMPLES_DIR, `🌠 Generate JSONs from PTP samples`);
    }

    console.info(`[ Done 🧾🗑  Removing wallpapers content ]`);
}

/**
 * TODO: Do we want multiple levels of titles like in "The Witcher 3: Wild Hunt" should done like "# The Witcher 3 \n\n ## Wild Hunt"
 */
