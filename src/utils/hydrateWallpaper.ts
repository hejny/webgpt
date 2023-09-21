import { Vector } from 'xyzt';
import { hydrateColorStats } from './image/utils/hydrateColorStats';
import { serializeColorStats } from './image/utils/serializeColorStats';
import type { IWallpaper, IWallpaperSerialized } from './IWallpaper';

export function hydrateWallpaper(json: IWallpaperSerialized): IWallpaper {
    return {
        ...json,
        colorStats: hydrateColorStats(json.colorStats),
        naturalSize: Vector.fromObject(json.naturalSize || { x: 0, y: 0 /* <- TODO: Some better fallback */ }),
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
        naturalSize: {
            x: naturalSize.x,
            y: naturalSize.y /* <- Note: Not using Vector.toObject2D because we do not want here an index signature + x and y needs to be defined */,
        },
        title,
        content,
        keywords,
    };
}

/**
 * TODO: Check that values are valid
 */
