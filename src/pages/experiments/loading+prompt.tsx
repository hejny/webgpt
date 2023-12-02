import { useState } from 'react';
import { joinTasksProgress } from '../../components/TaskInProgress/task/joinTasksProgress';
import { mockedMultitaskWithPrompts } from '../../components/TaskInProgress/task/mock/mockedMultitaskWithPrompts';
import { WebgptTaskProgress } from '../../components/TaskInProgress/task/WebgptTaskProgress';
import { TasksInProgress } from '../../components/TaskInProgress/TasksInProgress';
import { useInitialAction } from '../../utils/hooks/useInitialAction';
import { isRunningInBrowser } from '../../utils/isRunningInWhatever';

export default function TestTasksProgressWithChatPage() {
    console.info('!!! TestTasksProgressWithChatPage render');

    return <TestTasksProgressWithChatPageInner />;
}

export function TestTasksProgressWithChatPageInner() {
    console.info('!!! TestTasksProgressWithChatPageInner render');

    const [tasksProgress, setTasksProgress] = useState<Array<WebgptTaskProgress>>([]);
    useInitialAction(
        () => isRunningInBrowser(),
        () => {
            console.info('!!! TestTasksProgressWithChatPageInner useInitialAction');

            /* not await */ mockedMultitaskWithPrompts(async (newTaskProgress) =>
                setTasksProgress((tasksProgress) => joinTasksProgress(...tasksProgress, newTaskProgress)),
            );
        },
    );

    return <TasksInProgress {...{ tasksProgress }} />;
}

/**
 * TODO: !!! Back to single component
 */
