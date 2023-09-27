#!/usr/bin/env ts-node

import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

import chalk from 'chalk';
import { join } from 'path';
import {
    ptpLibrary_writeWebsiteContent_EntryParams,
    ptpLibrary_writeWebsiteContent_ResultParams,
} from '../../src/ai/text-to-text/prompt-templates/ptpLibrary';
import { ptpLibraryExecutor } from '../../src/ai/text-to-text/prompt-templates/ptpLibraryExecutor';

// import { ChatThread } from '../../src/ai/text-to-text/ChatThread';

if (process.cwd() !== join(__dirname, '../..')) {
    console.error(chalk.red(`CWD must be root of the project`));
    process.exit(1);
}

playground()
    .catch((error) => {
        console.error(chalk.bgRed(error.name));
        console.error(error);
        process.exit(1);
    })
    .then(() => {
        process.exit(0);
    });

async function playground() {
    console.info(`🧸  Playground`);

    // Do here stuff you want to test

    const entryParams = {
        title: `Kočky`,
        assigment: `Web o kočičím hotelu v Praze, otevřeno 24/7`,
        /*
        title: `Cats`,
        assigment: `Web about cat hotel in Prague old town, Open 24/7`,
        */
    };
    const resultParams = await ptpLibraryExecutor.executePtp<
        ptpLibrary_writeWebsiteContent_EntryParams,
        ptpLibrary_writeWebsiteContent_ResultParams
    >('writeWebsiteContent', entryParams);
    console.info({ entryParams, resultParams });

    console.info(`[ Done 🧸  Playground ]`);
}
