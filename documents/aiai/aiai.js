for (const element of Array.from(document.querySelectorAll('*[data-aiai]'))) {
    /* not await */ activateElement(element);
}

function activateElement(element) {
    const type = element.getAttribute('data-aiai');
    if (type === 'gallery') {
        return activateGalleryElement(element);
    } else {
        throw new Error(`Unknown aiai type "${type}"`);
    }
}

async function activateGalleryElement(element) {
    element.innerHTML = `
        <div class="aiai aiai-gallery">
            <div class="aiai-gallery-items">
                <div class="inner">
                    <div class="placeholder"></div>
                    <div class="placeholder"></div>
                    <div class="placeholder"></div>
                    <div class="placeholder"></div>
                    <div class="placeholder"></div>
                    <div class="placeholder"></div>
                </div>
            </div>
            <a href="https://app.1-2i.com/?home=https://1-2i.com/" class="button">More</a>
        </div>
    `;

    const response = await fetch(`mocked-api/wallpapers-min-loved.json`);
    const { wallpapers } = await response.json();

    const pickedWallpapers = [];
    const pickedWallpapersIds = new Set();

    while (pickedWallpapersIds.size < 6 /* <- [🥼]*/) {
        const wallpaper = wallpapers[Math.floor(Math.random() * wallpapers.length)];
        if (pickedWallpapersIds.has(wallpaper.id)) {
            continue;
        }
        pickedWallpapersIds.add(wallpaper.id);
        pickedWallpapers.push(wallpaper);
    }

    const itemsHtml = pickedWallpapers.map(
        ({ id, primaryColor }) => `
            <a href="https://app.1-2i.com/showcase/${id}">
                <iframe
                    src="https://app.1-2i.com/showcase/${id}?mode=preview"
                    allowtransparency="false"
                    scrolling="no"
                    frameborder="0"
                    style="background-color: ${primaryColor};"
                ></iframe>
            </a>
            
        `,
    );

    const html = `
        <div class="aiai aiai-gallery">
            <div class="aiai-gallery-items">
                <div class="inner">
                    ${itemsHtml.join('\n\n\n')}
                </div>
            </div>
            <a href="https://app.1-2i.com/?home=https://1-2i.com/" class="button">More</a>
        </div>
    `;

    element.innerHTML = html;
}

/**
 * TODO: Use spaceTrim
 * TODO: Maybe use shadow dom not just CSS / data-aiai prefixing
 * TODO: Recursive activation of elements
 * TODO: !!! This should be really exported / provided from Aiai as a embed integration
 */
