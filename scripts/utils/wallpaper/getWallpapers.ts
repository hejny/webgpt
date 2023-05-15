import { readFile } from 'fs/promises';
import spaceTrim from 'spacetrim';
import { IWallpaper, IWallpaperColorStats, IWallpaperMetadata } from '../../../assets/ai/wallpaper/IWallpaper';
import { removeMarkdownComments } from '../../../src/utils/content/removeMarkdownComments';
import { isFileExisting } from '../../utils/isFileExisting';
import { getWallpapersMetadataPaths } from './getWallpapersMetadataPaths';

const wallpapers: Array<IWallpaper> = [];

/**
 * @@@
 */
export async function getWallpapers(): Promise<Array<IWallpaper>> {
    if (wallpapers.length) {
        // TODO: !! Ensure that wallpapers are ready
        return wallpapers;
    }

    const wallpapersMetadataPaths = await getWallpapersMetadataPaths();

    for (const metadataPath of wallpapersMetadataPaths) {
        const colorStatsPath = metadataPath.replace(/\.json$/, '.colors.json');
        const contentPath = metadataPath.replace(/\.json$/, '.content.md');

        const metadata = JSON.parse(await readFile(metadataPath, 'utf8')) as IWallpaperMetadata;
        const id = metadata!.id;

        if (!(await isFileExisting(colorStatsPath))) {
            throw new Error(`Colors file for ${id} does not exist "${colorStatsPath}"`);
        }

        if (!(await isFileExisting(contentPath))) {
            throw new Error(`Content file for ${id} does not exist "${contentPath}"`);
        }

        const colorStats = JSON.parse(await readFile(colorStatsPath, 'utf8')) as IWallpaperColorStats;
        let content = await readFile(contentPath, 'utf8');

        const font = content.match(/<!--font:(?<font>.*)-->/)?.groups?.font ?? 'Unknown';

        content = removeMarkdownComments(content);
        content = spaceTrim(content);
        // TODO: !! Replace here [email protected]

        const title =
            content.match(/^#\s*(?<title>.*)\s*$/m)?.groups?.title ??
            'Untitled'; /* <- TODO: Make util extractTitleFromMarkdown */

        const src = metadata!.image_paths![0 /* <- TODO: Detect different than 1 item */];
        const prompt = metadata!.prompt;

        wallpapers.push({
            id,
            src,
            prompt,
            colorStats,
            title,
            content,
            font,
        });
    }

    return wallpapers;
}

/**
 * TODO: Update wallpapers during the run
 */
