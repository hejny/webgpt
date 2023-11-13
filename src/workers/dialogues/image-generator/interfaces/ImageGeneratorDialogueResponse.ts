import { ImagePromptResult } from '../../../../ai/text-to-image/0-interfaces/ImagePromptResult';

export interface ImageGeneratorDialogueResponse {
    /**
     * The picked image (either pre-generated or generated from the prompt)
     */
    pickedImage: ImagePromptResult;
}

/**
 * TODO: !!! Annotate + readonly
 */
