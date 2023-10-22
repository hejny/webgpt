import { Writable } from 'type-fest';
import { TaskProgress } from './TaskProgress';

/**
 * Merges tasks with same name into one in array of tasks
 * Note: It depends on order
 *
 * @param tasksProgress Array of TaskProgress
 * @returns joined Array of TaskProgress
 */
export function joinTasksProgress(...tasksProgress: Array<TaskProgress>): Array<TaskProgress> {
    const joinedTasksProgress: Array<Writable<TaskProgress>> = [];

    for (const newTaskProgress of tasksProgress) {
        const joinedTaskProgress = joinedTasksProgress.find(
            (taskProgress) => taskProgress.name === newTaskProgress.name,
        );

        if (!joinedTaskProgress) {
            if (!newTaskProgress.title) {
                console.info({ newTaskProgress });
                throw new Error(`Missing title for task "${newTaskProgress.name}"`);
            }
            joinedTasksProgress.push(newTaskProgress);
            continue;
        } else {
            if (newTaskProgress.isDone) {
                joinedTaskProgress.isDone = true;
            }

            if (newTaskProgress.title) {
                joinedTaskProgress.title = newTaskProgress.title;
            }
        }
    }

    return joinedTasksProgress as Array<TaskProgress>;
}
