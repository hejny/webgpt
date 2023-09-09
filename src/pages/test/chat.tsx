import { useEffect, useState } from 'react';
import spaceTrim from 'spacetrim';
import { Journal } from '../../components/Journal/Journal';
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
            <main
                style={{
                    // outline: `1px dotted red`,
                    // backgroundColor: 'rgba(94,13,13,0.15)',
                    height: '100vh',
                    padding: 0,
                }}
            >
                <Journal
                    onMessage={(message) =>
                        spaceTrim(
                            (block) => `
                                    You said: 

                                    > ${block(message)}  
                                `,
                        )
                    }
                />
            </main>
        </StaticLayout>
    );
}
