import { IDestroyable } from 'destroyable';
import { Effect } from './effect';

/**
 * This code defines a function effectToRef that takes an Effect object as an argument and returns a function. The returned function takes an HTML element or null as an argument and applies the effect to the element if it is not null. If the effect has already been applied to an element, it will be destroyed before being applied to the new element.  The code imports two modules: IDestroyable from the ‘destroyable’ package and Effect from a local file ‘./effect’. The IDestroyable interface defines objects that can be destroyed. The Effect type is not defined in this code snippet.  Is there anything else you would like to know about this code?
 */
export function effectToRef<TElement extends HTMLElement>(
    effect: Effect<TElement>,
): (element: TElement | null) => void {
    let effectOnElement: null | IDestroyable;

    return async (element: TElement | null) => {
        if (effectOnElement) {
            await effectOnElement.destroy();
        }

        if (element === null) {
            return;
        }

        effectOnElement = effect(element);
    };
}

/**
 * TODO: Extract interfaces
 */
