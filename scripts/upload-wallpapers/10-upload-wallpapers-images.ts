#!/usr/bin/env ts-node

import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

import chalk from 'chalk';
import { join } from 'path';
import { forTime } from 'waitasecond';
import { CDN } from '../../config';
import { generateWallpaperCdnKey } from '../../src/utils/storage/utils/generateWallpaperCdnKey';
import { getSupabaseForServer } from '../../src/utils/supabase/getSupabaseForServer';
import { getHardcodedWallpapers } from '../utils/hardcoded-wallpaper/getHardcodedWallpapers';

if (process.cwd() !== join(__dirname, '../..')) {
    console.error(chalk.red(`CWD must be root of the project`));
    process.exit(1);
}

uploadWallpapersImages()
    .catch((error) => {
        console.error(chalk.bgRed(error.name));
        console.error(error);
        process.exit(1);
    })
    .then(() => {
        process.exit(0);
    });

async function uploadWallpapersImages() {
    console.info(`🔼🖼  Upload wallpapers images`);

    for (const hardcodedWallpaper of await getHardcodedWallpapers()) {
        try {
            const selectResult = await getSupabaseForServer()
                .from('Wallpaper')
                .select('*')
                .eq('id', hardcodedWallpaper.id);

            if (!(selectResult && selectResult.data && selectResult.data.length > 0)) {
                console.info(chalk.yellow(`🔼 ${hardcodedWallpaper.id} does not yet exists`));
                continue;
            }

            const wallpaper = selectResult.data[0];

            const key = generateWallpaperCdnKey(wallpaper);
            const file = await CDN.getItem(key);

            if (file) {
                console.info(chalk.gray(`🔼🖼 ${wallpaper.id} already exists`));
                continue;
            }

            const response = await fetch(wallpaper.src);

            await CDN.setItem(key, {
                type: 'image/png' /* <- TODO: Do not hardcode */,
                data: Buffer.from(await response.arrayBuffer()),
            });

            const updateResult = await getSupabaseForServer()
                .from('Wallpaper')
                .update({
                    src: CDN.getItemUrl(key).href,
                });

            // TODO: !! Util isUpdateSuccessfull (status===201)
            if (updateResult.status !== 201) {
                console.info({ updateResult });
                throw new Error('Update failed');
            }

            console.info(chalk.green(`🔼🖼 ${wallpaper.id} image uploaded and updated in database`));
            await forTime(10000);
        } catch (error) {
            console.info(chalk.red(`🔼🖼 ${hardcodedWallpaper.id} error`));
            throw error;
        }
    }

    console.info(`[ Done 🔼🖼  Upload wallpapers images ]`);
}

/**
 * TODO: [🧠] Also upload upscaled wallpapers
 */
