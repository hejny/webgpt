import { Json } from '../../supabase/types';
import { TakeChain } from '../../take/classes/TakeChain';
import { IImageColorStats } from './IImageColorStats';

export function serializeColorStats(colorStats: IImageColorStats<string>): Json {
    return JSON.parse(
        JSON.stringify(colorStats, (key, value) => {
            if (value instanceof TakeChain) {
                return value.value.toHex();
            } else {
                return value;
            }
        }),
    ) as Json;
}
