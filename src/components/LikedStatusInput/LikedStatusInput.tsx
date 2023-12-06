import {
    LikedStatus,
    LIKED_STATUSES,
    LIKED_STATUSES_BUTTON_STYLES,
    LIKED_STATUSES_EMOJIS_IMAGES,
    LIKED_STATUSES_MESSAGES,
} from '../../ai/recommendation/LikedStatus';
import { classNames } from '../../utils/classNames';
import { useStyleModule } from '../../utils/hooks/useStyleModule';
import type { string_css_class } from '../../utils/typeAliases';

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
    likedStatus: LikedStatus;

    /**
     * Callback which will be called when the value of the input changes
     */
    onLikedStatusChange(likedStatus: LikedStatus): void;

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
            {LIKED_STATUSES.filter((LIKED_STATUSES) => LIKED_STATUSES !== 'NONE').map((LIKED_STATUS) => (
                <button
                    key={LIKED_STATUS}
                    className={classNames(/*'button',*/ styles.option)}
                    title={`${LIKED_STATUSES_MESSAGES[LIKED_STATUS]} ${subject}!`}
                    data-active={likedStatus === LIKED_STATUS}
                    style={likedStatus === LIKED_STATUS ? LIKED_STATUSES_BUTTON_STYLES[LIKED_STATUS] : {}}
                    onClick={() => void onLikedStatusChange(likedStatus !== LIKED_STATUS ? LIKED_STATUS : 'NONE')}
                >
                    {LIKED_STATUSES_EMOJIS_IMAGES[LIKED_STATUS]}
                </button>
            ))}
        </div>
    );
}

/**
 * TODO: [🧠] Should be the props readonly (for all react components)?
 */
