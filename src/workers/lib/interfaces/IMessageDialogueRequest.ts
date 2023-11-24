import type { string_name, uuid } from '../../../utils/typeAliases';

/**
 * Represents a request to open a dialogue
 *
 * Note: This message is send from worker thread to a main thread
 */
export interface IMessageDialogueRequest {
    /**
     * This has two roles:
     * 1. Determines the type of the dialogue
     * 2. Discriminator property to distinguish this message from others
     */
    readonly type: `${string_name}_DIALOGUE_REQUEST`;

    /**
     * The unique identifier of the dialogue request
     */
    readonly id: uuid;

    /**
     * The request of the dialogue
     */
    readonly request: any;
}
