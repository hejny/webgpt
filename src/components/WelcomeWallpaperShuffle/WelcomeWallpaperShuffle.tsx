import { useMemo } from 'react';
import { usePromise } from '../../utils/hooks/usePromise';
import { randomWallpaperManager } from '../ControlPanel/RandomWallpaper/RandomWallpaperManager';
import { DeviceIframe } from '../DeviceIframe/DeviceIframe';

interface WelcomeWallpaperShuffleProps {}

/**
 * @@
 */
export function WelcomeWallpaperShuffle(props: WelcomeWallpaperShuffleProps) {
    const randomWallpaperPromise = useMemo(() => {
        return /* not await */ randomWallpaperManager.getRandomWallpaper();
    }, []);
    const { value: randomWallpaper } = usePromise(randomWallpaperPromise);

    if (!randomWallpaper) {
        return <></>;
    }

    return <DeviceIframe src={`/${randomWallpaper.id}`} isInteractive={false} />;
}
