import { string_keyword } from 'n12';
import { message, string_image_prompt } from '../../../../utils/typeAliases';

export interface ImageGeneratorDialogueRequest {
    /**
     * The message
     * What is goal of the image?
     *
     * @example "Wallpaper image for your café"
     */
    message: message;

    /**
     * Prompt message for the image
     *
     * @example "Café in the space, realistic"
     */
    defaultImagePrompt: string_image_prompt;

    /**
     * Keywords for the image
     * Note: This is redundant with the defaultImagePrompt, but it's easier to search for keywords in the pregenerated database
     *
     * @example ["cafe", "space", "realistic"]
     */
    keywords: Array<string_keyword>;
}

/**
 * TODO: !!! Annotate + readonly
 * TODO: !! isImagePromptAllowedToChange
 * TODO: [🧠] How/Should to pass image/model requirements? Should be here ImagePromptResult?
 */
