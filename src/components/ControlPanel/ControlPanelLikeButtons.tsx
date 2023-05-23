import { classNames } from '../../utils/classNames';
import { useLikedStatusOfCurrentWallpaper } from '../../utils/hooks/useLikedStatusOfCurrentWallpaper';
import { Article } from '../Article/Article';
import styles from '../ControlPanel/ControlPanel.module.css';

/**
 * @@@
 */
export function ControlPanelLikeButtons() {
    // useRefresh(100);
    const [likedStatus, setLikedStatus] = useLikedStatusOfCurrentWallpaper();

    return (
        <>
            {/* <div style={{ color: '#b11919' }}>{wallpaperId}</div> */}
            <button
                // TODO: !!! Make some call-to-action> href={'mailto:me@pavolhejny.com'}

                className={classNames('button', styles.button)}
                title="I love this web!"
                data-active={likedStatus === 'LOVE'}
                onClick={() =>
                    void setLikedStatus(
                        likedStatus !== 'LOVE' ? 'LOVE' : 'NONE' /* <- TODO: [6] Make some toggle set wrapper */,
                    )
                }
            >
                <Article content="❤" isUsingOpenmoji />
            </button>

            <button
                // TODO: !!! Also listen on double-click on mobile
                className={classNames('button', styles.button)}
                data-active={likedStatus === 'LIKE'}
                onClick={() =>
                    void setLikedStatus(
                        likedStatus !== 'LIKE' ? 'LIKE' : 'NONE' /* <- TODO: [6] Make some toggle set wrapper */,
                    )
                }
            >
                <Article content="👍" isUsingOpenmoji />
            </button>
            <button
                className={classNames('button', styles.button)}
                data-active={likedStatus === 'DISLIKE'}
                onClick={() =>
                    void setLikedStatus(
                        likedStatus !== 'DISLIKE' ? 'DISLIKE' : 'NONE' /* <- TODO: [6] Make some toggle set wrapper */,
                    )
                }
            >
                <Article content="👎" isUsingOpenmoji />
            </button>
        </>
    );
}
