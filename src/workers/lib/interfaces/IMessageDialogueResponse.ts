import type { string_name, uuid } from '../../../utils/typeAliases';

/**
 * Sends user's response of a dialogue to the worker thread
 *
 * Note: This message is send from main thread to a worker thread
 */
export interface IMessageDialogueResponse {
    /**
     * This has two roles:
     * 1. Determines the type of the dialogue
     * 2. Discriminator property to distinguish this message from others
     */
    readonly type: `${string_name}_DIALOGUE_RESPONSE`;

    /**
     * The unique identifier of the dialogue request
     */
    readonly id: uuid;

    /**
     * The response of the dialogue
     */
    readonly response: any;
}
