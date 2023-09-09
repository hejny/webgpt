import { useEffect, useState } from 'react';
import { JournalSection } from '../../components/Journal/Journal';
import { StaticLayout } from '../../components/StaticLayout/StaticLayout';
import { joinTasksProgress } from '../../components/TaskInProgress/task/joinTasksProgress';
import { mockedMultitask } from '../../components/TaskInProgress/task/mock/mockedMultitask';
import { TaskProgress } from '../../components/TaskInProgress/task/TaskProgress';

export default function TestVoicePage() {
    const [tasksProgress, setTasksProgress] = useState<Array<TaskProgress>>([]);
    useEffect(
        () => {
            /* not await */ mockedMultitask((newTaskProgress) =>
                setTasksProgress((tasksProgress) => joinTasksProgress(...tasksProgress, newTaskProgress)),
            );

            let utterance = new SpeechSynthesisUtterance('Hello world!');
            speechSynthesis.speak(utterance);
        },
        [
            // Note: Run just once
        ],
    );

    return (
        <StaticLayout subtitle="Test chat">
            <JournalSection />
        </StaticLayout>
    );
}
