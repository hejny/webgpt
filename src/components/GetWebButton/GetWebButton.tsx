import Link from 'next/link';
import { useContext } from 'react';
import { classNames } from '../../utils/classNames';
import { Color } from '../../utils/color/Color';
import { hslToRgb } from '../../utils/color/internal-utils/hslToRgb';
import { rgbToHsl } from '../../utils/color/internal-utils/rgbToHsl';
import { furthest } from '../../utils/color/operators/furthest';
import { randomItem } from '../../utils/color/randomItem';
import { useWallpaper, WallpapersContext } from '../../utils/hooks/useWallpaper';
import { Article } from '../Article/Article';
import styles from './GetWebButton.module.css';

/**
 * @@
 */
export function GetWebButton() {
    // TODO: const {mainBackground}= useSkin();

    const { colorStats } = useWallpaper();
    const wallpapers = useContext(WallpapersContext);

    // TODO: !!! Fix mostSaturatedColor then use colorStats.mostSaturatedColor.toHex()
    const backgroundColor = Color.from(`#60f1a8`);

    const minorButtonStyle = {
        backgroundColor: backgroundColor
            .then((color) => {
                // TODO: Color operator desaturate
                let [hue, saturation, light] = rgbToHsl(color.red, color.green, color.blue);
                saturation = saturation / 2;
                return Color.fromValues(...hslToRgb(hue, saturation, light));
            })
            .toHex(),
        color: backgroundColor.then(furthest(Color.from('#fff'), Color.from('#000'))).toHex(),
    };

    return (
        <div className={styles.GetWebButton} /*style={{backgroundColor: mainBackground.then(negative).toHex()}}*/>
            <Link
                href={'mailto:me@pavolhejny.com'}
                className={classNames('button', styles.getButton)}
                style={{
                    backgroundColor: backgroundColor.toHex(),
                    color: backgroundColor.then(furthest(Color.from('#fff'), Color.from('#000'))).toHex(),
                }}
            >
                <Article content="I ❤ this web!" isEnhanced />
            </Link>
            <div>
                <Link href={'/'} className={classNames('button', styles.galleryButton)} style={minorButtonStyle}>
                    Gallery
                </Link>
                <Link
                    // TODO: !!!! Fix random
                    href={
                        '/showcase/' +
                        randomItem(
                            ...wallpapers.map(({ id }) => id) /* <- TODO: Filter itself + simmilar + already picked */,
                        )
                    }
                    className={classNames('button', styles.randomButton)}
                    style={minorButtonStyle}
                >
                    Random
                </Link>
            </div>
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
 * TODO: !! Use translate
 * TODO: !! [🧶] Show here prompt, link to midjourney, how it was made,...
 */
