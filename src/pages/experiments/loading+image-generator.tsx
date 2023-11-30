import { useCallback, useRef, useState } from 'react';
import { ImagePromptResult } from '../../ai/text-to-image/0-interfaces/ImagePromptResult';
import { joinTasksProgress } from '../../components/TaskInProgress/task/joinTasksProgress';
import { WebgptTaskProgress } from '../../components/TaskInProgress/task/WebgptTaskProgress';
import { TasksInProgress } from '../../components/TaskInProgress/TasksInProgress';
import { mockedMultitaskWithImageGeneratorForBrowser } from '../../workers/functions/mock/mockedMultitaskWithImageGenerator/workerify/mockedMultitaskWithImageGeneratorForBrowser';

export default function TestTasksProgressWithChatPage() {
    const promptRef = useRef<HTMLTextAreaElement>(null);
    const [isRunning, setRunning] = useState(false);
    const [pickedImage, setPickedImage] = useState<ImagePromptResult | null>(null);
    const [tasksProgress, setTasksProgress] = useState<Array<WebgptTaskProgress>>([]);
    const run = useCallback(async () => {
        if (isRunning) {
            return;
        }

        setRunning(true);
        try {
            const { pickedImage } = await mockedMultitaskWithImageGeneratorForBrowser(
                { imagePromptContent: promptRef.current!.value },
                async (newTaskProgress) =>
                    setTasksProgress((tasksProgress) => joinTasksProgress(...tasksProgress, newTaskProgress)),
            );
            setPickedImage(pickedImage);
        } finally {
            setRunning(false);
        }
    }, [isRunning, promptRef]);

    return (
        <>
            This is NOT production code. It is used ONLY for testing the {`<ImagePromptResultsPicker/>`} poped up from
            the worker.
            <br />
            <textarea ref={promptRef} defaultValue="Space café with a view of the Earth" />
            <br />
            <button onClick={run}>Generate image</button>
            <br /> <br />
            <hr />
            <br />
            {pickedImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={pickedImage.imageSrc} alt={pickedImage.normalizedPrompt.content} />
            ) : (
                <>No image picked yet</>
            )}
            {isRunning && <TasksInProgress {...{ tasksProgress }} />}
        </>
    );
}

/**
 * TODO: !! Move to subfolder
 */
