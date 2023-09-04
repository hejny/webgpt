import { string_name, title } from '../../../utils/typeAliases';

export type TaskProgress = PendingTaskProgress | DoneTaskProgress;

export interface PendingTaskProgress {
    name: string_name;
    title: title;
    isDone: false;
}

export interface DoneTaskProgress {
    name: string_name;
    title?: title;
    isDone: true;
}

/**
 * TODO: [🧠] estimates, done,...
 * TODO: [🧠] Do performance.mark and   performance.measure alongside TaskProgress
 */
