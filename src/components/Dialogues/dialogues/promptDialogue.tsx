import { forTime } from 'waitasecond';
import { message } from '../../../utils/typeAliases';
import { promptDialogueQueue } from '../queues/prompts';

interface IPromptDialogueOptions {
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
    promptDialogueQueue.push(promptInQueue);

    // !!! Comment
    console.info('❔ promptDialogue: Waiting for answer', { prompt });

    while (true) {
        await forTime(50 /* <- TODO: POLLING_INTERVAL_MS into config */);

        if (promptInQueue.answer !== undefined) {
            const answer = promptInQueue.answer;
            // !!! Comment
            console.info('❔ promptDialogue: Have answer', { prompt, answer });
            return answer;
        }
    }
}

/**
 * TODO: !!! This must work in worker
 * TODO: Break in some timeout
 * TODO: Use some better forValueDefined
 * TODO: isMultiline
 */
