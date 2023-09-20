import { forTime } from 'waitasecond';
import { isRunningInWebWorker } from '../../../utils/isRunningInWhatever';
import type { IMessageMainToWorker, IMessagePromptDialog } from '../../../workers/0-Workerify/PostMessages';
import type { CommonDialogInQueue } from '../interfaces/CommonDialogInQueue';
import type { CommonDialogOptions } from '../interfaces/CommonDialogOptions';
import { isDialogsRendered } from '../locks/isDialogsRendered';
import { promptDialogQueue } from '../queues/prompts';

/**
 * Pops up a common universal dialog with one text input field
 *
 * @private use only inside folder dialogs, publicly use one of higher level dialogs like alertDialog, confirmDialog, promptDialog
 */
export async function commonDialog(options: CommonDialogOptions): Promise<string | null> {
    const { title, message, defaultValue, placeholder, isCloseable, autoSubmit } = options;

    // TODO: !!! Implement autoSubmit

    const promptInQueue: CommonDialogInQueue = {
        title,
        message,
        defaultValue,
        placeholder,
        isCloseable,
        autoSubmit,
        answer: undefined,
    };

    if (isRunningInWebWorker()) {
        // [🌴]
        postMessage({
            type: 'DIALOG',
            promptOptions: { title, message, defaultValue, placeholder, isCloseable, autoSubmit },
        } satisfies IMessagePromptDialog);

        return new Promise((resolve) => {
            const onMessage = (event: MessageEvent<IMessageMainToWorker<unknown>>) => {
                const message = event.data;
                if (message.type !== 'DIALOG_ANSWER') {
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
        await forTime(50 /* <- TODO: DIALOG_POLLING_INTERVAL_MS into config */);

        if (promptInQueue.answer !== undefined) {
            const answer = promptInQueue.answer;
            // console.info('❔ promptDialog: Have answer', { prompt, answer });
            return answer;
        }
    }
}

/**
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
