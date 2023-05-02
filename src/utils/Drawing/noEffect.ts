import { IDestroyable, Registration } from 'destroyable';

/**
 * A function that does nothing and returns an empty registration object ⁘
 * 
 * @template TElement - The type of the HTML element.
 * @param {TElement} element - The HTML element to be passed to the function.
 * @returns {IDestroyable} - An object that implements the IDestroyable interface.
 */
export function noEffect<TElement extends HTMLElement>(element: TElement): IDestroyable {
    return Registration.void();
}
