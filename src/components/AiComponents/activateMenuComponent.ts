export function activateMenuComponent(menuElement: HTMLElement): void {
    const barElement = menuElement.querySelector('[data-ai-element="bar"]');

    if (!barElement) {
        throw new Error('Menu must have child element[data-ai-element="bar"]');
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

    const backgroundElement: HTMLDivElement = menuElement.querySelector('[data-ai-element="background"]')!;
    const ulElement: HTMLUListElement = menuElement.querySelector('ul')!;

    if (!backgroundElement) {
        throw new Error('Menu must have child element[data-ai-element="backgroundElement"]');
    }
    if (!backgroundElement) {
        throw new Error('Menu must have child <ul/>');
    }

    // console.log('ulElement.children.length', ulElement, ulElement.children.length);

    backgroundElement.style.height = `${(1 + ulElement.children.length) * 100}px`;
}

/**
 * TODO: Maybe do not count number of menu items but measure height of ulElement
 */
