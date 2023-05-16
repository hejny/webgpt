import Image from 'next/image';
import { colorToDataUrl } from '../../utils/color/utils/colorToDataUrl';
import { useWallpaper } from '../../utils/hooks/useWallpaper';
import styles from './HeaderWallpaper.module.css';

/**
 * @@
 */
export function HeaderWallpaper() {
    const { src, prompt, colorStats } = useWallpaper();

    const quality = 97;
    const width = 1920;

    return (
        <div className={styles.HeaderWallpaper} style={{ backgroundColor: colorStats.averageColor.toHex() }}>
            <div className={styles.inner}>
                <Image
                    src={src} /* <- TODO: Here should be really upscaled version by Upscalyr */
                    alt={prompt}
                    draggable="false"
                    placeholder="blur"
                    blurDataURL={colorToDataUrl(colorStats.averageColor)}
                    height={Math.round((width / 1920) * 1080)}
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                    {...{ width, quality }}
                    id="HeaderWallpaper" /* <- Note: Used for quick refresh [🤰] */
                />
            </div>
        </div>
    );
}
