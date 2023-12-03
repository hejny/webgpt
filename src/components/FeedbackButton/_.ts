import { Color } from '../../utils/color/Color';
import type { LikedStatus } from '../../utils/hooks/useLikedStatusOfCurrentWallpaper';
import type { WithTake } from '../../utils/take/interfaces/ITakeChain';

/**
 * Mapping tablr from Likeds tatus to color
 */
export const LIKED_STATUS_COLORS: Record<keyof typeof LikedStatus, WithTake<Color>> = {
    NONE: Color.fromHex('#686868'),
    LOVE: Color.fromHex('#E92323'),
    LIKE: Color.fromHex('#EEEE19'),
    NEUTRAL: Color.fromHex('#887733'),
    DISLIKE: Color.fromHex('#333333'),
};

/**
 * TODO: !!! Where is the right place for this?
 */
