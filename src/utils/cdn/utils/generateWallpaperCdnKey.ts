import { IWallpaper } from '../../IWallpaper';
import { string_uri } from '../../typeAliases';
import { nameToSubfolderPath } from './nameToSubfolderPath';

/**
 * Generates a path for the hardcoded content
 *
 */
export function generateWallpaperCdnKey(wallpaper: Pick<IWallpaper, 'id'>): string_uri {
    // TODO: [⛳️] Probbably prefix should be in this config not on the consumer side
    return `${nameToSubfolderPath(wallpaper.id).join('/')}/${wallpaper.id}`;
}
