import { randomItem } from './randomItem';

/**
 * Pick multiple random items from the recieved array
 */
export function randomItems<TItem>(count: number, ...items: Array<TItem>): Array<TItem> {
    const result = [];

    for (let i = 0; i < count; i++) {
        result.push(randomItem(...items));
    }
    return result;
}
