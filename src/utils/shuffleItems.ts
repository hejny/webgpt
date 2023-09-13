/**
 * Shuffle items from the recieved array
 */
export function shuffleItems<TItem>(...items: Array<TItem>): Array<TItem> {
    const newItems = [...items];
    newItems.sort(() => Math.random() - 0.5);
    return newItems;
}
