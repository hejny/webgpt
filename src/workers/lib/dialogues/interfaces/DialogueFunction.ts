import { string_name } from '@promptbook/types';
import { DialogueComponent } from './DialogueComponent';

/**
 * DialogueFunction is a function that triggers a dialogue and returns a promise that resolves to the response of the dialogue.
 * It can be used both in main thread and in worker thread (with Workerify).
 */
export interface DialogueFunction<TRequest, TResponse> {
    /**
     * The unique name of the dialogue to identify it.
     */
    dialogueTypeName: string_name;

    /**
     * The React component that renders the dialogue.
     */
    DialogueComponent: DialogueComponent<TRequest, TResponse>;

    (request: TRequest): Promise<TResponse>;
}

