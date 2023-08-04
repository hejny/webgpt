import Link from 'next/link';
import { useMemo } from 'react';
import { usePromise } from '../../utils/hooks/usePromise';
import { RandomWallpaperManager } from '../ControlPanel/RandomWallpaper/RandomWallpaperManager';
import styles from './WelcomeWallpaperShuffle.module.css';

interface WelcomeWallpaperShuffleProps {}

/**
 * @@
 */
export function WelcomeWallpaperShuffle(props: WelcomeWallpaperShuffleProps) {
    const randomWallpaperPromise = useMemo(() => {
        return /* not await */ RandomWallpaperManager.getInstance().getRandomWallpaper();
    }, []);
    const { value: randomWallpaper } = usePromise(randomWallpaperPromise);

    if (!randomWallpaper) {
        return <></>;
    }

    const src = `/${randomWallpaper.id}`;

    return (
        <Link
            className={styles.WelcomeWallpaperShuffle}
            href={`/${randomWallpaper.id}`}
            prefetch={false /* <- Note: Because already prefetching by rendering <iframe/> */}
        >
            <iframe
                src={`/${randomWallpaper.id}?mode=presentation`}
                frameBorder="0"
                style={{ pointerEvents: 'none' }}
            />
        </Link>
    );

    // TODO: Remove OR use this:
    //     > return <DeviceIframe src={`/${randomWallpaper.id}`} isInteractive={false} />;
}
