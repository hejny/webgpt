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
}

/**
 * TODO: !!! Require keywords: Array<string_keyword>
 * TODO: !!! Annotate + readonly
 * TODO: !! isImagePromptAllowedToChange
 * TODO: [🧠] How/Should to pass image/model requirements? Should be here ImagePromptResult?
 */
