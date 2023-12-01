import { makeDialogueFunction } from '../../lib/dialogues/makeDialogueFunction';
import { ImageGeneratorDialogueComponent } from './component/ImageGeneratorDialogueComponent';
import type { ImageGeneratorDialogueRequest } from './interfaces/ImageGeneratorDialogueRequest';
import type { ImageGeneratorDialogueResponse } from './interfaces/ImageGeneratorDialogueResponse';

/**
 * Image Generator dialogue offers a modal to the user to pick image from a photobank or to generate a new one.
 */
export const imageGeneratorDialogue = makeDialogueFunction<
    ImageGeneratorDialogueRequest,
    ImageGeneratorDialogueResponse
>(ImageGeneratorDialogueComponent);
