import { DialogueFunction } from '../dialogues/interfaces/DialogueFunction';

/**
 * TODO: !!! Annotate all
 */
export interface WorkerifyOptions {
    supportDialogues: Array<DialogueFunction<any, any>>;
    isPreventedUnsavedChanges: boolean;
}
