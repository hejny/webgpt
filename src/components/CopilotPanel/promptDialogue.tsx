import { jsxToText } from '../../utils/jsx-html/jsxToText';
import { message } from '../../utils/typeAliases';

/**
 * Pops up the co-pilot panel with a prompt dialogue.
 */
export async function promptDialogue(prompt: message): Promise<string | null> {
    return window.prompt(jsxToText(prompt));
}

/**
 * TODO: !!! Default answer
 * TODO: !!! Finish with react NOT window.prompt
 * TODO: !!! This must work in worker
 */
