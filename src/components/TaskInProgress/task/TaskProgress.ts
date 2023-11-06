import { string_name, title } from '../../../utils/typeAliases';

export type TaskProgress = PendingTaskProgress | DoneTaskProgress;

export interface PendingTaskProgress {
    readonly name: string_name;
    readonly title: title;
    readonly isDone: false;
}

export interface DoneTaskProgress {
    readonly name: string_name;
    readonly title?: title;
    readonly isDone: true;
}

/**
 * TODO: [🧠] estimates, done,...
 * TODO: [🧠] Do performance.mark and   performance.measure alongside TaskProgress
 */
