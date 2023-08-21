import glob from 'glob-promise';
import { join } from 'path';
import { getHardcodedWallpapersDir } from './getHardcodedWallpapersDir';


/**
 * Retrieves the file paths of the hardcoded wallpapers metadata files ⁘
 * 
 * @returns A promise that resolves to an array of strings representing the file paths.
 */
export async function getHardcodedWallpapersMetadataFilePaths(): Promise<Array<string>> {
    const wallpapersDir = await getHardcodedWallpapersDir();
    const wallpapersmetadataFilePaths = await glob(join(wallpapersDir, '*.json').split('\\').join('/'));

    return wallpapersmetadataFilePaths;
}
