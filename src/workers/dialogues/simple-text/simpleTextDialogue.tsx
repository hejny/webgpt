import { makeDialogueFunction } from '../../lib/dialogues/makeDialogueFunction';
import { SimpleTextDialogueComponent } from './component/SimpleTextDialogueComponent';
import { SimpleTextDialogueRequest } from './interfaces/SimpleTextDialogueRequest';
import { SimpleTextDialogueResponse } from './interfaces/SimpleTextDialogueResponse';

/*
// !!! Remove
export interface IPromptDialogueOptions {
    /**
     * Prompt message
     *
     * Note: This is not a prompt to language model but a prompt to the user
     * /
    prompt: message;

    /**
     * Default value for the input/textarea
     * /
    defaultValue: string | null;

    /**
     * Placeholder for the input/textarea
     * /
    placeholder?: string;
}
*/

/**
 * !!! Remove
 * Represents a prompt message that is waiting for an answer or is already answered
 *
 * Note: This is not a prompt to language model but a prompt to the user
 * @private Use only withing the folder Dialogues
 *
export interface IPromptInQueue extends IPromptDialogueOptions {
    /**
     * Answer to the prompt
     *
     * - `undefined` means that the prompt is not answered yet and is waiting for an answer
     * - `null` means that the prompt is answered with `null`
     * - `string` means the answer to the prompt
     * /
    answer: undefined | string | null;
}
*/

/**
 * !!! Annotate
 */
export const simpleTextDialogue = makeDialogueFunction<SimpleTextDialogueRequest, SimpleTextDialogueResponse>(
    SimpleTextDialogueComponent,
);

/**
 * !!! Remove
 * Pops up the co-pilot panel with a prompt dialogue.
 *
export async function simpleTextDialogue(options: IPromptDialogueOptions): Promise<string | null> {
   
}

*/

/**
 * TODO: isMultiline
 */
