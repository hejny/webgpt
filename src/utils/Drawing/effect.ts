import { IDestroyable } from "destroyable";

/**
 * A type that represents a function that takes an HTML element and returns an object with a destroy method ⁘
 * 
 * @template TElement - The type of the HTML element, which extends HTMLElement by default.
 * @param {TElement} element - The HTML element to apply the effect to.
 * @returns {IDestroyable} - An object that has a destroy method to undo the effect.
 */
export type Effect<TElement extends HTMLElement = HTMLElement> = (element: TElement) => IDestroyable;