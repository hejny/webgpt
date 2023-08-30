import { string_name, string_title } from '../../../utils/typeAliases';

export interface TaskProgress {
    name: string_name;
    title: string_title;
    isDone: boolean;
    subTasks: TaskProgress[];
}

/**
 * TODO: [🧠] estimates, done,...
 */
