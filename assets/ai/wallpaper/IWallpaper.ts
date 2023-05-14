import { IImageColorStats } from '../../../src/utils/image/utils/IImageColorStats';
import { IMidjourneyJob } from './IMidjourneyJob';

export interface IWallpaperProps {
    width: number;
    quality: number;
}

export interface IWallpaper {
    id: string /*_wallpaper_id*/;
    src: string /*_url*/ /* <- Note: Not using URL objects because of serialization */;
    prompt: string;
    colorStats: IWallpaperColorStats;
    // TODO: shapeStats> IWallpaperShapeStats;

    title: string /* <- Note: This is just derrived */;
    content: string /*_markdown*/;
    font: string /* <- Note: This is just derrived */;
    // TODO: isTile + some mechanism to add additional metadata
}

export type IWallpaperMetadata = IMidjourneyJob /* <- TODO: Maybe remove ACRY IWallpaperMetadata */;
export type IWallpaperColorStats = IImageColorStats;

/**
 * TODO: Probbably rename wallpaper to something else like "designscheme", "design", "theme" or "template"
 */
