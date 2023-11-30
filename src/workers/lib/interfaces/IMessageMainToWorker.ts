import { IMessageDialogueResponse } from './IMessageDialogueResponse';
import { IMessageRequest } from './IMessageRequest';
import { TransferableObject } from './TransferableObject';

/**
 * Union type for all messages that can be sent from the main thread to a worker thread
 */
export type IMessageMainToWorker<TRequest extends TransferableObject> =
    | IMessageRequest<TRequest>
    | IMessageDialogueResponse;
