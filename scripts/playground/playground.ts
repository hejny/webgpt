#!/usr/bin/env ts-node

import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

import chalk from 'chalk';
import OpenAI from 'openai';
import { join } from 'path';
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
    //========================================>

    const openai = new OpenAI({
        apiKey: OPENAI_API_KEY,
    });

    const generatedImage = await openai.images.generate({
        model: 'dall-e-3',
        prompt: 'A dog',
    });

    console.log(generatedImage);
    //========================================/

    console.info(`[ Done 🧸  Playground ]`);
}
