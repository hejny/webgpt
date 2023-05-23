import Link from 'next/link';

import { classNames } from '../../utils/classNames';
import { Color } from '../../utils/color/Color';
import { hslToRgb } from '../../utils/color/internal-utils/hslToRgb';
import { rgbToHsl } from '../../utils/color/internal-utils/rgbToHsl';
import { textColor } from '../../utils/color/operators/furthest';
import { colorToDataUrl } from '../../utils/color/utils/colorToDataUrl';
import { IWallpaper } from '../../utils/IWallpaper';
import { Article } from '../Article/Article';
import { NoSsr } from '../NoSsr/NoSsr';
import styles from './ControlPanel.module.css';
import { ControlPanelLikeButtons } from './ControlPanelLikeButtons';

interface ControlPanelProps {
    randomWallpaper: IWallpaper;
    turnOnEditing(): void;
    turnOnPresenting(): void;
}

/**
 * @@@
 */
export function ControlPanel(props: ControlPanelProps) {
    const { randomWallpaper, turnOnEditing, turnOnPresenting } = props;

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
                styles.ControlPanel,
            )} /*style={{backgroundColor: mainBackground.then(negative).toHex()}}*/
        >
            <NoSsr>
                <ControlPanelLikeButtons />
            </NoSsr>

            <Link
                href={'/'}
                className={classNames('button', styles.button)}
                style={minorButtonStyle}
                prefetch={false /* <- Note: Because gallery is enormous */}
            >
                <Article content="🖼" isEnhanced /* <- TODO: !!! Better icon OR Openmoji */ />
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
                <Article content="🎲" isEnhanced /* <- TODO: !! This should have more role like next not random */ />
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
                <Article
                    content="▶"
                    isEnhanced /* <- TODO: !!! Show the QR code before + Save to GET params to be able to send */
                />
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
