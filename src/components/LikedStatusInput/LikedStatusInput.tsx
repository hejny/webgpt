import { classNames } from '../../utils/classNames';
import type { LikedStatus } from '../../utils/hooks/useLikedStatusOfCurrentWallpaper';
import { useStyleModule } from '../../utils/hooks/useStyleModule';
import type { string_css_class } from '../../utils/typeAliases';
import { LIKED_STATUS_BUTTON_STYLES, LIKED_STATUS_EMOJIS_IMAGES } from '../FeedbackButton/_';

interface LikedStatusInputProps {
    /**
     * The subject of the feedback
     * What is being feedbacked?
     *
     * @example "proposed title"
     */
    subject: string;

    /**
     * The value of the input
     *
     * Note: If you don’t want to set the default value use "NONE"
     */
    likedStatus: keyof typeof LikedStatus;

    /**
     * Callback which will be called when the value of the input changes
     */
    onLikedStatusChange(likedStatus: keyof typeof LikedStatus): void;

    /**
     * Optional CSS class name which will be added to root element
     */
    className?: string_css_class;
}

/**
 * Renders a @@
 */
export function LikedStatusInput(props: LikedStatusInputProps) {
    const { subject, likedStatus, onLikedStatusChange, className } = props;

    const styles = useStyleModule(import('./LikedStatusInput.module.css'));

    return (
        <div className={classNames(className, styles.LikedStatusInput)}>
            <button
                className={classNames(/*'button',*/ styles.option)}
                title={`I love ${subject}!`}
                data-active={likedStatus === 'LOVE'}
                style={likedStatus === 'LOVE' ? LIKED_STATUS_BUTTON_STYLES.LOVE : {}}
                onClick={() =>
                    void onLikedStatusChange(
                        likedStatus !== 'LOVE' ? 'LOVE' : 'NONE' /* <- TODO: [6] Make some toggle set wrapper */,
                    )
                }
            >
                {LIKED_STATUS_EMOJIS_IMAGES.LOVE}
            </button>

            <button
                // TODO: Maybe also listen on double-click on mobile
                className={classNames(/*'button',*/ styles.option)}
                title={`I like ${subject}!`}
                data-active={likedStatus === 'LIKE'}
                style={likedStatus === 'LIKE' ? LIKED_STATUS_BUTTON_STYLES.LIKE : {}}
                onClick={() =>
                    void onLikedStatusChange(
                        likedStatus !== 'LIKE' ? 'LIKE' : 'NONE' /* <- TODO: [6] Make some toggle set wrapper */,
                    )
                }
            >
                {LIKED_STATUS_EMOJIS_IMAGES.LIKE}
            </button>
            <button
                className={classNames(/*'button',*/ styles.option)}
                title={`I do not know what to think about ${subject}!`}
                data-active={likedStatus === 'NEUTRAL'}
                style={likedStatus === 'NEUTRAL' ? LIKED_STATUS_BUTTON_STYLES.NEUTRAL : {}}
                onClick={() =>
                    void onLikedStatusChange(
                        likedStatus !== 'NEUTRAL' ? 'NEUTRAL' : 'NONE' /* <- TODO: [6] Make some toggle set wrapper */,
                    )
                }
            >
                {LIKED_STATUS_EMOJIS_IMAGES.NEUTRAL}
            </button>
            <button
                className={classNames(/*'button',*/ styles.option)}
                title={`I dislike ${subject}!`}
                data-active={likedStatus === 'DISLIKE'}
                style={likedStatus === 'DISLIKE' ? LIKED_STATUS_BUTTON_STYLES.DISLIKE : {}}
                onClick={() =>
                    void onLikedStatusChange(
                        likedStatus !== 'DISLIKE' ? 'DISLIKE' : 'NONE' /* <- TODO: [6] Make some toggle set wrapper */,
                    )
                }
            >
                {LIKED_STATUS_EMOJIS_IMAGES.DISLIKE}
            </button>
        </div>
    );
}

/**
 * TODO: [🧠] Should be the props readonly (for all react components)?
 */
