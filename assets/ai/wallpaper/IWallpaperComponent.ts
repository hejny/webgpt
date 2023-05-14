import { IImageColorStats } from '../../../src/utils/image/utils/IImageColorStats';
import { IMidjourneyJob } from './IMidjourneyJob';

export interface IWallpaperComponentProps {
    width: number;
    quality: number;
}

export interface IWallpaperComponent {
    (props: IWallpaperComponentProps): JSX.Element;
    src: URL;
    metadata: IWallpaperMetadata /* <- TODO: This should be renamed to IWallpaperPrompt */;
    colorStats: IWallpaperColorStats;
    // TODO: shapeStats> IWallpaperShapeStats;

    content: string /*_markdown*/;
    // TODO: isTile + some mechanism to add additional metadata
}

export type IWallpaperMetadata = IMidjourneyJob;
export type IWallpaperColorStats = IImageColorStats;

/**
 * TODO: Probbably rename wallpaper to something else like "designscheme", "design", "theme" or "template"
 */
