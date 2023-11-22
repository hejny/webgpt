import { Promisable } from 'type-fest';
import { WebgptTaskProgress } from '../../../components/TaskInProgress/task/WebgptTaskProgress';
import { TransferableObject } from './TransferableObject';

export type IWorkerifyableFunction<TRequest extends TransferableObject, TResult extends TransferableObject> = (
    request: TRequest,
    onProgress: (taskProgress: WebgptTaskProgress) => Promisable<void>,
) => Promise<TResult>;

/**
 * TODO: Refactor: TODO: !!! Change to interface with call type
 * TODO: !!! Annotate
 */
