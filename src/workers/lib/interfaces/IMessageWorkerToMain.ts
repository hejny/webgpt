import { IMessageDialogueRequest } from './IMessageDialogueRequest';
import { IMessageError } from './IMessageError';
import { IMessageProgress } from './IMessageProgress';
import { IMessageResult } from './IMessageResult';
import { TransferableObject } from './TransferableObject';

export type IMessageWorkerToMain<TResult extends TransferableObject> =
    | IMessageProgress
    | IMessageResult<TResult>
    | IMessageError
    | IMessageDialogueRequest;
