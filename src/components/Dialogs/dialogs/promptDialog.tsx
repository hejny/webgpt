import { message } from '../../../utils/typeAliases';
import type { CommonDialogOptions } from '../interfaces/CommonDialogOptions';
import { commonDialog } from './_commonDialog';

type PromptDialogOptions = Omit<CommonDialogOptions, 'title' | 'message'> & {
    /**
     *  Prompt question
     */

    prompt: message;
};

/**
 * Pops up a prompt dialog with one text input field
 */
export async function promptDialog(options: PromptDialogOptions): Promise<string | null> {
    const { prompt, ...restOptions } = options;
    return commonDialog({
        title: prompt,
        message: null,
        ...restOptions,
    });
}
