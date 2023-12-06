import { string_name } from '@promptbook/types';
import { uuid } from '../../../../utils/typeAliases';

/**
 * Represents one dialogue request in the queue.
 */
export interface DialogueRequestInQueue {
    /**
     * The unique name of the dialogue to identify the function that will handle the request.
     */
    dialogueTypeName: string_name;

    /**
     * The unique name of the request to track the request across the system.
     */
    id: uuid;

    /**
     * The request to the user.
     */
    request: any;

    /**
     * The response object or undefined if the request has not been handled yet.
     */
    response?: any;
}
