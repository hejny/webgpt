import { TaskProgress } from '../../components/TaskInProgress/task/TaskProgress';
import { isRunningInBrowser, isRunningInWebWorker } from '../../utils/isRunningInWhatever';
import {
    IMessageError,
    IMessageProgress,
    IMessageRequest,
    IMessageResponse,
    IMessageResult,
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

        addEventListener('message', async (event: MessageEvent<IMessageRequest<TRequest>>) => {
            const { type, request } = event.data;

            if (type !== 'REQUEST') {
                throw new Error(`Unexpected message type: ${type}`);
            }

            console.log('⚙ Received request from main thread', { request, event, executor });

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
                worker!.addEventListener('message', (event: MessageEvent<IMessageResponse<TResult>>) => {
                    const { type } = event.data;

                    onProgress({
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
                    } else {
                        reject(new Error(`Unexpected message type: ${type}`));
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

/*

new Workeryfy<Symbol...>()


createNewWallpaperWorkeryfy.runWorker
.makeConnector


*/

/**
 * TODO: Maybe worker as property on instance not shaddow variable in method makeConnector
 * TODO: Maybe add unique id for each request
 * TODO: Maybe add specific string for each function into messages IMessageRequest, IMessageProgress, IMessageResult, IMessageError
 * TODO: [0] Remove "as ..." and "any" the code should be type safe by itself without any ugly casts
 */
