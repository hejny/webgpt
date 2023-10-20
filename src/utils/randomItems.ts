import { randomItem } from './randomItem';

/**
 * Pick multiple distinct random items from the recieved array
 */
export function randomItems<TItem>(count: number, ...items: Array<TItem>): Array<TItem> {
    if (count === 1) {
        return [randomItem(...items)];
    }

    const result = [];
    const itemsCopy = [...items]; // <- Note: create a copy of items to avoid mutation

    for (let i = 0; i < count; i++) {
        const item = randomItem(...itemsCopy);
        result.push(item);
        const index = itemsCopy.indexOf(item);
        if (index !== -1) {
            itemsCopy.splice(index, 1);
        }
    }
    return result;
}
