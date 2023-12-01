import Image from 'next/image';
import { useRouter } from 'next/router';
import { classNames } from '../../utils/classNames';
import { useCurrentWallpaper } from '../../utils/hooks/useCurrentWallpaper';
import styles from './FeedbackPanel.module.css';

/**
 * Renders the control panel for navigation and actions.
 */
export function FeedbackPanel() {
    const router = useRouter();
    const [wallpaper, modifyWallpaper] = useCurrentWallpaper();

    const likedStatus: string = '!!!';

    return (
        <div
            // Note: It is intended to have two divs embedded in each other
            className={classNames('webgpt-controls', styles.FeedbackPanel)}
        >
            {/* <div style={{color:'#1f6b08'}}>{wallpaperId}</div> */}
            <div className={styles.group}>
                <button
                    className={classNames(/*'button',*/ styles.button)}
                    title="I love this web!"
                    data-active={likedStatus === 'LOVE'}
                    onClick={() => {}}
                >
                    <Image alt="❤" src="/icons/openmoji/2764.black.svg" width={40} height={40} /* <-[🧥] */ />
                    {/* <MarkdownContent content="❤" isUsingOpenmoji /> */}
                </button>

                <button
                    // TODO: Maybe also listen on double-click on mobile
                    className={classNames(/*'button',*/ styles.button)}
                    title="I like this web"
                    data-active={likedStatus === 'LIKE'}
                    onClick={() => {}}
                >
                    <Image alt="👍" src="/icons/openmoji/1F44D.black.svg" width={40} height={40} /* <-[🧥] */ />
                    {/* <MarkdownContent content="👍" isUsingOpenmoji /> */}
                </button>
                <button
                    className={classNames(/*'button',*/ styles.button)}
                    title="I do not know"
                    data-active={likedStatus === 'NEUTRAL'}
                    onClick={() => {}}
                >
                    <Image alt="😐" src="/icons/openmoji/1F610.black.svg" width={40} height={40} /* <-[🧥] */ />
                    {/* <MarkdownContent content="😐" isUsingOpenmoji /> */}
                </button>
                <button
                    className={classNames(/*'button',*/ styles.button)}
                    title="I dislike this web"
                    data-active={likedStatus === 'DISLIKE'}
                    onClick={() => {}}
                >
                    <Image alt="👎" src="/icons/openmoji/1F44E.black.svg" width={40} height={40} /* <-[🧥] */ />
                    {/* <MarkdownContent content="👎" isUsingOpenmoji /> */}
                </button>
            </div>
        </div>
    );
}

/**
 * TODO: !! Rename to GalleryFeedbackPanel
 * TODO: !! Use translate
 * TODO: [🧠] Play can trigger fullscreen
 */
