// !!!!!!!Anotate
// !!!!!!!Split to files - use singleton pattern - create on first use

import { NEXT_PUBLIC_URL } from '../../../../config';
import { RandomWallpaperResponse } from '../../../pages/api/random-wallpaper';
import { hydrateWallpaper } from '../../../utils/hydrateWallpaper';
import { IWallpaper } from '../../../utils/IWallpaper';
import { string_wallpaper_id } from '../../../utils/typeAliases';

export class RandomWallpaperManager {
    public constructor() {
        this.preloadGallery = document.createElement('div');
        this.preloadGallery.style.position = 'fixed';
        this.preloadGallery.style.top = '10px';
        this.preloadGallery.style.left = '10px';
        document.body.appendChild(this.preloadGallery);
        /* not await */ this.init();
    }

    private preloadGallery: HTMLDivElement;

    private async init() {
        /* not await */ this.prefetchRandomWallpaper();
    }

    private async fetchRandomWallpaper(isPrefetch: boolean): Promise<IWallpaper> {
        const response = await fetch(`${NEXT_PUBLIC_URL.href}api/random-wallpaper`);
        const { randomWallpaper: randomWallpaperSerialized } = (await response.json()) as RandomWallpaperResponse;
        const randomWallpaper = hydrateWallpaper(randomWallpaperSerialized);
        console.info(`🎲 ${isPrefetch ? 'Pre-' : ''}Fetching next random wallpaper`, { randomWallpaper });

        // Note: Pre-fetching the wallpaper to trigger ISR (Incremental Static Regeneration)
        /* not await */ fetch(`/${randomWallpaper.id}`);

        // Note: !!!!
        /// !!!!/* not await */ fetch(randomWallpaper.src);
        const imageElement = new Image();
        imageElement.src = randomWallpaper.src;
        imageElement.style.width = '100px';
        imageElement.style.height = '100px';
        this.preloadGallery.appendChild(imageElement);

        return randomWallpaper;
    }

    private prefetchedRandomWallpapers: Array<IWallpaper> = [];

    private async prefetchRandomWallpaper(): Promise<void> {
        const randomWallpaper = await this.fetchRandomWallpaper(true);
        this.prefetchedRandomWallpapers.push(randomWallpaper);
    }

    public async getRandomWallpaper(currentWallpaperId: string_wallpaper_id): Promise<IWallpaper> {
        const randomWallpaper = this.prefetchedRandomWallpapers.shift();

        console.log('!!! currentWallpaperId', currentWallpaperId);
        console.log('!!! this.prefetchedRandomWallpapers', [...this.prefetchedRandomWallpapers]);
        console.log('!!! randomWallpaper', randomWallpaper);

        if (this.prefetchedRandomWallpapers.length === 0) {
            /* not await */ this.prefetchRandomWallpaper();
        }

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
