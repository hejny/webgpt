import { IImageColorStats } from './image/utils/IImageColorStats';
import { IMidjourneyJob } from './IMidjourneyJob';
import { string_url, string_wallpaper_id } from './typeAliases';

export interface IWallpaperProps {
    width: number;
    quality: number;
}

export interface IWallpaper {
    id: string_wallpaper_id;
    src: string_url /* <- Note: Not using URL objects because of serialization */;
    prompt: string;
    colorStats: IWallpaperColorStats /* <- !!! Put here all */;
    // TODO: shapeStats> IWallpaperShapeStats;

    title: string /* <- Note: This is just derrived */;
    content: string /*_markdown*/;
    // TODO: isTile + some mechanism to add additional metadata
}

export type IWallpaperMetadata = IMidjourneyJob /* <- TODO: Maybe remove ACRY IWallpaperMetadata */;
export type IWallpaperColorStats = IImageColorStats<string>;

/**
 * TODO: Probbably rename wallpaper to something else like "designscheme", "design", "theme" or "template"
 */
