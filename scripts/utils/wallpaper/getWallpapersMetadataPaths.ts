import glob from 'glob-promise';
import { join } from 'path';
import { getWallpapersDir } from './getWallpapersDir';

/**
 * @@@
 */

export async function getWallpapersmetadataFilePaths(): Promise<Array<string>> {
    const wallpapersDir = await getWallpapersDir();
    const wallpapersmetadataFilePaths = await glob(join(wallpapersDir, '*.json').split('\\').join('/'));

    return wallpapersmetadataFilePaths;
}
