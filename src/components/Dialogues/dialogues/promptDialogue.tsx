import { forTime } from 'waitasecond';
import { message } from '../../../utils/typeAliases';
import { IPromptInQueue, promptDialogueQueue } from '../Dialogues';

/**
 * Pops up the co-pilot panel with a prompt dialogue.
 */
export async function promptDialogue(prompt: message): Promise<string | null> {
    const promptInQueue: IPromptInQueue = {
        prompt,
        answer: undefined,
    };
    promptDialogueQueue.push(promptInQueue);

    console.info('❔ promptDialogue: Waiting for answer', { prompt });

    while (true) {
        await forTime(50 /* <- TODO: POLLING_INTERVAL_MS into config */);

        if (promptInQueue.answer !== undefined) {
            const answer = promptInQueue.answer;
            console.info('❔ promptDialogue: Have answer', { prompt, answer });
            return answer;
        }
    }
}

/**
 * TODO: !!! Default answer
 * TODO: !!! Finish with react NOT window.prompt
 * TODO: !!! This must work in worker
 * TODO: Use some better forValueDefined
 */
