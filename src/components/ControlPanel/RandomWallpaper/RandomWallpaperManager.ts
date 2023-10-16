import { Promisable } from 'type-fest';
import { forAnimationFrame, forImmediate } from 'waitasecond';
import { IS_DEVELOPMENT, NEXT_PUBLIC_URL } from '../../../../config';
import type { RecommendWallpaperResponse } from '../../../pages/api/recommend-wallpaper';
import { IWallpaperSerialized } from '../../../utils/IWallpaper';
import { randomItem } from '../../../utils/randomItem';
import { provideClientIdWithoutVerification } from '../../../utils/supabase/provideClientIdWithoutVerification';
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
        this.preloadGalleryElement = window.document.createElement('div');
        this.preloadGalleryElement.dataset.comment = `Note: This is just for preloading the next wallpapers images to make the transition smoother`;
        this.preloadGalleryElement.style.position = 'fixed';
        this.preloadGalleryElement.style.top = '10px';
        this.preloadGalleryElement.style.left = '10px';
        this.preloadGalleryElement.style.opacity = '0';
        this.preloadGalleryElement.style.pointerEvents = 'none';
        window.document.body.appendChild(this.preloadGalleryElement);
        this.prefetchingRandomWallpapers = this.getStorage();

        for (const randomWallpaper of this.prefetchingRandomWallpapers) {
            /*          <- Note: We want to preload all stored wallpapers BUT don’t want to block the button with that loading */
            /* not await */ this.preloadWallpaper(randomWallpaper);
        }

        /* not await */ this.prefetchIfNeeded();
    }

    private preloadGalleryElement: HTMLDivElement;
    private prefetchingRandomWallpapers: Array<Promisable<IWallpaperInStorage>> = [];

    private async fetchRandomWallpaper(isPrefetch: boolean): Promise<IWallpaperInStorage> {
        console.info(
            `🎲 ${isPrefetch ? 'Pre-' : ''}Fetching recommended wallpaper${
                isPrefetch ? ` (${this.prefetchingRandomWallpapers.length}/${this.getPrefetchCount()})` : ''
            }`,
        );

        const response = await fetch(
            `${NEXT_PUBLIC_URL.href}api/recommend-wallpaper?author=${provideClientIdWithoutVerification()}`,
        );
        const { recommendedWallpaper } = (await response.json()) as RecommendWallpaperResponse;

        if (isPrefetch) {
            this.inStorage((randomWallpapers) => {
                const { id, src } = recommendedWallpaper;
                randomWallpapers.push({ id, src });
                return randomWallpapers;
            });
        }

        console.info(
            `🎲 ${isPrefetch ? 'Pre-' : ''}Fetched recommended wallpaper${
                isPrefetch ? ` (${this.prefetchingRandomWallpapers.length}/${this.getPrefetchCount()})` : ''
            }`,
            { recommendedWallpaper },
        );

        await this.preloadWallpaper(recommendedWallpaper);
        return recommendedWallpaper;
    }

    private async preloadWallpaper(wallpaperPromisable: Promisable<IWallpaperInStorage>): Promise<void> {
        const wallpaper = await wallpaperPromisable;

        // Note: Pre-fetching the wallpaper to trigger ISR (Incremental Static Regeneration)
        await fetch(`/${wallpaper.id}`);

        // Note: Pre-loading the wallpaper image to make the transition smoother
        const imageElement = new Image();
        imageElement.src = wallpaper.src;
        imageElement.style.height = '10px';
        this.preloadGalleryElement.appendChild(imageElement);

        await new Promise<void>((resolve) => {
            const onLoad = () => {
                resolve();
                imageElement.removeEventListener('load', onLoad);
            };
            imageElement.addEventListener('load', onLoad);
        });
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
        if (IS_DEVELOPMENT) {
            // Note: When developing we do not want to prefetch wallpapers dynamically but rather preload fixed amount of wallpapers
            return 3;
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

    private welcomeWallpapers: null | Array<{
        id: string_wallpaper_id;
    }> = null;

    public async getWelcomeWallpapers(): Promise<
        Array<Omit</* <- TODO: [2] Remove Omit*/ IWallpaperInStorage, 'src'>>
    > {
        if (this.welcomeWallpapers === null) {
            const response = await fetch(`${NEXT_PUBLIC_URL.href}mocked-api/wallpapers-min-loved.json`);
            const { wallpapers } = (await response.json()) as {
                wallpapers: Array<{
                    id: string_wallpaper_id;
                    // [2]
                    // primaryColor: string_color;
                    // likedStatus: keyof typeof LikedStatus;
                }>;
            };
            this.welcomeWallpapers = wallpapers;
        }
        // TODO: Do here a preloading when [2] there will be src in wallpapers-min-loved.json
        //     > await this.preloadRandomWallpaper(randomWallpaper);
        return this.welcomeWallpapers;
    }

    public async getWelcomeWallpaper(): Promise<Omit</* <- TODO: [2] Remove Omit*/ IWallpaperInStorage, 'src'>> {
        const welcomeWallpapers = await this.getWelcomeWallpapers();
        return randomItem(...welcomeWallpapers);
    }

    public async getRandomWallpaper(): Promise<IWallpaperInStorage> {
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
