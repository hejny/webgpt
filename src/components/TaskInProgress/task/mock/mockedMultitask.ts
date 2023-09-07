import spaceTrim from 'spacetrim';
import { Promisable } from 'type-fest';
import { forTime } from 'waitasecond';
import { TaskProgress } from '../TaskProgress';
import { MOCKED_TASKS_PROGRESS_QUEUE } from './_tasks';

export async function mockedMultitask(onProgress: (taskProgress: TaskProgress) => Promisable<void>): Promise<void> {
    console.info(
        spaceTrim(`
            %cStart mockedMultitask
            Note: This should be used only for development purposes.
        `), // <- TODO: Put only in one bracket
        spaceTrim(`
            display: block;
            background: #F1E314;
            border: 1px solid #7E7E7E;
            color: #000000;
            padding: 5px;
            border-radius: 3px;
        `),
    );
    const queue = [...MOCKED_TASKS_PROGRESS_QUEUE];

    while (true) {
        await forTime(Math.random() * 1000 + 500);

        const newTaskProgress = queue.shift();
        if (!newTaskProgress) {
            return;
        }

        console.info('☑', newTaskProgress);
        await onProgress(newTaskProgress);
    }
}
