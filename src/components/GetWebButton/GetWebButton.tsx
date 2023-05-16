import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { classNames } from '../../utils/classNames';
import { Color } from '../../utils/color/Color';
import { hslToRgb } from '../../utils/color/internal-utils/hslToRgb';
import { rgbToHsl } from '../../utils/color/internal-utils/rgbToHsl';
import { textColor } from '../../utils/color/operators/furthest';
import { useWallpaper, WallpapersContext } from '../../utils/hooks/useWallpaper';
import { IWallpaper } from '../../utils/IWallpaper';
import { Article } from '../Article/Article';
import styles from './GetWebButton.module.css';

interface GetWebButtonProps {
    randomWallpaper: IWallpaper;
}

/**
 * @@
 */
export function GetWebButton(props: GetWebButtonProps) {
    const { randomWallpaper } = props;

    // TODO: const {mainBackground}= useSkin();

    const { colorStats } = useWallpaper();
    const wallpapers = useContext(WallpapersContext);
    const router = useRouter();

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
        <div className={styles.GetWebButton} /*style={{backgroundColor: mainBackground.then(negative).toHex()}}*/>
            <Link
                href={'mailto:me@pavolhejny.com'}
                className={classNames('button', styles.getButton)}
                style={{
                    backgroundColor: backgroundColor.toHex(),
                    color: backgroundColor.then(textColor).toHex(),
                }}
            >
                <Article content="I ❤ this web!" isEnhanced />
            </Link>

            <Link
                href={'/'}
                className={classNames('button', styles.galleryButton)}
                style={minorButtonStyle}
                prefetch={false}
            >
                <Article content="Gallery" isEnhanced />
            </Link>
            <Link
                href={`/showcase/${randomWallpaper.id}`}
                prefetch={true}
                /* Note: randomWallpaper image is prefetched here -> [🤰] */
                className={classNames('button', styles.randomButton)}
                style={{
                    ...minorButtonStyle,

                    backgroundColor: randomWallpaper.colorStats.averageColor.toHex(),
                    color: randomWallpaper.colorStats.averageColor.then(textColor).toHex(),
                }}
            >
                <Article content="🎲" isEnhanced />
            </Link>
        </div>
    );
}

/**
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
