import { Color } from '../../../utils/color/Color';
import { LikedStatus } from '../../../utils/hooks/useLikedStatusOfCurrentWallpaper';
import { WithTake } from '../../../utils/take/interfaces/ITakeChain';

export interface GalleryFilter {
    fulltext?: string;
    color?: WithTake<Color>;
    likedStatus?: LikedStatus;
    limit: number;
    isRandom: boolean;
}
