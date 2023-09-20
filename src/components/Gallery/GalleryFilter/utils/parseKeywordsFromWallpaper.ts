import type { IKeywords, parseKeywords } from 'n12';
import type { IWallpaper } from '../../../../utils/IWallpaper';

export function parseKeywordsFromWallpaper(wallpaper: Pick<IWallpaper, 'prompt' | 'content'>): IKeywords {
    const { prompt, content } = wallpaper;
    return parseKeywords({ prompt, content });
}
