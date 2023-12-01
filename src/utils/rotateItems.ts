import { number_integer } from './typeAliases';

interface RotateItemsOptions {
    /**
     * Number of items to rotate
     *
     * @default 1
     */
    count?: number_integer;
}

/**
 * Rotate items by the specified count
 *
 * Note: It always returns a new array never the reference to original one
 */
export function rotateItems<TItem>(items: Array<TItem>, options?: RotateItemsOptions): Array<TItem> {
    const { count = 1 } = options || {};

    const result = [...items];
    const normalizedCount = count % items.length;

    if (normalizedCount === 0 || items.length === 0 || items.length === 1) {
        return result;
    }

    if (normalizedCount > 0) {
        const firstItems = result.slice(0, items.length - normalizedCount);
        const lastItems = result.slice(items.length - normalizedCount);

        return [...lastItems, ...firstItems];
    } else if (normalizedCount < 0) {
        const firstItems = result.slice(0, -normalizedCount);
        const lastItems = result.slice(-normalizedCount);

        return [...lastItems, ...firstItems];
    }

    return result;
}

/**
 * TODO: [🧠][👵] Figure out something between rotateItems and shuffleItems which is more generic and recieves a ruleset how to reordeto the array in some general way
 */
