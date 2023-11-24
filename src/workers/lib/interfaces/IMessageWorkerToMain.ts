import { IMessageDialogueRequest } from './IMessageDialogueRequest';
import { IMessageError } from './IMessageError';
import { IMessageProgress } from './IMessageProgress';
import { IMessageResult } from './IMessageResult';
import { TransferableObject } from './TransferableObject';

/**
 * Union type of all messages that can be sent from a worker to the main thread.
 */
export type IMessageWorkerToMain<TResult extends TransferableObject> =
    | IMessageProgress
    | IMessageResult<TResult>
    | IMessageError
    | IMessageDialogueRequest;
