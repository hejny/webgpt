import type { LikedStatus } from '../../utils/hooks/useLikedStatusOfCurrentWallpaper';
import { string_color, string_wallpaper_id } from '../../utils/typeAliases';

export async function activateGalleryComponent(galleryElement: HTMLElement): Promise<void> {
    const moreButtonHtml = `
        <a href="https://1-2i.com/?home=${encodeURIComponent(window.location.href)}" class="button">More</a>
    `;
    galleryElement.innerHTML = `
        <div class="ai-gallery">
            <div class="ai-gallery-items">
                <div class="inner">
                    <div class="placeholder"></div>
                    <div class="placeholder"></div>
                    <div class="placeholder"></div>
                    <div class="placeholder"></div>
                    <div class="placeholder"></div>
                    <div class="placeholder"></div>
                </div>
            </div>
            ${moreButtonHtml}
        </div>
    `;

    const response = await fetch(`https://1-2i.com/mocked-api/wallpapers-min-loved.json`);
    const { wallpapers } = (await response.json()) as {
        wallpapers: Array<{
            id: string_wallpaper_id;
            primaryColor: string_color;
            likedStatus: keyof typeof LikedStatus;
        }>;
    };

    const pickedWallpapers = [];
    const pickedWallpapersIds = new Set();

    while (pickedWallpapersIds.size < 6 /* <- [🥼]*/) {
        const wallpaper = wallpapers[Math.floor(Math.random() * wallpapers.length)]!;
        if (pickedWallpapersIds.has(wallpaper.id)) {
            continue;
        }
        pickedWallpapersIds.add(wallpaper.id);
        pickedWallpapers.push(wallpaper);
    }

    const itemsHtml = pickedWallpapers.map(
        ({ id, primaryColor }) => `
        <a href="https://1-2i.com/showcase/${id}">
            <iframe
                src="https://1-2i.com/showcase/${id}?mode=preview"
                allowtransparency="false"
                scrolling="no"
                frameborder="0"
                style="background-color: ${primaryColor};"
            ></iframe>
        </a>
        
    `,
    );

    const html = `
    <div class="aiai ai-gallery">
        <div class="ai-gallery-items">
            <div class="inner">
                ${itemsHtml.join('\n\n\n')}
            </div>
        </div>
        ${moreButtonHtml}
    </div>
`;

    galleryElement.innerHTML = html;
}

/**
 * TODO: Is there a way to use spaceTrim here in AI components?
 */
