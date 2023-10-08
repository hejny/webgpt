import Image from 'next/image';
import { useRouter } from 'next/router';
import { classNames } from '../../utils/classNames';
import { useCurrentWallpaper } from '../../utils/hooks/useCurrentWallpaper';
import { useLikedStatusOfCurrentWallpaper } from '../../utils/hooks/useLikedStatusOfCurrentWallpaper';
import { provideClientIdWithoutVerification } from '../../utils/supabase/provideClientIdWithoutVerification';
import { Hint } from '../Hint/Hint';
import { PublishLink } from '../PublishModal/PublishLink';
import styles from './ControlPanel.module.css';

/**
 * Renders the part of the control panel that allows to like the current wallpaper.
 */
export function ControlPanelLikeButtons() {
    const router = useRouter();
    const [wallpaper] = useCurrentWallpaper();
    const [likedStatus, setLikedStatus] = useLikedStatusOfCurrentWallpaper();

    return (
        <Hint id="control-reactions" title="React on web" className={styles.group} reapearCount={10}>
            {/* <div style={{ color: '#b11919' }}>{wallpaperId}</div> */}
            {(['LOVE', 'LIKE'].includes(likedStatus) || wallpaper.author === provideClientIdWithoutVerification()) && (
                <div className={styles.group}>
                    <PublishLink className={classNames(styles.button, styles.callToAction)} />
                </div>
            )}

            <button
                className={classNames(/*'button',*/ styles.button)}
                title="I love this web!"
                data-active={likedStatus === 'LOVE'}
                onClick={() =>
                    void setLikedStatus(
                        likedStatus !== 'LOVE' ? 'LOVE' : 'NONE' /* <- TODO: [6] Make some toggle set wrapper */,
                    )
                }
            >
                <Image alt="❤" src="/icons/openmoji/2764.black.svg" width={40} height={40} /* <-[🧥] */ />
                {/* <MarkdownContent content="❤" isUsingOpenmoji /> */}
            </button>

            <button
                // TODO: Maybe also listen on double-click on mobile
                className={classNames(/*'button',*/ styles.button)}
                title="I like this web"
                data-active={likedStatus === 'LIKE'}
                onClick={() =>
                    void setLikedStatus(
                        likedStatus !== 'LIKE' ? 'LIKE' : 'NONE' /* <- TODO: [6] Make some toggle set wrapper */,
                    )
                }
            >
                <Image alt="👍" src="/icons/openmoji/1F44D.black.svg" width={40} height={40} /* <-[🧥] */ />
                {/* <MarkdownContent content="👍" isUsingOpenmoji /> */}
            </button>
            <button
                className={classNames(/*'button',*/ styles.button)}
                title="I do not know"
                data-active={likedStatus === 'NEUTRAL'}
                onClick={() =>
                    void setLikedStatus(
                        likedStatus !== 'NEUTRAL' ? 'NEUTRAL' : 'NONE' /* <- TODO: [6] Make some toggle set wrapper */,
                    )
                }
            >
                <Image alt="😐" src="/icons/openmoji/1F610.black.svg" width={40} height={40} /* <-[🧥] */ />
                {/* <MarkdownContent content="😐" isUsingOpenmoji /> */}
            </button>
            <button
                className={classNames(/*'button',*/ styles.button)}
                title="I dislike this web"
                data-active={likedStatus === 'DISLIKE'}
                onClick={() =>
                    void setLikedStatus(
                        likedStatus !== 'DISLIKE' ? 'DISLIKE' : 'NONE' /* <- TODO: [6] Make some toggle set wrapper */,
                    )
                }
            >
                <Image alt="👎" src="/icons/openmoji/1F44E.black.svg" width={40} height={40} /* <-[🧥] */ />
                {/* <MarkdownContent content="👎" isUsingOpenmoji /> */}
            </button>
        </Hint>
    );
}
