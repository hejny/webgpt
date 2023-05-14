import Image from 'next/image';
import { IWallpaper } from '../../../assets/ai/wallpaper/IWallpaper';
import { colorToDataUrl } from '../../utils/color/utils/colorToDataUrl';
import styles from './HeaderWallpaper.module.css';

interface IHeaderWallpaperProps {
    wallpaper: IWallpaper;
}

/**
 * @@
 */
export function HeaderWallpaper(props: IHeaderWallpaperProps) {
    const {
        wallpaper: { src, prompt, colorStats },
    } = props;

    // const {mainBackground} = skinFromWallpaper(Wallpaper);

    const quality = 97;
    const width = 1920;

    return (
        <div className={styles.HeaderWallpaper} style={{ backgroundColor: colorStats.averageColor.toHex() }}>
            <div className={styles.inner}>
                <Image
                    src={src}
                    alt={prompt}
                    draggable="false"
                    placeholder="blur"
                    blurDataURL={colorToDataUrl(colorStats.averageColor)}
                    height={Math.round((width / 1920) * 1080)}
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                    {...{ width, quality }}
                />
            </div>
        </div>
    );
}
