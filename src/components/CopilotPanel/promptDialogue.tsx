import { forTime } from 'waitasecond';
import { jsxToText } from '../../utils/jsx-html/jsxToText';
import { message } from '../../utils/typeAliases';

/**
 * Pops up the co-pilot panel with a prompt dialogue.
 */
export async function promptDialogue(prompt: message): Promise<string | null> {
    await forTime(Math.random() * 1000 + 500);
    return `Mocked response on ${jsxToText(prompt)}`;

    //window.prompt(jsxToText(prompt));
}

/**
 * TODO: !!! Default answer
 * TODO: !!! Finish with react NOT window.prompt
 * TODO: !!! This must work in worker
 */
