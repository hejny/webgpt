import { useState } from 'react';
import { joinTasksProgress } from '../../components/TaskInProgress/task/joinTasksProgress';
import { mockedMultitaskWithPrompts } from '../../components/TaskInProgress/task/mock/mockedMultitaskWithPrompts';
import { WebgptTaskProgress } from '../../components/TaskInProgress/task/WebgptTaskProgress';
import { TasksInProgress } from '../../components/TaskInProgress/TasksInProgress';
import { useInitialAction } from '../../utils/hooks/useInitialAction';
import { isRunningInBrowser } from '../../utils/isRunningInWhatever';

export default function TestTasksProgressWithChatPage() {
 
    const [tasksProgress, setTasksProgress] = useState<Array<WebgptTaskProgress>>([]);
    useInitialAction(
        () => isRunningInBrowser(),
        () => {
         
            /* not await */ mockedMultitaskWithPrompts(async (newTaskProgress) =>
                setTasksProgress((tasksProgress) => joinTasksProgress(...tasksProgress, newTaskProgress)),
            );
        },
    );

    return <TasksInProgress {...{ tasksProgress }} />;
}

/**
 * TODO: !!! useInitialAction vs useInitialActionWhenReady
 * TODO: !!! To all experiment functions
 */
