import { TaskProgress } from '@promptbook/types';
import { FONTS } from '../../../../config';
import { getExecutionTools } from '../../../ai/prompt-templates/getExecutionTools';
import { webgptPtpLibrary } from '../../../ai/prompt-templates/webgptPtpLibrary';
import { validateMaxdown } from '../../../components/Content/Maxdown/validateMaxdown';
import { addFontToContent } from '../../../components/ImportFonts/addFontToContent';
import type { WriteWallpaperPromptResponse } from '../../../pages/api/image-to-text';
import { $randomItem } from '../../../utils/randomItem';
import {
    client_id,
    description,
    string_image_prompt,
    string_maxdown,
    string_name,
    string_translate_language,
    string_url,
    string_url_image,
    title,
} from '../../../utils/typeAliases';

export interface CreateNewWallpaperTextRequest {
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
    readonly author: client_id;

    /**
     * URL of the wallpaper in our CDN
     */
    readonly wallpaperUrl?: string_url_image;

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
        readonly content: string_maxdown;

        // <- TODO: !! [🧠] Maybe allow to have empty name+title+content just write assignment and auto generate
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

export interface CreateNewWallpaperTextResult {
    /**
     * Content of the wallpaper with font applied
     */
    readonly contentWithFont: string_maxdown;

    /**
     * Text prompt which was used to generate the wallpaper image
     */
    readonly wallpaperPrompt: string_image_prompt;
}

/**
 * Process text part for createNewWallpaper
 *
 * @private Use ONLY in createNewWallpaper
 */
export async function createNewWallpaper_text(
    request: CreateNewWallpaperTextRequest,
    onProgress: (taskProgress: TaskProgress) => void,
): Promise<CreateNewWallpaperTextResult> {
    const { locale, title, author, wallpaperUrl, idea /* TODO: Use> links, addSections */ } = request;
    let description =
        idea; /* <- TODO: !!  Originally here was ` let { description } = request;` is `let description = idea` this good solution? */

    //-------[ Content analysis: ]---
    if (!description && wallpaperUrl) {
        await onProgress({
            name: 'image-to-text',
            title: 'Content analysis',
            isStarted: true,
            isDone: false,
            executionType: 'SCRIPT' /* <- [🧠][🦕] This should have its own executionType */,
            parameterName: 'wallpaperDescription',
            parameterValue: null,
            // TODO: Make it more granular
        });

        const response = await fetch('/api/image-to-text', {
            method: 'POST',
            body: JSON.stringify({ wallpaperUrl }),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });

        if (response.ok === false) {
            // TODO: [🈵] If 4XX error, show also the message from json body
            throw new Error(`Content analysis failed with status ${response.status}`);
        }

        const { wallpaperDescription } = (await response.json()) as WriteWallpaperPromptResponse;
        description = wallpaperDescription;

        console.info({ description });
        await onProgress({
            name: 'image-to-text',
            title: 'Content analysis',
            isStarted: true,
            isDone: true,
            executionType: 'SCRIPT' /* <- [🧠][🦕] This should have its own executionType */,
            parameterName: 'wallpaperDescription',
            parameterValue: wallpaperDescription,
        });
    }

    //-------[ /Content analysis ]---
    //===========================================================================
    //-------[ Write content: ]---
    await onProgress({
        name: 'write-website-content',
        title: 'Copywriting',
        isStarted: true,
        isDone: true,
        executionType: 'SCRIPT' /* <- [🧠][🦕] This should have its own executionType */,
        parameterName: 'content',
        parameterValue: null,
    });

    const writeWebsiteContentLocaleMap = {
        en: 'writeWebsiteContent',
        cs: 'writeWebsiteContentCs',
        /* <- TODO: [👧] Constrain key to only existing PTPs in the library */
    };

    const { content, wallpaperPrompt } = await webgptPtpLibrary.createExecutor(
        writeWebsiteContentLocaleMap[locale],
        getExecutionTools(author),
    )(
        {
            rawTitle: title || '' /* <- TODO: !! This should be EXACLY in content */,
            rawAssignment: description || '',
            idea: idea || '',
            /*            '' <- TODO: [🧠] Make some system how to pass and default/condition undefined params */

            /*
            TODO: !! Use in write-website-content-cs.ptbk.md and uncomment here
            links,
            addSections,
            */
        },
        onProgress,
    );

    await onProgress({
        name: 'write-website-content',
        title: 'Copywriting',
        isStarted: true,
        isDone: true,
        executionType: 'SCRIPT' /* <- [🧠][🦕] This should have its own executionType */,
        parameterName: 'content',
        parameterValue: content!,
    });

    //-------[ /Write content ]---
    //===========================================================================
    //-------[ Picking font: ]---
    const font = $randomItem(
        ...FONTS.filter(({ isSpecial }) => !isSpecial) /* <- TODO: [🧠][🔠] Some better heurictic than pure random */,
    );

    const contentWithFont = addFontToContent(
        validateMaxdown(content || ''), // <- TODO: [👧] Strongly type the executors to avoid need of remove nullables whtn noUncheckedIndexedAccess in tsconfig.json
        font.fontFamily,
    );

    //-------[ /Picking font ]---
    //===========================================================================

    return { contentWithFont, wallpaperPrompt: '!!' /* <- TODO: [🚿] Pass here the original or normalized prompt */ };
}
