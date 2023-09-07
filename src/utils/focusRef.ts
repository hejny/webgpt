/**
 * Focuses the given element. If no element is given, nothing happens.
 *
 * Note: This function is in ref in React elements.
 */
export function focusRef(element: HTMLElement | null) {
    if (!element) {
        return;
    }

    element.focus();
}


