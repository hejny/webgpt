import { string_name, string_title } from '../../../utils/typeAliases';

export interface TaskProgress {
    name: string_name;
    title: string_title;
    isDone: boolean;
    subtasks?: Array<TaskProgress>;
}

/**
 * Note: [👩‍👦‍👦] Subtasks are not used yet - we are instead joining tasks by its name
 * TODO: [🧠] estimates, done,...
 */
