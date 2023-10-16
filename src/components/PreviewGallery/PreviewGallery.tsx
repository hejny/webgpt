import { useMemo } from 'react';
import { NEXT_PUBLIC_URL } from '../../../config';
import { usePromise } from '../../utils/hooks/usePromise';
import { shuffleItems } from '../../utils/shuffleItems';
import { RandomWallpaperManager } from '../ControlPanel/RandomWallpaper/RandomWallpaperManager';
import { DeviceIframe } from '../DeviceIframe/DeviceIframe';
import styles from './PreviewGallery.module.css';

/**
 * Renders a preview gallery of deployed and sample websites on main page
 */
export function PreviewGallery() {
    // TODO: Make useAsyncMemo hook

    const wallpapersPromise = useMemo(
        async () => {
            let wallpapers = await RandomWallpaperManager.getInstance().getWelcomeWallpapers();
            wallpapers = shuffleItems(...wallpapers);
            wallpapers = wallpapers.slice(0, 4);

            // TODO: !!! Return full URLs
            // TODO: !!! Always add Ainautes and Pavolhejny
            // TODO: !!! Pick different wallpapers by color
            // TODO: !!! Preview on different devices and scales
            return wallpapers;
        },
        [
            // Note: Do just once per page load
        ],
    );
    const { value: wallpapers } = usePromise(wallpapersPromise);

    if (!wallpapers) {
        return <div className={styles.PreviewGallery}>Loading...</div>;
    }

    return (
        <div className={styles.PreviewGallery}>
            <h2>Samples</h2>
            <div className={styles.PreviewGalleryItems}>
                {wallpapers.map((wallpaper) => (
                    <DeviceIframe
                        key={wallpaper.id}
                        className={styles.PreviewGalleryItem}
                        src={`${NEXT_PUBLIC_URL.href}/${wallpaper.id}?role=visitor`}
                        // TODO: !!! color={wallpaper.color}
                        isInteractive={false}
                    />
                ))}
            </div>
        </div>
    );
}
