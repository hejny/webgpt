/**
 * Focuses the given element. If no element is given, nothing happens.
 *
 * Note: This function is in ref in React elements.
 */
export function focusRef(element: HTMLElement | null): void {
    if (!element) {
        return;
    }

    console.info(`👁 Focusing`, element);
    element.focus();
}
