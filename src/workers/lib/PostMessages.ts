import { Promisable } from 'type-fest';
import { WebgptTaskProgress } from '../../components/TaskInProgress/task/WebgptTaskProgress';
import { uuid } from '../../utils/typeAliases';

export type TransferableObject = any /* <-[0] */;

export type IWorkerifyableFunction<TRequest extends TransferableObject, TResult extends TransferableObject> = (
    request: TRequest,
    onProgress: (taskProgress: WebgptTaskProgress) => Promisable<void>,
) => Promise<TResult>;

export type IMessageMainToWorker<TRequest extends TransferableObject> =
    | IMessageRequest<TRequest>
    | IMessageDialogueResponse;

export interface IMessageRequest<TRequest extends TransferableObject> {
    readonly type: 'REQUEST';
    readonly request: TRequest;
}

export interface IMessageDialogueResponse {
    readonly type: `${string}_DIALOGUE_RESPONSE`;
    readonly id: uuid;
    readonly response: any;
}

export type IMessageWorkerToMain<TResult extends TransferableObject> =
    | IMessageProgress
    | IMessageResult<TResult>
    | IMessageError
    | IMessageDialogueRequest;

export interface IMessageProgress {
    readonly type: 'PROGRESS';
    readonly taskProgress: WebgptTaskProgress;
}

export interface IMessageResult<TResult extends TransferableObject> {
    readonly type: 'RESULT';
    readonly result: TResult;
}

export interface IMessageError {
    readonly type: 'ERROR';
    readonly message: string;
}

export interface IMessageDialogueRequest {
    readonly type: `${string}_DIALOGUE_REQUEST`;
    readonly id: uuid;
    readonly request: any;
}

/**
 * TODO: !!! To Lib folder
 * TODO: !!! Annotate
 */
