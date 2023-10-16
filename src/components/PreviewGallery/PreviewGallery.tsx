import { useMemo } from 'react';
import { NEXT_PUBLIC_URL } from '../../../config';
import { Color } from '../../utils/color/Color';
import { usePromise } from '../../utils/hooks/usePromise';
import { randomItem } from '../../utils/randomItem';
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
            let welcomeWallpapers = await RandomWallpaperManager.getInstance().getWelcomeWallpapers();

            welcomeWallpapers = welcomeWallpapers.filter(
                ({ id }) =>
                    id !==
                    'caadd184-364b-4ec7-a0cc-436d0e3b5330' /* <- Note: Filtering out Ainautes which are added as deployed version */,
            );

            welcomeWallpapers = [
                randomItem(...welcomeWallpapers),
                randomItem(...welcomeWallpapers) /* <- TODO: randomItems(2,...welcomeWallpapers) */,
            ];

            let wallpapers = welcomeWallpapers.map(({ id, primaryColor }) => ({
                id,
                src: `${NEXT_PUBLIC_URL.href}/${id}?role=visitor`,
                primaryColor: Color.fromString(primaryColor),
            }));

            wallpapers = [
                { id: 'pavolhejny.com', src: 'https://www.pavolhejny.com/', primaryColor: Color.fromString('#ffe5b3') },
                { id: 'ainautes.com', src: 'https://www.ainautes.com/', primaryColor: Color.fromString('#270e1b') },
                ...wallpapers,
            ];

            wallpapers = shuffleItems(...wallpapers);

            return wallpapers;
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
            <h2>Portfolio</h2>
            <p style={{ textAlign: 'center' }}>
                Theese are some <b>random</b> picked websites that are created by WebGPT:
            </p>
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

/**
 * TODO: !! Pick different wallpapers by color
 * TODO: !! Preview on different devices and scales
 */
