import { Vector } from 'xyzt';
import { IImageColorStats } from '../../../../utils/image/utils/IImageColorStats';
import { string_image_prompt, string_markdown, string_maxdown, string_url_image } from '../../../../utils/typeAliases';

/**
 * Intermediary result of the createNewWallpaper function
 *
 * @private Only used within the createNewWallpaper function and its subfunctions
 */
export interface CreateNewWallpaperPrepareResult {
    /**
     * URL of the wallpaper in our CDN
     */
    readonly wallpaperUrl: string_url_image;

    /**
     * Color statistics of the wallpaper
     */
    readonly colorStats: IImageColorStats<string>;

    /**
     * Original size of the wallpaper
     */
    readonly originalSize: Vector;

    /**
     * Content of the wallpaper with font applied
     */
    readonly contentWithFont: string_maxdown;

    /**
     * Text prompt which was used to generate the wallpaper image
     */
    readonly wallpaperPrompt: string_image_prompt;
}
