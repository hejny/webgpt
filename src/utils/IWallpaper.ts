import { string_keyword } from 'n12';
import { IImageColorStats } from './image/utils/IImageColorStats';
import { IMidjourneyJob } from './IMidjourneyJob';
import { string_midjourney_prompt, string_url, string_wallpaper_id, uuid } from './typeAliases';

export interface IWallpaperProps {
    width: number;
    quality: number;
}

export interface IWallpaper {
    id: string_wallpaper_id;
    parent?: string_wallpaper_id;
    author: uuid;
    isPrivate: boolean;
    src: string_url /* <- Note: Not using URL objects because of serialization */;
    prompt: string_midjourney_prompt;
    colorStats: IWallpaperColorStats /* <- !!! Put here all */;
    // TODO: shapeStats> IWallpaperShapeStats;

    title: string /* <- Note: This is just derrived */;
    content: string /*_markdown*/;
    // TODO: isTile + some mechanism to add additional metadata

    /**
     * Note: Not using IKewords because Set is not serializable
     */
    keywords: Array<string_keyword> /* <- Note: This is just derrived */;

    isSaved: boolean;
}

export type IWallpaperMetadata = IMidjourneyJob /* <- TODO: Maybe remove ACRY IWallpaperMetadata */;
export type IWallpaperColorStats = IImageColorStats<string>;

/**
 * TODO: Probbably rename wallpaper to something else like "designscheme", "design", "theme" or "template"
 */
