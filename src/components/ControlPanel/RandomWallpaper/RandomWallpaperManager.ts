import { Promisable } from 'type-fest';
import { forAnimationFrame, forImmediate } from 'waitasecond';
import { NEXT_PUBLIC_URL } from '../../../../config';
import { RandomWallpaperResponse } from '../../../pages/api/random-wallpaper';
import { isPrivateNetwork } from '../../../utils/isPrivateNetwork';
import { IWallpaperSerialized } from '../../../utils/IWallpaper';
import { string_wallpaper_id } from '../../../utils/typeAliases';

export type IWallpaperInStorage = Pick<IWallpaperSerialized, 'id' | 'src'>;

/**
 * RandomWallpaperManager is a class that manages the random wallpapers which will be shown next.
 * It pre-fetches the next wallpaper and image to make the transition smoother.
 *
 * @singleton
 */
export class RandomWallpaperManager {
    private static instance: RandomWallpaperManager;

    public static getInstance() {
        if (!RandomWallpaperManager.instance) {
            RandomWallpaperManager.instance = new RandomWallpaperManager();
        }

        return RandomWallpaperManager.instance;
    }

    private constructor() {
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

        /* not await */ this.prefetchIfNeeded();
    }

    private preloadGalleryElement: HTMLDivElement;
    private prefetchingRandomWallpapers: Array<Promisable<IWallpaperInStorage>> = [];

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

        console.info(
            `🎲 ${isPrefetch ? 'Pre-' : ''}Fetched random wallpaper${
                isPrefetch ? ` (${this.prefetchingRandomWallpapers.length}/${this.getPrefetchCount()})` : ''
            }`,
            { randomWallpaper },
        );

        await this.preloadRandomWallpaper(randomWallpaper);
        return randomWallpaper;
    }

    private async preloadRandomWallpaper(randomWallpaper: IWallpaperInStorage) {
        // Note: Pre-fetching the wallpaper to trigger ISR (Incremental Static Regeneration)
        await fetch(`/${randomWallpaper.id}`);

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
        // console.log({ oldRandomWallpapers, newRandomWallpapers });
        window.localStorage.setItem('randomWallpapers', JSON.stringify(newRandomWallpapers));
    }

    private getConsumedCount(): number {
        return parseInt(window.localStorage.getItem('randomWallpapersConsumedCount') || '0');
    }

    private changeByConsumedCount(consumedCountDelta: number): void {
        const oldConsumedCount = this.getConsumedCount();
        const newConsumedCount = oldConsumedCount + consumedCountDelta;
        window.localStorage.setItem('randomWallpapersConsumedCount', newConsumedCount.toString());
    }

    private getPrefetchCount(): number {
        if (isPrivateNetwork(window.location.href)) {
            // Note: When running on private network (developing) we do not want to prefetch wallpapers to not throttle the dev script
            return 0;
        }

        return Math.max(
            2,
            Math.round(Math.sqrt(this.getConsumedCount())),
        ); /* <- Some better algoritm for predicting how many wallpapers to preload */
    }

    private async prefetchIfNeeded(): Promise<void> {
        await forImmediate();
        await forAnimationFrame();

        if (this.prefetchingRandomWallpapers.length >= this.getPrefetchCount()) {
            return;
        }

        this.prefetchingRandomWallpapers.push(await this.fetchRandomWallpaper(true));
        return /* not await */ this.prefetchIfNeeded();
    }

    public async getRandomWallpaper(currentWallpaperId?: string_wallpaper_id): Promise<IWallpaperInStorage> {
        const randomWallpaper = await this.prefetchingRandomWallpapers.shift(/* <- TODO: DO here a Promise.race */);

        // console.log('currentWallpaperId', currentWallpaperId);
        // console.log('this.prefetchedRandomWallpapers', [...this.prefetchedRandomWallpapers]);
        // console.log('randomWallpaper', randomWallpaper);

        if (randomWallpaper) {
            this.prefetchIfNeeded(/* <- [🧠] Prefetch in consumeRandomWallpaper?! */);
            return randomWallpaper;
        } else {
            const randomWallpaper = await this.fetchRandomWallpaper(false);
            /*                      <- Note: At first load the returned wallpaper THEN load the prefetched one(s) */
            /* not await */ this.prefetchIfNeeded();
            return randomWallpaper;
        }
    }

    public consumeRandomWallpaper(randomWallpaper: IWallpaperInStorage): void {
        console.info(`🎲 Consuming random wallpaper`, { randomWallpaper });

        this.changeByConsumedCount(1);

        this.inStorage((randomWallpapers) => {
            return randomWallpapers.filter((randomWallpaper2) => randomWallpaper.id !== randomWallpaper2.id);
        });

        /* not await */ this.prefetchIfNeeded();
    }
}

/**
 * TODO: Cache the wallpaper in localStorage
 * TODO: Minimize load on server
 */
