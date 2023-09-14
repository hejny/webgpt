import { promptDialogue } from '../../components/Dialogues/dialogues/promptDialogue';
import { TaskProgress } from '../../components/TaskInProgress/task/TaskProgress';
import { isRunningInBrowser, isRunningInWebWorker } from '../../utils/isRunningInWhatever';
import {
    IMessageError,
    IMessageMainToWorker,
    IMessageProgress,
    IMessagePromptDialogueAnswer,
    IMessageRequest,
    IMessageResult,
    IMessageWorkerToMain,
    IWorkerifyableFunction,
    TransferableObject,
} from './PostMessages';

export class Workerify<
    TRequest extends TransferableObject,
    TResult extends TransferableObject,
    TFunction = IWorkerifyableFunction<TRequest, TResult>,
> {
    /**
     * Runs a worker for given function
     *
     * @param func an executor function that will be run in worker
     */
    public runWorker(executor: TFunction): void {
        if (!isRunningInWebWorker()) {
            throw new Error('You can access worker executor only in worker');
        }

        addEventListener('message', async (event: MessageEvent<IMessageMainToWorker<TRequest>>) => {
            const { type } = event.data;

            console.info('Worker: ⚙ Message from main thread', { type, event, executor });

            if (type === 'REQUEST') {
                const { request } = event.data;

                try {
                    const result = (await (executor as any)(/* <-[0] */ request, (taskProgress: TaskProgress) => {
                        postMessage({
                            type: 'PROGRESS',
                            taskProgress,
                        } satisfies IMessageProgress);
                    })) as TResult; /* <-[0] */

                    postMessage({
                        type: 'RESULT',
                        result,
                    } satisfies IMessageResult<TResult>);
                } catch (error) {
                    if (!(error instanceof Error)) {
                        throw error;
                    }

                    console.error(error);
                    postMessage({
                        type: 'ERROR',
                        message: error.message,
                    } satisfies IMessageError);
                }
            } else if (type === 'PROMPT_DIALOGUE_ANSWER') {
                // Note: Do nothing here, because [👂][0] promptDialogue is also listening to this message
                return;
            } else {
                throw new Error(`Unexpected message type from main thread: ${type}`);
            }
        });
    }

    public makeConnector(createWorker: () => Worker): TFunction {
        let worker: Worker | null = null;

        const connector = (
            request: TRequest,
            onProgress: (taskProgress: TaskProgress) => void = () => {},
        ): Promise<TResult> => {
            if (!isRunningInBrowser()) {
                throw new Error('You can access worker connector only in browser');
            }

            onProgress({
                // TODO: Maybe remove this task OR optionally turn it on/off
                name: 'start-worker',
                title: 'Spinning up',
                isDone: false,
            });

            if (worker === null) {
                worker = createWorker();
            }

            return new Promise<TResult>((resolve, reject) => {
                worker!.addEventListener('message', async (event: MessageEvent<IMessageWorkerToMain<TResult>>) => {
                    const { type } = event.data;

                    console.info('⚙ Message from worker', { type, event });

                    onProgress({
                        // Note: If recieved any message from worker, it means that worker is running
                        name: 'start-worker',
                        isDone: true,
                    });

                    if (type === 'RESULT') {
                        const { result } = event.data;
                        resolve(result);
                    } else if (type === 'PROGRESS') {
                        const { taskProgress } = event.data;
                        // Note: There is no point of awating onProgress, because it is running in worker
                        /*     > not await */ onProgress(taskProgress);
                    } else if (type === 'ERROR') {
                        const { message } = event.data;
                        reject(new Error(message));
                    } else if (type === 'PROMPT_DIALOGUE') {
                        const { promptOptions } = event.data;
                        const promptAnswer = await promptDialogue(promptOptions);
                        worker!.postMessage({
                            type: 'PROMPT_DIALOGUE_ANSWER',
                            promptAnswer,
                        } satisfies IMessagePromptDialogueAnswer);
                    } else {
                        reject(new Error(`Unexpected message type from worker: ${type}`));
                    }
                });

                console.info('⚙ Sending request to worker', { request, worker });

                worker!.postMessage({
                    type: 'REQUEST',
                    request,
                } satisfies IMessageRequest<TRequest>);
            });
        };

        return connector as TFunction /* <-[0] */;
    }
}


/**
 * TODO: [🌴] There is not ideally separated responsibilities between Workerify and dialogues - Either Workerify should not know about dialogues OR dialogues should not know about Workerify
 * TODO: Maybe add unique id for each request
 * TODO: Maybe add specific string for each function into messages IMessageRequest, IMessageProgress, IMessageResult, IMessageError
 * TODO: [0] Remove "as ..." and "any" the code should be type safe by itself without any ugly casts
 */
