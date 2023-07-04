import glob from 'glob-promise';
import { join } from 'path';
import { getHardcodedWallpapersDir } from './getHardcodedWallpapersDir';

/**
 * @@@
 */

export async function getHardcodedWallpapersMetadataFilePaths(): Promise<Array<string>> {
    const wallpapersDir = await getHardcodedWallpapersDir();
    const wallpapersmetadataFilePaths = await glob(join(wallpapersDir, '*.json').split('\\').join('/'));

    return wallpapersmetadataFilePaths;
}
