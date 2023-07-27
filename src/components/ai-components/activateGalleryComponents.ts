export function activateGalleryComponents(root: HTMLElement) {
    // !!!!![👩‍🦰]
    for (const menuElement of Array.from(root.querySelectorAll('[data-ai-component="gallery"]'))) {
        if (menuElement.getAttribute('data-toggle-activated')) {
            continue;
        }
        menuElement.setAttribute('data-toggle-activated', 'true');


        // TODO: !!!! [👩‍🦱] Just from here
        menuElement.innerHTML = 'Activated!!!!';
    }
}

/**
 * TODO: [👩‍🦱] !!!! DRY
 */
