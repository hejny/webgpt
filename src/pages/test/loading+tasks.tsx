import { useEffect, useState } from 'react';
import { forTime } from 'waitasecond';
import { StaticAppHead } from '../../components/AppHead/StaticAppHead';
import { joinTasksProgress } from '../../components/TaskInProgress/task/joinTasksProgress';
import { TaskProgress } from '../../components/TaskInProgress/task/TaskProgress';
import { TasksInProgress } from '../../components/TaskInProgress/TasksInProgress';

const MOCKED_TASKS_PROGRESS_QUEUE: Array<TaskProgress> = [
    {
        name: 'image-analysis',
        title: 'Analyzing image',
        isDone: false,
    },
    {
        name: 'text-analysis',
        title: 'Analyzing text',
        isDone: false,
    },
    {
        name: 'image-analysis',
        isDone: true,
    },
    {
        name: 'voice-analysis',
        title: 'Analyzing voice',
        isDone: true,
    },
    {
        name: 'text-analysis',
        title: 'Analyzing text (newsletter)',
        isDone: true,
    },
];

export default function TestLoadingPage() {
    const [tasksProgress, setTasksProgress] = useState<Array<TaskProgress>>([]);
    useEffect(() => {
        (async () => {
            const queue = [...MOCKED_TASKS_PROGRESS_QUEUE];

            while (true) {
                await forTime(Math.random() * 1000 + 500);

                const newTaskProgress = queue.shift();
                if (!newTaskProgress) {
                    return;
                }
                setTasksProgress((tasksProgress) => joinTasksProgress(...tasksProgress, newTaskProgress));
            }
        })();
    });

    return (
        <>
            <StaticAppHead subtitle={null} />
            <TasksInProgress {...{ tasksProgress }} />
        </>
    );
}
