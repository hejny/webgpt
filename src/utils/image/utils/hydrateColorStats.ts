import { hydrateColors } from '../../color/utils/hydrateColors';
import { Json } from '../../supabase/types';
import type { IImageColorStats } from './IImageColorStats';

export function hydrateColorStats(json: Json): IImageColorStats<string> {
    const colorStats = hydrateColors(json);
    return colorStats;
}

/**
 * TODO: Check if the colorStats are valid - Maybe use Zod
 */
