#!/usr/bin/env ts-node

import chalk from 'chalk';
import commander from 'commander';
import { writeFile } from 'fs/promises';
import glob from 'glob-promise';
import { normalizeTo_snake_case } from 'n12';
import { basename, dirname, join } from 'path';
import { commit } from '../utils/autocommit/commit';
import { isWorkingTreeClean } from '../utils/autocommit/isWorkingTreeClean';
import { generateImport } from '../utils/generateImport';
import { prettify } from '../utils/prettify';

if (process.cwd() !== join(__dirname, '../..')) {
    console.error(chalk.red(`CWD must be root of the project`));
    process.exit(1);
}

const program = new commander.Command();
program.option('--commit', `Autocommit changes`);
program.parse(process.argv);
const { commit: isCommited } = program.opts();

generatePatternsLibrary({ isCommited })
    .catch((error) => {
        console.error(chalk.bgRed(error.name));
        console.error(error);
        process.exit(1);
    })
    .then(() => {
        process.exit(0);
    });

async function generatePatternsLibrary({ isCommited }: { isCommited: boolean }) {
    console.info(`🖼️  Generating patterns library`);

    if (isCommited && !(await isWorkingTreeClean(process.cwd()))) {
        throw new Error(`Working tree is not clean`);
    }

    const patternsDir = join(process.cwd(), 'public/patterns');
    const indexFilePath = join(patternsDir, 'index.ts');

    const patterns = (
        await glob(join(patternsDir, '*.png' /* <- TODO: Maybe do not hardcode PNGs */).split('\\').join('/'))
    ).map((entityPath, index) => {
        const entityName =
            normalizeTo_snake_case(basename(entityPath)) + '_' + index; /* <- TODO: Probbably some beter name */
        return { entityName, entityPath };
    }); /*  TODO: Consistent order> .sort(()=>{

    }) */

    const indexFileContent = await prettify(`

            /**
             * 🏭 GENERATED WITH 🖼️ Generate patterns library
             * ⚠️ Warning: Do not edit by hand, all changes will be lost on next execution!
             */
        
            ${patterns.map((options) => generateImport({ ...options, itselfPath: indexFilePath })).join('\n')}

            
            export const generated_patterns = [${patterns.map(({ entityName }) => entityName).join(',')}];
        `);

    await writeFile(indexFilePath, indexFileContent, 'utf-8');

    if (isCommited) {
        await commit(dirname(patternsDir), `🖼️  Generate patterns library`);
    }

    console.info(`[ Done 🖼️  Generating patterns library ]`);
}

/**
 * TODO: Maybe use getMidjourneyLink from batch-froject-editor
 * TODO: Persistency and uniqueness of the names
 */
