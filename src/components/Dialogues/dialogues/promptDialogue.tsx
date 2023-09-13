import { forTime } from 'waitasecond';
import { isRunningInWebWorker } from '../../../utils/isRunningInWhatever';
import { message } from '../../../utils/typeAliases';
import { IMessageMainToWorker, IMessagePromptDialogue } from '../../../workers/_/PostMessages';
import { promptDialogueQueue } from '../queues/prompts';

export interface IPromptDialogueOptions {
    /**
     * Prompt message
     *
     * Note: This is not a prompt to language model but a prompt to the user
     */
    prompt: message;

    /**
     * Default value for the input/textarea
     */
    defaultValue: string | null;

    /**
     * Placeholder for the input/textarea
     */
    placeholder?: string;
}

/**
 * Represents a prompt message that is waiting for an answer or is already answered
 *
 * Note: This is not a prompt to language model but a prompt to the user
 * @private this should be used only withing this folder Dialogues
 */
export interface IPromptInQueue extends IPromptDialogueOptions {
    /**
     * Answer to the prompt
     *
     * - `undefined` means that the prompt is not answered yet and is waiting for an answer
     * - `null` means that the prompt is answered with `null`
     * - `string` means the answer to the prompt
     */
    answer: undefined | string | null;
}

/**
 * Pops up the co-pilot panel with a prompt dialogue.
 */
export async function promptDialogue(options: IPromptDialogueOptions): Promise<string | null> {
    const { prompt, defaultValue, placeholder } = options;

    const promptInQueue: IPromptInQueue = {
        prompt,
        defaultValue,
        placeholder,
        answer: undefined,
    };



    if (isRunningInWebWorker()) {
        // [🌴]
        postMessage({
            type: 'PROMPT_DIALOGUE',
            promptOptions: { prompt, defaultValue, placeholder },
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
 * TODO: !!! JSX must work in worker OR Should not be possible to use JSX from worker OR at all
 * TODO: Break in some timeout
 * TODO: Use some better forValueDefined
 * TODO: isMultiline
 * TODO: [🍁] Put unique ID to each prompt
 * TODO: [🌴] There is not ideally separated responsibilities between Workerify and dialogues - Either Workerify should not know about dialogues OR dialogues should not know about Workerify
 */
