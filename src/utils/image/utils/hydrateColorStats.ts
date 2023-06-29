import { JsonObject } from 'type-fest';
import { hydrateColors } from '../../color/utils/hydrateColors';
import { IImageColorStats } from './IImageColorStats';

export function hydrateColorStats(json: JsonObject): IImageColorStats<string> {
    const colorStats = hydrateColors(json);
    return colorStats;
}

/**
 * TODO: Check if the colorStats are valid - Maybe use Zod
 */
