import { Vector } from 'xyzt';
import { hydrateColorStats } from './image/utils/hydrateColorStats';
import { serializeColorStats } from './image/utils/serializeColorStats';
import { IWallpaper, IWallpaperSerialized } from './IWallpaper';

export function hydrateWallpaper(json: IWallpaperSerialized): IWallpaper {
    return {
        ...json,
        colorStats: hydrateColorStats(json.colorStats),
        naturalSize: Vector.fromObject(json.naturalSize),
        saveStage: 'SAVED',
    } as IWallpaper;
}

export function serializeWallpaper(wallpaper: Omit<IWallpaper, 'saveStage'>): IWallpaperSerialized {
    // Note: Keepeng ONLY intended properties
    const { id, parent, author, isPublic, src, prompt, colorStats, naturalSize, title, content, keywords } = wallpaper;
    return {
        id,
        parent,
        author,
        isPublic,
        src,
        prompt,
        colorStats: serializeColorStats(colorStats),
        naturalSize: naturalSize.toObject2D(),
        title,
        content,
        keywords,
    };
}

/**
 * TODO: Check that values are valid
 */
