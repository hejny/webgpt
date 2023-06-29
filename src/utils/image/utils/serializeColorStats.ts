import { JsonObject } from 'type-fest';
import { TakeChain } from '../../take/classes/TakeChain';
import { IImageColorStats } from './IImageColorStats';

export function serializeColorStats(colorStats: IImageColorStats<string>): JsonObject {
    return JSON.parse(
        JSON.stringify(colorStats, (key, value) => {
            if (value instanceof TakeChain) {
                return value.value.toHex();
            } else {
                return value;
            }
        }),
    ) as JsonObject;
}
