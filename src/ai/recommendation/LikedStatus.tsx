import Image from 'next/image';
import { CSSProperties } from 'react';
import { Color } from '../../utils/color/Color';
import { textColor } from '../../utils/color/operators/furthest';
import type { WithTake } from '../../utils/take/interfaces/ITakeChain';
import type { string_char_emoji } from '../../utils/typeAliasEmoji';
import { message, number_likeness } from '../../utils/typeAliases';

export type LikedStatus = typeof LIKED_STATUSES[number];

export const LIKED_STATUSES = [
    'NONE',
    'LOVE',
    'LIKE',
    'NEUTRAL',
    'DISLIKE',
    // TODO: !!! Add one more
] as const;

export const LIKED_STATUS_LIKENESS: Record<LikedStatus, number_likeness> = {
    NONE: 0 /* <- TODO: [🧠] Maybe -0.1 or some small negative number, wallpaper user go through and did not react person maybe dislike */,
    LOVE: 3 /* <- TODO: [🧠] What is the best number here */,
    LIKE: 1,
    NEUTRAL: 0 /* <- TODO: [🧠] Maybe -0.1 or some small negative number, wallpaper user go through react 😐 person maybe dislike */,
    DISLIKE: -1 /* <- TODO: [🧠] Maybe more than -1 */,
};

/**
 * Mapping table from Liked statuses to (text) message
 */
export const LIKED_STATUSES_MESSAGES: Record<LikedStatus, message> = {
    NONE: 'None',
    LOVE: '❤ Loved',
    LIKE: '👍 Liked',
    NEUTRAL: '😐 Neutral',
    DISLIKE: '👎 Disliked',
};

/**
 * Mapping table from Liked statuses to color
 */
export const LIKED_STATUSES_COLORS: Record<LikedStatus, WithTake<Color>> = {
    NONE: Color.fromHex('#686868'),
    LOVE: Color.fromHex('#E92323'),
    LIKE: Color.fromHex('#EEEE19'),
    NEUTRAL: Color.fromHex('#887733'),
    DISLIKE: Color.fromHex('#333333'),
};

/**
 * Mapping table from Liked statuses to button CSS styles
 */
export const LIKED_STATUSES_BUTTON_STYLES = Object.fromEntries(
    Object.entries(LIKED_STATUSES_COLORS).map(([likedStatus, color]) => [
        likedStatus,
        {
            backgroundColor: color.toHex(),
            color: color.then(textColor).toHex(),
        },
    ]),
) as Record<LikedStatus, CSSProperties>;
LIKED_STATUSES_BUTTON_STYLES.NONE = {
    ...LIKED_STATUSES_BUTTON_STYLES.NONE,
    border: `1px solid ${LIKED_STATUSES_COLORS.NONE.then(textColor).toHex()}`,
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
};

/**
 * Mapping table from Liked statuses to emoji as <Image/>
 */
export const LIKED_STATUSES_EMOJIS_IMAGES: Record<LikedStatus, any /* <- !!!last  */> = {
    NONE: <Image alt="⭐" src="/icons/openmoji/2B50.white.svg" width={40} height={40} />,
    LOVE: <Image alt="❤" src="/icons/openmoji/2764.black.svg" width={40} height={40} /* <-[🧥] */ />,
    LIKE: <Image alt="👍" src="/icons/openmoji/1F44D.black.svg" width={40} height={40} /* <-[🧥] */ />,
    NEUTRAL: <Image alt="😐" src="/icons/openmoji/1F610.black.svg" width={40} height={40} /* <-[🧥] */ />,
    DISLIKE: <Image alt="👎" src="/icons/openmoji/1F44E.black.svg" width={40} height={40} /* <-[🧥] */ />,

    /*
    <MarkdownContent content="❤" isUsingOpenmoji />
    <MarkdownContent content="👍" isUsingOpenmoji />
    <MarkdownContent content="😐" isUsingOpenmoji />
    <MarkdownContent content="👎" isUsingOpenmoji />
    */
};

/**
 * TODO: !!!last Annotate all
 * TODO: Maybe put LIKED_STATUS_LIKENESS into config
 */
