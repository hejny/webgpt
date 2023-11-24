/**
 * Indicate an error during the workerify function call
 *
 * Note: This message is send from worker thread to a main thread
 */
export interface IMessageError {
    /**
     * Discriminator property to distinguish this message from others.
     */
    readonly type: 'ERROR';

    /**
     * The error message
     */
    readonly message: string;
}
