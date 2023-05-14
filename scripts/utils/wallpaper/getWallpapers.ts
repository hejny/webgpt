import { readFile } from 'fs/promises';
import glob from 'glob-promise';
import { join } from 'path';
import { IWallpaper, IWallpaperColorStats, IWallpaperMetadata } from '../../../assets/ai/wallpaper/IWallpaper';
import { removeMarkdownComments } from '../../../src/utils/content/removeMarkdownComments';
import { isFileExisting } from '../../utils/isFileExisting';
import { getWallpapersDir } from './getWallpapersDir';

/**
 * @@@
 */
export async function getWallpapers(): Promise<Array<IWallpaper>> {
    const wallpapers: Array<IWallpaper> = [];

    const wallpapersDir = await getWallpapersDir();
    const wallpapersMetadataPaths = (
        await glob(join(wallpapersDir, '*.json').split('\\').join('/'), {
            // TODO: ignore: ['*.colors.json'],
        })
    ).filter((path) => !path.endsWith('.colors.json'));

    for (const metadataPath of wallpapersMetadataPaths) {
        const colorStatsPath = metadataPath.replace(/\.json$/, '.colors.json');
        const contentPath = metadataPath.replace(/\.json$/, '.content.md');

        if (!(await isFileExisting(colorStatsPath))) {
            throw new Error(`Colors file does not exist "${colorStatsPath}"`);
        }

        if (!(await isFileExisting(contentPath))) {
            throw new Error(`Content file does not exist "${contentPath}"`);
        }

        const metadata = JSON.parse(await readFile(metadataPath, 'utf8')) as IWallpaperMetadata;
        const colorStats = JSON.parse(await readFile(colorStatsPath, 'utf8')) as IWallpaperColorStats;
        let content = await readFile(contentPath, 'utf8');

        // !!!! const font =

        content = removeMarkdownComments(content);

        const title =
            content.match(/^#\s*(?<title>.*)\s*$/m)?.groups?.title ??
            'Untitled'; /* <- TODO: Make util extractTitleFromMarkdown */

        const id = metadata!.id;
        const src = metadata!.image_paths![0 /* <- TODO: Detect different than 1 item */];
        const prompt = metadata!.prompt;

        wallpapers.push({
            id,
            src,
            prompt,
            colorStats,
            title,
            content,
            font: 'Roboto' /* <- !!!! */,
        });
    }

    return wallpapers;
}
