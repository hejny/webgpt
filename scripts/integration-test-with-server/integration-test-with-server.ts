#!/usr/bin/env ts-node

import chalk from 'chalk';
import { ChildProcessWithoutNullStreams, spawn } from 'child_process';
import fetch from 'isomorphic-fetch';
import { join } from 'path';
import { execCommand } from '../utils/execCommand/execCommand';
import { forCondition } from './forCondition';

if (process.cwd() !== join(__dirname, '../..')) {
    console.error(chalk.red(`CWD must be root of the project`));
    process.exit(1);
}

integrationTestWithServer()
    .catch((error) => {
        console.error(chalk.bgRed(error.name));
        console.error(error);
        console.error(chalk.bgRed(` Integration tests failed `));
        process.exit(1);
    })
    .then(() => {
        console.error(chalk.bgGreen(` Integration tests passed `));
        process.exit(0);
    });

async function integrationTestWithServer() {
    console.info(`🧪  Integration tests + server`);

    const isServerRunning = async () =>
        await fetch('http://localhost:4444/' /* <- TODO: DRY */)
            .then((response) => response.statusText === 'OK')
            .catch(() => false);

    let serverProcess: ChildProcessWithoutNullStreams | null;

    if (await isServerRunning()) {
        console.info(chalk.gray(`Server is running`));
        serverProcess = null;
    } else {
        console.info(chalk.magenta(`Server is NOT running, starting...`));

        // TODO: Following lines should be DRY with execCommand - probbably export some class RunningProcess
        let command = 'npm';

        if (/^win/.test(process.platform) && ['npm', 'npx'].includes(command)) {
            command = `${command}.cmd`;
        }

        serverProcess = spawn(command, ['run', 'dev'] /* <- TODO: Maybe build + start */, { cwd: process.cwd() });
        serverProcess.stdout.on('data', (stdout) => {
            console.info(chalk.gray('server> ' + stdout.toString()));
        });

        serverProcess.stderr.on('data', (stderr) => {
            console.warn(chalk.gray('server> ' + stderr.toString()));
        });

        await forCondition(isServerRunning);

        console.info(chalk.green(`Server is now running`));
    }

    await execCommand('npm run test-integration-without-server');

    if (serverProcess) {
        console.info(chalk.magenta(`Stopping the server`));
        serverProcess.kill();
    }
}

/**
 * TODO: Use in Github action
 * TODO: Cleanup cy dir
 */
