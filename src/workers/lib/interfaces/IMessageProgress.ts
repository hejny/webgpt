import { WebgptTaskProgress } from '../../../components/TaskInProgress/task/WebgptTaskProgress';

/**
 * Update the progress of the workerify function call
 *
 * Note: This message is send from worker thread to a main thread
 */
export interface IMessageProgress {
    /**
     * Discriminator property to distinguish this message from others.
     */
    readonly type: 'PROGRESS';

    /**
     * The progress of the workerify function call
     */
    readonly taskProgress: WebgptTaskProgress;
}
