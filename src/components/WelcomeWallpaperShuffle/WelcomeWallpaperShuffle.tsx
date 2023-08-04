import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { usePromise } from '../../utils/hooks/usePromise';
import { RandomWallpaperManager } from '../ControlPanel/RandomWallpaper/RandomWallpaperManager';
import styles from './WelcomeWallpaperShuffle.module.css';

interface WelcomeWallpaperShuffleProps {}

/**
 * @@
 */
export function WelcomeWallpaperShuffle(props: WelcomeWallpaperShuffleProps) {
    const randomWallpapersPromises = useMemo(() => {
        const randomWallpaperManager = RandomWallpaperManager.getInstance();

        return [
            /* not await */ randomWallpaperManager.getRandomWallpaper(),
            ///* not await */ randomWallpaperManager.getRandomWallpaper(),
            ///* not await */ randomWallpaperManager.getRandomWallpaper(),
        ];
    }, []);

    // TODO: useTimer
    const [index, setIndex] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex(index + 1);
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [index, setIndex]);

    const { value: randomWallpaper } = usePromise(randomWallpapersPromises[index % randomWallpapersPromises.length]);

    if (!randomWallpaper) {
        return <></>;
    }

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
