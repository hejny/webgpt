import { useEffect, useState } from 'react';
import { StaticLayout } from '../../components/StaticLayout/StaticLayout';
import { joinTasksProgress } from '../../components/TaskInProgress/task/joinTasksProgress';
import { mockedMultitask } from '../../components/TaskInProgress/task/mock/mockedMultitask';
import { TaskProgress } from '../../components/TaskInProgress/task/TaskProgress';
import { TasksInProgress } from '../../components/TaskInProgress/TasksInProgress';

export default function TestTasksProgressPage() {
    const [tasksProgress, setTasksProgress] = useState<Array<TaskProgress>>([]);
    useEffect(
        () => {
            /* not await */ mockedMultitask((newTaskProgress) =>
                setTasksProgress((tasksProgress) => joinTasksProgress(...tasksProgress, newTaskProgress)),
            );
        },
        [
            // Note: Run just once
        ],
    );

    return (
        <StaticLayout subtitle="Test loading with tasks">
            <TasksInProgress {...{ tasksProgress }} />
        </StaticLayout>
    );
}
