import { ImagePromptResult } from "../../../../ai/text-to-image/0-interfaces/ImagePromptResult";
import { DalleImageGenerator } from "../../../../ai/text-to-image/dalle/DalleImageGenerator";

export interface ImageGeneratorDialogueResponse {
    /**
     * The generated image
     */
    ImagePromptResult: ImagePromptResult;
}

/**
 * TODO: !!! Annotate + readonly
 */
