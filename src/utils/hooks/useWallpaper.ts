import { IWallpaper } from '../../../src/utils/IWallpaper';
import { extractTitleFromContent } from '../content/extractTitleFromContent';
import { useCurrentWallpaperId } from './useCurrentWallpaperId';
import { useObservable } from './useObservable';
import { useWallpaperSubject } from './useWallpaperSubject';

type IWallpaperToModify = Omit<IWallpaper, 'title' /* <- Note: [🗄] Ommiting values computed here */>;
type IModifyWallpaper = (modifiedWallpaper: IWallpaperToModify) => IWallpaperToModify;

/**
 * A function that returns a wallpaper component based on the router query
 */
export function useWallpaper(): [IWallpaper, (modifyWallpaper: IModifyWallpaper) => IWallpaper] {
    const wallpaperId = useCurrentWallpaperId();
    const wallpaperSubject = useWallpaperSubject(wallpaperId);
    const { value: wallpaper } = useObservable(wallpaperSubject);
    return [
        wallpaper,
        (modifyWallpaper: IModifyWallpaper) => {
            const modifiedWallpaper = { ...wallpaper }; /* <- TODO: !!! Do here deep copy */
            const { id, parent, author, src, prompt, colorStats, content, keywords, isPublic, isSaved } =
                modifyWallpaper(modifiedWallpaper);

            // Note: [🗄] title is computed after each change id+parent+author+keywords are computed just once before save
            const title = extractTitleFromContent(content) || 'Untitled';

            const newWallpeper = {
                id,
                parent,
                author,
                src,
                prompt,
                colorStats,
                title,
                content,
                keywords,
                isPublic,
                isSaved,
            };

            wallpaperSubject.next(newWallpeper);
            return newWallpeper;
        },
    ];
}

/**
 * TODO: [🩺] !!!! ACRY use this hook instead of useWallpaperSubject
 */
