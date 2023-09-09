import { useEffect, useState } from 'react';
import { Center } from '../../components/Center/Center';
import { Journal } from '../../components/Journal/Journal';
import { StaticLayout } from '../../components/StaticLayout/StaticLayout';
import { joinTasksProgress } from '../../components/TaskInProgress/task/joinTasksProgress';
import { mockedMultitask } from '../../components/TaskInProgress/task/mock/mockedMultitask';
import { TaskProgress } from '../../components/TaskInProgress/task/TaskProgress';

export default function TestVoiceWithChatPage() {
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
        <StaticLayout subtitle="Test chat with voice">
            <main style={{ height: '100vh' }}>
                <Center>
                    <Journal isVoiceEnabled />
                </Center>
            </main>{' '}
        </StaticLayout>
    );
}
