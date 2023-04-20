import { Registration } from 'destroyable';
import { Effect } from './effect';

/**
 * This code defines a function named joinEffects that takes in an array of Effect objects as arguments and returns a new Effect object. The returned Effect object is created by calling the join method on the imported Registration class from the ‘destroyable’ module and passing in an array of Effect objects created by mapping over the input array of effects and calling each effect with the provided element. This function can be used to combine multiple effects into one effect that can be applied to an HTML element.  Is there anything else you would like to know about this code?
 */
export function joinEffects<TElement extends HTMLElement>(...effects: Array<Effect<TElement>>): Effect<TElement> {
    return (element: TElement) => {
        return Registration.join(...effects.map((effect) => effect(element)));
    };
}
