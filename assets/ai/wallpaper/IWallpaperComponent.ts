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
    texts: IWallpaperTexts;

    // TODO: isTile + some mechanism to add additional metadata
}

export type IWallpaperMetadata = IMidjourneyJob;
export type IWallpaperColorStats = IImageColorStats;
export interface IWallpaperTexts /* !!! Remove */ {
    title: string /*_markdown*/;
    content: string /*_markdown*/;
}

/**
 * TODO: Probbably rename wallpaper to something else like "designscheme", "design", "theme" or "template"
 */
