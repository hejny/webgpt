import glob from 'glob-promise';
import { join } from 'path';
import { getWallpapersDir } from './getWallpapersDir';

/**
 * @@@
 */

export async function getWallpapersMetadataPaths(): Promise<Array<string>> {
    const wallpapersDir = await getWallpapersDir();
    const wallpapersMetadataPaths = (
        await glob(join(wallpapersDir, '*.json').split('\\').join('/'), {
            // TODO: ignore: ['*.colors.json'],
        })
    ).filter((path) => !path.endsWith('.colors.json'));
    /*
        .filter((path) =>
            path.includes(
                `Pavol_Hejn_an_underwater_scene_with_coral_and_fish_760ff8ac-0b2c-42c8-b335-bcd4eb186390-0_1`,
            ),
        );
        */

    return wallpapersMetadataPaths;
}
