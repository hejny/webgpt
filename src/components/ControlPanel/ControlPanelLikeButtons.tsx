import { classNames } from '../../utils/classNames';
import { Color } from '../../utils/color/Color';
import { textColor } from '../../utils/color/operators/furthest';
import { useLikedStatusOfCurrentWallpaper } from '../../utils/hooks/useLikedStatusOfCurrentWallpaper';
import { Article } from '../Article/Article';
import styles from '../ControlPanel/ControlPanel.module.css';

/**
 * @@@
 */
export function ControlPanelLikeButtons() {
    const [likedStatus, setLikedStatus] = useLikedStatusOfCurrentWallpaper();

    // TODO: !!! Fix mostSaturatedColor then use colorStats.mostSaturatedColor.toHex()
    const backgroundColor = Color.from(`#8dc1e4`);

    return (
        <>
            <button
                // TODO: !!! Make some call-to-action> href={'mailto:me@pavolhejny.com'}

                className={classNames('button', styles.button)}
                style={{
                    backgroundColor: backgroundColor.toHex(),
                    color: backgroundColor.then(textColor).toHex(),
                }}
                title="I love this web!"
                data-active={likedStatus === 'LOVE'}
                onClick={() =>
                    void setLikedStatus(
                        likedStatus !== 'LOVE' ? 'LOVE' : 'NONE' /* <- TODO: [6] Make some toggle set wrapper */,
                    )
                }
            >
                <Article content="❤" isEnhanced />
            </button>

            <button
                // TODO: !!! Also listen on double-click on mobile
                className={classNames('button', styles.button)}
                style={{
                    backgroundColor: backgroundColor.toHex(),
                    color: backgroundColor.then(textColor).toHex(),
                }}
                data-active={likedStatus === 'LIKE'}
                onClick={() =>
                    void setLikedStatus(
                        likedStatus !== 'LIKE' ? 'LIKE' : 'NONE' /* <- TODO: [6] Make some toggle set wrapper */,
                    )
                }
            >
                <Article content="👍" isEnhanced />
            </button>
            <button
                className={classNames('button', styles.button)}
                style={{
                    backgroundColor: backgroundColor.toHex(),
                    color: backgroundColor.then(textColor).toHex(),
                }}
                data-active={likedStatus === 'DISLIKE'}
                onClick={() =>
                    void setLikedStatus(
                        likedStatus !== 'DISLIKE' ? 'DISLIKE' : 'NONE' /* <- TODO: [6] Make some toggle set wrapper */,
                    )
                }
            >
                <Article content="👎" isEnhanced />
            </button>
        </>
    );
}
