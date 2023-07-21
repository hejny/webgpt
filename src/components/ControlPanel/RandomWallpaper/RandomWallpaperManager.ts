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
        await this.fetchRandomWallpaper();
    }

    private randomWallpapars: Array<IWallpaper> = [];

    private async fetchRandomWallpaper() {
        const response = await fetch(`${NEXT_PUBLIC_URL.href}api/random-wallpaper`);
        const { randomWallpaper: randomWallpaperSerialized } = (await response.json()) as RandomWallpaperResponse;
        const randomWallpaper = hydrateWallpaper(randomWallpaperSerialized);
        console.info(`🎲 Pre-fetching next random wallpaper`, { randomWallpaper });

        this.randomWallpapars.push(randomWallpaper);

        // !!!! Dynamically replace the wallpaper
        // Note: !!!!
        /* not await */ fetch(`/${randomWallpaper.id}`);
        /* not await */ fetch(randomWallpaper.src);
    }

    /**
     * Note: This function is not async because it is much easier to use in the UI
     *       If the wallpaper is not loaded yet, it will throw an error
     */
    public getRandomWallpaper() {
        const randomWallpaper = this.randomWallpapars.pop();
        if (!randomWallpaper) {
            throw new Error(`Random wallpaper is not loaded yet`);
        }
        return randomWallpaper;
    }
}

/**
 * TODO: Cache the wallpaper in localStorage
 * TODO: Minimize load on server
 */
