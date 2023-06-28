import { IKeywords, parseKeywords } from 'n12';
import { IWallpaper } from '../../../../utils/IWallpaper';

export function parseKeywordsFromWallpaper(wallpaper: IWallpaper): IKeywords {
    const { prompt, content } = wallpaper;
    return parseKeywords({ prompt, content });
}
