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

    private prefetchedRandomWallpapers: Array<IWallpaper> = [];
    private prefetchingCount = 0;

    private async prefetchRandomWallpaper(): Promise<void> {
        this.prefetchingCount++;
        try {
            const randomWallpaper = await this.fetchRandomWallpaper(true);
            this.prefetchedRandomWallpapers.push(randomWallpaper);
        } finally {
            this.prefetchingCount--;
        }
    }

    private async prefetch(): Promise<void> {
        if (this.prefetchedRandomWallpapers.length + this.prefetchingCount >= 2) {
            /* not await */
        }

        await this.prefetchRandomWallpaper();
        await this.prefetch();
    }

    public async getRandomWallpaper(currentWallpaperId: string_wallpaper_id): Promise<IWallpaper> {
        const randomWallpaper = this.prefetchedRandomWallpapers.shift();

        // console.log('currentWallpaperId', currentWallpaperId);
        // console.log('this.prefetchedRandomWallpapers', [...this.prefetchedRandomWallpapers]);
        // console.log('randomWallpaper', randomWallpaper);

        /* not await */ this.prefetch();

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
