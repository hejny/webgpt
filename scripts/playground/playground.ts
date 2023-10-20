#!/usr/bin/env ts-node

import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

import chalk from 'chalk';
import { join } from 'path';
import { OPENAI_API_KEY, SYSTEM_AUTHOR_ID } from '../../config';
import { SupabaseLoggerWrapperOfExecutionTools } from '../../src/ai/text-to-text/prompt-templates/lib/src/execution/plugins/logger/SupabaseLoggerWrapperOfExecutionTools';
import { OpenAiExecutionTools } from '../../src/ai/text-to-text/prompt-templates/lib/src/execution/plugins/openai/OpenAiExecutionTools';
import { ptpLibrary } from '../../src/ai/text-to-text/prompt-templates/ptpLibrary';

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

    const inputParams = {
        title: `Kočky`,
        assigment: `Web o kočičím hotelu v Praze, otevřeno 24/7`,
        /*
        title: `Cats`,
        assigment: `Web about cat hotel in Prague old town, Open 24/7`,
        */
    };
    const outputParams = await ptpLibrary.createExecutor(
        'writeWebsiteContent',
        new SupabaseLoggerWrapperOfExecutionTools(new OpenAiExecutionTools(OPENAI_API_KEY!), SYSTEM_AUTHOR_ID),
    )(inputParams, (taskProgress) => {
        console.info({ taskProgress });
    });
    console.info({ inputParams, outputParams });

    console.info(`[ Done 🧸  Playground ]`);
}
