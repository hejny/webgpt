import { IWallpaperComponent } from '../../../assets/ai/wallpaper/IWallpaperComponent';
import styles from './HeaderWallpaper.module.css';

interface IHeaderWallpaperProps {
    Wallpaper: IWallpaperComponent;
}

/**
 * @@
 */
export function HeaderWallpaper(props: IHeaderWallpaperProps) {
    const { Wallpaper } = props;

    // const {mainBackground} = skinFromWallpaper(Wallpaper);

    return (
        <div
            className={styles.HeaderWallpaper}
            style={{ backgroundColor: Wallpaper.colorStats.mostFrequentColor.toHex() }}
        >
            <div className={styles.inner}>
                <Wallpaper quality={97} width={1920 * 2} />
            </div>
        </div>
    );
}
