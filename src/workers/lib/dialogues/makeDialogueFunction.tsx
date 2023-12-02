import { forTime } from 'waitasecond';
import { isRunningInWebWorker } from '../../../utils/isRunningInWhatever';
import { randomUuid } from '../../../utils/randomUuid';
import type { IMessageDialogueRequest } from '../interfaces/IMessageDialogueRequest';
import type { IMessageDialogueResponse } from '../interfaces/IMessageDialogueResponse';
import type { IMessageMainToWorker } from '../interfaces/IMessageMainToWorker';
import { dialoguesQueue } from './dialoguesQueue';
import { AbstractDialogueRequest } from './interfaces/AbstractDialogueRequest';
import { AbstractDialogueResponse } from './interfaces/AbstractDialogueResponse';
import type { DialogueComponent } from './interfaces/DialogueComponent';
import type { DialogueFunction } from './interfaces/DialogueFunction';
import type { DialogueRequestInQueue } from './interfaces/DialogueRequestInQueue';
import { isDialoguesRendered } from './isDialoguesRendered';

/**
 *  Utility helper function that makes dialogue function which can be used both in main thread and in worker thread (with Workerify).
 *
 * @param DialogueComponent The dialogue component to use, e.g. `SimpleTextDialogueComponent` not `<SimpleTextDialogueComponent/>`
 * @returns The dialogue function
 */
export function makeDialogueFunction<
    TRequest extends AbstractDialogueRequest,
    TResponse extends AbstractDialogueResponse,
>(DialogueComponent: DialogueComponent<TRequest, TResponse>): DialogueFunction<TRequest, TResponse> {
    const { dialogueTypeName } = DialogueComponent;

    const dialogueFunction = async (request: TRequest): Promise<TResponse> => {
        const id = randomUuid();

        if (isRunningInWebWorker()) {
            // [🌴]

            postMessage({
                type: `${dialogueTypeName}_DIALOGUE_REQUEST`,
                id,
                request,
            } satisfies IMessageDialogueRequest);

            return new Promise((resolve) => {
                const onMessage = (event: MessageEvent<IMessageMainToWorker<unknown>>) => {
                    const message = event.data;
                    if (message.type !== `${dialogueTypeName}_DIALOGUE_RESPONSE`) {
                        return;
                    }
                    if ((message as IMessageDialogueResponse).id !== id) {
                        return;
                    }
                    resolve((message as IMessageDialogueResponse).response);
                    removeEventListener('message', onMessage);
                };
                addEventListener('message' /* <- Note: [👂] */, onMessage);
            });
        }

        if (isDialoguesRendered.value === false) {
            throw new Error('<Dialogues/> component is not rendered');
        }

        const requestInQueue: DialogueRequestInQueue = {
            dialogueTypeName,
            id,
            request,
        };

        // TODO: !!! Is this needed instead of .push(...)
        dialoguesQueue.value = [
            ...dialoguesQueue.value,
            requestInQueue,
            // Note: !!!
            // TODO: !!! Go through all .push(...) and decide to change to [...x,y]
        ];
    
        while (true) {
            await forTime(50 /* <- TODO: POLLING_INTERVAL_MS into config */);

            if (requestInQueue.response !== undefined) {
                return requestInQueue.response;
            }
        }
    };

    dialogueFunction.dialogueTypeName = dialogueTypeName;
    dialogueFunction.DialogueComponent = DialogueComponent;

    return dialogueFunction;
}

/**
 * TODO: !! JSX must work in worker OR Should not be possible to use JSX from worker OR at all
 * TODO: Break in some timeout
 * TODO: Use some better forValueDefined
 * TODO: [🍁] Put unique ID to each prompt
 * TODO: [🌴]
 */
