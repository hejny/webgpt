// !!!!!!!Anotate
// !!!!!!!Split to files - use singleton pattern - create on first use

import { NEXT_PUBLIC_URL } from '../../../../config';
import { RandomWallpaperResponse } from '../../../pages/api/random-wallpaper';
import { hydrateWallpaper } from '../../../utils/hydrateWallpaper';
import { IWallpaper } from '../../../utils/IWallpaper';

export class RandomWallpaperManager {
    public constructor() {
        /* not await */ this.init();
    }

    private async init() {
        await this.prefetchRandomWallpaper();
    }

    private async fetchRandomWallpaper(): Promise<IWallpaper> {
        const response = await fetch(`${NEXT_PUBLIC_URL.href}api/random-wallpaper`);
        const { randomWallpaper: randomWallpaperSerialized } = (await response.json()) as RandomWallpaperResponse;
        const randomWallpaper = hydrateWallpaper(randomWallpaperSerialized);
        console.info(`🎲 Pre-fetching next random wallpaper`, { randomWallpaper });

        // !!!! Dynamically replace the wallpaper
        // Note: !!!!
        /* not await */ fetch(`/${randomWallpaper.id}`);
        /* not await */ fetch(randomWallpaper.src);

        return randomWallpaper;
    }

    private prefetchedRandomWallpapers: Array<IWallpaper> = [];

    private async prefetchRandomWallpaper(): Promise<void> {
        const randomWallpaper = await this.fetchRandomWallpaper();
        this.prefetchedRandomWallpapers.push(randomWallpaper);
    }

    public async getRandomWallpaper(): Promise<IWallpaper> {
        const randomWallpaper = this.prefetchedRandomWallpapers.pop();
        if (randomWallpaper) {
            return randomWallpaper;
        } else {
            return await this.fetchRandomWallpaper();
        }
    }
}

/**
 * TODO: Cache the wallpaper in localStorage
 * TODO: Minimize load on server
 */
