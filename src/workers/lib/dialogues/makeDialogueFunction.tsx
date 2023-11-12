import { ReactNode } from 'react';
import { forTime } from 'waitasecond';
import { isRunningInWebWorker } from '../../../utils/isRunningInWhatever';
import { randomUuid } from '../../../utils/randomUuid';
import { string_name } from '../../../utils/typeAliases';
import { DialogueComponentProps } from '../interfaces/DialogueComponentProps';
import { DialogueRequestInQueue } from '../interfaces/DialogueRequestInQueue';
import { IMessageDialogueRequest, IMessageDialogueResponse, IMessageMainToWorker } from '../PostMessages';
import { dialoguesQueue } from './misc/dialoguesQueue';
import { isDialoguesRendered } from './misc/lock';

export function makeDialogueFunction<TRequest, TResponse>(
    DialogueComponent: { dialogueTypeName: string_name } & ((
        promps: DialogueComponentProps<TRequest, TResponse>,
    ) => ReactNode),
): (request: TRequest) => Promise<TResponse> {
    const { dialogueTypeName } = DialogueComponent;

    return async (request: TRequest): Promise<TResponse> => {
        if (isRunningInWebWorker()) {
            // [🌴]

            const id = randomUuid();
            postMessage({
                // TODO: !!! Search ACRY PROMPT_DIALOGUE
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
}

/**
 * !!! Annotate
 * TODO: !! JSX must work in worker OR Should not be possible to use JSX from worker OR at all
 * TODO: Break in some timeout
 * TODO: Use some better forValueDefined
 * TODO: [🍁] Put unique ID to each prompt
 * TODO: !!!last Is still revelavnt? [🌴] There is not ideally separated responsibilities between Workerify and dialogues - Either Workerify should not know about dialogues OR dialogues should not know about Workerify
 */
