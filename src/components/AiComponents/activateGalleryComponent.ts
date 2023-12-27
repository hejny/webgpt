import type { LikedStatus } from '../../ai/recommendation/LikedStatus';
import { string_color, string_wallpaper_id } from '../../utils/typeAliases';

/**
 * @deprecated [👨‍🦲] AI Components are deprecated, use custom html components instead
 */
export async function activateGalleryComponent(galleryElement: HTMLElement): Promise<void> {
    const moreButtonHtml = `
        <a href="/" class="button">More</a>
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

    const response = await fetch(`/mocked-api/wallpapers-min-loved.json`);
    const { wallpapers } = (await response.json()) as {
        wallpapers: Array<{
            id: string_wallpaper_id;
            primaryColor: string_color;
            likedStatus: LikedStatus;
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
        <a href="/${id}">
            <iframe
                src="/${id}?mode=show-thumbnail"
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
