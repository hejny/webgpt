import type { ImagePromptResult } from '../../../../ai/text-to-image/0-interfaces/ImagePromptResult';
import type { AbstractDialogueResponse } from '../../../lib/dialogues/interfaces/AbstractDialogueResponse';

export type ImageGeneratorDialogueResponse = AbstractDialogueResponse & {
    /**
     * The picked image (either pre-generated or generated from the prompt)
     */
    readonly pickedImage: ImagePromptResult;
};
