import type { CommonDialogInQueue } from '../interfaces/CommonDialogInQueue';

/**
 * Queue of prompt dialogs that are waiting for an answer
 *
 * @private this should be used only withing this folder Dialogs
 */
export const promptDialogQueue: Array<CommonDialogInQueue> = [];
