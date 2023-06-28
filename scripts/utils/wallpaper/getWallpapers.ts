import chalk from 'chalk';
import { readFile } from 'fs/promises';
import spaceTrim from 'spacetrim';
import YAML from 'yaml';
import { COLORSTATS_DEFAULT_COMPUTE, LIMIT_WALLPAPER_COUNT, LIMIT_WALLPAPER_EXCLUDE } from '../../../config';
import { parseKeywordsFromWallpaper } from '../../../src/components/Gallery/GalleryFilter/utils/parseKeywordsFromWallpaper';
import { extractTitleFromMarkdown } from '../../../src/utils/content/extractTitleFromMarkdown';
import { IWallpaper, IWallpaperColorStats, IWallpaperMetadata } from '../../../src/utils/IWallpaper';
import { isFileExisting } from '../../utils/isFileExisting';
import { getWallpapersmetadataFilePaths } from './getWallpapersmetadataFilePaths';

/**
 * @@@
 */
let wallpapers: Promise<Array<IWallpaper>>;

/**
 * @@@
 */
export function getWallpapers(): Promise<Array<IWallpaper>> {
    if (!wallpapers) {
        wallpapers = /* not await */ findWallpapers(false);
    }

    return wallpapers;
}

/**
 * @@@
 */
async function findWallpapers(showWarnings: boolean): Promise<Array<IWallpaper>> {
    const wallpapers: Array<IWallpaper> = [];

    const wallpapersmetadataFilePaths = await getWallpapersmetadataFilePaths();

    for (const metadataFilePath of wallpapersmetadataFilePaths) {
        const colorStatsFilePath = metadataFilePath.replace(
            /\.json$/,
            `.${COLORSTATS_DEFAULT_COMPUTE.version}.colors.yaml`,
        );
        const contentFilePath = metadataFilePath.replace(/\.json$/, '.content.md');

        const metadata = JSON.parse(await readFile(metadataFilePath, 'utf8')) as IWallpaperMetadata;
        const id = metadata!.id;

        if (!LIMIT_WALLPAPER_EXCLUDE.includes(id) && wallpapers.length >= LIMIT_WALLPAPER_COUNT) {
            continue;
        }

        if (!(await isFileExisting(colorStatsFilePath))) {
            if (showWarnings) {
                console.warn(
                    chalk.yellow(` ⏩  Skipping wallpaper ${id} Colors file does not exist\n${colorStatsFilePath}`),
                );
            }
            continue;
        }

        const colorStats = YAML.parse(await readFile(colorStatsFilePath, 'utf8')) as IWallpaperColorStats;

        if (colorStats === null || colorStats === undefined || !colorStats || !colorStats.version) {
            if (showWarnings) {
                console.warn(
                    chalk.yellow(` ⏩  Skipping wallpaper ${id} Colors for is corrupted\n${colorStatsFilePath}`),
                );
            }
            continue;
        }

        if (Object.keys(colorStats).length <= 1) {
            if (showWarnings) {
                console.warn(
                    chalk.yellow(
                        ` ⏩  Skipping wallpaper ${id} Colors for ${id} seems as just an empty lock file of running or failed process\n${colorStatsFilePath}`,
                    ),
                );
            }
            continue;
        }

        if (!colorStats.palette) {
            if (showWarnings) {
                console.warn(chalk.yellow(` ⏩  Skipping wallpaper ${id} Colors has no palette`));
            }
            continue;
        }

        if (!(await isFileExisting(contentFilePath))) {
            if (showWarnings) {
                console.warn(
                    chalk.yellow(` ⏩  Skipping wallpaper ${id} Content file for does not exist\n${contentFilePath}`),
                );
            }
            continue;
        }

        let content = await readFile(contentFilePath, 'utf8');

        content = spaceTrim(content);

        const title = extractTitleFromMarkdown(content) || 'Untitled';

        const src = metadata!.image_paths![0 /* <- TODO: Detect different than 1 item */];
        const prompt = metadata!.prompt;

        const keywords = Array.from(parseKeywordsFromWallpaper({ prompt, content }));

        wallpapers.push({
            id,
            src,
            prompt,
            colorStats,
            title,
            content,
            metadataFilePath,
            colorStatsFilePath,
            contentFilePath,
            keywords,
        } as IWallpaper);
    }

    return wallpapers;
}

/**
 * TODO: Update wallpapers during the run
 * TODO: !! Make script that can check all wallpapers and list only warnings
 */
