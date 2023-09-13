import { Promisable } from 'type-fest';
import { TaskProgress } from '../../components/TaskInProgress/task/TaskProgress';

export type TransferableObject = any /* <-[0] */;

export type IWorkerifyableFunction<TRequest extends TransferableObject, TResult extends TransferableObject> = (
    request: TRequest,
    onProgress: (taskProgress: TaskProgress) => Promisable<void>,
) => Promise<TResult>;

export interface IMessageRequest<TRequest extends TransferableObject> {
    type: 'REQUEST';
    request: TRequest;
}

export type IMessageResponse<TResult extends TransferableObject> =
    | IMessageProgress
    | IMessageResult<TResult>
    | IMessageError;

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
