/**
 * Pick random item from the recieved array
 *
 * @collboard-modules-sdk
 */
export function randomItem<TItem>(...items: Array<TItem>): TItem {
    return items[Math.floor(Math.random(/* <- TODO: [🐉] Probbably use seed random */) * items.length)];
}
