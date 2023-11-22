import { Vector } from 'xyzt';
import { IImageColorStats } from '../../../../utils/image/utils/IImageColorStats';
import { string_image_prompt, string_markdown, string_url_image } from '../../../../utils/typeAliases';

/**
 * TODO: !!! Annotate
 *
 * @private Only used within the createNewWallpaper function and its subfunctions
 */
export interface CreateNewWallpaperPrepareResult {
    readonly wallpaperUrl: string_url_image;
    readonly colorStats: IImageColorStats<string>;
    readonly originalSize: Vector;
    readonly contentWithFont: string_markdown;
    readonly wallpaperPrompt: string_image_prompt;
}
/**
 * TODO: !!! Annotate all
 */
