import { TransferableObject } from './TransferableObject';

/**
 * Result of a workerify function call
 *
 * Note: This message is send from worker thread to a main thread
 */
export interface IMessageResult<TResult extends TransferableObject> {
    /**
     * Discriminator property to distinguish this message from others
     */
    readonly type: 'RESULT';

    /**
     * The result of the workerify function call
     */
    readonly result: TResult;
}
