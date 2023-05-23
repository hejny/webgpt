import Link from 'next/link';
import { LikedStatus } from '../../sections/ShowcaseContentWithEdit/ShowcaseContentWithEdit';
import { classNames } from '../../utils/classNames';
import { Color } from '../../utils/color/Color';
import { hslToRgb } from '../../utils/color/internal-utils/hslToRgb';
import { rgbToHsl } from '../../utils/color/internal-utils/rgbToHsl';
import { textColor } from '../../utils/color/operators/furthest';
import { colorToDataUrl } from '../../utils/color/utils/colorToDataUrl';
import { IWallpaper } from '../../utils/IWallpaper';
import { Article } from '../Article/Article';
import styles from './GetWebButton.module.css';

interface GetWebButtonProps {
    randomWallpaper: IWallpaper;

    likedStatus: LikedStatus;
    setLikedStatus(likedStatus: LikedStatus): void;

    turnOnEditing(): void;
    turnOnPresenting(): void;
}

/**
 * @@
 */
export function GetWebButton(props: GetWebButtonProps) {
    const { randomWallpaper, likedStatus, setLikedStatus, turnOnEditing, turnOnPresenting } = props;

    // TODO: !!! Fix mostSaturatedColor then use colorStats.mostSaturatedColor.toHex()
    const backgroundColor = Color.from(`#8dc1e4`);

    const minorButtonStyle = {
        backgroundColor: backgroundColor
            .then((color) => {
                // TODO: Color operator desaturate
                let [hue, saturation, light] = rgbToHsl(color.red, color.green, color.blue);
                saturation = saturation / 2;
                return Color.fromValues(...hslToRgb(hue, saturation, light));
            })
            .toHex(),
        color: backgroundColor.then(textColor).toHex(),
    };

    return (
        <div
            className={classNames(
                'aiai-controls',
                styles.GetWebButton,
            )} /*style={{backgroundColor: mainBackground.then(negative).toHex()}}*/
        >
            <button
                onClick={() => void setLikedStatus('LOVE')}
                // TODO: !!! Make some call-to-action> href={'mailto:me@pavolhejny.com'}
                className={classNames('button', styles.button, likedStatus === 'LOVE' && styles.active)}
                style={{
                    backgroundColor: backgroundColor.toHex(),
                    color: backgroundColor.then(textColor).toHex(),
                }}
            >
                <Article content="I ❤ this web!" isEnhanced />
            </button>

            <button
                onClick={() => void setLikedStatus('LIKE')}
                className={classNames('button', styles.button, likedStatus === 'LIKE' && styles.active)}
                style={{
                    backgroundColor: backgroundColor.toHex(),
                    color: backgroundColor.then(textColor).toHex(),
                }}
            >
                <Article content="👍" isEnhanced />
            </button>
            <button
                onClick={() => void setLikedStatus('DISLIKE')}
                className={classNames('button', styles.button, likedStatus === 'DISLIKE' && styles.active)}
                style={{
                    backgroundColor: backgroundColor.toHex(),
                    color: backgroundColor.then(textColor).toHex(),
                }}
            >
                <Article content="👎" isEnhanced />
            </button>

            <Link
                href={'/'}
                className={classNames('button', styles.button)}
                style={minorButtonStyle}
                prefetch={false /* <- Note: Because gallery is enormous */}
            >
                <Article content="🖼" isEnhanced />
            </Link>
            <Link
                href={`/showcase/${randomWallpaper.id}`}
                onClick={() => {
                    // Note: No need for preventDefault
                    //  [🤰] Just quick-change the HeaderWallpaper for upgoing color

                    const headerWallpaperElement = document.getElementById('HeaderWallpaper')!;

                    console.log('HeaderWallpaper', headerWallpaperElement);

                    // !!! Is this working?
                    headerWallpaperElement.setAttribute('src', colorToDataUrl(randomWallpaper.colorStats.averageColor));
                    headerWallpaperElement.removeAttribute('srcset');
                }}
                /* Note: randomWallpaper image is prefetched here -> [🤰] */
                className={classNames('button', styles.button)}
                style={{
                    ...minorButtonStyle,

                    backgroundColor: randomWallpaper.colorStats.averageColor.toHex(),
                    color: randomWallpaper.colorStats.averageColor.then(textColor).toHex(),
                }}
            >
                <Article content="🎲" isEnhanced />
            </Link>
            <button
                onClick={turnOnEditing}
                className={classNames('button', styles.button)}
                style={{
                    ...minorButtonStyle,
                }}
            >
                <Article content="🖊" isEnhanced />
            </button>

            <button
                onClick={turnOnPresenting}
                className={classNames('button', styles.button)}
                style={{
                    ...minorButtonStyle,
                }}
            >
                <Article content="▶" isEnhanced />
            </button>
        </div>
    );
}

/**
 * TODO: Edit on GitHub button | Each wallpaper in each subfolder+ gallery/a/b/id/....ext
 * TODO: !!! [🤰] Pick one working method for immediate change of HeaderWallpaper and cleanup rest
 * TODO: !!! No outline - simpler design
 * TODO: !!! On mobile
 * TODO: !!! [Previous][Next]
 * TODO: !!! [Simmilar]
 * TODO: !! [👕] [Change photo]
 * TODO: !! [👕] [Change content] to change the markdown
 * TODO: !!! Allow to => export (+Collboard export) => Buy
 * TODO: !! Rename component to something more meaningful
 * TODO: !! Use translate
 * TODO: !! [🧶] Show here prompt, link to midjourney, how it was made,...
 */
