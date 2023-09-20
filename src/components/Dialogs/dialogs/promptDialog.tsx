import { forTime } from 'waitasecond';
import { isRunningInWebWorker } from '../../../utils/isRunningInWhatever';
import type { IMessageMainToWorker, IMessagePromptDialog } from '../../../workers/0-Workerify/PostMessages';
import type { PromptDialogOptions } from '../interfaces/PromptDialogOptions';
import type { PromptInQueue } from '../interfaces/PromptInQueue';
import { isDialogsRendered } from '../locks/Dialogs.lock';
import { promptDialogQueue } from '../queues/prompts';

/**
 * Pops up a prompt dialog with one text input field
 */
export async function promptDialog(options: PromptDialogOptions): Promise<string | null> {
    const { prompt, defaultValue, placeholder, isCloseable, autoSubmit } = options;

    // TODO: !!! Implement autoSubmit

    const promptInQueue: PromptInQueue = {
        prompt,
        defaultValue,
        placeholder,
        isCloseable,
        autoSubmit,
        answer: undefined,
    };

    if (isRunningInWebWorker()) {
        // [🌴]
        postMessage({
            type: 'PROMPT_DIALOG',
            promptOptions: { prompt, defaultValue, placeholder, isCloseable, autoSubmit },
        } satisfies IMessagePromptDialog);

        return new Promise((resolve) => {
            const onMessage = (event: MessageEvent<IMessageMainToWorker<unknown>>) => {
                const message = event.data;
                if (message.type !== 'PROMPT_DIALOG_ANSWER') {
                    return;
                }
                resolve(message.promptAnswer);
                removeEventListener('message', onMessage);
            };
            addEventListener('message' /* <-[👂][0] */, onMessage);
        });
    }

    if (isDialogsRendered.value === false) {
        throw new Error('<Dialogs/> component is not rendered');
    }

    promptDialogQueue.push(promptInQueue);

    // console.info('❔ promptDialog: Waiting for answer', { prompt });

    while (true) {
        await forTime(50 /* <- TODO: POLLING_INTERVAL_MS into config */);

        if (promptInQueue.answer !== undefined) {
            const answer = promptInQueue.answer;
            // console.info('❔ promptDialog: Have answer', { prompt, answer });
            return answer;
        }
    }
}

/**
 * TODO: !!! Base on commonDialog
 * TODO: !!! Draggable
 * TODO: !!! Compact design
 * TODO: !!! Show autoSubmit countdown
 * TODO: !!! Use internally formDialog
 * TODO: !! JSX must work in worker OR Should not be possible to use JSX from worker OR at all
 * TODO: Break in some timeout
 * TODO: Use some better forValueDefined
 * TODO: isMultiline
 * TODO: [🍁] Put unique ID to each prompt
 * TODO: [🌴] There is not ideally separated responsibilities between Workerify and dialogs - Either Workerify should not know about dialogs OR dialogs should not know about Workerify
 */
