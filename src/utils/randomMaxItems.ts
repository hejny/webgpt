import { $randomItem } from './randomItem';

/**
 * Pick multiple distinct random items from the recieved items
 * If there is not enough items, just return as many as possible
 *
 * Note: There are two simmilar functions:
 * - `randomItems` which throws error when there is not enough items
 * - `randomMaxItems` which just returns as many items as possible
 */
export function $randomMaxItems<TItem>(count: number, ...items: Array<TItem>): Array<TItem> {
    if (count === 1) {
        return [$randomItem(...items)];
    }

    const result = [];
    const itemsCopy = [...items]; // <- Note: create a copy of items to avoid mutation

    for (let i = 0; i < count; i++) {
        if (itemsCopy.length === 0) {
            break;
        }

        const item = $randomItem(...itemsCopy);
        result.push(item);
        const index = itemsCopy.indexOf(item);
        if (index !== -1) {
            itemsCopy.splice(index, 1);
        }
    }
    return result;
}
