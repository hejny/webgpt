import { TaskProgress } from './TaskProgress';

/**
 * Flatten TaskProgress and all subtasks into a single array
 */
export function flattenTaskProgress(taskProgress: TaskProgress): Array<Omit<TaskProgress, 'subtasks'>> {
    const { subtasks, ...rest } = taskProgress;
    return subtasks
        ? subtasks.reduce((acc, subtask) => [...acc, ...flattenTaskProgress(subtask)], [rest] as Array<
              Omit<TaskProgress, 'subtasks'>
          >)
        : [rest];
}
