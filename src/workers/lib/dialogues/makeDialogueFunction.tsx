import { ReactNode } from 'react';
import { isRunningInWebWorker } from '../../../utils/isRunningInWhatever';
import { string_name } from '../../../utils/typeAliases';
import { DialogueComponentProps } from '../interfaces/DialogueComponentProps';
import { IMessageDialogueRequest, IMessageMainToWorker } from '../PostMessages';

export function makeDialogueFunction<TRequest, TResponse>(
    DialogueComponent: { dialogueTypeName: string_name } & ((
        promps: DialogueComponentProps<TRequest, TResponse>,
    ) => ReactNode),
): (request: TRequest) => Promise<TResponse> {
    const { dialogueTypeName } = DialogueComponent;

    return (request: TRequest): Promise<TResponse> => {
        const requestInQueue = {
            dialogueTypeName,
            request,
        };

        if (isRunningInWebWorker()) {
            // [🌴]
            postMessage({
                // TODO: !!! Search ACRY PROMPT_DIALOGUE
                type: `${dialogueTypeName}_DIALOGUE_REQUEST`,
                request,
            } satisfies IMessageDialogueRequest);

            return new Promise((resolve) => {
                const onMessage = (event: MessageEvent<IMessageMainToWorker<unknown>>) => {
                    const message = event.data;
                    if (message.type !== 'PROMPT_DIALOGUE_ANSWER') {
                        return;
                    }
                    resolve(message.promptAnswer);
                    removeEventListener('message', onMessage);
                };
                addEventListener('message' /* <-[👂][0] */, onMessage);
            });
        }

        if (isDialoguesRendered.value === false) {
            throw new Error('<Dialogues/> component is not rendered');
        }

        promptDialogueQueue.push(promptInQueue);

        // console.info('❔ promptDialogue: Waiting for answer', { prompt });

        while (true) {
            await forTime(50 /* <- TODO: POLLING_INTERVAL_MS into config */);

            if (promptInQueue.answer !== undefined) {
                const answer = promptInQueue.answer;
                // console.info('❔ promptDialogue: Have answer', { prompt, answer });
                return answer;
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
