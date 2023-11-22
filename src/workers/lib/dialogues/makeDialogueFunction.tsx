import { forTime } from 'waitasecond';
import { isRunningInWebWorker } from '../../../utils/isRunningInWhatever';
import { randomUuid } from '../../../utils/randomUuid';
import { IMessageDialogueRequest } from '../interfaces/IMessageDialogueRequest';
import { IMessageDialogueResponse } from '../interfaces/IMessageDialogueResponse';
import { IMessageMainToWorker } from '../interfaces/IMessageMainToWorker';
import { dialoguesQueue } from './dialoguesQueue';
import { DialogueComponent } from './interfaces/DialogueComponent';
import { DialogueFunction } from './interfaces/DialogueFunction';
import { DialogueRequestInQueue } from './interfaces/DialogueRequestInQueue';
import { isDialoguesRendered } from './isDialoguesRendered';

export function makeDialogueFunction<TRequest, TResponse>(
    DialogueComponent: DialogueComponent<TRequest, TResponse>,
): DialogueFunction<TRequest, TResponse> {
    const { dialogueTypeName } = DialogueComponent;

    const dialogueFunction = async (request: TRequest): Promise<TResponse> => {
        if (isRunningInWebWorker()) {
            // [🌴]

            const id = randomUuid();
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
                addEventListener('message' /* <-[👂][0] */, onMessage);
            });
        }

        if (isDialoguesRendered.value === false) {
            throw new Error('<Dialogues/> component is not rendered');
        }

        const requestInQueue: DialogueRequestInQueue = {
            dialogueTypeName,
            request,
        };

        dialoguesQueue.push(requestInQueue);

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
 * TODO: !!! Annotate
 * TODO: !! JSX must work in worker OR Should not be possible to use JSX from worker OR at all
 * TODO: Break in some timeout
 * TODO: Use some better forValueDefined
 * TODO: [🍁] Put unique ID to each prompt
 * TODO: [🌴]
 */
