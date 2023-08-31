import { Registration } from 'destroyable';
import { useEffect, useMemo, useState } from 'react';
import { forTime } from 'waitasecond';
import { StaticAppHead } from '../../components/AppHead/StaticAppHead';
import { joinTasksProgress } from '../../components/TaskInProgress/task/joinTasksProgress';
import { TaskProgress } from '../../components/TaskInProgress/task/TaskProgress';
import { TasksInProgress } from '../../components/TaskInProgress/TasksInProgress';

const MOCKED_TASKS_PROGRESS_QUEUE: Array<TaskProgress> = [
    {
        name: 'image-analysis',
        title: 'Analyzing image (1)',
        isDone: false,
    },
    {
        name: 'text-analysis',
        title: 'Analyzing text (2)',
        isDone: false,
    },
    {
        name: 'image-analysis',
        isDone: true,
    },
    {
        name: 'voice-analysis',
        title: 'Analyzing voice (3)',
        isDone: true,
    },
    {
        name: 'text-analysis',
        title: (
            <>
                Analyzing <i>newsletter</i> text (2)
            </>
        ),
        isDone: true,
    },
    {
        name: '4',
        title: 'Something (4)',
        isDone: false,
    },
    {
        name: '5',
        title: 'Something else (5)',
        isDone: false,
    },
    {
        name: '6',
        title: 'Something different (6)',
        isDone: false,
    },
    {
        name: '6',
        title: 'Something different A (6)',
        isDone: false,
    },
    {
        name: '6',
        title: 'Something different B (6)',
        isDone: false,
    },
    {
        name: '6',
        title: 'Something different C (6)',
        isDone: false,
    },
    {
        name: '6',
        title: 'Something different D (6)',
        isDone: false,
    },
    {
        name: '6',
        title: 'Something different E (6)',
        isDone: false,
    },
    {
        name: '6',
        title: 'Something different F (6)',
        isDone: true,
    },
];

export default function TestLoadingPage() {
    const queue = useMemo<Array<TaskProgress>>(
        () => [...MOCKED_TASKS_PROGRESS_QUEUE],
        [
            /* No dependencies - make just once per page load */
        ],
    );
    const [tasksProgress, setTasksProgress] = useState<Array<TaskProgress>>([]);
    useEffect(() => {
        const registration = Registration.create(async ({ isDestroyed }) => {
            while (true) {
                await forTime(Math.random() * 1000 + 500);

                if (isDestroyed()) {
                    return;
                }
                const newTaskProgress = queue.shift();
                if (!newTaskProgress) {
                    return;
                }

                console.info('☑', newTaskProgress);
                setTasksProgress((tasksProgress) => joinTasksProgress(...tasksProgress, newTaskProgress));
            }
        });

        return () => registration.destroy();
    });

    return (
        <>
            <StaticAppHead subtitle={null} />
            <TasksInProgress {...{ tasksProgress }} />
        </>
    );
}
