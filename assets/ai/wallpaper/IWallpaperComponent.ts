import { IImageColorStats } from '../../../src/utils/image/utils/IImageColorStats';
import { IMidjourneyJob } from './IMidjourneyJob';

export interface IWallpaperComponentProps {
    width: number;
    quality: number;
}

export interface IWallpaperComponent {
    metadata: IWallpaperMetadata;
    colorStats: IImageColorStats;
    (props: IWallpaperComponentProps): JSX.Element;
}

export type IWallpaperMetadata = IMidjourneyJob;
