import { useEffect, useState } from 'react';
import { joinTasksProgress } from '../../components/TaskInProgress/task/joinTasksProgress';
import { mockedMultitaskWithPrompts } from '../../components/TaskInProgress/task/mock/mockedMultitaskWithPrompts';
import { WebgptTaskProgress } from '../../components/TaskInProgress/task/WebgptTaskProgress';
import { TasksInProgress } from '../../components/TaskInProgress/TasksInProgress';

export default function TestTasksProgressWithChatPage() {
    const [tasksProgress, setTasksProgress] = useState<Array<WebgptTaskProgress>>([]);
    useEffect(
        () => {
            /* not await */ mockedMultitaskWithPrompts(async (newTaskProgress) =>
                setTasksProgress((tasksProgress) => joinTasksProgress(...tasksProgress, newTaskProgress)),
            );
        },
        [
            // Note: Run just once
        ],
    );

    return <TasksInProgress {...{ tasksProgress }} />;
}
