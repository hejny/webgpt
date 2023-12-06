import type { message, string_image_prompt } from '../../../../utils/typeAliases';
import type { AbstractDialogueRequest } from '../../../lib/dialogues/interfaces/AbstractDialogueRequest';

export type ImageGeneratorDialogueRequest = AbstractDialogueRequest & {
    /**
     * The message
     * What is goal of the image?
     *
     * @example "Wallpaper image for your café"
     */
    readonly message: message;

    /**
     * Prompt message for the image
     *
     * @example "Café in the space, realistic"
     */
    readonly defaultImagePrompt: string_image_prompt;
};

/**
 * TODO: !! isImagePromptAllowedToChange
 * TODO: [🧠] How/Should to pass image/model requirements? Should be here ImagePromptResult?
 */
