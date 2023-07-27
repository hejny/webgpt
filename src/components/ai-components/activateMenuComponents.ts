export function activateMenuComponents(root: HTMLElement) {
    // !!!!![👩‍🦰]
    for (const menuElement of Array.from(root.querySelectorAll('[data-ai-component="menu"]'))) {
        if (menuElement.getAttribute('data-toggle-activated')) {
            continue;
        }
        menuElement.setAttribute('data-toggle-activated', 'true');

        // TODO: !!!! [👩‍🦱] Just from here

        const barElement = menuElement.querySelector('[data-ai-element="bar"]');

        if (!barElement) {
            throw new Error(
                'Toggle error: element[data-ai-element="toggle"] must have child element[data-ai-element="bar"]',
            );
        }

        barElement.addEventListener('click', () => {
            let state = menuElement.getAttribute('data-toggle-state');
            if (!state) {
                state = 'closed';
            }

            if (state === 'closed') {
                menuElement.setAttribute('data-toggle-state', 'open');
            } else {
                menuElement.setAttribute('data-toggle-state', 'closed');
            }
        });

        window.addEventListener('click', (event) => {
            // TODO !!!! Fix clicking on menu - it should close the menu
            if (menuElement.contains(event.target as any)) {
                return;
            }

            menuElement.setAttribute('data-toggle-state', 'closed');
        });
    }
}

/**
 * TODO: [👩‍🦱] !!!! DRY
 */
