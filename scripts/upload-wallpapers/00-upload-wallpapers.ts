#!/usr/bin/env ts-node

import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

import chalk from 'chalk';
import { join } from 'path';
import { getSupabaseForServer } from '../../src/utils/supabase/getSupabaseForServer';
import { getHardcodedWallpapers } from '../utils/hardcoded-wallpaper/getHardcodedWallpapers';

if (process.cwd() !== join(__dirname, '../..')) {
    console.error(chalk.red(`CWD must be root of the project`));
    process.exit(1);
}

uploadWallpapers()
    .catch((error) => {
        console.error(chalk.bgRed(error.name));
        console.error(error);
        process.exit(1);
    })
    .then(() => {
        process.exit(0);
    });

async function uploadWallpapers() {
    console.info(`🔼  Upload wallpapers`);

    for (const wallpaper of await getHardcodedWallpapers()) {
        try {
            const selectResult = await getSupabaseForServer().from('Wallpaper').select('*').eq('id', wallpaper.id);

            if (selectResult && selectResult.data && selectResult.data.length > 0) {
                // !!!!!!!!!!! Implement Update
                console.info(chalk.grey(`🔼 ${wallpaper.id} already exists`));
                continue;
            }

            delete (wallpaper as any).metadataFilePath;
            delete (wallpaper as any).colorStatsFilePath;
            delete (wallpaper as any).contentFilePath;
            const insertResult = await getSupabaseForServer().from('Wallpaper').insert(wallpaper);

            // TODO: !! Util isInsertSuccessfull (status===201)
            if (insertResult.status !== 201) {
                console.info({ insertResult });
                throw new Error('Insert failed');
            }

            console.info(chalk.green(`🔼 ${wallpaper.id} uploaded`));
        } catch (error) {
            console.info(chalk.red(`🔼 ${wallpaper.id} error`));
            throw error;
        }
    }

    console.info(`[ Done 🔼  Upload wallpapers ]`);
}

/**
 * TODO: Maybe use getMidjourneyLink from batch-froject-editor
 * TODO: Persistency and uniqueness of the names
 */
