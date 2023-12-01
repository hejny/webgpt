import { Color } from '../../../utils/color/Color';
import type { LikedStatus } from '../../../utils/hooks/useLikedStatusOfCurrentWallpaper';
import type { WithTake } from '../../../utils/take/interfaces/ITakeChain';

export interface IGalleryFilter {
    fulltext?: string;
    color?: WithTake<Color>;
    likedStatus: keyof typeof LikedStatus | 'ALL';
    limit: number;
    order: keyof typeof Order;
}

export const Order = {
    ASCENDING: 'Ascending (A-Z)',
    DESCENDING: 'Descending (Z-A)',
    RANDOM: 'Random',
} as const;
