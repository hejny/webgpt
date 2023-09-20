import { forTime } from 'waitasecond';
import { isRunningInWebWorker } from '../../../utils/isRunningInWhatever';
import { IMessageMainToWorker, IMessagePromptDialogue } from '../../../workers/0-Workerify/PostMessages';
import type { PromptDialogueOptions } from '../interfaces/PromptDialogueOptions';
import type { PromptInQueue } from '../interfaces/PromptInQueue';
import { isDialoguesRendered } from '../locks/Dialogues.lock';
import { promptDialogueQueue } from '../queues/prompts';

/**
 * Pops up the co-pilot panel with a prompt dialogue.
 */
export async function promptDialogue(options: PromptDialogueOptions): Promise<string | null> {
    const { prompt, defaultValue, placeholder, isCloseable, autoSubmit } = options;

    // TODO: !!! Implement isCloseable
    // TODO: !!! autoSubmit

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
            type: 'PROMPT_DIALOGUE',
            promptOptions: { prompt, defaultValue, placeholder, isCloseable, autoSubmit },
        } satisfies IMessagePromptDialogue);

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
}

/**
 * TODO: !!! DRY with alertDialogue
 * TODO: !!! Draggable
 * TODO: !!! Compact design
 * TODO: !!! Dialogue vs Dialog
 * TODO: !!! Show autoSubmit countdown
 * TODO: !!! Use internally formDialogue
 * TODO: !! JSX must work in worker OR Should not be possible to use JSX from worker OR at all
 * TODO: Break in some timeout
 * TODO: Use some better forValueDefined
 * TODO: isMultiline
 * TODO: [🍁] Put unique ID to each prompt
 * TODO: [🌴] There is not ideally separated responsibilities between Workerify and dialogues - Either Workerify should not know about dialogues OR dialogues should not know about Workerify
 */
