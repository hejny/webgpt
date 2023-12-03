import Image from 'next/image';
import { Color } from '../../utils/color/Color';
import type { LikedStatus } from '../../utils/hooks/useLikedStatusOfCurrentWallpaper';
import type { WithTake } from '../../utils/take/interfaces/ITakeChain';
import type { string_char_emoji } from '../../utils/typeAliasEmoji';

/**
 * Mapping table from Liked statuses to color
 */
export const LIKED_STATUS_COLORS: Record<keyof typeof LikedStatus, WithTake<Color>> = {
    NONE: Color.fromHex('#686868'),
    LOVE: Color.fromHex('#E92323'),
    LIKE: Color.fromHex('#EEEE19'),
    NEUTRAL: Color.fromHex('#887733'),
    DISLIKE: Color.fromHex('#333333'),
};

/**
 * Mapping table from Liked statuses to emoji
 */
export const LIKED_STATUS_EMOJIS: Record<keyof typeof LikedStatus, string_char_emoji> = {
    NONE: '⭐' as string_char_emoji,
    LOVE: '❤' as string_char_emoji,
    LIKE: '👍' as string_char_emoji,
    NEUTRAL: '😐' as string_char_emoji,
    DISLIKE: '👎' as string_char_emoji,
};

// TODO: !!! Use ACRY LIKED_STATUS_EMOJIS

/**
 * Mapping table from Liked statuses to emoji as <Image/>
 */
export const LIKED_STATUS_EMOJIS_IMAGES: Record<keyof typeof LikedStatus, any /* <- !!!  */> = {
    NONE: <Image alt="❤" src="/icons/openmoji/2764.black.svg" width={40} height={40} /* <-[🧥] */ /* <- !!! ⭐ */ />,
    LOVE: <Image alt="❤" src="/icons/openmoji/2764.black.svg" width={40} height={40} /* <-[🧥] */ />,
    LIKE: <Image alt="👍" src="/icons/openmoji/1F44D.black.svg" width={40} height={40} /* <-[🧥] */ />,
    NEUTRAL: <Image alt="😐" src="/icons/openmoji/1F610.black.svg" width={40} height={40} /* <-[🧥] */ />,
    DISLIKE: <Image alt="👎" src="/icons/openmoji/1F44E.black.svg" width={40} height={40} /* <-[🧥] */ />,
};

// TODO: !!! Use ACRY LIKED_STATUS_EMOJIS_IMAGES

/**
 * TODO: !!! Where is the right place for this + split into files + unite with LikedStatus?
 */
