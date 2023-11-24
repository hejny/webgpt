import { string_wallpaper_id } from '../../../../utils/typeAliases';

/**
 * The newly created wallpaper
 */
export interface CreateNewWallpaperResult {
    /**
     * The url id of the created wallpaper
     */
    readonly wallpaperId: string_wallpaper_id;
}
