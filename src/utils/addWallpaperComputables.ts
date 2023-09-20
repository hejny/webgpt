import { parseKeywordsFromWallpaper } from '../components/Gallery/GalleryFilter/utils/parseKeywordsFromWallpaper';
import { computeWallpaperUriid } from './computeWallpaperUriid';
import { extractTitleFromContent } from './content/extractTitleFromContent';
import type { IWallpaper } from './IWallpaper';

/**
 * Populates the wallpaper with computable values if they are not present
 * Computable values are all values that can be computed from other values or have some default like id, title, keywords, isPrivate, etc...
 *
 * Note: Value colorStats is technically also computable but they are not computed because they are needed a heavy computation and better control over how they are computed
 */
export function addWallpaperComputables(
    anonymousWallpaper: Partial<IWallpaper> & Omit<IWallpaper, 'id' | 'title' | 'keywords'>,
): IWallpaper {
    const wallpaper = { ...anonymousWallpaper };

    if (!wallpaper.id) {
        wallpaper.id = computeWallpaperUriid(anonymousWallpaper);
    }

    if (!wallpaper.title) {
        let title = extractTitleFromContent(wallpaper.content);
        if (!title) {
            title = 'Page' /* <- TODO: [🧠] Figure out better fallback value */;
        }
        wallpaper.title = title;
    }

    if (!wallpaper.keywords) {
        wallpaper.keywords = Array.from(parseKeywordsFromWallpaper(wallpaper));
    }

    return wallpaper as IWallpaper;
}

/**
 * TODO: Is there a simple helper for> Partial<IWallpaper> & Omit<IWallpaper, 'id'>
 */
