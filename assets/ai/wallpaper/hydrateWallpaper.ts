import { hydrateColorStats } from '../../../src/utils/image/utils/hydrateColorStats';
import { IWallpaper } from './IWallpaper';

export function hydrateWallpaper(json: any /*JsonObject & IWallpaper*/): IWallpaper {
    return { ...json, colorStats: hydrateColorStats(json.colorStats) } as IWallpaper;
}

/**
 * TODO: Check if the colorStats are valid
 */
