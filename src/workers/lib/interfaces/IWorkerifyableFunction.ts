import { Promisable } from 'type-fest';
import { WebgptTaskProgress } from '../../../components/TaskInProgress/task/WebgptTaskProgress';
import { TransferableObject } from './TransferableObject';

export interface IWorkerifyableFunction<TRequest extends TransferableObject, TResult extends TransferableObject> {
    (request: TRequest, onProgress: (taskProgress: WebgptTaskProgress) => Promisable<void>): Promise<TResult>;
}

/**
 * TODO: !!! Annotate
 */
