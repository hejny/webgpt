import Image from 'next/image';
import { classNames } from '../../utils/classNames';
import type { LikedStatus } from '../../utils/hooks/useLikedStatusOfCurrentWallpaper';
import { useStyleModule } from '../../utils/hooks/useStyleModule';
import type { string_css_class } from '../../utils/typeAliases';

interface LikedStatusInputProps {
    /**
     * !!!
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
                onClick={() =>
                    void onLikedStatusChange(
                        likedStatus !== 'LOVE' ? 'LOVE' : 'NONE' /* <- TODO: [6] Make some toggle set wrapper */,
                    )
                }
            >
                <Image alt="❤" src="/icons/openmoji/2764.black.svg" width={40} height={40} /* <-[🧥] */ />
                {/* <MarkdownContent content="❤" isUsingOpenmoji /> */}
            </button>

            <button
                // TODO: Maybe also listen on double-click on mobile
                className={classNames(/*'button',*/ styles.option)}
                title={`I like ${subject}!`}
                data-active={likedStatus === 'LIKE'}
                onClick={() =>
                    void onLikedStatusChange(
                        likedStatus !== 'LIKE' ? 'LIKE' : 'NONE' /* <- TODO: [6] Make some toggle set wrapper */,
                    )
                }
            >
                <Image alt="👍" src="/icons/openmoji/1F44D.black.svg" width={40} height={40} /* <-[🧥] */ />
                {/* <MarkdownContent content="👍" isUsingOpenmoji /> */}
            </button>
            <button
                className={classNames(/*'button',*/ styles.option)}
                title={`I do not know what to think about ${subject}!`}
                data-active={likedStatus === 'NEUTRAL'}
                onClick={() =>
                    void onLikedStatusChange(
                        likedStatus !== 'NEUTRAL' ? 'NEUTRAL' : 'NONE' /* <- TODO: [6] Make some toggle set wrapper */,
                    )
                }
            >
                <Image alt="😐" src="/icons/openmoji/1F610.black.svg" width={40} height={40} /* <-[🧥] */ />
                {/* <MarkdownContent content="😐" isUsingOpenmoji /> */}
            </button>
            <button
                className={classNames(/*'button',*/ styles.option)}
                title={`I dislike ${subject}!`}
                data-active={likedStatus === 'DISLIKE'}
                onClick={() =>
                    void onLikedStatusChange(
                        likedStatus !== 'DISLIKE' ? 'DISLIKE' : 'NONE' /* <- TODO: [6] Make some toggle set wrapper */,
                    )
                }
            >
                <Image alt="👎" src="/icons/openmoji/1F44E.black.svg" width={40} height={40} /* <-[🧥] */ />
                {/* <MarkdownContent content="👎" isUsingOpenmoji /> */}
            </button>
        </div>
    );
}

/**
 * TODO: [🧠] Should be the props readonly (for all react components)?
 */
