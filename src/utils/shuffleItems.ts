/**
 * Shuffle items from the recieved array
 */
export function $shuffleItems<TItem>(...items: Array<TItem>): Array<TItem> {
    const newItems = [...items];
    newItems.sort(() => Math.random() - 0.5);
    return newItems;
}

/**
 * TODO: [🧠][👵] Figure out something between rotateItems and shuffleItems which is more generic and recieves a ruleset how to reordeto the array in some general way
 */
