import { join } from 'path';
import { isFolderExisting } from '../isFolderExisting';

/**
 * @@@
 */
export async function getHardcodedWallpapersDir(): Promise<string> {
    // Note: Go down directory tree until assets folder is found:
    let dir = __dirname;
    for (let i = 0; i < 10; i++) {
        if (await isFolderExisting(join(dir, 'assets'))) {
            return join(dir, 'assets', 'ai', 'wallpaper', 'gallery');
        }
        dir = join(dir, '..');
    }

    throw new Error(`Could not find assets folder in "${__dirname}"`);
}
