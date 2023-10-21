import { Promisable } from 'type-fest';
import { UserInterfaceTools, UserInterfaceToolsPromptDialogOptions } from '../../../UserInterfaceTools';

/**
 * Delagates the user interaction to a async callback function
 * You need to provide your own implementation of this callback function and its bind to UI.
 */
export class CallbackInterfaceTools implements UserInterfaceTools {
    public constructor(
        private readonly callback: (prompt: UserInterfaceToolsPromptDialogOptions) => Promisable<string>,
    ) {}

    /**
     * Trigger the custom callback function
     */
    public async promptDialog(options: UserInterfaceToolsPromptDialogOptions): Promise<string> {
        return await this.callback(options);
    }
}
