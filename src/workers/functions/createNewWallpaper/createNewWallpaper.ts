import { Vector } from 'xyzt';
import { WebgptTaskProgress } from '../../components/TaskInProgress/task/WebgptTaskProgress';
import { addWallpaperComputables } from '../../utils/addWallpaperComputables';
import { serializeWallpaper } from '../../utils/hydrateWallpaper';
import { IImageColorStats } from '../../utils/image/utils/IImageColorStats';
import { getSupabaseForWorker } from '../../utils/supabase/getSupabaseForWorker';
import {
    description,
    string_image_prompt,
    string_markdown,
    string_name,
    string_translate_language,
    string_url,
    string_url_image,
    string_wallpaper_id,
    title,
    uuid,
} from '../../utils/typeAliases';
import { createNewWallpaper_prepareFromIdea } from './createNewWallpaper_prepareFromIdea';
import { createNewWallpaper_prepareFromImage } from './createNewWallpaper_prepareFromImage';

export interface CreateNewWallpaperRequest {
    /**
     * The language
     * - It is used to select the right prompt template pipeline
     * - The interaction with the user is in this language
     * - The generated content is in this language
     */
    locale: string_translate_language;

    /**
     * Title of the wallpaper
     *
     * If set, the generated content will start with this title
     * If null, it will be written by AI
     */
    readonly title?: Exclude<title, JSX.Element>;

    /**
     * Author of the wallpaper
     * Note: It must be valid client ID and same as identity of the user
     */
    readonly author: uuid;

    /**
     * Image of the wallpaper
     */
    readonly wallpaperImage?: Blob;

    /**
     * General idea for the website
     *
     * It can be single word, sentence or even whole paragraph
     *
     * Examples:
     * - "Cat hotel"
     * - "Cat hotel in Prague"
     * - "Café with cats in Prague"
     * - "Personal page of developer Pavol Hejný, who is also a cat lover"
     */
    readonly idea?: Exclude<description, JSX.Element>;

    /**
     * Additional sections to be added to the content
     */
    readonly addSections?: Array<{
        /**
         * Unique name of the section
         * Note: It is used for example as element ID to lead anchor links to this section
         */
        readonly name: string_name;

        /**
         * Title of the section
         */
        readonly title: Exclude<title, JSX.Element>;

        /**
         * Order of the section
         * TODO: [🧠] Some transparent system to order sections
         */
        readonly order: number;

        /**
         * Content of the section
         */
        readonly content: string_markdown;
    }>;

    /**
     * Links to be added to the content
     */
    readonly links?: Array<{
        /**
         * Title of the link - it is used as link text and also as title attribute
         */
        readonly title: Exclude<title, JSX.Element>;

        /**
         * URL of the link
         */
        readonly url: string_url;
    }>;
}

export interface CreateNewWallpaperPrepareResult {
    // !!! Annotate all

    readonly wallpaperUrl: string_url_image;
    readonly colorStats: IImageColorStats<string>;
    readonly originalSize: Vector;
    readonly contentWithFont: string_markdown;
    readonly wallpaperPrompt: string_image_prompt;
}

export interface CreateNewWallpaperResult {
    readonly wallpaperId: string_wallpaper_id;
}

/**
 * Create a new wallpaper
 *
 * @workerify Do not use directly, use createNewWallpaperForBrowser instead
 * @private Use only withing the folder createNewWallpaper
 */
export async function createNewWallpaper(
    request: CreateNewWallpaperRequest,
    onProgress: (taskProgress: WebgptTaskProgress) => void,
): Promise<CreateNewWallpaperResult> {
    const { author, wallpaperImage } = request;

    const { wallpaperUrl, colorStats, originalSize, wallpaperPrompt, contentWithFont } = await (wallpaperImage
        ? createNewWallpaper_prepareFromImage(request, onProgress)
        : createNewWallpaper_prepareFromIdea(request, onProgress));

    await onProgress({
        name: 'finishing',
        title: 'Finishing',
        isDone: false,
        // Note: No need to end this task, because it is the last one and will be ended by navigation to new page
    });
    const newWallpaper = addWallpaperComputables({
        parent: null,
        author,
        isPublic: false,
        src: wallpaperUrl,
        prompt: wallpaperPrompt,
        colorStats,
        naturalSize:
            originalSize /* <- TODO: [🧠] Make naming more clear, what means `naturalSize` and what `originalSize`? */,
        content: contentWithFont,
        saveStage: 'SAVING',
    });

    const insertResult = await getSupabaseForWorker().from('Wallpaper').insert(serializeWallpaper(newWallpaper));

    // TODO: !! Util isInsertSuccessfull (status===201)
    console.info({ newWallpaper, insertResult });

    return { wallpaperId: newWallpaper.id };
}

/**
 * TODO: [🥩] Make version just without prompting
 * TODO: !! Save wallpaperDescription in wallpaper (and maybe whole Azure response)
 * TODO: This function should not know anything that she runs in a worker (getSupabaseForWorker)
 * TODO: `author` must be valid client ID and same as `clientId`
 */
