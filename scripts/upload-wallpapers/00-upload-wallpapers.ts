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
    console.info(`🔼  Upload & Update wallpapers`);

    for (const wallpaper of await getHardcodedWallpapers()) {
        try {
            delete (wallpaper as any).metadataFilePath;
            delete (wallpaper as any).colorStatsFilePath;
            delete (wallpaper as any).contentFilePath;
            delete (wallpaper as any).srcFilePath;
            /*
             TODO: This does not work - it is not possible to ensure order of keys in JSONB
                   @see https://supabase.com/docs/guides/database/json
             > wallpaper.colorStats = {
             >     version: wallpaper.colorStats,
             >     ...(wallpaper.colorStats as JsonObject),
             >     // <- Note: To ensure that version is the first key in colorStats 
             > };
            */

            const selectResult = await getSupabaseForServer().from('Wallpaper').select('*').eq('id', wallpaper.id);

            if (!(selectResult && selectResult.data && selectResult.data.length > 0)) {
                const insertResult = await getSupabaseForServer().from('Wallpaper').insert(wallpaper);
                console.info('Wallpaper insert', { insertResult });

                // TODO: !! Util isInsertSuccessfull (status===201)
                if (insertResult.status !== 201) {
                    throw new Error('Insert failed');
                }

                console.info(chalk.green(`🔼 ${wallpaper.id} uploaded`));
            } else {
                const updateResult = await getSupabaseForServer()
                    .from('Wallpaper')
                    .update(wallpaper)
                    .eq('id', wallpaper.id);

                // TODO: !! Util isUpdateSuccessfull (Probbably status===204)
                if (updateResult.status !== 204) {
                    console.info({ updateResult });
                    throw new Error('Update failed');
                }

                console.info(chalk.cyan(`🔼 ${wallpaper.id} updated`));
            }
        } catch (error) {
            console.info(chalk.red(`🔼 ${wallpaper.id} error`));
            throw error;
        }
    }

    console.info(`[ Done 🔼  Upload & Update wallpapers ]`);
}
