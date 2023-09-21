import type { Promisable } from 'type-fest';
import type { CommonDialogOptions } from '../../components/Dialogs/interfaces/CommonDialogOptions';
import type { TaskProgress } from '../../components/TaskInProgress/task/TaskProgress';

export type TransferableObject = any /* <-[0] */;

export type IWorkerifyableFunction<TRequest extends TransferableObject, TResult extends TransferableObject> = (
    request: TRequest,
    onProgress: (taskProgress: TaskProgress) => Promisable<void>,
) => Promise<TResult>;

export type IMessageMainToWorker<TRequest extends TransferableObject> =
    | IMessageRequest<TRequest>
    | IMessageDialogAnswer;

export interface IMessageRequest<TRequest extends TransferableObject> {
    type: 'REQUEST';
    request: TRequest;
}

export interface IMessageDialogAnswer {
    type: 'DIALOG_ANSWER';
    dialogAnswer: string | null /* <-[🍁] */;
}

export type IMessageWorkerToMain<TResult extends TransferableObject> =
    | IMessageProgress
    | IMessageResult<TResult>
    | IMessageError
    | IMessageDialog;

export interface IMessageProgress {
    type: 'PROGRESS';
    taskProgress: TaskProgress;
}

export interface IMessageResult<TResult extends TransferableObject> {
    type: 'RESULT';
    result: TResult;
}

export interface IMessageError {
    type: 'ERROR';
    message: string;
}

export interface IMessageDialog {
    type: 'DIALOG';
    dialogOptions: CommonDialogOptions;
}
