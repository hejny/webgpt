import { TaskProgress } from '@promptbook/types';
import { WebgptTaskProgress } from '../../components/TaskInProgress/task/WebgptTaskProgress';
import { string_image_prompt } from '../../utils/typeAliases';
import { CreateNewWallpaperPrepareResult, CreateNewWallpaperRequest } from './createNewWallpaper';
import { createNewWallpaper_image } from './createNewWallpaper_image';
import { createNewWallpaper_text } from './createNewWallpaper_text';

/**
 * !!! Annotate
 *
 * @private Use ONLY in createNewWallpaper
 */
export async function createNewWallpaper_prepareFromIdea(
    request: CreateNewWallpaperRequest,
    onProgress: (taskProgress: WebgptTaskProgress) => void,
): Promise<CreateNewWallpaperPrepareResult> {
    const { author, wallpaperImage, locale, title, idea, links, addSections } = request;

    if (wallpaperImage) {
        throw new Error('wallpaperImage must NOT be provided');
        //               <- TODO: [👮‍♂️] Maybe constrain this logic into CreateNewWallpaperRequest
        //               <- TODO: ShouldNeverHappenError
    }

    let wallpaperPromptPromiseResolve: (value: string_image_prompt) => void;
    const wallpaperPromptPromise = new Promise<string_image_prompt>((resolve, reject) => {
        wallpaperPromptPromiseResolve = resolve;
    });

    const textPartPromise = /* not await */ createNewWallpaper_text(
        {
            locale,
            title,
            idea,
            author,
            links,
            addSections,
        },
        (taskProgress: TaskProgress) => {

            // TODO: [⛵] DRY
            const isProgressLoggedForCurrentTemplate = taskProgress.executionType === 'PROMPT_TEMPLATE';

            if (isProgressLoggedForCurrentTemplate) {
                onProgress(taskProgress);
            }

            if (taskProgress.isDone && taskProgress.parameterName === 'wallpaperPrompt') {
                if (
                    taskProgress.parameterValue === null ||
                    taskProgress.parameterValue.length < 5 /* <- TODO: MIN_IMAGE_PROMPT_LENGTH to config */
                ) {
                    throw new Error(`Wallpaper prompt is too short: ${taskProgress.parameterValue}`);
                }

                wallpaperPromptPromiseResolve(taskProgress.parameterValue);
            }
        },
    );

    const wallpaperPrompt = await wallpaperPromptPromise;

    const { wallpaperUrl, originalSize, colorStats } = await createNewWallpaper_image(
        { author, wallpaperPrompt },
        onProgress,
    );

    return {
        ...(await textPartPromise),
        wallpaperUrl,
        originalSize,
        colorStats,
        wallpaperPrompt,
    };
}
