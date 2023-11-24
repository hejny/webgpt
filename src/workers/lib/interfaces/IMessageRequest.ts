import { TransferableObject } from './TransferableObject';

/**
 * Runs a workerify function in a worker thread
 *
 * Note: This message is send from main thread to a worker thread
 */
export interface IMessageRequest<TRequest extends TransferableObject> {
    /**
     * Discriminator property to distinguish this message from others.
     */
    readonly type: 'REQUEST';

    /**
     * The request to the workerify function call
     */
    readonly request: TRequest;
}
