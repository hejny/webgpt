import { NEXT_PUBLIC_URL } from '../../../../config';
import { RandomWallpaperResponse } from '../../../pages/api/random-wallpaper';
import { IWallpaperSerialized } from '../../../utils/IWallpaper';
import { string_wallpaper_id } from '../../../utils/typeAliases';

export type IWallpaperInStorage = Pick<IWallpaperSerialized, 'id' | 'src'>;

/**
 * RandomWallpaperManager is a class that manages the random wallpapers which will be shown next.
 * It pre-fetches the next wallpaper and image to make the transition smoother.
 */
export class RandomWallpaperManager {
    public constructor() {
        this.preloadGalleryElement = document.createElement('div');
        this.preloadGalleryElement.dataset.comment = `Note: This is just for preloading the next wallpapers images to make the transition smoother`;
        this.preloadGalleryElement.style.position = 'fixed';
        this.preloadGalleryElement.style.top = '10px';
        this.preloadGalleryElement.style.left = '10px';
        this.preloadGalleryElement.style.opacity = '0';
        this.preloadGalleryElement.style.pointerEvents = 'none';
        document.body.appendChild(this.preloadGalleryElement);
        this.prefetchingRandomWallpapers = this.getStorage().map((randomWallpaper) =>
            this.preloadRandomWallpaper(randomWallpaper),
        );

        /* not await */ this.prefetch();
    }

    private preloadGalleryElement: HTMLDivElement;
    private prefetchingRandomWallpapers: Array<Promise<IWallpaperInStorage>> = [];

    private async fetchRandomWallpaper(isPrefetch: boolean): Promise<IWallpaperInStorage> {
        const response = await fetch(`${NEXT_PUBLIC_URL.href}api/random-wallpaper`);
        const { randomWallpaper } = (await response.json()) as RandomWallpaperResponse;

        if (isPrefetch) {
            this.inStorage((randomWallpapers) => {
                const { id, src } = randomWallpaper;
                randomWallpapers.push({ id, src });
                return randomWallpapers;
            });
        }

        console.info(`🎲 ${isPrefetch ? 'Pre-' : ''}Fetched random wallpaper`, { randomWallpaper });

        this.preloadRandomWallpaper(randomWallpaper);
        return randomWallpaper;
    }

    private async preloadRandomWallpaper(randomWallpaper: IWallpaperInStorage) {
        // Note: Pre-fetching the wallpaper to trigger ISR (Incremental Static Regeneration)
        /* not await */ fetch(`/${randomWallpaper.id}`);

        // Note: Pre-loading the wallpaper image to make the transition smoother
        const imageElement = new Image();
        imageElement.src = randomWallpaper.src;
        imageElement.style.height = '10px';
        this.preloadGalleryElement.appendChild(imageElement);

        await new Promise<void>((resolve) => {
            const onLoad = () => {
                resolve();
                imageElement.removeEventListener('load', onLoad);
            };
            imageElement.addEventListener('load', onLoad);
        });

        return randomWallpaper;
    }

    private getStorage(): Array<IWallpaperInStorage> {
        return JSON.parse(window.localStorage.getItem('randomWallpapers') || '[]') as Array<IWallpaperInStorage>;
    }
    private inStorage(modifier: (randomWallpapers: Array<IWallpaperInStorage>) => Array<IWallpaperInStorage>): void {
        const oldRandomWallpapers = this.getStorage();
        const newRandomWallpapers = modifier([...oldRandomWallpapers]);
        console.log({ oldRandomWallpapers, newRandomWallpapers });
        window.localStorage.setItem('randomWallpapers', JSON.stringify(newRandomWallpapers));
    }

    private async prefetch(): Promise<void> {
        if (this.prefetchingRandomWallpapers.length >= 2) {
            return;
        }

        this.prefetchingRandomWallpapers.push(/* not await */ this.fetchRandomWallpaper(true));
        await this.prefetch();
    }

    public async consumeRandomWallpaper(currentWallpaperId: string_wallpaper_id): Promise<IWallpaperInStorage> {
        const randomWallpaper = await this.prefetchingRandomWallpapers.shift(/* <- TODO: DO here a Promise.race */);

        if (randomWallpaper) {
            this.inStorage((randomWallpapers) => {
                return randomWallpapers.filter((randomWallpaper2) => randomWallpaper.id !== randomWallpaper2.id);
            });
        }

        // console.log('currentWallpaperId', currentWallpaperId);
        // console.log('this.prefetchedRandomWallpapers', [...this.prefetchedRandomWallpapers]);
        // console.log('randomWallpaper', randomWallpaper);

        setTimeout(() => {
            /* not await */ this.prefetch();
        }, 100 /* <- Note: At first load the returned wallpaper THEN load the prefetched one(s) */);

        if (randomWallpaper) {
            console.info(`🎲 Consuming prefetched random wallpaper`, { randomWallpaper, currentWallpaperId });
            return randomWallpaper;
        } else {
            const randomWallpaper = await this.fetchRandomWallpaper(false);
            console.info(`🎲 Consuming on-demand random wallpaper`, { randomWallpaper, currentWallpaperId });
            return randomWallpaper;
        }
    }
}

/**
 * TODO: Cache the wallpaper in localStorage
 * TODO: Minimize load on server
 */
