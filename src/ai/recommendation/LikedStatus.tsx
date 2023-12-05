import Image from 'next/image';
import type { CSSProperties } from 'react';
import { Color } from '../../utils/color/Color';
import { textColor } from '../../utils/color/operators/furthest';
import type { WithTake } from '../../utils/take/interfaces/ITakeChain';
import type { string_char_emoji } from '../../utils/typeAliasEmoji';
import type { message, number_likeness } from '../../utils/typeAliases';

export type LikedStatus = typeof LIKED_STATUSES[number];

export const LIKED_STATUSES = ['NONE', 'LOVE', 'LIKE', 'NEUTRAL', 'DISLIKE', 'HATE'] as const;

export const LIKED_STATUS_LIKENESS: Record<LikedStatus, number_likeness> = {
    NONE: 0,
    LOVE: 3,
    LIKE: 1,
    NEUTRAL: 0 /* <- TODO: [🧠] Maybe -0.1 or some small negative number, wallpaper user go through react 😐 person maybe dislike */,
    DISLIKE: -1,
    HATE: -3 /* <- TODO: [🧠] Maybe more than 3 and -3 */,
};

/**
 * Mapping table from Liked statuses to (text) message
 */
export const LIKED_STATUSES_MESSAGES: Record<LikedStatus, Exclude<message, JSX.Element>> = {
    NONE: 'None',
    LOVE: '❤ Love',
    LIKE: '👍 Like',
    NEUTRAL: '😐 Neutral',
    DISLIKE: '👎 Dislike',
    HATE: '😡 Hate',
};

/**
 * Mapping table from Liked statuses to color
 */
export const LIKED_STATUSES_COLORS: Record<LikedStatus, WithTake<Color>> = {
    NONE: Color.fromHex('#cccccc'),
    LOVE: Color.fromHex('#ff0088'),
    LIKE: Color.fromHex('#EEEE19'),
    NEUTRAL: Color.fromHex('#22aaaa'),
    DISLIKE: Color.fromHex('#ff00ff'),
    HATE: Color.fromHex('#ff0000'),
    /* <- TODO: [🧠] Figure out better colors */
};

/**
 * Mapping table from Liked statuses to emoji
 */
export const LIKED_STATUSES_EMOJIS: Record<LikedStatus, string_char_emoji> = {
    NONE: '⭐' as string_char_emoji,
    LOVE: '❤' as string_char_emoji,
    LIKE: '👍' as string_char_emoji,
    NEUTRAL: '😐' as string_char_emoji,
    DISLIKE: '👎' as string_char_emoji,
    HATE: '😡' as string_char_emoji,
};

/**
 * Mapping table from Liked statuses to emoji as <Image/>
 */
export const LIKED_STATUSES_EMOJIS_IMAGES: Record<LikedStatus, any /* <- !!!last  */> = {
    NONE: <Image alt="⭐" src="/icons/openmoji/2B50.white.svg" width={40} height={40} />,
    LOVE: <Image alt="❤" src="/icons/openmoji/2764.white.svg" width={40} height={40} /* <-[🧥] */ />,
    LIKE: <Image alt="👍" src="/icons/openmoji/1F44D.white.svg" width={40} height={40} /* <-[🧥] */ />,
    NEUTRAL: <Image alt="😐" src="/icons/openmoji/1F610.white.svg" width={40} height={40} /* <-[🧥] */ />,
    DISLIKE: <Image alt="👎" src="/icons/openmoji/1F44E.white.svg" width={40} height={40} /* <-[🧥] */ />,
    HATE: <Image alt="😡" src="/icons/openmoji/1F621.white.svg" width={40} height={40} /* <-[🧥] */ />,
    // <- TODO: [0] Generate dynamically from LIKED_STATUSES_EMOJIS and LIKED_STATUSES_MESSAGES, dynamically pick .white.svg or .black.svg
};

/**
 * Mapping table from Liked statuses to button CSS styles
 */
export const LIKED_STATUSES_BUTTON_STYLES = Object.fromEntries(
    Object.entries(
        LIKED_STATUSES_COLORS,
        // TODO: Do not convert entries BUT use LIKED_STATUSES array directly
    ).map(([likedStatus, color]) => [
        likedStatus,
        {
            backgroundColor: color.toHex(),
            color: color.then(textColor).toHex(),
        },
    ]),
) as Record<LikedStatus, CSSProperties>;
/*
TODO: Uncomment after [0]
LIKED_STATUSES_BUTTON_STYLES.NONE = {
    // TODO: [0] Make directyly during LIKED_STATUSES_BUTTON_STYLES creation and compute dynamically
    ...LIKED_STATUSES_BUTTON_STYLES.NONE,
    border: `1px solid ${LIKED_STATUSES_COLORS.NONE.then(textColor).toHex()}`,
};
*/

/**
 * TODO: !!!last Annotate all
 * TODO: Maybe put LIKED_STATUS_LIKENESS into config
 */
