import { useMemo } from 'react';
import { NEXT_PUBLIC_URL } from '../../../config';
import { Color } from '../../utils/color/Color';
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

            // TODO: !!! Always add Ainautes and Pavolhejny
            // TODO: !!! Pick different wallpapers by color
            // TODO: !!! Preview on different devices and scales

            return wallpapers.map(({ id, primaryColor }) => ({
                id,
                src: `${NEXT_PUBLIC_URL.href}/${id}?role=visitor`,
                primaryColor: Color.fromString(primaryColor),
            }));
        },
        [
            // Note: Do just once per page load
        ],
    );
    const { value: wallpapers } = usePromise(wallpapersPromise);

    if (!wallpapers) {
        return <>{/* TODO: Maybe some loading */}</>;
    }

    return (
        <div className={styles.PreviewGallery}>
            <h2>Samples</h2>
            <div className={styles.PreviewGalleryItems}>
                {wallpapers.map((wallpaper) => (
                    <DeviceIframe
                        key={wallpaper.id}
                        className={styles.PreviewGalleryItem}
                        src={wallpaper.src}
                        color={wallpaper.primaryColor}
                        isInteractive={false}
                    />
                ))}
            </div>
        </div>
    );
}
