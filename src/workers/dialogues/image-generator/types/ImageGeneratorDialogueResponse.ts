import { ImagePromptResult } from '../../../../ai/text-to-image/0-interfaces/ImagePromptResult';

export type ImageGeneratorDialogueResponse= {
    /**
     * The picked image (either pre-generated or generated from the prompt)
     */
    readonly pickedImage: ImagePromptResult;
}
