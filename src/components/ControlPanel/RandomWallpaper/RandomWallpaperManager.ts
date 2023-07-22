import { NEXT_PUBLIC_URL } from '../../../../config';
import { RandomWallpaperResponse } from '../../../pages/api/random-wallpaper';
import { hydrateWallpaper } from '../../../utils/hydrateWallpaper';
import { IWallpaper } from '../../../utils/IWallpaper';
import { string_wallpaper_id } from '../../../utils/typeAliases';

/**
 * RandomWallpaperManager is a class that manages the random wallpapers which will be shown next.
 * It pre-fetches the next wallpaper and image to make the transition smoother.
 */
export class RandomWallpaperManager {
    public constructor() {
        this.preloadGallery = document.createElement('div');
        this.preloadGallery.dataset.comment = `Note: This is just for preloading the next wallpapers images to make the transition smoother`;
        this.preloadGallery.style.position = 'fixed';
        this.preloadGallery.style.top = '10px';
        this.preloadGallery.style.left = '10px';
        this.preloadGallery.style.opacity = '0';
        this.preloadGallery.style.pointerEvents = 'none';
        document.body.appendChild(this.preloadGallery);
        /* not await */ this.init();
    }

    private preloadGallery: HTMLDivElement;

    private async init() {
        /* not await */ this.prefetch();
    }

    private async fetchRandomWallpaper(isPrefetch: boolean): Promise<IWallpaper> {
        const response = await fetch(`${NEXT_PUBLIC_URL.href}api/random-wallpaper`);
        const { randomWallpaper: randomWallpaperSerialized } = (await response.json()) as RandomWallpaperResponse;
        const randomWallpaper = hydrateWallpaper(randomWallpaperSerialized);
        console.info(`🎲 ${isPrefetch ? 'Pre-' : ''}Fetching next random wallpaper`, { randomWallpaper });

        // Note: Pre-fetching the wallpaper to trigger ISR (Incremental Static Regeneration)
        /* not await */ fetch(`/${randomWallpaper.id}`);

        // Note: Pre-loading the wallpaper image to make the transition smoother
        const imageElement = new Image();
        imageElement.src = randomWallpaper.src;
        imageElement.style.height = '10px';
        this.preloadGallery.appendChild(imageElement);

        await new Promise<void>((resolve) => {
            const onLoad = () => {
                resolve();
                imageElement.removeEventListener('load', onLoad);
            };
            imageElement.addEventListener('load', onLoad);
        });

        return randomWallpaper;
    }

    private prefetchingRandomWallpapers: Array<Promise<IWallpaper>> = [];

    private async prefetch(): Promise<void> {
        if (this.prefetchingRandomWallpapers.length >= 2) {
            return;
        }

        this.prefetchingRandomWallpapers.push(/* not await */ this.fetchRandomWallpaper(true));
        await this.prefetch();
    }

    public async getRandomWallpaper(currentWallpaperId: string_wallpaper_id): Promise<IWallpaper> {
        const randomWallpaper = await this.prefetchingRandomWallpapers.shift(/* <- TODO: DO here a Promise.race */);

        // console.log('currentWallpaperId', currentWallpaperId);
        // console.log('this.prefetchedRandomWallpapers', [...this.prefetchedRandomWallpapers]);
        // console.log('randomWallpaper', randomWallpaper);

        setTimeout(() => {
            /* not await */ this.prefetch();
        }, 100 /* <- Note: At first load the returned wallpaper THEN load the prefetched one(s) */);

        if (randomWallpaper) {
            return randomWallpaper;
        } else {
            return await this.fetchRandomWallpaper(false);
        }
    }
}

/**
 * TODO: Cache the wallpaper in localStorage
 * TODO: Minimize load on server
 */
