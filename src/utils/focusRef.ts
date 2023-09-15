/**
 * Focuses the given element. If no element is given, nothing happens.
 *
 * Note: This function is in ref in React elements.
 */
export function focusRef(element: HTMLElement | null) {
    if (!element) {
        return;
    }

    return;
    // element.focus();
}

/**
 * TODO: !! Use maybe autoFocus attribute instead of this ref function
 * TODO: [🧠] !! This function is disabled now - it should work only on desktop and maybe be renamed to focusOnDesktopRef
 */
