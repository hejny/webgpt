#!/usr/bin/env ts-node

import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

import chalk from 'chalk';
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

    console.log('--------------------');
    console.log(JSON.stringify(await lookupDomain(`towns.cz`), null, 4));
    console.log('--------------------');
    //========================================/

    console.info(`[ Done 🧸  Playground ]`);
}
