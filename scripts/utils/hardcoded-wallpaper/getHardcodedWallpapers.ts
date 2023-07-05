import chalk from 'chalk';
import { readFile } from 'fs/promises';
import spaceTrim from 'spacetrim';
import YAML from 'yaml';
import {
    COLORSTATS_DEFAULT_COMPUTE,
    LIMIT_WALLPAPER_COUNT,
    LIMIT_WALLPAPER_EXCLUDE,
    SYSTEM_AUTHOR_ID,
} from '../../../config';
import { parseKeywordsFromWallpaper } from '../../../src/components/Gallery/GalleryFilter/utils/parseKeywordsFromWallpaper';
import { extractTitleFromContent } from '../../../src/utils/content/extractTitleFromContent';
import { IWallpaperMetadata, IWallpaperSerialized } from '../../../src/utils/IWallpaper';
import { isFileExisting } from '../isFileExisting';
import { getHardcodedWallpapersMetadataFilePaths } from './getHardcodedWallpapersMetadataFilePaths';

/**
 * @@@
 */
let hardcodedWallpapers: Promise<Array<IWallpaperSerialized>>;

/**
 * @@@
 */
export function getHardcodedWallpapers(): Promise<Array<IWallpaperSerialized>> {
    if (!hardcodedWallpapers) {
        hardcodedWallpapers = /* not await */ findHardcodedWallpapers(false);
    }

    return hardcodedWallpapers;
}

/**
 * @@@
 */
async function findHardcodedWallpapers(showWarnings: boolean): Promise<Array<IWallpaperSerialized>> {
    const wallpapers: Array<IWallpaperSerialized> = [];

    const wallpapersmetadataFilePaths = await getHardcodedWallpapersMetadataFilePaths();

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

        const colorStats = YAML.parse(await readFile(colorStatsFilePath, 'utf8'));

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

        const title = extractTitleFromContent(content) || 'Untitled';

        const src = metadata!.image_paths![0 /* <- TODO: Detect different than 1 item */];
        const prompt = metadata!.prompt;

        const keywords = Array.from(parseKeywordsFromWallpaper({ prompt, content }));

        wallpapers.push({
            id,
            parent: null,
            src,
            prompt,
            colorStats,
            title,
            content,
            metadataFilePath,
            colorStatsFilePath,
            contentFilePath,
            keywords,
            author: SYSTEM_AUTHOR_ID,
            isPublic: true /* <- It is public as it is one of hardcoded wallpapers */,
            saveStage: 'SAVED',
        } as IWallpaperSerialized);
    }

    return wallpapers;
}

/**
 * TODO: Update wallpapers during the run
 * TODO: !! Make script that can check all wallpapers and list only warnings
 */
