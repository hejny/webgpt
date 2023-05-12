import { JsonValue } from 'type-fest';
import { Color } from '../Color';

/**
 * @@@
 */
export function hydrateColors(value: JsonValue): any {
    if (typeof value === 'string') {
        return Color.from(value);
    } else if (Array.isArray(value)) {
        return value.map(hydrateColors);
    } else if (typeof value === 'object' && value !== null && typeof value !== 'undefined') {
        const result: any = {};
        for (const [subKey, subValue] of Object.entries(value)) {
            result[subKey] = hydrateColors(subValue!);
        }
        return result;
    } else {
        return value;
    }
}

/**
 * TODO: Can there be a propper return type?
 */
