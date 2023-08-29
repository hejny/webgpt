import { string_name, string_title } from '../typeAliases';

export interface TaskProgress {
    name: string_name;
    title: string_title;
    isDone: boolean;
    subTasks: TaskProgress[];
}

/**
 * TODO: [🧠] estimates, done,...
 * TODO: !!! ACRY Use string_name search "name: string"
 */
