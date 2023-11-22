import { IMessageDialogueResponse } from './IMessageDialogueResponse';
import { IMessageRequest } from './IMessageRequest';
import { TransferableObject } from './TransferableObject';

export type IMessageMainToWorker<TRequest extends TransferableObject> =
    | IMessageRequest<TRequest>
    | IMessageDialogueResponse;
