import { string_name, string_title } from '../../../utils/typeAliases';

export type TaskProgress = PendingTaskProgress | DoneTaskProgress;

export interface PendingTaskProgress {
    name: string_name;
    title: string_title /* <- !!! message */;
    isDone: false;
}

export interface DoneTaskProgress {
    name: string_name;
    title?: string_title;
    isDone: true;
}

/**
 * TODO: [🧠] estimates, done,...
 */
