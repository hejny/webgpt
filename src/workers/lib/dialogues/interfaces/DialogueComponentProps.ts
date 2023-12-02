import type { AbstractDialogueRequest } from "./AbstractDialogueRequest";
import type { AbstractDialogueResponse } from "./AbstractDialogueResponse";

export interface DialogueComponentProps<
    TRequest extends AbstractDialogueRequest,
    TResponse extends AbstractDialogueResponse,
> {
    /**
     * The request for the user
     */
    readonly request: TRequest;

    /**
     * The function to call when the user responds to the request.
     *
     * Note: The function must be called exactly once.
     * Note: It is the responsibility of the dialogue to call it. If it is not called, the dialogue will hang.
     */
    respond(response: TResponse): void;
}
