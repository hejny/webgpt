import { Json } from '../../supabase/types';
import { Color } from '../Color';

/**
 * @@@
 */
export function hydrateColors(value: Json): any {
    if (typeof value === 'string') {
        return Color.from(value);
    } else if (Array.isArray(value)) {
        return value.map(hydrateColors);
    } else if (typeof value === 'object' && value !== null && typeof value !== 'undefined') {
        const result: any = {};
        for (const [subKey, subValue] of Object.entries(value)) {
            if (subKey === 'version' || subKey === 'note' || subKey === 'count') {
                result[subKey] = subValue;
            } else {
                result[subKey] = hydrateColors(subValue!);
            }
        }
        return result;
    } else {
        return value;
    }
}

/**
 * TODO: Can there be a propper return type?
 */
