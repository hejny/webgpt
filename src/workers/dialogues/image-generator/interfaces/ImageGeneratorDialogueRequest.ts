import { string_image_prompt } from '../../../../utils/typeAliases';

export interface ImageGeneratorDialogueRequest {
    /**
     * Prompt message for the image
     *
     * @example "Café in the space, realistic"
     */
    defaultImagePrompt: string_image_prompt;
}

/**
 * TODO: !!! Annotate + readonly
 * TODO: [🧠] How/Should to pass image/model requirements? Should be here ImagePromptResult?
 */
