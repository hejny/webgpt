import type { DialogueFunction } from '../dialogues/interfaces/DialogueFunction';

/**
 * Options for Workerify.
 */
export interface WorkerifyOptions {
    /**
     * The list of dialogues that can be triggered by the worker.
     */
    supportDialogues: Array<DialogueFunction<any, any>>;

    /**
     * Whether the worker should prevent unsaved changes.
     * If true, the worker will prevent the user from closing the tab or refreshing the page until the function is resolved or rejected.
     */
    isPreventedUnsavedChanges: boolean;
}
