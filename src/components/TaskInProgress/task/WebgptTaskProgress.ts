import { string_name, title } from '../../../utils/typeAliases';

export type WebgptTaskProgress = PendingWebgptTaskProgress | DoneWebgptTaskProgress;

export interface PendingWebgptTaskProgress {
    readonly name: string_name;
    readonly title: title;
    readonly isDone: false;
}

export interface DoneWebgptTaskProgress {
    readonly name: string_name;
    readonly title?: title;
    readonly isDone: true;
}

/**
 * TODO: [🧠] estimates, done,...
 * TODO: [🧠] Do performance.mark and   performance.measure alongside TaskProgress
 */
