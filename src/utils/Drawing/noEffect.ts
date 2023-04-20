import { IDestroyable, Registration } from 'destroyable';

/**
 * 
 */
export function noEffect<TElement extends HTMLElement>(element: TElement): IDestroyable {
    return Registration.void();
}
