import { string_markdown_text, string_name } from '../../../utils/typeAliases';

export type WebgptTaskProgress = PendingWebgptTaskProgress | DoneWebgptTaskProgress;

export interface PendingWebgptTaskProgress {
    readonly name: string_name;
    readonly title: string_markdown_text;
    readonly isDone: false;
}

export interface DoneWebgptTaskProgress {
    readonly name: string_name;
    readonly title?: string_markdown_text /* <- TODO> && Exclude<title, JSX.Element> */;
    readonly isDone: true;
}

/**
 * TODO: [🧠] estimates, done,...
 * TODO: [🧠] Do performance.mark and   performance.measure alongside TaskProgress
 */
