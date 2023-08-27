#!/usr/bin/env ts-node

import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

import chalk from 'chalk';
import { join } from 'path';
// import { askChatGpt } from '../../src/ai/text-to-text/askChatGpt';
import OpenAI from 'openai';
import spaceTrim from 'spacetrim';
import { OPENAI_API_KEY } from '../../config';

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

    const openai = new OpenAI({
        apiKey: OPENAI_API_KEY!,
    });

    const completion = await openai.completions.create({
        model: 'davinci-002',
        // max_tokens: 1000,
        prompt: spaceTrim(`

            Following is markdown content of a webpage:

            # Urban Oasis

            > Embracing Nature Amidst the Cityscape


        `),
    });
    console.log({ completion }, completion.choices);

    console.info(`[ Done 🧸  Playground ]`);
}
