/**
 * Pick random item from the recieved array
 */
export function $randomItem<TItem>(...items: Array<TItem>): TItem {
    if (items.length === 0) {
        throw new Error(`Not enough items`);
    }
    return items[Math.floor(Math.random(/* <- TODO: [🐉] Probbably use seed random */) * items.length)]!;
}
