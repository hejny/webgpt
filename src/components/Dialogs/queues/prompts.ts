import type { CommonDialogInQueue } from '../interfaces/CommonDialogInQueue';

/**
 * Queue of prompt dialogs that are waiting for an answer
 *
 * @private Use only withing the folder Dialogs
 */
export const promptDialogQueue: Array<CommonDialogInQueue> = [];
