export function activateMenuComponent(menuElement: HTMLElement) {
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
        if (barElement.contains(event.target as any)) {
            return;
        }

        menuElement.setAttribute('data-toggle-state', 'closed');
    });
}
