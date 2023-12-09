import { IWallpaper } from '../../IWallpaper';
import { string_uri } from '../../typeAliases';
import { nameToSubfolderPath } from './nameToSubfolderPath';

/**
 * Generates a path for the prepared hardcoded content
 */
export function getPreparedWallpaperCdnKey(wallpaper: Pick<IWallpaper, 'id'>): string_uri {
    return `prepared/${nameToSubfolderPath(wallpaper.id).join('/')}/${wallpaper.id}`;
}


/**
 * TODO: [⛳️] Probbably prefix should be in this config not on the consumer side
 * TODO: [⛳️] There should be probbably .png suffix
 */